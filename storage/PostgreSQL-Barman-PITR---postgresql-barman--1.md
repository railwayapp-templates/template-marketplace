# Deploy PostgreSQL + Barman (PITR) on Railway

Deploy and Host PostgreSQL + Barman (PITR) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-barman--1)

## About

&gt; ⚠️ **EXPERIMENTAL**: This template is experimental and not recommended for production use. Use at your own risk.

PostgreSQL deployment with Point-in-Time Recovery (PITR) using Barman for backup management and disaster recovery scenarios. Includes automated backups and cloud storage integration.

This template deploys PostgreSQL with Barman backup management for learning and testing PITR capabilities. It includes a primary database, standby replica, and automated backup system with cloud storage support (Cloudflare R2/AWS S3). The setup enables point-in-time recovery to restore your database to any moment in history, useful for recovering from data corruption or accidental deletions. All services communicate via SSH keys and include monitoring tools for backup validation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| barman | [crisog/barman-pg-docker](https://github.com/crisog/barman-pg-docker) | Database |
| standby-pg | [crisog/barman-pg-docker](https://github.com/crisog/barman-pg-docker) | Database |
| primary-pg | [crisog/barman-pg-docker](https://github.com/crisog/barman-pg-docker) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BUCKET_NAME` | barman | - | AWS S3 or Cloudflare R2 |
| `ENDPOINT_URL` | barman | - | AWS S3 or Cloudflare R2 |
| `ACCESS_KEY_ID` | barman | - | AWS S3 or Cloudflare R2 |
| `BARMAN_PASSWORD` | barman | (secret) | - |
| `POSTGRES_PASSWORD` | barman | (secret) | - |
| `SECRET_ACCESS_KEY` | barman | (secret) | AWS S3 or Cloudflare R2 |
| `MODE` | standby-pg | active | - |
| `POSTGRES_PASSWORD` | standby-pg | (secret) | - |
| `REPLICATOR_PASSWORD` | standby-pg | (secret) | - |
| `POSTGRES_DB` | primary-pg | postgres | - |
| `POSTGRES_USER` | primary-pg | (secret) | - |
| `SSH_PUBLIC_KEY` | primary-pg | - | SSH_PUBLIC_KEY=$(openssl base64 -A < id_ed25519.pub) |
| `BARMAN_PASSWORD` | primary-pg | (secret) | - |
| `SSH_PRIVATE_KEY` | primary-pg | - | SSH_PRIVATE_KEY=$(openssl base64 -A < id_ed25519) |
| `POSTGRES_PASSWORD` | primary-pg | (secret) | - |
| `REPLICATOR_PASSWORD` | primary-pg | (secret) | - |

## Configuration

- **Volume:** `/var/lib/barman`
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 5432

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgresql-barman--1)
