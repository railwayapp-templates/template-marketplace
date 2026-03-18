# Deploy Background Agent on Railway

Deploy and host coding agents (opencode/claude code/codex) on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/background-agent)

## About

Background Agent is a small full-stack demo that provisions per-session "sandbox" services on Railway and routes traffic to them through a proxy. 

It's inspired by Ramp's Background Agent architecture (https://builders.ramp.com/post/why-we-built-our-background-agent). You get an admin dashboard to create/retire ephemeral environments and a secure token-based link to open each sandbox in the browser.

Hosting Background Agent on Railway involves deploying:
- API service (Express + TypeScript)
- Web dashboard (React + Vite)
- Postgres database to track session state. 

When a user creates a session, the API uses the Railway GraphQL API to spin up a new Railway service from a sandbox container image. The API then reverse-proxies HTTP + WebSocket traffic to the correct sandbox over Railway's internal network, using a signed token to authorize access. 

You'll configure two public hostnames: one for the API/dashboard and one dedicated to proxying sandbox traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | [sidpalas/background-agent-railway](https://github.com/sidpalas/background-agent-railway) | Web service |
| web | [sidpalas/background-agent-railway](https://github.com/sidpalas/background-agent-railway) (root: /packages/web) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 3000 | - |
| `GH_TOKEN` | api | (secret) | A github access token with contents read/write and pull requests read/write |
| `ADMIN_PASSWORD` | api | (secret) | - |
| `API_PROXY_HOST` | api | - | An additional public hostname for this service used to proxy requests to sandboxes(e.g. proxy.devopsdirective.com) |
| `API_DIRECT_HOST` | api | - | The primary public hostname for this service used to proxy requests to sandboxes(e.g. api.devopsdirective.com) |
| `SANDBOX_REPO_URL` | api | - | The URL for the github repo you are working with (cloned at startup) |
| `AUTH_TOKEN_SECRET` | api | (secret) | - |
| `PORT` | web | 3001 | - |
| `VITE_API_URL` | web | - | Public URL of API service proxy host. This should match the value of: api.API_DIRECT_HOST |
| `VITE_PROXY_BASE_URL` | web | - | Public URL of API service. This should match the value of: api.API_PROXY_HOST |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, CSS, Dockerfile, Shell, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/background-agent)
