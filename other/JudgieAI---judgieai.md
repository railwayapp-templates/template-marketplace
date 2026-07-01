# Deploy Judgie‑AI on Railway

AI evaluation and feedback platform built with FastAPI and React.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/judgieai)

## About

**What is Judgie‑AI?**  
Judgie‑AI is a multi‑tenant AI‑powered hackathon platform that automates judging, provides AI coaching, and scores team submissions using Google Gemini. It offers bilingual UI, customizable AI personas, and secure, isolated databases for each hackathon.

Deploying Judgie‑AI on Railway provisions a Streamlit container and a PostgreSQL database in a single click. Railway handles TLS, networking, autoscaling, and environment variable management, letting you focus on configuring AI personas, hackathon criteria, and admin credentials. The platform also supports optional OIDC authentication for enterprise‑grade access control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Judgie-AI | [yosuke1024/Judgie-AI](https://github.com/yosuke1024/Judgie-AI) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_ENV` | Judgie-AI | production | - |
| `ALLOWED_IPS` | Judgie-AI | - | Optional) Comma-separated list of allowed IP addresses or subnets (e.g., 203.0.113.195). Leave empty to allow all IP addresses. |
| `DEFAULT_ADMIN_ID` | Judgie-AI | - | The login username or email for your Admin dashboard. Defaults to 'admin' if left blank. |
| `DEFAULT_ADMIN_PASSCODE` | Judgie-AI | - | The login password for your Admin account. Defaults to 'admin123' if left blank. (Highly recommended to change this). |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, TypeScript, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/judgieai)
