# Deploy Tryton Business Suite on Railway

Modular business records with PostgreSQL and a private web client.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tryton-business-suite)

## About

Modular business records with PostgreSQL and a private web client.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Modular business records with PostgreSQL and a private web client.

| Service | Role | Persistent path |
| --- | --- | --- |
| `postgres` | Private application or dependency | `/var/lib/postgresql/data` |
| `core` | Private application or dependency | `/var/lib/trytond/db` |
| `tryton` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `tryton/tryton:8.0@sha256:8c5794a3689914ff051862f61992dbb81519b09c9644a022a8e2680bff2f3c91` | Database |
| tryton | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| postgres | `postgres:16@sha256:a3b7f434b2dc57ce85a67e171163eb8ab1a1ebcb39d27484661f26b1dfbe30d6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_NAME` | core | tryton | Db name for core; follows the upstream deployment configuration. |
| `DB_PORT` | core | 5432 | Db port for core; follows the upstream deployment configuration. |
| `DB_USER` | core | (secret) | Db user for core; follows the upstream deployment configuration. |
| `ADMIN_EMAIL` | core | - | Required operator-supplied admin email. |
| `DB_HOSTNAME` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `DB_PASSWORD` | core | (secret) | Resolved from the linked service; preserve this reference for the included topology. |
| `ADMIN_PASSWORD` | core | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | tryton | 8080 | Port for tryton; follows the upstream deployment configuration. |
| `OWNER_AUTH` | tryton | true | Owner auth for tryton; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | tryton | all | Owner scope for tryton; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | tryton | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | tryton | 8000 | Upstream port for tryton; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | tryton | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | tryton | Postgres db for postgres; follows the upstream deployment configuration. |
| `DATABASE_URL` | postgres | - | Resolved from the linked service; preserve this reference for the included topology. |
| `POSTGRES_USER` | postgres | (secret) | Postgres user for postgres; follows the upstream deployment configuration. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Start command:** `/entrypoint.sh bash -ec 'until python3 -c '"'"'import os,psycopg;psycopg.connect(os.environ["TRYTOND_DATABASE_URI"]+"tryton").close()'"'"' 2>/dev/null; do sleep 2; done
if [ ! -e /var/lib/trytond/db/.railway-initialized ]; then
umask 077
printf '"'"'%s\n'"'"' "$ADMIN_PASSWORD" > /tmp/tryton-password
TRYTONPASSFILE=/tmp/tryton-password trytond-admin -d tryton --all --email "$ADMIN_EMAIL"
rm -f /tmp/tryton-password
touch /var/lib/trytond/db/.railway-initialized
fi
exec gunicorn --config=/etc/gunicorn.conf.py'`
- **Volume:** `/var/lib/trytond/db`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/tryton-business-suite)
