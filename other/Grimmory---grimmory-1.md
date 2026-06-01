# Deploy Grimmory on Railway

Community fork of BookLore for self-hosted libraries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grimmory-1)

## About

Grimmory is a community-maintained fork of BookLore for self-hosting your digital book and audiobook library. It keeps the familiar BookLore-style experience for managing EPUBs, PDFs, and audiobooks, with metadata fetching, cover handling, reading progress, and a modern web UI.

Grimmory runs as a Java application server backed by MariaDB. This template handles the full setup: the Grimmory app, a MariaDB database, and persistent volume storage for your book files and app data. Railway's single-volume-per-service limitation is handled with bind mounts, so your books and configuration persist across redeploys. Once deployed, create an account, point your library at `/books`, and start uploading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grimmory-railway | [matthewspear/grimmory-railway](https://github.com/matthewspear/grimmory-railway) | Web service |
| mariadb:latest | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | grimmory-railway | Etc/UTC | Timezone (e.g. Etc/UTC, America/New_York) |
| `USER_ID` | grimmory-railway | 1000 | Linux user ID for file permissions |
| `GROUP_ID` | grimmory-railway | 1000 | Linux group ID for file permissions |
| `DISK_TYPE` | grimmory-railway | LOCAL | Storage type: LOCAL or NETWORK |
| `DATABASE_URL` | grimmory-railway | - | JDBC connection string for MariaDB/MySQL |
| `DATABASE_PASSWORD` | grimmory-railway | (secret) | Database password |
| `DATABASE_USERNAME` | grimmory-railway | (secret) | Database username |
| `MARIADB_USER` | mariadb:latest | (secret) | Database username for BookLore |
| `MARIADB_DATABASE` | mariadb:latest | booklore | Database name for BookLore |
| `MARIADB_PASSWORD` | mariadb:latest | (secret) | Database password (auto-generated) |
| `MARIADB_ROOT_PASSWORD` | mariadb:latest | (secret) | Root password for admin access (auto-generated) |
| `MARIADB_PRIVATE_DOMAIN` | mariadb:latest | - | The private DNS name of the service. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/booklore-data`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/grimmory-1)
