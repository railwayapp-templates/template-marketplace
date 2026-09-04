# Deploy Pterodactyl | (Just Updated) Game Server Panel That Actually Boots on Railway

Game server panel that boots: migrated DB, seeded admin, working reset

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-or-just-updated-game-server-)

## About

Pterodactyl is the open-source game server management panel: a web UI and REST API for creating,
starting, stopping and monitoring game servers, with user accounts, permissions, subusers, file
management, scheduled tasks, databases and backups. This template deploys the panel with MariaDB
and Redis, on three services and three volumes.

The panel boots with a migrated database and an administrator account already created, and every
redeploy re-applies that credential, so a lost password is one redeploy away from being fixed.

Pterodactyl is a Laravel application, and Laravel deployments fail in a particular way: the
container starts, PHP-FPM and nginx come up, the platform reports the deployment healthy, and every
page returns HTTP 500 because the database migration never completed. The upstream entrypoint does
not stop when the migration fails, so nothing in the deploy status shows it.

Two things make that migration fail on a hosted platform. The panel's cache, session and queue
drivers all point at Redis, so the migration aborts if Redis is not reachable yet — the upstream
entrypoint waits for the database only. And the panel image ships MariaDB's client binaries, which
Laravel shells out to when it loads the stored schema; a recent MariaDB client verifies the server
certificate by default, so pairing the panel with the official MySQL image — whose certificate is
self-signed and auto-generated — ends the schema load with
`ERROR 2026 (HY000): TLS/SSL error: self-signed certificate in certificate chain` and leaves the
database empty.

This template waits for both dependencies, uses MariaDB, and fails the deployment when the
migration fails instead of serving an error page. It also creates the administrator: the panel has
no signup page and no seeding variable of its own, so a stock deploy has no account and no way to
make one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.8.3` | Database |
| panel | `ghcr.io/bon5co/pterodactyl-railway:v1.15.1` | Web service |
| redis | `redis:8.2.1-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | mariadb | (secret) |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `DB_PASSWORD` | panel | (secret) |
| `DB_USERNAME` | panel | (secret) |
| `REDIS_PASSWORD` | panel | (secret) |
| `PTERODACTYL_ADMIN_PASSWORD` | panel | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pterodactyl-or-just-updated-game-server-)
