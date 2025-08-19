// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod models;
mod schema;

use db::{initialize_db, get_all_tasks, create_task, update_task_status, delete_task, DbResult};
use models::{Task, NewTask};

/// Initialize the database on app startup
#[tauri::command]
async fn init_database() -> Result<(), String> {
    initialize_db().map_err(|e| e.to_string())
}

/// Get all tasks from database
#[tauri::command]
async fn get_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks().map_err(|e| e.to_string())
}

/// Add a new task
#[tauri::command]
async fn add_task(title: String) -> Result<Task, String> {
    let new_task = NewTask { title };
    create_task(new_task).map_err(|e| e.to_string())
}

/// Toggle task completion status
#[tauri::command]
async fn toggle_task(id: i64, done: bool) -> Result<Task, String> {
    update_task_status(id, done).map_err(|e| e.to_string())
}

/// Delete a task permanently
#[tauri::command]
async fn remove_task(id: i64) -> Result<(), String> {
    delete_task(id).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            init_database,
            get_tasks, 
            add_task,
            toggle_task,
            remove_task
        ])
        .setup(|_app| {
            // Initialize database on app startup
            if let Err(e) = initialize_db() {
                eprintln!("Failed to initialize database: {}", e);
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
