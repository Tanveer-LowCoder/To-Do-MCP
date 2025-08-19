use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    pub id: i64,
    pub title: String,
    pub done: bool,
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewTask {
    pub title: String,
}

pub fn initialize_db() -> Result<()> {
    // Implementation coming soon
    Ok(())
}

pub fn get_all_tasks() -> Result<Vec<Task>> {
    // Implementation coming soon
    Ok(vec![])
}

pub fn create_task(task: NewTask) -> Result<Task> {
    // Implementation coming soon
    unimplemented!()
}

pub fn update_task_status(id: i64, done: bool) -> Result<Task> {
    // Implementation coming soon
    unimplemented!()
}

pub fn delete_task(id: i64) -> Result<()> {
    // Implementation coming soon
    Ok(())
}
