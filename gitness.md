# Deploy Gitness (Open-Source DevOps & Git Repository Platform) on Railway

Gitness [Mar ’26] (Code Hosting, CI/CD & Collaboration) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gitness)

## About

Gitness is an open-source, self-hosted development platform that simplifies source code management, continuous integration (CI), and collaborative development workflows. It’s built by Harness, designed to empower developers to code, build, and deploy seamlessly. Gitness integrates version control, CI/CD pipelines, and code reviews - all in one unified interface.

Self-hosting Gitness on Railway lets you gain full control over your software development workflow without relying on any third-party service.

### Why Gitness?
Gitness is designed for teams that value speed, transparency, and flexibility. It removes vendor lock-in, offers complete source code visibility, and gives developers the power to define their workflows.

### Why use Railway for Gitness?

Because Railway offers the easiest and fastest way to deploy open-source tools. With one click, you can launch your managed Gitness environment, fully configured and ready to use.

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| gitness | `harness/gitness` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | gitness | 3000 |
| `GITNESS_DATABASE_DRIVER` | gitness | postgres |
| `GITNESS_ENCRYPTER_SECRET` | gitness | (secret) |
| `GITNESS_REGISTRY_HTTP_SECRET` | gitness | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/gitness)
