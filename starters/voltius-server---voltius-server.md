# Deploy voltius-server on Railway

Axum/Rust API server for Voltius.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/voltius-server)

## About

Voltius Server is the self-hosted sync backend for [Voltius](https://voltius.app) — a Rust/Axum API with Postgres behind it, handling account sync, teams, team vaults, and
  terminal sharing. Deploy it on Railway to run your own instance instead of using the hosted service.

  ## About Hosting Voltius Server
  
  Voltius Server is a small Rust/Axum API service backed by Postgres. It exposes the sync endpoints the Voltius desktop client talks to: account auth (JWT), encrypted vault sync,
  team management, and terminal-session sharing. Database migrations run automatically on every boot, so there's no manual setup step after the first deploy. Self-hosting unlocks
  every paid feature automatically — teams, team vaults, terminal sharing, audit logs — with no tier enforcement, no trial countdown, and no billing configuration to do. The
  server is AGPLv3-licensed.

  ## Why Deploy Voltius Server on Railway?
  
  Railway provisions the Postgres database alongside the server and wires `DATABASE_URL` between them automatically, so there's no separate database host to set up or connection
  string to hand-copy. `JWT_SECRET` is generated for you at deploy time. Railway builds straight from the repo's `Dockerfile`, so updates are a redeploy, not a manual
  rebuild-and-push. This gets you a private, fully-featured Voltius instance running in a couple of minutes, without managing a VM or writing your own compose file.

  ## Common Use Cases
  
  - Running a private Voltius instance for yourself or a small team, with team vaults and terminal sharing enabled by default
  - Self-hosting for data residency or compliance reasons instead of using the hosted voltius.app service
  - A throwaway/staging instance to test a Voltius client build against a real server before pointing it at production
  
  ## Dependencies for Voltius Server Hosting
  
  - **PostgreSQL** — provisioned automatically by this template; stores accounts, vaults, and sync state
  - **JWT_SECRET** — generated automatically on deploy; signs session tokens
  - Nothing else is required to start. Optional integrations (email via Resend, custom CORS origins, admin dashboard) can be added later — see the [environment variable 
  reference](https://voltius.app/docs/self-hosting/environment/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| server | [VoltiusApp/server](https://github.com/VoltiusApp/server) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | server | 8080 | Port the server listens on inside the container. Leave as 8080; Railway maps external traffic to it automatically. |
| `JWT_SECRET` | server | (secret) | Signs session tokens. Auto-generated on deploy (${{secret(64, "0123456789abcdef")}}) — you don't need to enter anything. |
| `ADMIN_SECRET` | server | (secret) | only if they also deploy admin-dashboard separately. |
| `CORS_ORIGINS` | server | - | comma-separated allow-list for public deployments. Default allows all. |
| `DATABASE_URL` | server | - | Postgres connection string. Auto-wired via reference to this template's Postgres service — no manual entry needed. |
| `RESEND_API_KEY` | server | (secret) | enables email verification + team invites. "Without it, accounts still work, mail just silently no-ops." |
| `SYNC_RATE_LIMIT` | server | - | rate-limit tuning, defaults fine for most. |
| `INVITE_RATE_LIMIT` | server | - | rate-limit tuning, defaults fine for most. |
| `REGISTER_RATE_LIMIT` | server | - | rate-limit tuning, defaults fine for most. |
| `WAITLIST_RATE_LIMIT` | server | - | rate-limit tuning, defaults fine for most. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Rust, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/voltius-server)
