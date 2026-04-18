# Deploy Coder | Open Source GitHub Codespaces Alternative on Railway

Self-host Coder on Railway. Remote dev environments with any IDE

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coder-remote-development)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coder-remote-development?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy Coder on Railway to self-host your own remote development platform with zero infrastructure management. Coder lets teams provision cloud development environments on any infrastructure using Terraform templates — giving developers consistent, pre-configured workspaces accessible from VS Code, JetBrains, Cursor, or a web terminal.

Self-host Coder on Railway with this template that pre-configures the Coder control plane server alongside a PostgreSQL database for persistent state. The control plane handles user management, template definitions, workspace orchestration, and the web dashboard — while workspace compute runs on your own Docker hosts, Kubernetes clusters, or cloud VMs connected via external provisioners.

Coder is an open-source (AGPL-3.0) remote development platform that provisions reproducible cloud development environments via Terraform. Unlike GitHub Codespaces (Azure-only, GitHub-only) or the now-deprecated Gitpod Classic, Coder is fully cloud-agnostic and self-hosted.

Key features:
- **Infrastructure-as-Code** — workspaces defined as Terraform templates, deployable on any cloud, on-prem, or air-gapped
- **Multi-IDE support** — VS Code, JetBrains, Cursor, Windsurf, Jupyter, and web terminal
- **AI agent governance** — run Claude, Copilot, and other AI agents in auditable, sandboxed workspaces via Coder Tasks
- **Coder Desktop &amp; Connect** — native desktop app with seamless remote access without port forwarding
- **Enterprise-grade security** — SOC 2 Type II, RBAC, audit logging, OIDC SSO, multi-org support
- **Automatic cost optimization** — auto-shutdown idle workspaces, right-size infrastructure

The Railway deployment uses two services: Coder (control plane) and PostgreSQL (state storage).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Coder | `ghcr.io/coder/coder:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Coder | 7080 | Railway port routing variable |
| `CODER_ACCESS_URL` | Coder | - | Public URL for Coder dashboard |
| `CODER_HTTP_ADDRESS` | Coder | 0.0.0.0:7080 | Server listen address and port |
| `CODER_TELEMETRY_ENABLE` | Coder | false | Disable usage telemetry |
| `CODER_PG_CONNECTION_URL` | Coder | - | PostgreSQL connection string |
| `CODER_SECURE_AUTH_COOKIE` | Coder | true | Secure flag on auth cookies |
| `CODER_PROVISIONER_DAEMONS` | Coder | 0 | Disable built-in provisioners |
| `CODER_REDIRECT_TO_ACCESS_URL` | Coder | false | Disable redirect (Railway TLS proxy) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/coder-remote-development)
