# Deploy Modbot on Railway

The open moderation & analytics engine for VRChat & Discord.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/modbot)

## About

Modbot is self-hosted moderation for VRChat groups. It keeps ban case files and a
searchable audit log, watches live instances as they fill, syncs bans and roles with
Discord, and feeds a companion app that puts your group's roster and moderation
actions in front of you without leaving VRChat.

Modbot runs as one container plus one PostgreSQL database. The image carries the API,
the web app, the Discord bot and the sync scheduler together, so there is nothing else
to wire up. `DATABASE_URL` is the only variable you must set; almost everything else is
configured in the web app and stored in the database. Point the health check at
`/health/ready`, generate a public domain, and opening it lands you in a setup wizard
that connects your VRChat account and group. Keep the service at one replica: Modbot
holds a single VRChat session and paces its own requests against one rate limit, so a
second copy would double them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Seq | `datalust/seq:latest` | Web service |
| modbot-database | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Modbot | `ghcr.io/modbot/modbot:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Seq | 8080 | Port that Seq listens on for web UI. |
| `ACCEPT_EULA` | Seq | Y | Accept the Seq EULA to use Seq. |
| `SEQ_API_LISTENURIS` | Seq | - | Listening URLs that Seq uses to accept incoming logs. |
| `SEQ_API_CANONICALURI` | Seq | - | Public URL that Seq serves on. |
| `SEQ_API_INGESTIONPORTS` | Seq | 5341 | Log ingestion ports that Seq uses. |
| `SEQ_FIRSTRUN_ADMINPASSWORD` | Seq | (secret) | The admin user's password for logging in and accessing Seq. |
| `SEQ_FIRSTRUN_ADMINUSERNAME` | Seq | (secret) | Username of the admin account for Seq |
| `POSTGRES_DB` | modbot-database | railway | Default database created when image is started. |
| `DATABASE_URL` | modbot-database | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | modbot-database | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | modbot-database | (secret) | Password to connect to DB |
| `PORT` | Modbot | 8080 | Port Modbot listens on. |
| `BUCKET` | Modbot | - | S3 Bucket Modbot sends files to for storage. |
| `REGION` | Modbot | - | S3 Bucket Region Modbot sends files to for storage. |
| `SEQ_URL` | Modbot | - | Seq URL used for storing rich structured logs. |
| `ENDPOINT` | Modbot | - | S3 Bucket Endpoint Modbot sends files to for storage. |
| `DATABASE_URL` | Modbot | - | PostgreSQL Database URL Modbot connects to and stores data at. |
| `ACCESS_KEY_ID` | Modbot | - | S3 Bucket Access Key ID Modbot sends files to for storage. |
| `CONSOLE_LOG_MODE` | Modbot | railway_json | Logging mode for compatibility with Railway-like hosting providers. |
| `CONSOLE_LOG_LEVEL` | Modbot | Information | Default console log level used by the app. |
| `SECRET_ACCESS_KEY` | Modbot | (secret) | S3 Bucket Secret Access Key Modbot sends files to for storage. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/modbot)
