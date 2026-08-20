# Deploy Cal.com — Self-Hosted Scheduling & Calendly Alternative on Railway

Self-host Cal.com — booking pages & calendar sync, no per-seat fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-scheduling)

## About

Cal.com is the leading open-source scheduling platform — a self-hosted alternative to Calendly for letting people book meetings on your calendar without the back-and-forth. Create event types, share a booking link, sync with Google and Outlook, run team round-robin scheduling, and collect payments — unlimited event types, no per-seat fees. This template deploys Cal.com with PostgreSQL and the encryption keys and app URL configured correctly — so your scheduling server is live, with the setup traps that corrupt calendar connections already avoided.

---

Cal.com is powerful, and two secrets plus the app URL are the difference between a smooth setup and a corrupted one — this template handles all three.

**`CALENDSO_ENCRYPTION_KEY` must never change after first run — this is critical.** This key encrypts your users' stored calendar credentials (Google and Microsoft OAuth tokens). If it changes after the first start, every connected calendar's credentials become permanently unreadable, and all users must reconnect their calendars. This template generates it once and keeps it stable — but back it up externally, because it can never be rotated without breaking every integration.

**`NEXTAUTH_SECRET` secures sessions.** A separate 32-byte secret signs sessions and must also stay stable, or active logins are invalidated. This template generates it; keep it constant across redeploys.

**`NEXT_PUBLIC_WEBAPP_URL` must be your final HTTPS domain.** Cal.com bakes its public URL into booking pages and confirmation emails, so it must be your Railway (or custom) HTTPS domain. If it's wrong, booking links and email links point at localhost or the wrong host and don't work. This template sets it to your Railway domain, and Railway's automatic HTTPS means secure links work immediately.

**PostgreSQL holds everything — back it up.** Bookings, event types, availability, users, and the encrypted calendar credentials all live in PostgreSQL — the single source of truth. Database migrations run automatically on startup when the schema changes, so upgrades apply cleanly; check the logs confirm migrations completed after an update.

**Configure SMTP for confirmations and reminders.** Scheduling depends on email: booking confirmations, reminders, and cancellations all send over SMTP. Set the `EMAIL_*` variables with your provider so invitees receive their booking emails — without it, bookings work but no one gets notified. On first visit, Cal.com redirects to `/auth/setup` to create your admin account (`NEXT_PUBLIC_LICENSE_CONSENT=agree` is set for the community edition).

Typical cost: **~$5–15/month** on Railway for Cal.com and PostgreSQL — a small instance runs comfortably, with more RAM for high booking volume. Cal.com's community edition is AGPL-3.0 and free, versus Calendly's per-user pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| calcom | `calcom/cal.com:v6.2.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | calcom | 3000 | The port the Cal.com container listens on. Set to 3000. |
| `DATABASE_URL` | calcom | - | PostgreSQL connection string for the application. Auto-set from the Postgres service. |
| `NEXTAUTH_URL` | calcom | - | Auth callback URL. Auto-set to your Railway domain. |
| `NEXTAUTH_SECRET` | calcom | (secret) | Secret key for NextAuth authentication. Auto-generated. |
| `DATABASE_DIRECT_URL` | calcom | - | PostgreSQL connection string for Prisma migrations. Auto-set from the Postgres service |
| `NEXT_PUBLIC_WEBAPP_URL` | calcom | - | Public URL of your Cal.com instance. Auto-set to your Railway domain. |
| `CALENDSO_ENCRYPTION_KEY` | calcom | - | Auto-generated encryption key for Cal.com data protection. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/calcom-scheduling)
