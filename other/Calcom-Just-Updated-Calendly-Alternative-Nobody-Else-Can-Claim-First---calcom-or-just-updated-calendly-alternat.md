# Deploy Cal.com | (Just Updated) Calendly Alternative Nobody Else Can Claim First on Railway

Admin seeded before first boot, so no stranger can claim your instance.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-or-just-updated-calendly-alternat)

## About

Cal.com is the open-source Calendly alternative: booking pages, availability rules, buffers,
round-robin and collective events, team scheduling, calendar sync (Google, Outlook, CalDAV),
payments, workflows and a full REST API — running on your own domain, with your own database.

This template deploys Cal.com **with the administrator account already created**. On a stock
Cal.com deployment nobody is created at all, and `POST /api/auth/setup` — the route that makes
the first admin — has no authentication of its own; its only gate is `prisma.user.count() !== 0`.
Whoever reaches the public URL first becomes the instance owner, and everyone after them gets
`400 "No setup needed."` forever, with no password reset path that works without SMTP. Here the
admin is seeded from the deploy's own generated secret **before the web server binds a port**, so
the very first request the domain ever serves already meets a claimed instance.

Cal.com is a Next.js application backed by PostgreSQL. It migrates its schema forward on every
boot and seeds its app store, so the first deploy takes several minutes before it answers; after
that it is a single long-lived web service. All state — users, bookings, availability, calendar
credentials, avatars — lives in PostgreSQL, so the app itself needs no volume and the database is
the only thing to back up.

This template runs two services: the Cal.com web app on a pinned upstream release
(`v6.2.0`), and PostgreSQL 17 on a persistent volume. The app image is a thin wrapper that seeds
the administrator, closes public sign-up, re-applies the admin password on every boot, refuses to
start with an empty admin password, and passes the platform's injected `PORT` through to Next.js
(Turborepo 2's strict env mode otherwise drops it and the app binds 3000 regardless).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17-alpine` | Database |
| calcom | `ghcr.io/bon5co/calcom-railway:6.2.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `NEXTAUTH_SECRET` | calcom | (secret) |
| `CALCOM_ADMIN_PASSWORD` | calcom | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/calcom-or-just-updated-calendly-alternat)
