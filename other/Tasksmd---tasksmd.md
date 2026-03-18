# Deploy Tasks.md on Railway

Tasks.md is a lightweight kanban board.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tasksmd)

## About

**Tasks.md** is a lightweight, self-hosted kanban board where every task is stored as a Markdown file on disk. Instead of a database, it uses folders and `.md` files to represent columns and cards, making your tasks transparent, portable, and easy to back up or version-control.

Hosting Tasks.md is intentionally simple. The application runs as a single web server process that reads and writes Markdown files from a local directory. There is no database to provision, no background workers, and no external services required. On Railway, Tasks.md can be deployed as a single container that binds to one port and uses a persistent volume to store task files. Configuration is minimal and optional, allowing you to deploy with sensible defaults and start using the board immediately after launch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tasks.md | `baldissaramatheus/tasks.md` | Worker |

**Category:** Other

[View on Railway →](https://railway.com/template/tasksmd)
