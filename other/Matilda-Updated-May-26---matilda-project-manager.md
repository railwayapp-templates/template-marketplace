# Deploy Matilda [Updated May '26] on Railway

Matilda [May '26] (Project Management & Kanban Platform) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/matilda-project-manager)

## About

Matilda is a modern, open-source project management tool built for better companies. It focuses on clarity, ownership, and execution-helping teams plan work, track progress, and collaborate without the noise and complexity of bloated PM tools.

Matilda is designed for product teams, startups, agencies, and growing companies that want structure without friction. Instead of juggling spreadsheets, chats, and over-engineered tools, Matilda provides a clean system for managing projects, tasks, timelines, and responsibilities in one place.

By deploying Matilda on Railway, you can run a production-ready project management system in minutes using a one-click deploy, without managing servers, databases, or infrastructure manually.

Self hosting Matilda means your projects, internal discussions, and company data stay private. There is no SaaS lock-in, no per-user pricing surprises, and no third-party platform owning your operational data.

Railway makes self hosting Matilda simple, secure, and production-ready.

Instead of manually provisioning servers, configuring databases, handling deployments, and setting up monitoring, Railway provides a managed runtime environment where Matilda runs reliably out of the box.

When you deploy Matilda on Railway:

*   The Matilda application runs in secure, managed containers
    
*   A database is automatically provisioned and connected
    
*   Environment variables and secrets are handled safely
    
*   Logs, health checks, and automatic restarts work by default
    
*   Scaling is simple as teams and projects grow
    

This allows you to run Matilda as your internal project manager without becoming a DevOps expert.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| matilda | [Matilda-org/matilda](https://github.com/Matilda-org/matilda) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RAILS_ENV` | matilda | production | - |
| `RAILS_LOG_LEVEL` | matilda | error | - |
| `SECRET_KEY_BASE` | matilda | (secret) | - |
| `RAILS_LOG_TO_STDOUT` | matilda | enabled | - |
| `RAILS_SERVE_STATIC_FILES` | matilda | enabled | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Ruby, HTML, JavaScript, SCSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/matilda-project-manager)
