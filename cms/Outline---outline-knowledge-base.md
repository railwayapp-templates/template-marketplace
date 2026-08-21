# Deploy Outline on Railway

Collaborative team wiki for documents your whole company reads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-knowledge-base)

## About

Outline is a team knowledge base: a fast, collaborative wiki where engineering, support and operations teams keep the documents everyone else has to read. It gives you nested collections, a block editor with slash commands and Markdown shortcuts, real-time co-editing, comments, search, public share links and an HTTP API. Teams reach for it as a self-hosted Notion or Confluence alternative when documentation is too central — or too sensitive — to keep in someone else's database.

This template lets you self-host Outline on Railway with the production topology already wired together. The web service runs Outline's HTTP, WebSocket and collaboration processes; a separate worker service runs the job queue and scheduled tasks, so exports and email never compete with page loads. Postgres stores documents and revisions, Redis carries the queues, collaboration state and migration lock, and a Railway bucket holds every upload. A bundled Dex identity provider supplies the sign-in Outline does not ship, and Mailpit captures invitations so the app is complete the moment it comes up.

![Diagram of the Outline services and datastores on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787216370/outline-architecture.png)

Outline is a Node.js application backed by Postgres and Redis. Self-hosting makes sense when your documentation holds customer data, incident history or runbooks you would rather keep inside your own infrastructure, or when per-seat pricing stops matching how many people need read access.


Key features:

- Block editor with Markdown shortcuts, slash commands, tables, code blocks and diagrams
- Real-time collaborative editing with comments, mentions and revision history
- Nested collections with per-group and per-user permissions
- Full-text search, public share links and document exports
- Import from Notion, Confluence and Markdown archives
- REST API, webhooks and integrations with Slack, GitHub, Linear and Figma

The template splits Outline the way its own documentation describes. The `outline` service runs `SERVICES=web,websockets,collaboration`, serving the app, the API and editing sessions. The `outline-worker` service runs `SERVICES=worker,cron`, processing the queue that sends email, builds exports and runs scheduled cleanup. Both start from the same image, so they never drift apart, and migrations run at boot behind a Redis lock so the two can start together safely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| dex | [gridalpha/outline-railway](https://github.com/gridalpha/outline-railway) | Web service |
| outline | [gridalpha/outline-railway](https://github.com/gridalpha/outline-railway) | Web service |
| outline-worker | [gridalpha/outline-railway](https://github.com/gridalpha/outline-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mailpit | 8025 | Inbox UI port |
| `MP_UI_AUTH` | mailpit | - | Username and password for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Inbox UI listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | 0.0.0.0:1025 | SMTP listen address |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Accept SMTP auth without TLS |
| `PORT` | dex | 5556 | HTTP port the provider listens on |
| `ADMIN_EMAIL` | dex | admin@example.com | Email of the first Outline account |
| `OUTLINE_URL` | dex | - | Builds the redirect URI |
| `DEX_DATA_DIR` | dex | /var/dex | SQLite directory on the volume |
| `ADMIN_PASSWORD` | dex | (secret) | Password of the first account |
| `ADMIN_USERNAME` | dex | (secret) | Display name of that account |
| `DEX_ISSUER_URL` | dex | - | Issuer URL browsers are sent to |
| `OIDC_CLIENT_ID` | dex | outline | OpenID Connect client id |
| `OIDC_CLIENT_SECRET` | dex | (secret) | Shared with Outline |
| `URL` | outline | - | Public-facing app URL |
| `PORT` | outline | 3000 | HTTP port the web tier listens on |
| `SERVICES` | outline | web,websockets,collaboration | Processes this container runs |
| `REDIS_URL` | outline | - | Queue, cache and collaboration |
| `SMTP_HOST` | outline | - | Mail server hostname |
| `SMTP_PORT` | outline | 1025 | Mail server port |
| `AWS_REGION` | outline | - | Bucket region |
| `AWS_S3_ACL` | outline | private | Attachments served through signed URLs |
| `OIDC_SCOPES` | outline | openid profile email | Scopes requested at sign-in |
| `SMTP_SECURE` | outline | false | Plain SMTP on the private network |
| `DATABASE_URL` | outline | - | Postgres connection string |
| `FILE_STORAGE` | outline | s3 | Store attachments in object storage |
| `NODE_OPTIONS` | outline | --max-old-space-size=1024 | Heap ceiling for the container |
| `UTILS_SECRET` | outline | (secret) | Signs internal utility endpoints |
| `OIDC_AUTH_URI` | outline | - | Authorization endpoint |
| `OIDC_CLIENT_ID` | outline | outline | OpenID Connect client id |
| `OIDC_TOKEN_URI` | outline | (secret) | Token endpoint |
| `SECRET_KEY_SEED` | outline | (secret) | Seeds the at-rest encryption key |
| `SMTP_FROM_EMAIL` | outline | outline@example.com | From address on outgoing mail |
| `WEB_CONCURRENCY` | outline | 2 | Node processes per container |
| `AWS_ACCESS_KEY_ID` | outline | - | Bucket access key |
| `OIDC_DISPLAY_NAME` | outline | Single Sign-On | Label on the sign-in button |
| `OIDC_USERINFO_URI` | outline | - | User info endpoint |
| `OIDC_CLIENT_SECRET` | outline | (secret) | Shared with the identity provider |
| `OIDC_USERNAME_CLAIM` | outline | (secret) | Claim used as the username |
| `RATE_LIMITER_ENABLED` | outline | true | Per-IP request throttling |
| `AWS_SECRET_ACCESS_KEY` | outline | (secret) | Bucket secret key |
| `SMTP_DISABLE_STARTTLS` | outline | true | Mailpit advertises no STARTTLS |
| `AWS_S3_FORCE_PATH_STYLE` | outline | true | Required for browser uploads |
| `REDIS_COLLABORATION_URL` | outline | - | Enables multi-process collaboration |
| `AWS_S3_UPLOAD_BUCKET_URL` | outline | - | Bucket endpoint URL |
| `AWS_S3_UPLOAD_BUCKET_NAME` | outline | - | Bucket name |
| `URL` | outline-worker | - | Public URL used in emails |
| `PORT` | outline-worker | 3000 | Port serving the health endpoint |
| `SERVICES` | outline-worker | worker,cron | Queue and scheduled tasks |
| `REDIS_URL` | outline-worker | - | Queue and cache |
| `SMTP_HOST` | outline-worker | - | Mail server hostname |
| `SMTP_PORT` | outline-worker | 1025 | Mail server port |
| `AWS_REGION` | outline-worker | - | Bucket region |
| `AWS_S3_ACL` | outline-worker | private | Attachments served through signed URLs |
| `SMTP_SECURE` | outline-worker | false | Plain SMTP on the private network |
| `DATABASE_URL` | outline-worker | - | Postgres connection string |
| `FILE_STORAGE` | outline-worker | s3 | Store attachments in object storage |
| `NODE_OPTIONS` | outline-worker | --max-old-space-size=1024 | Heap ceiling for the container |
| `UTILS_SECRET` | outline-worker | (secret) | Must match the web tier |
| `SECRET_KEY_SEED` | outline-worker | (secret) | Must match the web tier |
| `SMTP_FROM_EMAIL` | outline-worker | outline@example.com | From address on outgoing mail |
| `WEB_CONCURRENCY` | outline-worker | 1 | Single process, scheduler is not leader-elected |
| `AWS_ACCESS_KEY_ID` | outline-worker | - | Bucket access key |
| `RATE_LIMITER_ENABLED` | outline-worker | true | Per-IP request throttling |
| `AWS_SECRET_ACCESS_KEY` | outline-worker | (secret) | Bucket secret key |
| `SMTP_DISABLE_STARTTLS` | outline-worker | true | Mailpit advertises no STARTTLS |
| `AWS_S3_FORCE_PATH_STYLE` | outline-worker | true | Path-style addressing |
| `AWS_S3_UPLOAD_BUCKET_URL` | outline-worker | - | Bucket endpoint URL |
| `AWS_S3_UPLOAD_BUCKET_NAME` | outline-worker | - | Bucket name |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Volume:** `/var/dex`
- **Healthcheck:** `/_health`

**Category:** CMS · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/outline-knowledge-base)
