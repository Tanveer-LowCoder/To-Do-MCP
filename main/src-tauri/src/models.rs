use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

/// Task model as specified in PRD
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: i64,
    pub title: String,
    pub done: bool,
    pub created_at: String, // ISO 8601 timestamp string
}

/// NewTask model for creating tasks as specified in PRD
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewTask {
    pub title: String,
}

impl Task {
    /// Create a new Task from database row
    pub fn from_row(id: i64, title: String, done: i64, created_at: String) -> Self {
        Task {
            id,
            title,
            done: done != 0, // Convert SQLite INTEGER to bool
            created_at,
        }
    }
    
    /// Convert done bool to SQLite INTEGER
    pub fn done_as_int(&self) -> i64 {
        if self.done { 1 } else { 0 }
    }
}

impl NewTask {
    /// Validate new task data
    pub fn validate(&self) -> Result<(), String> {
        if self.title.trim().is_empty() {
            return Err("Task title cannot be empty".to_string());
        }
        if self.title.len() > 256 {
            return Err("Task title cannot exceed 256 characters".to_string());
        }
        Ok(())
    }
}
