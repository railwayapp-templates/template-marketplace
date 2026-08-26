# Deploy Kaneo on Railway

Project management app for boards, tasks, workflows, and team planning

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-project-management)

## About

Deploy Kaneo on Railway when your team wants focused project management without the administration burden of a large work-management suite. Kaneo is an MIT-licensed, self-hostable app for boards, backlogs, lists, priorities, labels, due dates, time tracking, workflow rules, Gantt planning, integrations, API clients, and MCP tools. It is a practical open-source alternative to Jira, Linear, Trello, GitHub Projects, and Plane for teams that want to own their planning data.

Self-host Kaneo with a Railway architecture: two Kaneo replicas serve the web app and API from one public origin, Postgres stores durable application data, Redis distributes realtime WebSocket events between replicas, a Railway bucket stores uploaded task and comment assets, and Mailpit captures invitation mail in a password-protected inbox. Every database, cache, SMTP, and storage connection stays on Railway's private network except the two web interfaces.

![Diagram of Kaneo, Postgres, Redis, and Mailpit on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787583295/kaneo-architecture.png)

Kaneo keeps planning close to the work. Workspaces contain projects, projects switch between board and list views, and tasks share one state across backlog, calendar, Gantt, filters, comments, and time entries. Its smaller surface lets a team start without designing an enterprise workflow scheme first.

Key capabilities include:

- Boards, lists, backlogs, calendars, and Gantt timelines
- Roles, invitation-only onboarding, and project access controls
- Priorities, labels, dates, assignees, subtasks, relations, and comments
- Time tracking, notifications, workflow rules, and webhooks
- GitHub, Gitea, chat, OAuth, and OpenID Connect integrations
- API keys, device authorization, MCP, and private file uploads

The combined image serves React and the Hono API from one origin. Postgres is the system of record, Redis relays realtime events between app replicas, the Railway bucket handles presigned uploads with private reads through Kaneo, and Mailpit persists invitations until you connect an outbound relay.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| kaneo | `ghcr.io/usekaneo/kaneo:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Public inbox HTTP port |
| `MP_LABEL` | mailpit | Kaneo Mail | Inbox display label |
| `MP_MAX_AGE` | mailpit | 30d | Retain mail thirty days |
| `MP_UI_AUTH` | mailpit | - | Protected inbox basic auth |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Persistent SQLite database path |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Maximum stored message count |
| `MAILPIT_PASSWORD` | mailpit | (secret) | Protected inbox password source |
| `MP_DISABLE_VERSION_CHECK` | mailpit | true | Disable outbound release checks |
| `MP_BLOCK_REMOTE_CSS_AND_FONTS` | mailpit | true | Block remote message stylesheets |
| `MP_ALLOW_INTERNAL_HTTP_REQUESTS` | mailpit | false | Block internal link inspection |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Private database connection string |
| `POSTGRES_USER` | Postgres | (secret) | Server superuser created initially |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Server superuser password |
| `REDISHOST` | Redis | - | Data panel hostname alias |
| `REDISPORT` | Redis | 6379 | Data panel port alias |
| `REDISUSER` | Redis | default | Data panel username alias |
| `REDIS_URL` | Redis | - | Private Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel password alias |
| `REDIS_PASSWORD` | Redis | (secret) | Server authentication password |
| `PORT` | kaneo | 5173 | Public HTTP listening port |
| `REDIS_URL` | kaneo | - | Realtime Redis PubSub connection |
| `S3_BUCKET` | kaneo | - | Upload bucket name reference |
| `S3_REGION` | kaneo | - | Bucket signing region reference |
| `SMTP_FROM` | kaneo | Kaneo <noreply@kaneo.dev> | Default invitation sender address |
| `SMTP_HOST` | kaneo | - | Private SMTP service hostname |
| `SMTP_PORT` | kaneo | 1025 | Private Mailpit SMTP port |
| `AUTH_SECRET` | kaneo | (secret) | Session and token signing key |
| `KANEO_CLOUD` | kaneo | false | Disable hosted billing features |
| `S3_ENDPOINT` | kaneo | - | Browser-reachable bucket endpoint |
| `SMTP_SECURE` | kaneo | false | Use plain private SMTP |
| `CORS_ORIGINS` | kaneo | - | Allowed browser application origin |
| `DATABASE_URL` | kaneo | - | Private Postgres connection string |
| `NODE_OPTIONS` | kaneo | --max-old-space-size=512 | Bound the Node heap |
| `S3_KEY_PREFIX` | kaneo | kaneo | Namespace uploaded object keys |
| `SMTP_IGNORE_TLS` | kaneo | false | Enforce valid TLS certificates |
| `KANEO_CLIENT_URL` | kaneo | - | Canonical public application URL |
| `S3_ACCESS_KEY_ID` | kaneo | - | Bucket access key reference |
| `SMTP_REQUIRE_TLS` | kaneo | false | Do not require STARTTLS |
| `S3_FORCE_PATH_STYLE` | kaneo | true | Enable compatible browser CORS |
| `DISABLE_GUEST_ACCESS` | kaneo | true | Disable anonymous guest accounts |
| `DISABLE_REGISTRATION` | kaneo | true | Require invitations after bootstrap |
| `S3_SECRET_ACCESS_KEY` | kaneo | (secret) | Bucket secret key reference |
| `S3_PRESIGN_TTL_SECONDS` | kaneo | 300 | Upload URL lifetime seconds |
| `DISABLE_EMAIL_OTP_SIGN_IN` | kaneo | true | Keep password sign-in enabled |
| `S3_MAX_IMAGE_UPLOAD_BYTES` | kaneo | 10485760 | Ten megabyte upload limit |
| `DISABLE_WORKSPACE_CREATION` | kaneo | true | Restrict workspaces to admins |
| `KANEO_ALLOW_PRIVATE_WEBHOOK_DESTINATIONS` | kaneo | false | Block private webhook targets |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/api/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kaneo-project-management)
