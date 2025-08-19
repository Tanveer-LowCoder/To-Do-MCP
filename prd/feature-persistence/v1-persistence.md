# Data Persistence PRD

## Overview
Implementation of local data persistence using SQLite for task storage and retrieval.

## Requirements

### R-PERSIST-1: SQLite Integration
Status: Not Started

#### Components
1. Database Setup
   - SQLite initialization
   - Schema creation
   - Migration handling
   Files: /main/src-tauri/src/db.rs

2. Data Models
   - Task model implementation
   - Data validation
   Files: /main/src-tauri/src/models.rs

3. Schema Definition
   - Database schema
   - Indices
   Files: /main/src-tauri/src/schema.rs

### Database Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_done ON tasks(done);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);
```

### Rust Models

```rust
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
```

### API Interface

```rust
// Database operations
pub fn initialize_db() -> Result<(), Error>;
pub fn get_all_tasks() -> Result<Vec<Task>, Error>;
pub fn create_task(task: NewTask) -> Result<Task, Error>;
pub fn update_task_status(id: i64, done: bool) -> Result<Task, Error>;
pub fn delete_task(id: i64) -> Result<(), Error>;
```

### Acceptance Criteria

#### Database Setup
- Automatic database creation if not exists
- Schema version tracking
- Error handling for initialization failures

#### Task Operations
- Create: New task insertion with validation
- Read: Efficient task retrieval with sorting
- Update: Status toggle persistence
- Delete: Permanent task removal

#### Data Integrity
- No duplicate task IDs
- Required fields validation
- Proper timestamp handling
- Transaction support for operations

#### Performance
- Task operations complete < 100ms
- Efficient indexing for common queries
- Proper connection pooling

## Dependencies
- R-CRUD-1: Task Management Interface

## Testing Requirements
- Unit tests for database operations
- Integration tests for data persistence
- Error handling tests
- Performance benchmarks

## Migration Plan
Version 1 Schema:
```sql
-- Initial schema
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indices
CREATE INDEX idx_tasks_done ON tasks(done);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);
```
