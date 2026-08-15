# Deploy Mattermost on Railway

Slack Alternative. Chat, channels, threads, file sharing, search & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost-team-chat)

## About

Mattermost is an open source messaging platform for teams that need conversations to stay on infrastructure they control — channels, threaded replies, file sharing, full-text search and plugins, across web, desktop and mobile. Engineering, defence, healthcare and public-sector teams use it for a Slack-style workspace without handing message history to a SaaS vendor.

Deploy Mattermost on Railway with the database and file storage already wired up. The template runs the official `mattermost/mattermost-team-edition` image alongside managed PostgreSQL and a Railway object storage bucket. PostgreSQL holds messages, users **and** the server configuration itself; the bucket holds uploads, thumbnails, avatars and plugin bundles. Nothing durable touches local disk, so you self-host Mattermost with no volume to size or maintain, and redeploys keep every message, setting and file. Source: [github.com/mattermost/mattermost](https://github.com/mattermost/mattermost).

![Mattermost Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786740267/03559ebe-7856-4c9d-a316-5c21a76ff109.png)

Mattermost is a single Go binary serving the web client, REST API and WebSockets from one port, backed by PostgreSQL. Self-host it when message history is regulated data, when you must run inside a private network, or when per-seat pricing stops adding up.

- Public, private and direct-message channels with threaded replies
- Markdown, code blocks, emoji and reactions
- File attachments with inline image previews, and full-text message and file search
- Plugin ecosystem with prepackaged GitHub, GitLab, Jira, Zoom and Playbooks integrations
- Incoming and outgoing webhooks, slash commands and a documented REST API
- Web, desktop and iOS/Android clients against the same server

Only the Mattermost service has a public domain. PostgreSQL sits on Railway's private network and holds application data plus the configuration Mattermost would otherwise keep in `config.json`. The bucket takes every upload, and Mattermost proxies downloads through its own API, so files stay behind your login.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mattermost | `mattermost/mattermost-team-edition:11.9` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Mattermost | UTC | Container timezone |
| `PORT` | Mattermost | 8065 | HTTP port for health checks |
| `MM_CONFIG` | Mattermost | - | Stores server config in Postgres |
| `MM_SQLSETTINGS_DATASOURCE` | Mattermost | - | Application database connection |
| `MM_SQLSETTINGS_DRIVERNAME` | Mattermost | postgres | Database driver name |
| `MM_FILESETTINGS_DRIVERNAME` | Mattermost | amazons3 | Use object storage for files |
| `MM_SERVICESETTINGS_SITEURL` | Mattermost | - | Public-facing site URL |
| `MM_FILESETTINGS_AMAZONS3SSL` | Mattermost | true | Use HTTPS to reach storage |
| `MM_FILESETTINGS_AMAZONS3BUCKET` | Mattermost | - | Bucket name for uploads |
| `MM_FILESETTINGS_AMAZONS3REGION` | Mattermost | - | Bucket region |
| `MM_FILESETTINGS_AMAZONS3ENDPOINT` | Mattermost | t3.storageapi.dev | Storage host, no URL scheme |
| `MM_SERVICESETTINGS_LISTENADDRESS` | Mattermost | :8065 | Server listen address |
| `MM_FILESETTINGS_AMAZONS3ACCESSKEYID` | Mattermost | - | Bucket access key id |
| `MM_FILESETTINGS_AMAZONS3SECRETACCESSKEY` | Mattermost | (secret) | Bucket secret access key |
| `MM_SERVICESETTINGS_TRUSTEDPROXYIPHEADER` | Mattermost | X-Forwarded-For X-Real-IP | Read real client IP headers |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/api/v4/system/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mattermost-team-chat)
