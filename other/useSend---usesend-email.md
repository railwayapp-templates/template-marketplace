# Deploy useSend on Railway

Email sending platform with an API, contacts and campaigns

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/usesend-email)

## About

useSend is open-source email sending infrastructure: a dashboard, a REST API and an SMTP endpoint in front of your own Amazon SES account. Developers use it as they would Resend, Postmark or SendGrid — send a transactional receipt from application code, track deliveries, bounces, opens and clicks, keep contact books and mail newsletters to them — except the sending account, the recipient data and the message content stay in infrastructure you control. Delivery runs through SES, so you pay AWS's per-message rate rather than a per-seat SaaS plan.

Self-host useSend on Railway and this template pre-configures the whole stack. The `usesend` service runs the Next.js application and its queue workers, and is the only one with a public URL. `Postgres` stores teams, domains, API keys, contacts, campaigns and every email record; `Redis` backs the BullMQ queues that pace sending against the SES rate limit and retry webhooks. `mailpit` catches useSend's own sign-in codes until you have verified a sending domain, so you can reach the dashboard on a new deployment without wiring up GitHub or Google login. `smtp-proxy` runs useSend's SMTP front end on the private network for other services in the same project.

![useSend, Mailpit, its SMTP proxy, Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789531394/usesend-architecture.webp)

useSend turns a raw SES account into a product. SES has no usable dashboard, no contact storage, no templates and no campaign tooling; useSend adds all of that and keeps the data in your own Postgres. Teams self-host it when SaaS pricing starts to hurt, when recipient data cannot leave their infrastructure, or when transactional and marketing mail should share one system.

Key features:

- REST API with JavaScript and Python SDKs, plus an SMTP endpoint for software that only speaks SMTP
- Domain verification with DKIM and a custom MAIL FROM, from the UI
- Delivery, bounce, complaint, open and click tracking per message
- Contact books with unsubscribe handling, double opt-in and per-contact variables
- Campaigns with a drag-and-drop editor, templates, webhooks and suppression lists
- Separate transactional and marketing queues, so a campaign cannot starve password-reset mail

The Railway architecture mirrors that split: the app service holds both the HTTP surface and the BullMQ workers that drain the send queues at the rate SES reports for your account, Redis is the queue, Postgres the system of record.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| usesend | [gridalpha/usesend-railway](https://github.com/gridalpha/usesend-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| smtp-proxy | `usesend/smtp-proxy:latest` | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Inbox username and password |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Rolling message cap |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `PORT` | usesend | 3000 | HTTP port Railway probes |
| `HOSTNAME` | usesend | :: | Dual-stack bind for the Next server |
| `NODE_ENV` | usesend | production | Runtime mode |
| `REDIS_URL` | usesend | - | BullMQ queue backend |
| `FROM_EMAIL` | usesend | noreply@localhost | Enables sign-in by emailed code |
| `ADMIN_EMAIL` | usesend | - | Address that sees the admin pages |
| `DATABASE_URL` | usesend | - | Prisma connection string |
| `NEXTAUTH_URL` | usesend | - | Public app URL |
| `API_RATE_LIMIT` | usesend | 10 | API requests per second per key |
| `NEXTAUTH_SECRET` | usesend | (secret) | Session signing key |
| `AWS_ACCESS_KEY_ID` | usesend | - | SES and SNS access key, set after deploy |
| `SMTP_FALLBACK_URL` | usesend | - | Sign-in mail relay |
| `AWS_DEFAULT_REGION` | usesend | us-east-1 | Default SES region |
| `AUTH_EMAIL_RATE_LIMIT` | usesend | 5 | Sign-in emails per hour per address |
| `AWS_SECRET_ACCESS_KEY` | usesend | (secret) | SES and SNS secret key, set after deploy |
| `NEXT_TELEMETRY_DISABLED` | usesend | 1 | Turns off Next.js telemetry |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `USESEND_BASE_URL` | smtp-proxy | - | useSend instance it forwards to |
| `SMTP_AUTH_USERNAME` | smtp-proxy | (secret) | SMTP username; password is a useSend API key |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/usesend-email)
