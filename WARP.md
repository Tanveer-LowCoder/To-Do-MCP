# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A local-first To-Do desktop application built with Tauri, React, and SQLite. The project follows a PRD-driven development approach with modular feature specifications and organized implementation structure.

**Tech Stack:**
- **Frontend**: React + TypeScript (Vite)
- **Desktop**: Tauri 
- **Database**: SQLite (local storage only)
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Rust

## Architecture

### PRD-Driven Development
This project uses Product Requirements Documents (PRDs) to define features before implementation:
- `/prd/v1-prd.md` - Main product specification
- `/prd/feature-*/` - Individual feature PRDs with detailed specs
- Each PRD includes wireframes, acceptance criteria, and technical requirements

### Directory Structure
```
/prd/                    # Product Requirements Documents
├── v1-prd.md           # Main PRD with overall vision
├── feature-tasks-crud/ # Task management operations PRD
├── feature-persistence/ # SQLite data layer PRD  
└── feature-ui/         # User interface specifications PRD

/main/                  # Implementation directory
├── src/                # React frontend code
│   ├── components/     # UI components (TaskInput, TaskList, TaskItem)
│   ├── layouts/        # Layout components (MainLayout)
│   └── styles/         # Global CSS and styling
└── src-tauri/         # Rust backend code
    └── src/           # Database layer (db.rs, models.rs, schema.rs)

/branches/             # Feature development branches
/integrations/         # Integration configurations
```

### Data Flow Architecture
- **Frontend**: React components handle UI state and user interactions
- **Backend**: Rust functions handle SQLite operations via Tauri commands
- **Database**: Single SQLite file with tasks table (local-only, no network calls)
- **State**: Task CRUD operations trigger immediate UI updates with persistence

### Core Components
- **TaskInput**: Text input with validation (max 256 chars, no empty tasks)
- **TaskList**: Sorted display (active first, then completed) 
- **TaskItem**: Individual task with checkbox toggle and delete on hover
- **Database Layer**: Rust SQLite operations with proper indexing and transactions

## Development Commands

### Prerequisites
Ensure you have Rust and Node.js installed for Tauri development.

### Build and Run
```bash
# Navigate to main implementation directory
cd main

# Install frontend dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

### Testing
```bash
# Run frontend tests
npm test

# Run Rust tests
cd src-tauri && cargo test
```

### GitHub Project Commands
```bash
# Create a new issue from PRD requirement
gh issue create --title "R-UI-1: User Interface Implementation" --body "Implementation of the minimal UI as specified in prd/feature-ui/v1-ui.md" --project "Project To Do" --label "ui,feature" --assignee @me

# Create feature branch for issue
git checkout -b feature/R-UI-1

# Check project status
gh project view "Project To Do" --owner Tanveer-LowCoder

# List open issues
gh issue list --repo Tanveer-LowCoder/To-Do-MCP

# Create pull request when implementation complete
gh pr create --title "Implement R-UI-1: User Interface" --body "Closes #1" --base main
```

### Database Operations
The SQLite schema is defined in `/main/src-tauri/src/schema.rs`:
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Development Workflow

### GitHub Project Integration
**Repository**: `https://github.com/Tanveer-LowCoder/To-Do-MCP`
**GitHub Project**: [Project To Do](https://github.com/users/Tanveer-LowCoder/projects/2)
- **Default Branch**: `main`
- **Project Fields**: Status, Priority, Size, Estimate, Start/End dates, Labels, Assignees
- **Project Type**: GitHub Projects V2 with issue tracking

### PRD-to-Issue Workflow
1. **Create GitHub Issues**: Convert each PRD requirement into a GitHub issue
   - **R-UI-1**: User Interface Implementation
   - **R-CRUD-1**: Task Management Interface 
   - **R-PERSIST-1**: SQLite Data Persistence
2. **Issue Template**: Include PRD reference, acceptance criteria, and technical specs
3. **Project Tracking**: Add issues to "Project To Do" with appropriate status/priority
4. **Branch Strategy**: Create feature branches for each issue (`feature/R-UI-1`, etc.)
5. **PR Workflow**: Create pull request when implementation complete, link to issue
6. **Issue Closure**: Issues automatically close when PR is merged

### PRD-First Approach
1. **Review PRDs**: Always start by reading the relevant PRD in `/prd/` before implementing
2. **Check Status**: Each requirement has status tracking (Not Started/In Progress/Complete)
3. **Follow Specs**: PRDs contain detailed acceptance criteria, wireframes, and technical specifications
4. **Update Status**: Mark PRD requirements complete as you finish implementation

### Feature Implementation Order
Based on dependencies defined in PRDs:
1. **R-UI-1**: Base UI components and layout (no dependencies)
2. **R-CRUD-1**: Task management interface (depends on UI)  
3. **R-PERSIST-1**: SQLite data persistence (depends on CRUD)

### Code Organization
- **Component Interfaces**: All defined in PRDs with TypeScript interfaces
- **Database Models**: Rust structs in `models.rs` match TypeScript interfaces
- **API Layer**: Functions in `db.rs` handle all SQLite operations
- **Styling**: Minimal design with thick black borders (2px), sans-serif fonts

## Performance Requirements

From the PRDs, maintain these performance targets:
- Application launch time < 2 seconds
- Memory usage < 100MB  
- Task operations < 100ms response time
- Application binary size < 10MB

## Key Implementation Notes

### Security & Privacy
- **Local-only**: No network calls, no cloud dependencies
- **Data isolation**: All data stored locally in SQLite
- **No user accounts**: Open and use immediately

### UI Design Principles
- **Minimal aesthetics**: Clean, distraction-free interface
- **Visual hierarchy**: Active tasks first, completed tasks with strikethrough
- **Responsive interactions**: Immediate feedback on all operations
- **Keyboard support**: Enter key submission, standard shortcuts

### Database Design
- **Simple schema**: Single tasks table with essential fields only
- **Proper indexing**: On done status and created_at for efficient queries  
- **Transaction safety**: All operations wrapped in transactions
- **Auto-incrementing IDs**: Primary key handling

The codebase structure indicates implementation is in early stages with placeholder functions - follow the PRD specifications exactly when completing the implementations.
