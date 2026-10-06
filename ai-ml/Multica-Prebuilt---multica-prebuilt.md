# Deploy Multica (Prebuilt) on Railway

AI coding agent issue tracker for Claude Code, Codex, Cursor and 17 more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-prebuilt)

## About

Multica is a self-hosted issue tracker whose assignees can be AI coding agents.
Assign work to Claude Code, Codex, Cursor, Copilot CLI, OpenCode or another
supported agent, and it runs on a machine you control.

This template uses prebuilt images based on Multica v0.5.1 with an owner-password
login patch. Enter your owner email and password during deployment, then sign in
with those credentials. No email provider or verification code is required.

The template includes three services: a Go API and live-updates server, a Next.js
web app, and PostgreSQL 17 with pgvector. Services communicate over Railway's
private network. The web service forwards API and sign-in requests to the backend
so authentication cookies work on one browser address.

The API and database have separate persistent disks. Database passwords and
session signing keys are generated uniquely for each deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| multica-web | `ghcr.io/hmseeb/multica-web@sha256:d6ea63062f1dd35ca7c9e0f4235ed9e96bf74b27b9268e7cd6ef61d2c74646bf` | Web service |
| multica-api | `ghcr.io/hmseeb/multica-backend@sha256:3357e63d44f82b1fd88e9c5bb1c1b5b4ce525bdb0acc5e05bfd493089395eb82` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | multica | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | multica-web | 3000 | - |
| `HOSTNAME` | multica-web | :: | - |
| `PORT` | multica-api | 8080 | - |
| `APP_ENV` | multica-api | production | - |
| `JWT_SECRET` | multica-api | (secret) | - |
| `ALLOW_SIGNUP` | multica-api | false | - |
| `RESEND_API_KEY` | multica-api | (secret) | Optional. Enables email-code login and invitation emails; not needed for owner password login. |
| `LOCAL_UPLOAD_DIR` | multica-api | /app/data/uploads | - |
| `RESEND_FROM_EMAIL` | multica-api | - | Optional with Resend. Sender address on your verified domain; set this when adding a Resend API key. |
| `MULTICA_OWNER_EMAIL` | multica-api | - | Owner account email. Sign in with this email and your owner password; email verification is not needed. |
| `MULTICA_OWNER_PASSWORD` | multica-api | (secret) | Owner password: at least 15 characters. Saved on first boot only; changing this variable does not reset an existing account. |
| `MULTICA_TRUSTED_PROXIES` | multica-api | 0.0.0.0/0,::/0 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "cd /app && exec ./entrypoint.sh"`
- **Healthcheck:** `/healthz`
- **Volume:** `/app/data/uploads`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-prebuilt)
