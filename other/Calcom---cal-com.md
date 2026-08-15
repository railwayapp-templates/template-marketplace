# Deploy Cal.com on Railway

Open-source scheduling, Calendly alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cal-com)

## About

Cal.com is open-source scheduling infrastructure — the self-hosted alternative to Calendly and Acuity. It gives every person or team a public booking page, applies real availability rules across working hours, buffers, minimum notice and connected calendars, and turns an accepted slot into a confirmed meeting. Because it runs from one container plus a database, you can self-host Cal.com and keep booking data and calendar credentials on infrastructure you control.

This template runs Cal.com on Railway as three services. The **Cal.com** web service is the whole product — booking pages, organiser dashboard, availability engine and REST API — from the official `calendso/calendso` image on port 3000 behind a managed HTTPS domain. A **Postgres** database holds every user, event type, schedule and booking, and the app migrates it on each boot. A **cron** service calls Cal.com's scheduled-job endpoints every 15 minutes over the private network, delivering reminders, firing webhooks and sending workflow emails. Only the web service is public.

![Cal.com Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786742956/baa47d84-3b02-404d-9453-b7af97777f39.png)

Cal.com turns "when are you free?" into a booked, calendared meeting, reading connected calendars for conflicts and projecting your rules into the visitor's timezone. Teams self-host it when booking data is sensitive, when scheduling must be embedded in their own product, or to avoid per-seat pricing.

Key features:

- Personal and team booking pages with per-event durations, buffers and minimum notice
- Two-way calendar sync with Google Calendar, Outlook/Office 365, CalDAV and Apple
- Round-robin and collective team events for sales rotations and interview panels
- Built-in Cal Video plus Zoom, Google Meet and other conferencing integrations
- Custom booking questions, routing forms, recurring and Stripe-paid bookings
- Reminder workflows, webhooks, a REST API and embeddable widgets

The web service is a Next.js app serving the public booking pages and the dashboard from one process, so there is no separate frontend to keep in sync. Postgres is the only durable store, so no volume is attached.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calcom | `calendso/calendso:latest` | Web service |
| cron | `curlimages/curl:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | calcom | 3000 | HTTP port the app listens on |
| `CRON_API_KEY` | calcom | (secret) | Auth for scheduled job endpoints |
| `DATABASE_URL` | calcom | - | Postgres connection string |
| `NEXTAUTH_URL` | calcom | - | Authentication callback base URL |
| `NODE_OPTIONS` | calcom | --max-old-space-size=4096 | Node heap ceiling for the container |
| `DATABASE_HOST` | calcom | - | Host:port awaited before migrating |
| `NEXTAUTH_SECRET` | calcom | (secret) | Session cookie signing key |
| `DATABASE_DIRECT_URL` | calcom | - | Direct connection for migrations |
| `NEXT_PUBLIC_WEBAPP_URL` | calcom | - | Public base URL of the app |
| `CALENDSO_ENCRYPTION_KEY` | calcom | - | Credential encryption key, 32 chars |
| `NEXT_PUBLIC_WEBSITE_URL` | calcom | - | Base URL used for links |
| `CALCOM_TELEMETRY_DISABLED` | calcom | 1 | Disables anonymous usage telemetry |
| `CAL_APP_URL` | cron | - | Private URL of the app |
| `CRON_API_KEY` | cron | (secret) | Shared key matching the app |
| `CRON_TARGETS` | cron | bookingReminder webhookTriggers workflows/scheduleEmailReminders | Endpoints called each run |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'rc=0; for p in ${CRON_TARGETS:-bookingReminder webhookTriggers workflows/scheduleEmailReminders}; do code=$(curl -sS -o /tmp/o -w "%{http_code}" -m 60 -X POST -H "content-type: application/json" -H "authorization: $CRON_API_KEY" "$CAL_APP_URL/api/cron/$p"); echo "cron $p -> $code $(head -c 200 /tmp/o)"; [ "$code" = "200" ] || rc=1; done; exit $rc'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cal-com)
