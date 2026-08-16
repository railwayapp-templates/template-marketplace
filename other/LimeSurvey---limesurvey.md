# Deploy LimeSurvey on Railway

Surveys with generated admin, encryption keys, and MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/limesurvey)

## About

LimeSurvey is an open-source platform for surveys, questionnaires, branching logic, invitations, and response analysis. This template deploys stable 7.0.9+260812 with generated credentials and MariaDB.

Sign in with `ADMIN_USER` and `ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| limesurvey | [monotykamary/railway-template-limesurvey](https://github.com/monotykamary/railway-template-limesurvey) | Web service |
| mariadb | `mariadb:11.8.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | limesurvey | 8080 | Railway service port. |
| `DEBUG` | limesurvey | 0 | Disable debug output. |
| `DB_HOST` | limesurvey | - | Private MariaDB host. |
| `DB_NAME` | limesurvey | limesurvey | Database name. |
| `DB_PORT` | limesurvey | 3306 | MariaDB port. |
| `DB_TYPE` | limesurvey | mysql | Database driver. |
| `HOST_INFO` | limesurvey | - | Trusted reverse-proxy host URL. |
| `ADMIN_NAME` | limesurvey | Railway Administrator | Administrator display name. |
| `ADMIN_USER` | limesurvey | (secret) | Initial administrator username. |
| `PUBLIC_URL` | limesurvey | - | Canonical public URL. |
| `ADMIN_EMAIL` | limesurvey | admin@example.com | Administrator email. |
| `DB_PASSWORD` | limesurvey | (secret) | Shared generated database password. |
| `DB_USERNAME` | limesurvey | (secret) | Database user. |
| `LISTEN_PORT` | limesurvey | 8080 | Rootless Apache port. |
| `ENCRYPT_NONCE` | limesurvey | - | Persistent sodium nonce in hex. |
| `TABLE_SESSION` | limesurvey | true | Persist sessions in MariaDB. |
| `ADMIN_PASSWORD` | limesurvey | (secret) | Generated administrator password. |
| `DB_MYSQL_ENGINE` | limesurvey | InnoDB | Transactional survey table engine. |
| `ENCRYPT_SECRET_BOX_KEY` | limesurvey | (secret) | Persistent sodium secret-box key in hex. |
| `MARIADB_USER` | mariadb | (secret) | LimeSurvey database user. |
| `MARIADB_DATABASE` | mariadb | limesurvey | LimeSurvey database. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated database password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade MariaDB system tables safely. |
| `MARIADB_RANDOM_ROOT_PASSWORD` | mariadb | (secret) | Generate unused random root password. |

## Configuration

- **Healthcheck:** `/index.php/admin/authentication/sa/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/upload`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Python, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/limesurvey)
