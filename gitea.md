# Deploy Gitea | Open Source GitHub, BitBucket Alternative on Railway

Self-host Gitea - Git, Pull Requests, Gitea Actions CI/CD and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gitea)

## About

This Railway template deploys a fully self-hosted Gitea instance — a lightweight, open-source Git service — backed by a managed PostgreSQL database. You get Git hosting, code review, issue tracking, package registry, and built-in CI/CD (Gitea Actions) running on your own infrastructure in minutes. The Gitea container (`gitea/gitea`) connects to Postgres over Railway's private network, with all repositories and config persisted to a mounted volume at `/data`.

![Gitea architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773221435/Gitea_railway_installation_azxtv2.png)
---

Gitea is a painless, self-hosted all-in-one software development service written in Go. It's positioned as the lightweight alternative to GitLab — offering the features most teams actually need, without the multi-gigabyte resource footprint. Originally forked from Gogs in 2016, it has grown into a mature platform under the MIT license.

Key features:
- Git repository hosting with pull requests, code review, and branch protection
- Built-in issue tracker with milestones, labels, and kanban boards
- **Gitea Actions** — GitHub Actions-compatible CI/CD using the same YAML syntax
- Package registry supporting 20+ formats: npm, PyPI, Docker, Maven, Cargo, NuGet, and more
- LDAP, OAuth2, and SAML (Enterprise) authentication
- Wikis, project boards, and release management


---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gitea | `gitea/gitea:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gitea | 3000 | HTTP server listening port |
| `USER_GID` | Gitea | 1000 | Container group ID |
| `USER_UID` | Gitea | 1000 | Container user ID |
| `GITEA__database__HOST` | Gitea | - | Postgres server hostname and port |
| `GITEA__database__NAME` | Gitea | - | Database name for Gitea |
| `GITEA__database__USER` | Gitea | (secret) | Username for Postgres authentication |
| `GITEA__server__DOMAIN` | Gitea | - | Public domain of Gitea instance |
| `GITEA__database__PASSWD` | Gitea | - | Password for Postgres authentication |
| `GITEA__server__ROOT_URL` | Gitea | - | Base URL for Gitea web interface |
| `GITEA__DEFAULT__APP_NAME` | Gitea | My Gitea | Display name of Gitea instance |
| `GITEA__database__DB_TYPE` | Gitea | postgres | Database engine used by Gitea |
| `GITEA__server__HTTP_PORT` | Gitea | 3000 | Internal HTTP port used by Gitea |
| `GITEA__database__SSL_MODE` | Gitea | disable | Disable SSL for database connection |
| `GITEA__server__DISABLE_SSH` | Gitea | true | Disable built-in SSH server |
| `GITEA__security__SECRET_KEY` | Gitea | (secret) | Secret key for encryption |
| `GITEA__security__INTERNAL_TOKEN` | Gitea | (secret) | Internal authentication token |
| `GITEA__server__START_SSH_SERVER` | Gitea | false | Do not start SSH service |
| `GITEA__service__DISABLE_REGISTRATION` | Gitea | false | Allow new user registrations |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/gitea)
