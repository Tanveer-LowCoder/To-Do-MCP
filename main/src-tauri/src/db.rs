use rusqlite::{Connection, Result, Row};
use std::path::PathBuf;
use std::fs;
use chrono::Utc;
use thiserror::Error;

use crate::models::{Task, NewTask};
use crate::schema::INIT_SQL;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("Database error: {0}")]
    Rusqlite(#[from] rusqlite::Error),
    #[error("Validation error: {0}")]
    Validation(String),
    #[error("Task not found with id: {0}")]
    TaskNotFound(i64),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

pub type DbResult<T> = Result<T, DatabaseError>;

/// Get database file path in app data directory
fn get_db_path() -> DbResult<PathBuf> {
    let app_data = tauri::api::path::app_data_dir(&tauri::Config::default())
        .ok_or_else(|| DatabaseError::Io(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "Could not find app data directory"
        )))?;
    
    // Create app data directory if it doesn't exist
    fs::create_dir_all(&app_data)?;
    
    Ok(app_data.join("tasks.db"))
}

/// Initialize database connection and create tables
pub fn initialize_db() -> DbResult<()> {
    let db_path = get_db_path()?;
    let conn = Connection::open(&db_path)?;
    
    // Execute schema creation (with IF NOT EXISTS for idempotency)
    conn.execute_batch(INIT_SQL)?;
    
    // Verify schema by running a simple query
    let mut stmt = conn.prepare("SELECT COUNT(*) FROM tasks")?;
    let _count: i64 = stmt.query_row([], |row| row.get(0))?;
    
    println!("Database initialized successfully at: {:?}", db_path);
    Ok(())
}

/// Get all tasks sorted by creation date (newest first for active tasks)
pub fn get_all_tasks() -> DbResult<Vec<Task>> {
    let db_path = get_db_path()?;
    let conn = Connection::open(&db_path)?;
    
    let mut stmt = conn.prepare(
        "SELECT id, title, done, datetime(created_at) as created_at 
         FROM tasks 
         ORDER BY done ASC, created_at DESC"
    )?;
    
    let task_iter = stmt.query_map([], |row| {
        Ok(Task::from_row(
            row.get(0)?,
            row.get(1)?,
            row.get(2)?,
            row.get(3)?,
        ))
    })?;
    
    let mut tasks = Vec::new();
    for task in task_iter {
        tasks.push(task?);
    }
    
    Ok(tasks)
}

/// Create a new task
pub fn create_task(new_task: NewTask) -> DbResult<Task> {
    // Validate task data as per acceptance criteria
    new_task.validate().map_err(DatabaseError::Validation)?;
    
    let db_path = get_db_path()?;
    let conn = Connection::open(&db_path)?;
    
    // Use transaction for data integrity
    let tx = conn.unchecked_transaction()?;
    
    tx.execute(
        "INSERT INTO tasks (title, done, created_at) VALUES (?1, 0, datetime('now'))",
        [&new_task.title],
    )?;
    
    let task_id = tx.last_insert_rowid();
    
    // Get the created task to return with proper timestamp
    let mut stmt = tx.prepare(
        "SELECT id, title, done, datetime(created_at) as created_at 
         FROM tasks WHERE id = ?1"
    )?;
    
    let task = stmt.query_row([task_id], |row| {
        Ok(Task::from_row(
            row.get(0)?,
            row.get(1)?,
            row.get(2)?,
            row.get(3)?,
        ))
    })?;
    
    tx.commit()?;
    Ok(task)
}

/// Update task completion status
pub fn update_task_status(id: i64, done: bool) -> DbResult<Task> {
    let db_path = get_db_path()?;
    let conn = Connection::open(&db_path)?;
    
    // Use transaction for data integrity
    let tx = conn.unchecked_transaction()?;
    
    let rows_affected = tx.execute(
        "UPDATE tasks SET done = ?1 WHERE id = ?2",
        [done as i64, id],
    )?;
    
    if rows_affected == 0 {
        return Err(DatabaseError::TaskNotFound(id));
    }
    
    // Get updated task
    let mut stmt = tx.prepare(
        "SELECT id, title, done, datetime(created_at) as created_at 
         FROM tasks WHERE id = ?1"
    )?;
    
    let task = stmt.query_row([id], |row| {
        Ok(Task::from_row(
            row.get(0)?,
            row.get(1)?,
            row.get(2)?,
            row.get(3)?,
        ))
    })?;
    
    tx.commit()?;
    Ok(task)
}

/// Delete a task permanently (no recovery)
pub fn delete_task(id: i64) -> DbResult<()> {
    let db_path = get_db_path()?;
    let conn = Connection::open(&db_path)?;
    
    let rows_affected = conn.execute("DELETE FROM tasks WHERE id = ?1", [id])?;
    
    if rows_affected == 0 {
        return Err(DatabaseError::TaskNotFound(id));
    }
    
    Ok(())
}
