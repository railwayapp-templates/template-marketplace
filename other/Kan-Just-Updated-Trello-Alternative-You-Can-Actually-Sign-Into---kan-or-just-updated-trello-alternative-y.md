# Deploy Kan | (Just Updated) Trello Alternative You Can Actually Sign Into on Railway

Open-source Trello alternative. Email sign-in works, no OAuth app needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kan-or-just-updated-trello-alternative-y)

## About

Kan is an open-source Trello alternative: boards, lists, cards, labels, members,
comments, checklists, activity history, public board sharing and Trello import.
This template deploys it as **two services** — the Kan app and a Postgres
database — and asks you for **nothing**.

Kan ships upstream as two containers: the Next.js web app, and a separate
run-once `kan-migrate` container that applies the drizzle schema. Railway starts
every service in a project at the same time, so a template that models the
migration as its own service starts the web app against an empty database and
leaves a job container sitting in the project afterwards with nothing to do.

This template runs the migration inside the app container's entrypoint, before
the server accepts a request, so the ordering is real rather than a race. The
app image is a thin wrapper over the official `ghcr.io/kanbn/kan` release,
**pinned by digest**, so redeploying six months from now gets the same build you
tested — not whatever `latest` moved to.

Kan also needs to know its own public origin: unset, Better Auth signs cookies
for `localhost`, sign-in bounces and workspace invite links point somewhere that
does not exist. Railway only knows the domain at run time, so the entrypoint
derives `NEXT_PUBLIC_BASE_URL`, `BETTER_AUTH_URL` and
`BETTER_AUTH_TRUSTED_ORIGINS` from `RAILWAY_PUBLIC_DOMAIN` on every boot. A
custom domain works the same way — set `NEXT_PUBLIC_BASE_URL` yourself and the
entrypoint leaves it alone.

Two failure modes are turned into refusals rather than silent damage. With no
`POSTGRES_URL`, Kan falls back to an in-container PGLite file and every board
disappears on the next redeploy; with no `BETTER_AUTH_SECRET`, sessions are
forgeable. The entrypoint exits with a named error on either instead of booting
into them. The template wires both, and generates the auth secret per deploy —
it is not a constant shared by everyone who clicked deploy.

Postgres carries a volume at `/var/lib/postgresql`, so your boards survive
redeploys. Kan is a normal Next.js server and fits comfortably inside Railway's
1 GB Trial per-service memory cap.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kan | `ghcr.io/bon5co/kan-railway:0.6.0` | Web service |
| postgres | `postgres:17.6-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BETTER_AUTH_SECRET` | kan | (secret) |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | kan | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kan-or-just-updated-trello-alternative-y)
