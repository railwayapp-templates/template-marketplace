# Deploy Cal.com — Open Source Calendly Alternative on Railway

Self-hosted scheduling with Postgres — no per-seat booking fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-scheduling-postgres)

## About

Cal.com is the leading open-source scheduling platform — a self-hosted alternative to Calendly and Acuity. Share a booking link, let people pick a slot, and sync it to Google, Outlook, or CalDAV automatically. Unlimited event types, unlimited bookings, no per-seat fees, and your customers' calendar data stays on infrastructure you own. This template deploys Cal.com with a managed PostgreSQL database, pre-wired and persistent.

---

Cal.com is a Next.js application, and that creates one specific pitfall on any container platform that catches most self-hosters: **`NEXT_PUBLIC_WEBAPP_URL` is compiled into the app at build time**, not read at runtime. Any variable prefixed `NEXT_PUBLIC_` is baked into the client bundle when the image is built, so setting it afterward as an environment variable does nothing — booking links, OAuth redirect URIs, and confirmation-email links all point at `localhost` and break. This template supplies that URL at build time so your links resolve to your real domain from the first boot.

Two secrets must be generated once and then never changed:

- **`NEXTAUTH_SECRET`** signs user sessions — `openssl rand -base64 32`
- **`CALENDSO_ENCRYPTION_KEY`** encrypts every stored calendar credential (Google and Microsoft OAuth tokens). It is **24 bytes**, not 32 — `openssl rand -base64 24`. Change it and every connected calendar is permanently corrupted and must be reconnected by hand.

Cal.com also needs `DATABASE_DIRECT_URL` alongside `DATABASE_URL`; Prisma uses the direct connection to run migrations. Both are wired to the Railway Postgres service here.

The database is not just app data — it holds OAuth tokens granting read/write access to your users' real calendars. Treat it as sensitive and back it up regularly.

Typical cost: **~$5–15/month** on Railway for a small instance with Postgres. Cal.com's own cloud starts at $12/user/month for team features, so self-hosting removes per-seat billing entirely.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cal.com | `calcom/cal.com:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Cal.com | 3000 | - |
| `NODE_ENV` | Cal.com | production | - |
| `POSTGRES_USER` | Cal.com | (secret) | - |
| `NEXTAUTH_SECRET` | Cal.com | (secret) | - |
| `POSTGRES_PASSWORD` | Cal.com | (secret) | - |
| `MAX_OLD_SPACE_SIZE` | Cal.com | 4096 | - |
| `ORGANIZATIONS_ENABLED` | Cal.com | true | - |
| `CALCOM_TELEMETRY_DISABLED` | Cal.com | 1 | - |
| `NEXT_PUBLIC_LICENSE_CONSENT` | Cal.com | agree | - |
| `NEXT_PUBLIC_SINGLE_ORG_SLUG` | Cal.com | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/calcom-scheduling-postgres)
