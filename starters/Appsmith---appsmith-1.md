# Deploy Appsmith on Railway

Low-code platform for internal tools, dashboards, and admin panels.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appsmith-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appsmith)

**Published:** https://railway.com/deploy/appsmith (marketplace code `appsmith`, category `Starters`).

Appsmith is an open-source low-code platform for building internal tools, dashboards, admin panels, and business applications. It combines drag-and-drop UI widgets with database and API connectors, JavaScript customization, Git-based workflows, and application sharing so teams can ship data-driven tools without building every interface from scratch.

Hosting Appsmith on Railway runs the official Community Edition v2.2 image as a single stateful service. The image supervises the web editor, Java backend, real-time service, MongoDB, Redis, and supporting PostgreSQL process internally. Railway routes HTTPS traffic to Appsmith's HTTP port 80, checks readiness at `/api/v1/health`, and mounts a persistent volume at `/appsmith-stacks` for databases, configuration, Git checkouts, and backups. The template generates independent encryption password, encryption salt, and Supervisor credentials; sets the public base URL from Railway's generated domain; disables telemetry; restricts framing to the same origin; and requires an administrator email while keeping public signup disabled.

> **Administrator email required:** `APPSMITH_ADMIN_EMAILS` is a required deployer-specific input because public signup is disabled. During deployment, enter the email address that should receive administrator access. Appsmith CE v2.2 accepts multiple administrator addresses separated by commas. The template intentionally provides no default; never put a real email address in the template itself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Appsmith | `appsmith/appsmith-ce:v2.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `APPSMITH_SIGNUP_DISABLED` | true |
| `APPSMITH_DISABLE_TELEMETRY` | true |
| `APPSMITH_ENCRYPTION_PASSWORD` | (secret) |
| `APPSMITH_SUPERVISOR_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appsmith-stacks`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/appsmith-1)
