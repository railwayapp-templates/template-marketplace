# Deploy FastUI ToDo App on Railway

Easy to start with Python FastUI framework Template for a ToDo app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastui-todo-app)

## About

A pure-Python todo application built with FastUI and FastAPI. Manage tasks with add, toggle, and delete actions, filter by status, and enjoy a reactive React-powered UI — all without writing any JavaScript. Ideal for learning FastUI or as a starter template.

Deploying FastUI ToDo App on Railway requires no special infrastructure. The app runs as a single Python process serving both the FastAPI backend and the prebuilt FastUI React frontend from one file. Railway auto-detects the Python environment via Nixpacks, installs dependencies from `requirements.txt`, and starts the Uvicorn ASGI server using the included `Procfile`. No database, build step, or Node.js toolchain is needed — the app is fully self-contained and ready to serve immediately after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fastui-todo-app | [Oclemy/fastui-todo-app](https://github.com/Oclemy/fastui-todo-app) (branch: main) | Worker |

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/fastui-todo-app)
