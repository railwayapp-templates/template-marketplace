# Deploy Paperclip on Railway

AI agent orchestration: teams, budgets, governance. Postgres included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-6)

## About

Paperclip is the app people use to manage AI agents for work: open-source orchestration for teams of AI agents, with org charts, budgets, governance, and a task manager UI. If your coding agent is an employee, Paperclip is the company.

This template deploys Paperclip in `authenticated` mode for internet-facing use, backed by a bundled PostgreSQL 17 database with persistent storage. The image (official upstream build, pinned, plus a thin Railway start wrapper) already ships the agent CLIs (Claude Code, Codex, OpenCode, Gemini) plus git, Python, and a Rust runner, so agents can execute inside the container. A volume at `/paperclip` keeps workspaces, secrets, and configuration across redeploys; the database lives on its own volume.

`DATABASE_URL` is composed from the database service over Railway's private network. The manifest requests generated secrets; if the current marketplace card prompts for blank secrets, generate strong unique values before deploying. Publication of these defaults is being verified separately. The start wrapper derives `PAPERCLIP_PUBLIC_URL` from the public domain on each boot. Public deployments intentionally disable browser board-claim; generate an operator-only first-admin invite as described below.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `wotonews/postgres:v17.11-3` | Database |
| paperclip | `wotonews/paperclip:v2026.1005.0-4` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `BETTER_AUTH_SECRET` | paperclip | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/paperclip-6)
