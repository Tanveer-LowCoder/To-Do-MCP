# Local-Only To-Do Desktop App

A minimalist, local-first To-Do desktop application built with Tauri, React, and SQLite. No cloud dependencies, no user accounts - just open and use.

## Features
- ✅ Add, view, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Local SQLite storage
- ✅ Clean, minimal interface
- ✅ Privacy-focused (no cloud sync)

## Tech Stack
- **Frontend**: React (Vite) + TypeScript
- **Desktop**: Tauri
- **Database**: SQLite
- **UI**: Tailwind CSS + shadcn/ui

## Project Structure
```
/prd/                    # Product Requirements Documents
├── v1-prd.md           # Main PRD
├── feature-tasks-crud/  # Task CRUD operations PRD
├── feature-persistence/ # Data persistence PRD
└── feature-ui/         # User interface PRD

/main/                  # Main implementation
├── src/                # React frontend
└── src-tauri/         # Rust backend

/branches/              # Feature development branches
└── integrations/       # Integration configurations
```

## Development

This project is organized using modular PRDs for AI-assisted development. Each feature has its own PRD with detailed specifications and acceptance criteria.

### Getting Started
1. Review the main PRD: `prd/v1-prd.md`
2. Check feature-specific PRDs in their respective folders
3. Implementation files are structured under `main/`

## Status
🚧 **In Development** - PRDs completed, implementation in progress
