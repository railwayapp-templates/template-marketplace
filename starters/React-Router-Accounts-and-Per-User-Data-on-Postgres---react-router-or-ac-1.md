# Deploy React Router | Accounts and Per-User Data on Postgres on Railway

React Router 8, Prisma 7. Accounts and per-user data, ready to use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/react-router-or-ac-1)

## About

Accounts, sessions and per-user data on Postgres, built on React Router 8, React 19 and Prisma 7.

Sign up, log in, write notes, delete them. Your notes, not anyone else's. Nothing to wire together after deploying.

The Remix Indie Stack template builds from a repository last touched in **April 2022**, and its `package.json` says `"remix": "*"` and `"@remix-run/react": "*"`, with React 17 and Prisma 3.

`"*"` is not a version. It resolves to whatever npm publishes today, against application code written for Remix 1.x. The install and the code cannot agree, and **no deployment of it succeeds**: that template reports 0% health.

Remix has since merged into React Router, now at 8. This template is the same idea rebuilt on it: the thing the Indie Stack was actually for, a working account system with per-user data, on versions that exist.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [ak40u/react-router-stack-railway-starter](https://github.com/ak40u/react-router-stack-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 8080 |
| `SESSION_SECRET` | app | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/react-router-or-ac-1)
