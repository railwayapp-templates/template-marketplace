# Deploy Memos on Railway

Google Keep alternative. Quick-capture Markdown notes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-notes)

## About

Memos is an open-source, self-hosted note-taking app built for quick capture: a single Go binary with a timeline-first web UI. Open it, type a Markdown note, move on. Notes carry `#tags`, task lists, code blocks and attachments, and each is private, protected or public, so one instance holds both your scratchpad and the few notes you want to share. Developers and small teams self-host Memos as a Google Keep alternative that keeps every note in a database they control, with REST and gRPC APIs and an MCP endpoint on top.

Deploy Memos on Railway and you get the production shape rather than the laptop one. This template runs the official `neosmemo/memos` image with three things wired already: managed PostgreSQL for notes, users and settings; a Railway object storage bucket for uploads; and a small volume for cached thumbnails. Nothing that matters lives in the container, so redeploys are uneventful. Public sign-up is closed from the first boot, while the first person to open the URL still gets a one-time screen to create the owner account — no default password ships, and nothing needs configuring.

![Memos Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787075416/6cbd95ce-fc1a-4712-9029-90fad06cf12c.png)

Memos is for the notes that never justify a document: a link worth keeping, a command you will need again, a thought before it evaporates. One text box, one timeline, Markdown, tags instead of folders. Self-hosting suits anyone who wants that habit without handing half-formed thinking to a hosted service, and teams who want a shared, searchable log they own.

What it gives you:

- Markdown editing with tags, task lists, code blocks and linked notes
- Three visibility levels per note: private, protected (signed-in), public
- Attachments in object storage, streamed through the app, not a public bucket
- REST and gRPC APIs, access tokens, webhooks and an MCP endpoint at `/mcp`
- RSS feeds per user and for the public Explore timeline
- OAuth2 single sign-on, optional AI transcription, Web Clipper extensions

The Memos service is the whole application — web UI, API and background jobs in one Go process on port 5230. PostgreSQL replaces the default SQLite file, so the database is backed up, resizable and independent of the container. The bucket holds uploads, keeping the database small and letting attachments grow without a disk quota, and the volume carries only regenerable thumbnail caches.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| memos | [gridalpha/memos-railway](https://github.com/gridalpha/memos-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | memos | 5230 | Port probed by the health check |
| `MEMOS_DSN` | memos | - | PostgreSQL connection string |
| `MEMOS_DATA` | memos | /var/opt/memos | Data directory on the volume |
| `MEMOS_PORT` | memos | 5230 | Application listen port |
| `MEMOS_DRIVER` | memos | postgres | Database backend selector |
| `MEMOS_S3_BUCKET` | memos | - | Attachment bucket name |
| `MEMOS_S3_REGION` | memos | - | Bucket region |
| `MEMOS_S3_ENDPOINT` | memos | - | Object storage endpoint |
| `MEMOS_INSTANCE_URL` | memos | - | Canonical public URL |
| `MEMOS_S3_ACCESS_KEY_ID` | memos | - | Bucket access key |
| `MEMOS_S3_SECRET_ACCESS_KEY` | memos | (secret) | Bucket secret key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/memos-notes)
