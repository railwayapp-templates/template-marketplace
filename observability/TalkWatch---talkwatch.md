# Deploy TalkWatch on Railway

Dashboard and alerts for UniFi Talk: missed calls, voicemail, call-backs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/talkwatch)

## About

TalkWatch is a dashboard and alert router for UniFi Talk phone systems. It copies call history, voicemail and recordings off the console, works out which calls were missed or hung up in the menu, keeps a list of who is waiting to be called back, and alerts by ntfy, email, Telegram or webhook.

The template deploys TalkWatch's published image with a PostgreSQL database and a volume for recordings, already wired together, and generates the first admin's password. Fill in the site's name, region and time zone, deploy, and sign in with the password Railway shows in TalkWatch's variables. A Railway service runs in Railway's cloud, not on the site's network, so TalkWatch reaches the UniFi console through a private VPN it runs itself: the site gateway's own WireGuard VPN, or Tailscale. Both are set up on TalkWatch's Console page after deploying. The full guide is at https://thecodesaiyan.github.io/talkwatch/railway/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TalkWatch | `ghcr.io/thecodesaiyan/talkwatch:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `Site__Name` | TalkWatch | - | Your site's name, shown across TalkWatch, e.g. Acme Ltd. |
| `Site__Region` | TalkWatch | - | Two-letter country code for numbers written nationally, e.g. GB or US. |
| `Site__TimeZone` | TalkWatch | - | Your time zone, for the dashboard and alert times, e.g. Europe/London or America/New_York. |
| `Site__PublicUrl` | TalkWatch | - | TalkWatch's own address, for links in alerts and reports. Set from Railway's public domain. |
| `Database__Password` | TalkWatch | (secret) | The database password, from the Postgres service. Leave as it is. |
| `DataProtection__Key` | TalkWatch | - | The key that encrypts saved passwords and tokens, generated for you. Keep it: changing or losing it means retyping them. |
| `Bootstrap__AdminPassword` | TalkWatch | (secret) | The first admin's password, generated for you. Find it here after deploying, sign in, then change it. |
| `Bootstrap__AdminUsername` | TalkWatch | (secret) | The first admin's username, for signing in the first time. |
| `ConnectionStrings__TalkWatch` | TalkWatch | - | Where TalkWatch's database is, from the Postgres service. Leave as it is. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/audio`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/talkwatch)
