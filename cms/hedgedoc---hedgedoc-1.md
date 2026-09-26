# Deploy hedgedoc on Railway

HedgeDoc 1.12: real-time collaborative Markdown notes, with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hedgedoc-1)

## About

HedgeDoc is a collaborative Markdown editor that runs in the browser. Several people can edit the same note at once and see changes live, with a side-by-side preview that supports diagrams, math, code highlighting and slide mode. Notes can be shared by link, published read-only or kept private.

This template runs the official `quay.io/hedgedoc/hedgedoc:1.12.0` image with a Railway PostgreSQL database. On first boot a seed step creates your account from the variables once the database is ready. Email sign-up and anonymous notes are turned off, so only accounts you create can write notes. Notes live in Postgres and uploaded images on a Railway volume, so both survive redeploys. The session secret is generated and stable, which keeps people signed in across restarts. HedgeDoc is light on resources and fits the Hobby plan. Add teammates with `bin/manage_users` from a Railway shell.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hedgedoc | `quay.io/hedgedoc/hedgedoc:1.12.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | hedgedoc | 3000 |
| `CMD_PORT` | hedgedoc | 3000 |
| `CMD_EMAIL` | hedgedoc | true |
| `HEDGEDOC_SEED` | hedgedoc | # First boot: create the first account from env vars once HedgeDoc has migrated its database.
i=0
until node healthcheck.mjs >/dev/null 2>&1 || [ $i -ge 90 ]; do i=$((i+1)); sleep 2; done
node bin/manage_users --add $HEDGEDOC_ADMIN_EMAIL --pass $HEDGEDOC_ADMIN_PASSWORD 2>&1 | grep -i -E 'created|exists|error' | sed 's/^/[seed] /' |
| `CMD_URL_ADDPORT` | hedgedoc | false |
| `CMD_SESSION_SECRET` | hedgedoc | (secret) |
| `CMD_ALLOW_ANONYMOUS` | hedgedoc | false |
| `CMD_PROTOCOL_USESSL` | hedgedoc | true |
| `HEDGEDOC_ADMIN_EMAIL` | hedgedoc | admin@example.com |
| `CMD_IMAGE_UPLOAD_TYPE` | hedgedoc | filesystem |
| `HEDGEDOC_ADMIN_PASSWORD` | hedgedoc | (secret) |
| `CMD_ALLOW_EMAIL_REGISTER` | hedgedoc | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$HEDGEDOC_SEED" > /tmp/seed.sh; /usr/local/bin/docker-entrypoint.sh node app.js & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; sh /tmp/seed.sh & wait $pid'`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hedgedoc/public/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/hedgedoc-1)
