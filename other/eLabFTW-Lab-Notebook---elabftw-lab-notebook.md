# Deploy eLabFTW Lab Notebook on Railway

Research notebooks and lab inventory with MySQL and stored uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elabftw-lab-notebook)

## About

Research notebooks and lab inventory with MySQL and stored uploads.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Research notebooks and lab inventory with MySQL and stored uploads.

| Service | Role | Persistent path |
| --- | --- | --- |
| `mysql` | Private application or dependency | `/var/lib/mysql` |
| `core` | Private application or dependency | `/var/lib/elabftw` |
| `elabftw` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elabftw | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| mysql | `mysql:8.4@sha256:0744ee5ef89ce6ccfa13de3e579fe6b9e27f93dd70da9c06d2c908b1b193fb8d` | Database |
| core | `elabftw/elabimg:6.0.4@sha256:43ce0bdd3400ea66691772cdcad4c4b61b48539fedfefe19ffdbfd8de0209124` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | elabftw | 8080 | Port for elabftw; follows the upstream deployment configuration. |
| `OWNER_AUTH` | elabftw | true | Owner auth for elabftw; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | elabftw | all | Owner scope for elabftw; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | elabftw | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | elabftw | 8080 | Upstream port for elabftw; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | elabftw | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `MYSQL_USER` | mysql | (secret) | Mysql user for mysql; follows the upstream deployment configuration. |
| `MYSQL_DATABASE` | mysql | elabftw | Mysql database for mysql; follows the upstream deployment configuration. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `TZ` | core | UTC | Tz for core; follows the upstream deployment configuration. |
| `DB_HOST` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `DB_NAME` | core | elabftw | Db name for core; follows the upstream deployment configuration. |
| `DB_PORT` | core | 3306 | Db port for core; follows the upstream deployment configuration. |
| `DB_USER` | core | (secret) | Db user for core; follows the upstream deployment configuration. |
| `SITE_URL` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `DB_PASSWORD` | core | (secret) | Resolved from the linked service; preserve this reference for the included topology. |
| `AUTO_DB_INIT` | core | true | Auto db init for core; follows the upstream deployment configuration. |
| `PHP_TIMEZONE` | core | UTC | Php timezone for core; follows the upstream deployment configuration. |
| `DISABLE_HTTPS` | core | true | Disable https for core; follows the upstream deployment configuration. |
| `AUTO_DB_UPDATE` | core | false | Auto db update for core; follows the upstream deployment configuration. |
| `USE_OPENCLONING` | core | false | Use opencloning for core; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`
- **Start command:** `sh -ec 'umask 077
mkdir -p /var/lib/elabftw/.railway /var/lib/elabftw/uploads /var/cache/elabftw
if [ ! -s /var/lib/elabftw/.railway/secret-key ]; then
php -d open_basedir='"'"''"'"' bin/init tools:genkey > /var/lib/elabftw/.railway/secret-key.tmp
mv /var/lib/elabftw/.railway/secret-key.tmp /var/lib/elabftw/.railway/secret-key
fi
export SECRET_KEY="$(cat /var/lib/elabftw/.railway/secret-key)"
exec /init'`
- **Volume:** `/var/lib/elabftw`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/elabftw-lab-notebook)
