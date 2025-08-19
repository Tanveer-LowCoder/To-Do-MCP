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
