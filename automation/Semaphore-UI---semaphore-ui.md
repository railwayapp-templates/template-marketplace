# Deploy Semaphore UI on Railway

Semaphore UI 2.19 web UI for Ansible, Terraform, OpenTofu and scripts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/semaphore-ui)

## About

Semaphore UI is a modern web interface for running Ansible playbooks, Terraform and OpenTofu, PowerShell and shell scripts. Teams store inventories, keys and repositories in projects, launch tasks from templates, schedule them, review live output and history, and control access with roles, without giving everyone SSH access to production.

This template deploys Semaphore UI v2.19.14 from the official image, which includes Ansible, with a Railway Postgres database. The admin account is created from environment variables, and access keys stored in projects are encrypted with a generated key. The configuration is regenerated from environment variables on every start, so the service needs no volume. Semaphore clones repositories from Git and runs tasks inside its own container, reaching your servers over SSH or cloud APIs. It fits the Hobby plan for small teams. Back up Postgres regularly. Tasks run inside the Semaphore container, so give it enough memory for large playbooks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| semaphore | `semaphoreui/semaphore:v2.19.14` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | semaphore | 3000 |
| `SEMAPHORE_ADMIN` | semaphore | admin |
| `SEMAPHORE_DB_USER` | semaphore | (secret) |
| `SEMAPHORE_ADMIN_NAME` | semaphore | Admin |
| `SEMAPHORE_DB_DIALECT` | semaphore | postgres |
| `SEMAPHORE_ADMIN_EMAIL` | semaphore | admin@example.com |
| `SEMAPHORE_ADMIN_PASSWORD` | semaphore | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/semaphore-ui)
