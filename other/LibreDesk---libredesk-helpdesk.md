# Deploy LibreDesk on Railway

Customer support desk with live chat, email and a shared inbox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredesk-helpdesk)

## About

Libredesk is an open source, self-hosted omnichannel customer support desk from the team behind Listmonk. It puts live chat and email in one shared inbox and adds what a support team needs around it: SLAs, business hours, automation rules, macros, CSAT surveys, auto-assignment, roles and a help centre. It ships as a single Go binary, so the agent inbox, chat widget, admin panel and HTTP API all come from one process. Teams pick it over Zendesk, Freshdesk or Intercom to own their conversation history and stop paying per agent.

Deploy Libredesk on Railway and you get the full production shape, not a lone container. Five services run here: a Caddy edge (`libredesk-web`) holding the public domain, the app on the private network, PostgreSQL for every conversation and setting, Redis for sessions and rate limiting, and Mailpit as a built-in mailbox so invitations and password resets work as soon as the deploy is green. Traffic reaches Caddy, which forwards it privately to the app; the app writes to Postgres, keeps sessions in Redis and stores attachments on a volume. Nothing here needs an external account.

![Diagram of the libredesk, Caddy, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787358638/libredesk-architecture.png)

Self-hosting a help desk is mostly about where the data lives: support conversations carry customer names, order numbers, screenshots and complaints, and hosted vendors charge per agent per month to keep that on their infrastructure. Libredesk offers the same features on servers you control, under AGPL-3.0, with an API and webhooks.

- **Omnichannel inbox** — live chat and email in one queue
- **Chat widget** — real time, file uploads, pre-chat form, JWT identity checks
- **AI assistant and copilot** — auto-answer from your knowledge base, draft replies
- **SLAs and business hours** — response and resolution targets with breach alerts
- **Automations and macros** — event rules, canned actions, capacity routing
- **CSAT and reporting** — scores, response times, agent activity
- **SSO and granular roles** — Google, Microsoft or any OIDC provider

The app service is the whole product; Postgres is its system of record and it runs its own migrations at startup. Redis holds agent sessions, so sign-ins survive a redeploy, and backs the rate limits on login, password reset and the widget. Caddy is there for a reason: Libredesk reads a visitor's IP from request headers, several of which no Railway proxy sets, so Caddy strips those and leaves only the header the platform controls — otherwise those limits and the chat IP block list could be bypassed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libredesk-web | [gridalpha/libredesk-railway](https://github.com/gridalpha/libredesk-railway) | Web service |
| libredesk | [gridalpha/libredesk-railway](https://github.com/gridalpha/libredesk-railway) | Database |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | libredesk-web | 8080 | Public HTTP port for the edge |
| `APP_UPSTREAM` | libredesk-web | - | Private app address proxied to |
| `PORT` | libredesk | 9000 | HTTP port Railway health-checks |
| `SMTP_FROM` | libredesk | - | Optional From address; defaults from APP_ROOT_URL |
| `SMTP_HOST` | libredesk | - | Notification mail host, seeded once |
| `SMTP_PORT` | libredesk | 1025 | Mailpit plain SMTP listener |
| `APP_ROOT_URL` | libredesk | - | Public base URL seeded at boot |
| `DATABASE_URL` | libredesk | - | Used by the boot script only |
| `LIBREDESK_app__env` | libredesk | prod | Disables dev colour logging |
| `LIBREDESK_db__host` | libredesk | - | Postgres private host |
| `LIBREDESK_db__port` | libredesk | - | Postgres port |
| `LIBREDESK_db__user` | libredesk | (secret) | Postgres user |
| `LIBREDESK_redis__url` | libredesk | - | Sessions and rate-limit counters |
| `LIBREDESK_db__database` | libredesk | - | Postgres database name |
| `LIBREDESK_db__password` | libredesk | (secret) | Postgres password |
| `LIBREDESK_db__ssl_mode` | libredesk | require | Encrypts without chain verification |
| `LIBREDESK_app__log_level` | libredesk | info | Log verbosity |
| `LIBREDESK_app__encryption_key` | libredesk | - | 32-char key encrypting stored secrets |
| `LIBREDESK_SYSTEM_USER_PASSWORD` | libredesk | (secret) | Owner password, 10-72 chars with symbol; required |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | user:password guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web listener, dual-stack |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, dual-stack |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/libredesk/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/libredesk-helpdesk)
