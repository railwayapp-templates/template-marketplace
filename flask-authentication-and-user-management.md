# Deploy Flask Authentication & User management on Railway

Complete authentication & user management API with live UI. 1 click deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flask-authentication-and-user-management)

## About

Flask Authentication & User Management is a single-file Flask API providing JWT-based auth, user registration, login, profile management, admin controls, and password handling. It ships with an interactive demo UI for testing all endpoints live, supports SQLite locally and Postgres in production, and is ready to deploy with one click.

Hosting Flask Authentication & User Management involves running a Gunicorn-served Flask application connected to a PostgreSQL database. Railway auto-detects the Python buildpack via Nixpacks, installs dependencies from `requirements.txt`, and runs the start command defined in the `Procfile`. The app reads `DATABASE_URL` directly from the Railway-provisioned Postgres plugin, automatically converting the connection string to SQLAlchemy-compatible format. A `SECRET_KEY` environment variable must be set for JWT token signing. The included health check endpoint at `/api/health` enables Railway's deployment monitoring. The interactive demo UI is served at the root path, giving immediate visual confirmation that the deploy succeeded.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flask-authentication-and-user-management | [Oclemy/flask-authentication-and-user-management](https://github.com/Oclemy/flask-authentication-and-user-management) | Worker |

**Category:** Starters · **Languages:** HTML, Python

[View on Railway →](https://railway.com/template/flask-authentication-and-user-management)
