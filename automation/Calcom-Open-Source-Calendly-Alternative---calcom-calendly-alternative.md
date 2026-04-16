# Deploy Cal.com | Open Source Calendly Alternative on Railway

Self Host Cal.com. Scheduling, calendar sync, payments, 100+ integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-calendly-alternative)

## About

Cal.com is the open-source scheduling infrastructure platform built as a Calendly alternative, giving you full control over your data, branding, and deployment. With 41,000+ GitHub stars and an AGPLv3 license, it's the most popular self-hosted scheduling solution available. Deploy Cal.com on Railway to run your own booking platform with calendar sync, video conferencing, payment processing, and 100+ integrations out of the box.

Self-host Cal.com on Railway using this template, which pre-configures the Cal.com Next.js application (`calcom/cal.com:latest`) alongside a managed PostgreSQL database for persistent storage. Railway handles networking, SSL, and domain provisioning automatically.

![Cal.com Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776267915/calcom_railway_arch_jimkjw.png)

Cal.com (formerly Calendso) solves the problem of vendor lock-in and limited customization in scheduling tools. Unlike Calendly or Acuity, self-hosting Cal.com means your booking data stays on your infrastructure.

- White-label scheduling with custom branding, colors, and domain
- Prevents double-booking with real-time calendar sync (Google, Outlook, Zoho)
- Built-in video conferencing via Cal Video (Daily.co powered)
- Stripe payment processing for paid appointments
- Round-robin and collective scheduling for teams
- Multi-language support (65+ languages)
- API-driven architecture for embedding and automation
- 100+ app integrations (HubSpot, Zoom, Zapier, n8n, and more)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Cal.com | `calcom/cal.com:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Cal.com | 3000 | HTTP server listening port |
| `NODE_ENV` | Cal.com | production | Node environment mode production |
| `POSTGRES_DB` | Cal.com | - | Postgres database name reference |
| `DATABASE_URL` | Cal.com | - | Primary Postgres connection string |
| `NEXTAUTH_URL` | Cal.com | - | NextAuth base URL |
| `DATABASE_HOST` | Cal.com | - | Postgres host and port |
| `POSTGRES_USER` | Cal.com | (secret) | Postgres username reference |
| `NEXTAUTH_SECRET` | Cal.com | (secret) | NextAuth authentication secret key |
| `POSTGRES_PASSWORD` | Cal.com | (secret) | Postgres password reference |
| `MAX_OLD_SPACE_SIZE` | Cal.com | 4096 | Node memory allocation limit MB |
| `DATABASE_DIRECT_URL` | Cal.com | - | Direct Postgres connection string |
| `ORGANIZATIONS_ENABLED` | Cal.com | true | Enable multi organization support |
| `NEXT_PUBLIC_WEBAPP_URL` | Cal.com | - | Public web app URL |
| `CALENDSO_ENCRYPTION_KEY` | Cal.com | - | Encryption key for sensitive data |
| `CALCOM_TELEMETRY_DISABLED` | Cal.com | 1 | Disable telemetry data collection |
| `NEXT_PUBLIC_LICENSE_CONSENT` | Cal.com | agree | License terms consent flag |
| `NEXT_PUBLIC_SINGLE_ORG_SLUG` | Cal.com | false | Disable single organization mode |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/calcom-calendly-alternative)
