# Deploy Booklore on Railway

Self-hosted book and audiobook library management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/booklore)

## About

BookLore is a self-hosted book and audiobook manager that automatically fetches metadata, tracks reading progress, and organises your digital library. Upload EPUBs, PDFs, and audiobooks – BookLore handles covers, descriptions, and cataloguing.

BookLore runs as a Java application server backed by MariaDB. This template handles the full setup: the BookLore app, a MariaDB database, and persistent volume storage for your book files and app data. Railway's single-volume-per-service limitation is solved with bind mounts, so your books and configuration persist across redeploys. Once deployed, create an account, point your library at `/books`, and start uploading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb:latest | `mariadb:latest` | Database |
| booklore-railway | [matthewspear/booklore-railway](https://github.com/matthewspear/booklore-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb:latest | (secret) | Database username for BookLore |
| `MARIADB_DATABASE` | mariadb:latest | booklore | Database name for BookLore |
| `MARIADB_PASSWORD` | mariadb:latest | (secret) | Database password (auto-generated) |
| `MARIADB_ROOT_PASSWORD` | mariadb:latest | (secret) | Root password for admin access (auto-generated) |
| `MARIADB_PRIVATE_DOMAIN` | mariadb:latest | - | The private DNS name of the service. |
| `TZ` | booklore-railway | Etc/UTC | Timezone (e.g. Etc/UTC, America/New_York) |
| `USER_ID` | booklore-railway | 1000 | Linux user ID for file permissions |
| `GROUP_ID` | booklore-railway | 1000 | Linux group ID for file permissions |
| `DISK_TYPE` | booklore-railway | LOCAL | Storage type: LOCAL or NETWORK |
| `DATABASE_URL` | booklore-railway | - | JDBC connection string for MariaDB/MySQL |
| `DATABASE_PASSWORD` | booklore-railway | (secret) | Database password |
| `DATABASE_USERNAME` | booklore-railway | (secret) | Database username |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/booklore-data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/booklore)
