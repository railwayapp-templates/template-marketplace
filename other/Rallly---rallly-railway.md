# Deploy Rallly on Railway

Doodle alternative. Open-source group scheduling and meeting polls

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rallly-railway)

## About

Rallly is an open-source group scheduling tool that ends the "when works for everyone?" email thread. An organiser proposes several dates and times, shares one link, and participants mark each slot Yes, If need be, or No — no signup needed. The grid shows the winning slot at a glance, and finalising the poll emails everyone a calendar invite. Teams and clubs use it as a self-hosted Doodle alternative because participant names, emails and availability never leave infrastructure they control.

Deploy Rallly on Railway and the upstream production stack arrives wired together: the `lukevella/rallly` web service on port 3000, managed PostgreSQL holding every poll, vote and login session, an object storage bucket for avatars and branding images, and a Mailpit service receiving Rallly's mail over the private network. That last one is not decoration — Rallly has no password at signup, you sign in with a six-digit code sent to your inbox, so an instance without working SMTP is one nobody can log into. Self-host Rallly here and mail works on first boot, with a clean path to a real provider.

![Rallly Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786897571/5aa5ca26-bef0-4a27-b5ee-30dab3ac87e5.png)

Scheduling tools see sensitive metadata: who is meeting whom, how often, about what. Hosting Rallly yourself keeps all of it in your own database, which is why organisations under GDPR or client-confidentiality obligations move off hosted poll services.

Key features:

- Date and time polls with per-slot Yes / If need be / No voting
- Guest participation with no account required, via one share link
- Automatic time zone conversion so participants see local times
- Poll finalisation that emails everyone an ICS calendar invite
- Comments, notification muting and live updates as votes arrive
- Email code sign-in, optional OIDC SSO, admin control panel

The architecture is deliberately small: one Next.js web process, no worker tier, and all state including auth sessions in PostgreSQL — so containers redeploy without logging anyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rallly | `lukevella/rallly:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | rallly | UTC | Container time zone |
| `PORT` | rallly | 3000 | HTTP listening port |
| `S3_REGION` | rallly | - | Bucket region |
| `SMTP_HOST` | rallly | - | Private mail service hostname |
| `SMTP_PORT` | rallly | 1025 | Mailpit SMTP listener port |
| `S3_ENDPOINT` | rallly | - | Bucket API endpoint |
| `SMTP_SECURE` | rallly | false | Plain SMTP on the private network |
| `DATABASE_URL` | rallly | - | Postgres connection string |
| `NODE_OPTIONS` | rallly | --max-old-space-size=4096 | Node heap ceiling |
| `NOREPLY_EMAIL` | rallly | noreply@example.com | Transactional email sender |
| `SUPPORT_EMAIL` | rallly | support@example.com | Contact address shown to users |
| `ALLOWED_EMAILS` | rallly | *@example.com | Allowlist for registration and sign-in |
| `S3_BUCKET_NAME` | rallly | - | Avatar and branding bucket |
| `SECRET_PASSWORD` | rallly | (secret) | Session encryption key, 32+ chars |
| `S3_ACCESS_KEY_ID` | rallly | - | Bucket access key |
| `INITIAL_ADMIN_EMAIL` | rallly | admin@example.com | Address allowed to claim admin |
| `NEXT_PUBLIC_BASE_URL` | rallly | - | Public instance URL |
| `REGISTRATION_ENABLED` | rallly | false | Hides the signup UI only |
| `S3_SECRET_ACCESS_KEY` | rallly | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | mailpit | 8025 | Inbox UI port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox UI |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | UI bind address |
| `MP_SMTP_MAX_SIZE` | mailpit | 26214400 | Maximum message size in bytes |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP bind address |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipients allowed per message |
| `MP_DISABLE_VERSION_CHECK` | mailpit | true | Skip outbound update checks |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rallly-railway)
