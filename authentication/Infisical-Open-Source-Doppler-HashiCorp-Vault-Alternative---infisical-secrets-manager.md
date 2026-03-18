# Deploy Infisical — Open Source Doppler, HashiCorp Vault Alternative on Railway

Self Host Infisical, Manage API keys, certs, & other secrets on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/infisical-secrets-manager)

## About

Infisical is the open-source, all-in-one platform for secrets management, certificate management, and privileged access control. Teams use it to centralize API keys, database credentials, SSH keys, and environment variables across development, staging, and production — with end-to-end encryption, granular RBAC, and audit logging built in. 
Self-host Infisical on Railway using this one-click template and get a fully wired three-service stack — Infisical (`infisical/infisical`), Postgres, and Redis — running on private networking with all required secrets auto-generated, no manual `.env` configuration required.

![Infisical Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773514286/infisical_railway_architecture_avial8.png)

Infisical is an MIT-licensed open-source secrets platform built for developers and security teams. It solves secret sprawl — the problem of API keys and credentials scattered across `.env` files, Slack messages, and CI configs — by providing a single encrypted source of truth.

Key features:
- **Secret versioning and point-in-time recovery** — roll back any project to a previous state
- **Secret rotation** — automated rotation for PostgreSQL, MySQL, AWS IAM, and more
- **Dynamic secrets** — generate ephemeral credentials on-demand
- **Secret scanning** — detect 140+ secret types in code, Git history, and CI pipelines
- **Native integrations** — sync to GitHub Actions, Vercel, AWS, Kubernetes, Terraform, Ansible, and 50+ more
- **Internal PKI** — issue and manage X.509 certificates with a built-in CA
- **RBAC + audit logs** — granular permissions for human and machine identities with full event history
- **SDKs** for Node.js, Python, Go, Ruby, Java, and .NET

This template deploys the standalone `infisical/infisical` Docker image. Infisical connects to Postgres (private networking on port 5432) for persistent storage and to Redis (private networking on port 6379) for caching and session handling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Infisical | `infisical/infisical:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Infisical | production | Application runtime environment mode |
| `SITE_URL` | Infisical | - | Public URL of Infisical instance |
| `REDIS_URL` | Infisical | - | Redis connection URL for caching |
| `AUTH_SECRET` | Infisical | (secret) | Authentication signing secret key |
| `ENCRYPTION_KEY` | Infisical | - | Key for encrypting stored secrets |
| `DB_CONNECTION_URI` | Infisical | - | Postgres database connection URI |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/infisical-secrets-manager)
