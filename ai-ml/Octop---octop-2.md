# Deploy Octop on Railway

Self-hosted multi-agent AI assistant with your own LLM provider

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/octop-2)

## About

Octop is an open-source, self-hosted AI assistant for individuals and teams. It supports multiple users and multiple
agents, each with its own skills, knowledge bases, MCP tools and scheduled tasks, and it works with the LLM provider
of your choice. This template deploys Octop with an admin account created from generated variables and its
first-run setup API closed to the public. It is a community-maintained template based on Octop. It is not
affiliated with, endorsed by, or an official offering of the Octop project or Tencent Cloud, and it does not use the
Octop logo.

Octop is a Python (FastAPI) server with a built-in React web app. It stores users, agents, conversations and
settings in SQLite and keeps agent workspaces and uploads on disk. Normally a web setup wizard creates the first
admin. However, the wizard's API stays reachable without authentication while the instance has a single user, and
it can be used to register an LLM provider and make it the active model. This template creates the admin from
environment variables on first boot and runs the official Octop image unmodified behind a small Caddy front door
that refuses the setup API. Octop's own login protects everything else.

This template runs Octop on Railway with a generated admin password, its data on a persistent volume, and the port
and health check wired. On first boot it also creates Octop's default assistant and sets the admin's language.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/youssefsiam38/octop-railway:1.0.0@sha256:a6f8770ecf0d833b3967af1fd80f2d108052d445481839af011cbbc11dc23830` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes traffic and health checks to (the Caddy front door; keep it 8080). |
| `FORWARD_PROTO` | https | Scheme the front door reports to Octop (keep it https on Railway). |
| `OCTOP_ADMIN_LOCALE` | en | Admin language set on first boot (en or zh); also the language of the default assistant. |
| `OCTOP_ADMIN_USERNAME` | (secret) | Username of the admin account created on first boot. |
| `OCTOP_DEFAULT_PASSWORD` | (secret) | Initial admin password, generated. Copy it to sign in, then change it in the app. Only used on the first boot. |
| `LANGFUSE_TRACING_ENABLED` | false | Langfuse tracing (off unless you add LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY / LANGFUSE_BASE_URL). |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/octop-2)
