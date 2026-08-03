# Deploy friendica on Railway

Federated social networking with ActivityPub

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/friendica)

## About

Friendica is a decentralized social network server that interoperates with ActivityPub and other federated protocols. This template deploys stable Friendica 2026.05 with MariaDB, generated administrator credentials, durable media, and the required background daemon.

Sign in with `FRIENDICA_ADMIN_NICK` and the generated `FRIENDICA_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | [monotykamary/railway-template-friendica](https://github.com/monotykamary/railway-template-friendica) (root: /mariadb) | Database |
| friendica | [monotykamary/railway-template-friendica](https://github.com/monotykamary/railway-template-friendica) (root: /friendica) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mariadb | 3306 | Private MariaDB port. |
| `MARIADB_USER` | mariadb | (secret) | Database application user. |
| `MARIADB_DATABASE` | mariadb | friendica | Database initialized for Friendica. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated Friendica database password. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated MariaDB root password. |
| `PORT` | friendica | 80 | Apache port used by the Railway domain. |
| `MYSQL_HOST` | friendica | - | Private MariaDB hostname. |
| `MYSQL_PORT` | friendica | 3306 | Private MariaDB port. |
| `MYSQL_USER` | friendica | (secret) | Database application user. |
| `FRIENDICA_TZ` | friendica | UTC | Node timezone. |
| `FRIENDICA_URL` | friendica | - | Canonical public federation URL. |
| `FRIENDICA_DATA` | friendica | Filesystem | Store media on the persistent Friendica volume. |
| `FRIENDICA_LANG` | friendica | en | Default interface language. |
| `MYSQL_DATABASE` | friendica | friendica | Friendica database name. |
| `MYSQL_PASSWORD` | friendica | (secret) | Database password shared by Railway reference. |
| `FRIENDICA_DATA_DIR` | friendica | /var/www/html/storage | Persistent media directory. |
| `FRIENDICA_SITENAME` | friendica | Railway Friendica | Public node name. |
| `FRIENDICA_DEBUGGING` | friendica | false | Disable verbose production debugging. |
| `FRIENDICA_ADMIN_MAIL` | friendica | admin@example.com | Administrator email and Friendica admin identity. |
| `FRIENDICA_ADMIN_NICK` | friendica | admin | Initial administrator nickname. |
| `FRIENDICA_ADMIN_PASSWORD` | friendica | (secret) | Generated administrator password. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/.well-known/nodeinfo`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Other · **Languages:** Shell, Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/friendica)
