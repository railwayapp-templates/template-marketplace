# Deploy Atuin on Railway

Searchable, synced shell history for every machine you work on

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atuin)

## About

Atuin replaces the shell history in bash, zsh, fish and nushell with a searchable SQLite database that keeps far more than the command text — working directory, exit code, duration, hostname and session — then syncs it between every machine you work on. The sync half is a small Rust service, `atuin-server`, and self-hosting it keeps your command history on infrastructure you control. Deploy Atuin Server on Railway and you get that endpoint without a VPS, a reverse proxy or a TLS certificate.

This template runs two services. `atuin` is the sync API, built from the [gridalpha/atuin-server-railway](https://github.com/gridalpha/atuin-server-railway) source repository on top of the official `ghcr.io/atuinsh/atuin` image; it is the only service with a public URL and it answers every request from your `atuin` CLI. `Postgres` is a Railway-managed PostgreSQL 18 instance on a persistent volume, reachable only over the private network, holding every account and synced record. History is encrypted on your laptop before upload, so what lands in Postgres is ciphertext the server cannot read.

![Diagram of the Atuin sync server and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788767906/atuin-server-architecture.png)

Shell history is one of the most useful datasets a developer owns and one of the worst-managed: capped at a few thousand lines, lost when a terminal crashes, stranded per-machine, holding nothing but the text you typed. Atuin fixes all four, and self-hosting the sync server keeps that dataset — full of hostnames, flags and internal service names — off a third party's infrastructure.

- Full-text search over every command you have run, filtered by directory, host, exit code or session
- End-to-end encryption: records are sealed client-side with PASETO v4; the server stores only ciphertext
- Imports `.bash_history`, `.zsh_history`, fish history or histdb in one command
- Syncs an encrypted key-value store and dotfile aliases alongside history
- bash, zsh, fish and nushell, on macOS, Linux and WSL

The architecture is deliberately small. `atuin` is stateless — it authenticates requests, validates record indices and writes to Postgres — so a redeploy loses nothing. `Postgres` owns all durable state on its volume and is never exposed publicly. The server also publishes Prometheus metrics on a second port only reachable over the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| atuin | [gridalpha/atuin-server-railway](https://github.com/gridalpha/atuin-server-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | atuin | 8888 | HTTP API listening port |
| `ATUIN_DB_URI` | atuin | - | Postgres connection string |
| `ATUIN_METRICS__HOST` | atuin | :: | Private-network bind, never public |
| `ATUIN_METRICS__PORT` | atuin | 9001 | Metrics port, no public domain |
| `ATUIN_METRICS__ENABLE` | atuin | true | Prometheus exporter on second listener |
| `ATUIN_OPEN_REGISTRATION` | atuin | false | Set true to let others sign up |
| `ATUIN_BOOTSTRAP_PASSWORD` | atuin | (secret) | Password for that account |
| `ATUIN_BOOTSTRAP_USERNAME` | atuin | (secret) | Account created on first boot |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/atuin)
