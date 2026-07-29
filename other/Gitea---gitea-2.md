# Deploy Gitea on Railway

Lightweight self-hosted Git forge with issues, pull requests, and wikis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitea-2)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitea-2)

**Published on the Railway marketplace:** https://railway.com/deploy/gitea-2 (category: Other).

Gitea is a lightweight, self-hosted Git forge for teams and individual developers. It provides repository hosting, code review, issues, pull requests, project boards, package registries, and wikis in a fast Go application, offering a focused alternative to larger source-control platforms while keeping source code and collaboration data under your control.

Hosting Gitea requires the web application, a durable database, persistent storage for repositories and attachments, and a correctly configured public URL. This template runs the official Gitea 1.27.1 container with a `/data` volume and Railway's PostgreSQL service. Gitea reaches Postgres over Railway's private network, while Railway terminates public HTTPS and forwards traffic to Gitea on port 3000. The public domain is injected into `DOMAIN` and `ROOT_URL`, so browser links and HTTPS clone URLs use the generated Railway hostname. Database migrations run automatically at startup, and `/api/healthz` gates deployments until the service is ready.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Gitea | `gitea/gitea:1.27.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Gitea | 3000 |
| `GITEA__database__USER` | Gitea | (secret) |
| `GITEA__server__PROTOCOL` | Gitea | http |
| `GITEA__database__DB_TYPE` | Gitea | postgres |
| `GITEA__server__HTTP_PORT` | Gitea | 3000 |
| `GITEA__server__DISABLE_SSH` | Gitea | true |
| `GITEA__security__INSTALL_LOCK` | Gitea | true |
| `GITEA__server__DISABLE_HTTP_GIT` | Gitea | false |
| `GITEA__server__START_SSH_SERVER` | Gitea | false |
| `GITEA__service__DISABLE_REGISTRATION` | Gitea | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitea-2)
