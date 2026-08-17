# Deploy Vikunja on Railway

open-source task management. Lists, Kanban, Gantt, and more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vikunja-pm)

## About

Vikunja is an open-source to-do and project planning app that gives a team what paid trackers charge for: tasks with due dates, priorities, labels, assignees, reminders, subtasks and attachments, viewed as a list, Kanban board, sortable table or Gantt chart. It is written in Go, ships a single binary serving both the API and the web app, and syncs to Apple Reminders or Thunderbird over CalDAV. Teams self-host Vikunja when Todoist, Asana or Trello have become a per-seat bill for something they would rather own.

This template lets you deploy Vikunja on Railway with the pieces a real installation needs already wired together. The app is built from a public source repository layering a first-run bootstrap on the official `vikunja/vikunja` image; PostgreSQL 18 holds every project, task and comment; Redis backs the cache and rate-limit counters; a managed bucket stores attachments and avatars; and Mailpit catches outbound mail so password resets and reminders work from day one. Only Vikunja and the Mailpit inbox are public — database, cache and SMTP stay on the private network.

![Vikunja Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786897733/2d548089-0bc5-4e87-8fac-194c5adf1c84.png)

Vikunja separates into one stateless web process and a set of stores, which is the shape Railway runs well. The Go binary serves the REST API and the compiled frontend from one origin, so there is no CORS setup and no second domain. Everything durable lives outside the container — data in PostgreSQL, uploads in object storage, cached values in Redis — so no volume needs sizing and nothing is lost on a restart.

Key features:

- List, Kanban, table and Gantt views over the same tasks
- Quick add magic for dates, labels, priority and assignees as you type
- Subtasks, relations, repeating tasks, reminders and saved filters
- Attachments, backgrounds and rich-text descriptions
- Teams, per-project sharing and public read-only links
- CalDAV sync, webhooks, API tokens and a REST API
- Importers for Todoist, Trello, Microsoft To Do, TickTick, Wekan and CSV
- Optional OpenID Connect and LDAP sign-in alongside local accounts

Mailpit is a real SMTP server with a searchable web inbox, so reminders and resets work with no email provider on day one; the `MP_SMTP_RELAY_*` variables turn it into a relay in front of one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| vikunja | [gridalpha/vikunja-railway](https://github.com/gridalpha/vikunja-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_LABEL` | mailpit | vikunja | Label shown in the inbox |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before pruning |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Bind web inbox to IPv6 |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Bind SMTP listener to IPv6 |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Maximum recipients per message |
| `MP_DISABLE_VERSION_CHECK` | mailpit | true | Skip upstream version check |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | vikunja | 3456 | HTTP listening port |
| `VIKUNJA_LOG_HTTP` | vikunja | stdout | Request log destination |
| `VIKUNJA_LOG_LEVEL` | vikunja | INFO | Application log level |
| `VIKUNJA_FILES_TYPE` | vikunja | s3 | Store uploads in object storage |
| `VIKUNJA_REDIS_HOST` | vikunja | - | Redis host and port |
| `VIKUNJA_ADMIN_EMAIL` | vikunja | admin@example.com | First account email address |
| `VIKUNJA_MAILER_HOST` | vikunja | - | SMTP host |
| `VIKUNJA_MAILER_PORT` | vikunja | 1025 | SMTP port |
| `VIKUNJA_LOG_DATABASE` | vikunja | off | Disable per-query logging |
| `VIKUNJA_DATABASE_HOST` | vikunja | - | Database host and port |
| `VIKUNJA_DATABASE_TYPE` | vikunja | postgres | Database driver |
| `VIKUNJA_DATABASE_USER` | vikunja | (secret) | Database user |
| `VIKUNJA_KEYVALUE_TYPE` | vikunja | redis | Key-value store backend |
| `VIKUNJA_REDIS_ENABLED` | vikunja | true | Enable the Redis connection |
| `VIKUNJA_ADMIN_PASSWORD` | vikunja | (secret) | First account password |
| `VIKUNJA_ADMIN_USERNAME` | vikunja | (secret) | First account username |
| `VIKUNJA_MAILER_ENABLED` | vikunja | true | Enable outgoing email |
| `VIKUNJA_RATELIMIT_KIND` | vikunja | user | Limit per user, per IP pre-auth |
| `VIKUNJA_REDIS_PASSWORD` | vikunja | (secret) | Redis password |
| `VIKUNJA_SERVICE_SECRET` | vikunja | (secret) | JWT signing key, keep stable |
| `VIKUNJA_FILES_S3_BUCKET` | vikunja | - | Bucket name |
| `VIKUNJA_FILES_S3_REGION` | vikunja | - | Bucket region |
| `VIKUNJA_MAILER_FORCESSL` | vikunja | false | Plain SMTP on the private network |
| `VIKUNJA_RATELIMIT_STORE` | vikunja | keyvalue | Rate limit counters in Redis |
| `VIKUNJA_DATABASE_SSLMODE` | vikunja | disable | Private network, no TLS needed |
| `VIKUNJA_MAILER_FROMEMAIL` | vikunja | - | Sender address |
| `VIKUNJA_DATABASE_DATABASE` | vikunja | - | Database name |
| `VIKUNJA_DATABASE_PASSWORD` | vikunja | (secret) | Database password |
| `VIKUNJA_FILES_S3_ENDPOINT` | vikunja | - | Bucket endpoint URL |
| `VIKUNJA_RATELIMIT_ENABLED` | vikunja | true | Enable request rate limiting |
| `VIKUNJA_SERVICE_PUBLICURL` | vikunja | - | Public base URL |
| `VIKUNJA_FILES_S3_ACCESSKEY` | vikunja | - | Bucket access key |
| `VIKUNJA_FILES_S3_SECRETKEY` | vikunja | (secret) | Bucket secret key |
| `VIKUNJA_SERVICE_TRUSTEDPROXIES` | vikunja | 0.0.0.0/0,::/0 | Trust Railway's edge hops |
| `VIKUNJA_SERVICE_MAXITEMSPERPAGE` | vikunja | 50 | Page size for list endpoints |
| `VIKUNJA_SERVICE_ENABLEREGISTRATION` | vikunja | false | Public sign-up disabled |
| `VIKUNJA_SERVICE_IPEXTRACTIONMETHOD` | vikunja | xff | Read client IP from X-Forwarded-For |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vikunja-pm)
