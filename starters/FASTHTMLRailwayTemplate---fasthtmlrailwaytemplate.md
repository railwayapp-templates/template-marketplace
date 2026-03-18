# Deploy FASTHTML_Railway_Template on Railway

A FastHTML + Postgres starter for Railway with a guestbook demo and HTMX

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fasthtmlrailwaytemplate)

## About

FastHTML is a Python framework for building server-rendered web applications using HTMX. This template deploys a guestbook demo app with PostgreSQL, demonstrating real CRUD
  operations, HTMX-powered forms, and Pico CSS styling — ready to customize into your own project.

  ## About Hosting FastHTML + Postgres

  Deploying FastHTML with Postgres on Railway requires minimal configuration. The Dockerfile builds with `uv` for fast dependency resolution, and Railway automatically injects the
   `DATABASE_URL` environment variable from the Postgres plugin. The app handles the `postgres://` to `postgresql://` conversion that SQLAlchemy requires. For local development,
  the app falls back to SQLite so you can run it without any database setup. Just push your code and Railway handles the rest.

  ## Common Use Cases

  - Rapid prototyping of Python web apps with a real database backend
  - Building HTMX-driven server-rendered applications without JavaScript frameworks
  - Starting point for FastHTML projects that need persistent storage on Railway

  ## Dependencies for FastHTML + Postgres Hosting

  - Python 3.12
  - PostgreSQL (provisioned automatically via Railway plugin)

  ### Deployment Dependencies

  - [FastHTML](https://fastht.ml/docs/) — Python web framework built on HTMX
  - [fastsql](https://github.com/AnswerDotAI/fastsql) — MiniDataAPI wrapper over SQLAlchemy
  - [psycopg2-binary](https://www.psycopg.org/) — PostgreSQL adapter for Python
  - [Pico CSS](https://picocss.com/) — Minimal classless CSS framework
  - [uv](https://docs.astral.sh/uv/) — Fast Python package manager (used in Dockerfile)

  ## Why Deploy FastHTML + Postgres on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to
  vertically and horizontally scale it.

  By deploying FastHTML + Postgres on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI
  agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FASTHTML w/Postgres Template | [TenaciousBirdofPrey/FASTHTML_RAILWAY_TEMPLATE](https://github.com/TenaciousBirdofPrey/FASTHTML_RAILWAY_TEMPLATE) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | - | Database created on first startup    |
| `DATABASE_URL` | - | Full Postgres connection string private network |
| `POSTGRES_USER` | (secret) |  User created on first startup     |
| `POSTGRES_PASSWORD` | (secret) | Password set on first startup      |
| `DATABASE_PUBLIC_URL` | - |  Full Postgres connection string (public network)  |

## Configuration

- **Healthcheck:** ` /health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/fasthtmlrailwaytemplate)
