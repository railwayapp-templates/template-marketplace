# Deploy Kan on Railway

Trello Alternative. Open-source kanban project management you host yourself

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanban-kan)

## About

Kan is an open-source project management tool built around kanban boards — lists, drag-and-drop cards, labels, comments, checklists, attachments and shared workspaces. It is the self-hosted answer to Trello for teams who want their roadmap, client work or sprint board on infrastructure they control, and it imports existing Trello boards so migrating is not a rewrite. Kan is a Next.js app released under AGPLv3 at [github.com/kanbn/kan](https://github.com/kanbn/kan).

Deploy Kan on Railway and you get the full production shape rather than one container: the web app on a public HTTPS domain, PostgreSQL holding boards and sessions, Redis backing rate limiting, an object storage bucket for avatars and attachments, and Mailpit as an SMTP server so invitations and password-reset mail work immediately. Only the app and mail inbox are internet-facing; database, cache and SMTP stay private. Schema migrations run at boot, so upgrading a self-hosted Kan is a redeploy, not a manual step.

![Diagram of the Kan, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787199900/kan-architecture.png)

Kan organises work as boards of ordered lists of cards. A card carries a title, rich-text description, labels, members, due date, checklist, threaded comments and attachments, with every change recorded in an activity feed. Boards belong to a workspace, and workspaces carry Admin, Member and Guest roles, so one instance serves several teams. A board can also be made publicly viewable.

Self-hosting makes sense when board contents are commercially sensitive, when per-seat pricing has become the dominant cost of a growing team, or when data must sit in a specific jurisdiction.

Key features:

- Kanban boards with drag-and-drop lists and cards
- Labels, members, due dates and checklists on every card
- Threaded comments with `@` mentions
- Attachments backed by S3-compatible object storage
- Trello board import and reusable board templates
- Workspace roles, email invitations and shareable invite links
- Email/password sign-in plus Google, GitHub, Discord, Microsoft and OIDC

The template splits work across four services. **Kan** is the Next.js app and the only one serving users. **PostgreSQL** stores boards, cards, comments, users and login sessions — because sessions live there rather than in memory, a redeploy does not sign anyone out. **Redis** backs the rate limiter on the API and upload routes; without it Kan falls back to per-process counters that reset on every deploy. **Mailpit** is a real SMTP server with a web inbox; point `MP_SMTP_RELAY_HOST` at Postmark or SES when the mail should reach real addresses. The bucket holds avatars and attachments, so nothing durable is written to the container filesystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kan | [gridalpha/kan-railway](https://github.com/gridalpha/kan-railway) | Web service |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | kan | 3000 | HTTP server listening port |
| `LOG_LEVEL` | kan | info | Application log verbosity |
| `REDIS_URL` | kan | - | Redis connection string for rate limiting |
| `S3_REGION` | kan | - | Object storage region |
| `SMTP_HOST` | kan | - | SMTP server hostname |
| `SMTP_PORT` | kan | 1025 | SMTP server port |
| `EMAIL_FROM` | kan | - | From address on outgoing mail |
| `S3_ENDPOINT` | kan | - | Object storage endpoint URL |
| `SMTP_SECURE` | kan | false | Plain SMTP, no implicit TLS |
| `NODE_OPTIONS` | kan | --max-old-space-size=4096 | Node heap ceiling for the container |
| `POSTGRES_URL` | kan | - | Postgres connection string |
| `S3_ACCESS_KEY_ID` | kan | - | Object storage access key |
| `KAN_ADMIN_API_KEY` | kan | (secret) | Admin API key header value |
| `BETTER_AUTH_SECRET` | kan | (secret) | Session cookie signing key |
| `S3_FORCE_PATH_STYLE` | kan | true | Use path-style bucket addressing |
| `NEXT_PUBLIC_BASE_URL` | kan | - | Public app URL |
| `S3_SECRET_ACCESS_KEY` | kan | (secret) | Object storage secret key |
| `NEXT_PUBLIC_DISABLE_SIGN_UP` | kan | false | Set true after creating your account |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | kan | (secret) | Enables email/password sign-in |
| `NEXT_PUBLIC_AVATAR_BUCKET_NAME` | kan | - | Bucket holding user avatars |
| `NEXT_PUBLIC_ATTACHMENTS_BUCKET_NAME` | kan | - | Bucket holding card attachments |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | mailpit | - | Web inbox username and password |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/kanban-kan)
