# Deploy strapi-source-20260617 on Railway

Strapi v5 CMS with private Postgres and persistent uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-source-20260617)

## About

Strapi is an open-source headless CMS for building content APIs and admin workflows. This Railway template deploys a Strapi v5 project backed by a private Postgres database, generated production secrets, and persistent local uploads.

Published marketplace code: `strapi-source-20260617`

Published template ID: `72befc61-0842-4ab3-9500-8bfa151cc545`

Strapi does not publish official Docker images, so this template uses the official Strapi project generator inside a Node.js runtime and persists the generated Strapi app on a Railway volume. The first boot creates a Strapi v5 app configured for Postgres; later restarts reuse the persisted app and database.

The Strapi service is public on port `1337`. Postgres is private inside the Railway project network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| strapi | `node:22-slim` | Web service |
| postgres | `postgres:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | strapi | (secret) |
| `API_TOKEN_SALT` | strapi | (secret) |
| `ADMIN_JWT_SECRET` | strapi | (secret) |
| `DATABASE_PASSWORD` | strapi | (secret) |
| `DATABASE_USERNAME` | strapi | (secret) |
| `TRANSFER_TOKEN_SALT` | strapi | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -lc 'set -e
export HOME=/tmp
if [ ! -f /srv/app/package.json ]; then
  apt-get update
  apt-get install -y git python3 make g++ ca-certificates
  rm -rf /var/lib/apt/lists/*
  npm config set fetch-retry-maxtimeout 600000 -g
  npx --yes create-strapi-app@latest /srv/app --no-run --install --use-npm --skip-cloud --no-git-init --non-interactive --dbclient postgres --dbhost "$DATABASE_HOST" --dbport "$DATABASE_PORT" --dbname "$DATABASE_NAME" --dbusername "$DATABASE_USERNAME" --dbpassword "$DATABASE_PASSWORD" --dbssl false
fi
cd /srv/app
npm config set fetch-retry-maxtimeout 600000 -g
npm install
npm run build
exec npm run start'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/app`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/strapi-source-20260617)
