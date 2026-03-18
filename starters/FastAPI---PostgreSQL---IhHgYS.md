# Deploy FastAPI - PostgreSQL on Railway

A comprehensive FastAPI and PostgreSQL template.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/IhHgYS)

## About

## Overview

The most complete FastAPI + PostgreSQL template on Railway — fully async, production-ready, and built with modern Python best practices. Skip weeks of boilerplate and start building your API in minutes.

Whether you're prototyping a side project or scaffolding a production service, this template gives you everything you need out of the box: async database access, authenticated API docs, structured project layout, and one-click deployment.

## Why This Template?

* **Fully async from top to bottom**: Every endpoint, CRUD operation, and database call is non-blocking — no thread pool bottlenecks, no mixed sync/async confusion. Just clean, fast async Python.

* **SQLAlchemy 2.0 + PostgreSQL**: Modern ORM with `select()` queries, `async_sessionmaker`, and native UUID support. Auto-creates tables on startup, disposes connections on shutdown — zero manual setup.

* **Authenticated API docs**: `/docs` and `/redoc` are protected behind session-based login using a pure ASGI middleware (no `BaseHTTPMiddleware` overhead). Your API documentation stays private until you're ready to share.

* **Production-grade performance**: ORJSONResponse for fast serialization, `uvloop` + `httptools` for maximum throughput, GZIP compression, and a tuned thread pool (100 threads) for mixed workloads.

* **Modern Python tooling**: Managed with `uv` and `pyproject.toml` — fast, reproducible installs with no dependency conflicts. Python 3.12, Pydantic v2, and clean `src/` project layout.

* **Ready to extend**: Clean separation between API endpoints, service layer, models, and schemas. Add new resources by following the existing `messages` pattern — no guesswork needed.

## What's Included

* FastAPI with async CRUD endpoints (Create, Read, Update, Delete)
* PostgreSQL with SQLAlchemy 2.0 async engine
* Pydantic v2 request/response validation
* Session-based authentication for API docs
* Environment-driven configuration (`.env.example` provided)
* Docker multi-stage build
* Async test suite with pytest
* Locust load testing configuration

## Quick Start

1. Click **Deploy** to provision your FastAPI app + PostgreSQL database
2. Set `USER_NAME` and `PASSWORD` environment variables for API doc access
3. Visit your deployment URL — your API is live

## Learn More

* [GitHub](https://github.com/yuting1214/Fullstack-FastAPI)
* [Changelog](https://github.com/yuting1214/Fullstack-FastAPI/blob/main/CHANGELOG.md)
* [FastAPI Documentation](https://fastapi.tiangolo.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Fullstack-FastAPI | [yuting1214/Fullstack-FastAPI](https://github.com/yuting1214/Fullstack-FastAPI) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST_URL` | Fullstack-FastAPI | - | Host URL for App |
| `PASSWORD` | Fullstack-FastAPI | (secret) | Password for accessing OpenAPI document. |
| `USER_NAME` | Fullstack-FastAPI | - | User name for accessing OpenAPI document. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/IhHgYS)
