# Deploy FastAPI SQLite CRUD on Railway

A FastAPI SQLite CRUD: dark-themed UI, search, stats dashboard, RESTful API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-sqlite-crud)

## About

A lightweight Python web application combining FastAPI and SQLite for full CRUD operations. It ships with a built-in dark-themed UI, search, stats dashboard, and a RESTful JSON API — all in a single file, ready to deploy.

Hosting a FastAPI SQLite CRUD app involves running a Python ASGI server (Uvicorn) that serves both the API endpoints and the embedded frontend. SQLite stores data in a local file, eliminating the need for an external database service. Railway's Nixpacks builder auto-detects the Python environment from `requirements.txt`, installs dependencies, and runs the start command defined in `railway.json`. The app binds to the `PORT` environment variable provided by Railway. Since SQLite writes to disk, data persists within the Railway volume as long as the service is running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fastapi-sqlite-crud | [Oclemy/fastapi-sqlite-crud](https://github.com/Oclemy/fastapi-sqlite-crud) | Worker |

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/fastapi-sqlite-crud)
