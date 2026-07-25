# Deploy Coder — Self-Hosted Dev Environments Control Plane on Railway

Open-source Codespaces alternative — control plane + Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coder-control-plane-postgres)

## About

Coder is the leading open-source platform for self-hosted cloud development environments — an alternative to GitHub Codespaces and Gitpod that keeps your source code and compute on infrastructure you control. Define workspaces in Terraform, onboard developers in minutes, and run AI coding agents inside governed environments. This template deploys the Coder **control plane** with a managed PostgreSQL database, ready to orchestrate workspaces on your own compute.

---

There is one thing to understand before deploying, and it shapes everything: **Railway runs the Coder control plane, not the workspaces themselves.**

Coder provisions development environments using Terraform, targeting Docker, Kubernetes, or cloud VMs. Railway provides none of those as a workspace host — no Docker-in-Docker, no Kubernetes. So on Railway, Coder runs as a **control plane only**: the dashboard, API, user management, templates, and audit logs all work fully, but the actual workspace compute runs elsewhere, connected through an external provisioner.

This is the correct and supported architecture, not a limitation to work around — Coder is designed to separate the control plane from workspace compute. In practice: deploy this template for a working Coder server, install the Coder CLI on a machine with Docker or Kubernetes access, set `CODER_PROVISIONER_DAEMON_PSK` as a shared secret on both sides, run `coder provisioner start --psk  --url https://your-coder-url`, and workspaces then provision on that connected infrastructure rather than on Railway.

If you deploy expecting workspaces to run on Railway itself, you'll reach the dashboard and be unable to create a workspace. That's expected: the compute is meant to live on your own hosts.

Typical cost: **~$5–10/month** on Railway for the control plane and Postgres, plus whatever your workspace compute costs on its own host. Codespaces and Gitpod bill per hour of active workspace usage; Coder lets you run that compute on your cheapest available infrastructure — or shut it down entirely when idle.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Coder | `ghcr.io/coder/coder` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Coder | 7080 | - |
| `CODER_HTTP_ADDRESS` | Coder | 0.0.0.0:7080 | - |
| `CODER_TELEMETRY_ENABLE` | Coder | false | - |
| `CODER_SECURE_AUTH_COOKIE` | Coder | true | - |
| `CODER_PROVISIONER_DAEMONS` | Coder | 0 | - |
| `CODER_REDIRECT_TO_ACCESS_URL` | Coder | false | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/coder-control-plane-postgres)
