# Deploy textlog on Railway

Self-hosted microblog. 280-char notes, hashtags, replies, RSS, SQLite

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/textlog)

## About

textlog is a small social text log. Notes are capped at 280 characters, people follow each other
and follow hashtags, and conversations happen in replies. There is no algorithm, no engagement
score, and nothing pushing you to build an audience. It is one Bun process writing to a SQLite
file, which makes it about as cheap and as simple as a social site gets.

Hosting textlog means running a single container and giving it a disk. Everything lives in one
SQLite file: accounts, notes, follows, hashtags, reports. There is no separate database service,
no cache, no queue, and no object storage, so there is nothing to wire together and nothing to
keep in sync. The container also draws its own link preview images, so the only outside services
it ever talks to are the two optional ones you choose to add.

Sign-in is by emailed link, with no passwords anywhere. That normally means an email provider is
mandatory before the very first account can exist, which is a miserable way to start. This build
prints the sign-in link to the service logs when no provider is configured, so you can create
your own account on a brand new instance, look around, and only add email later when you actually
want other people to join. Only someone who can already read your Railway logs can use that link.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| textlog | `ghcr.io/hmseeb/textlog-railway:v1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | :: | Listen address. Leave as is; Railway reaches containers over IPv6. |
| `PORT` | 3000 | Port the app listens on. |
| `APP_URL` | - | Public address of your instance. Sign-in links are built from it. |
| `NODE_ENV` | production | Run mode. |
| `EMAIL_FROM` | - | Optional, and only works alongside a Resend key. e.g. textlog <hi@you.com> |
| `ADMIN_EMAILS` | - | Email address that gets the moderation queue. Sign in with this one. |
| `DATABASE_PATH` | /data/textlog.sqlite | SQLite file. Lives on the disk so it survives redeploys. |
| `OPENAI_API_KEY` | (secret) | Optional. Only needed when MODERATION_DISABLED is false. |
| `RESEND_API_KEY` | (secret) | Optional. Without it, sign-in links are printed to this service's logs. |
| `DATABASE_BACKUP_DIR` | /data/backups | Daily database backups. Must not be the database file itself. |
| `IP_PSEUDONYM_SECRET` | (secret) | Salt for the daily-rotating visitor pseudonyms used in rate limiting. |
| `MODERATION_DISABLED` | true | Set to false, and add an OpenAI key, to check new notes automatically. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/textlog)
