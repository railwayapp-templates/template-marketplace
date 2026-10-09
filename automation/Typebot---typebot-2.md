# Deploy Typebot on Railway

Typebot chatbot builder with a mailbox, so sign-in works on any plan

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-2)

## About

[Typebot](https://github.com/baptisteArno/typebot.io) is a visual builder for chatbots and conversational forms. You chain blocks for messages, questions, conditions and integrations (OpenAI, webhooks, Google Sheets, WhatsApp), then publish the bot as its own page or embed it on a site. This template runs Typebot 3.19.0, its builder and its viewer, on Postgres and Redis, plus a small mailbox that makes sign-in work on every Railway plan.

Typebot signs you in with a 6-digit code sent by email, and it has no password login. Railway blocks outbound SMTP below the Pro plan, so on Trial and Hobby a usual SMTP setup never delivers that code and you can't get in. I added a Mailbox service (Mailpit) to the project: Typebot hands its emails to it over the private network, and you read them at `MAILBOX_URL` with a generated password. No email provider or account is needed.

Sign-up is closed. Only `ADMIN_EMAIL` can create an account, and it gets Typebot's unlimited plan; anyone else needs an invitation from your workspace. `ENCRYPTION_SECRET` is generated at deploy with the 32 characters Typebot requires, and Redis turns on Typebot's limit of one login-code request a minute.

Before publishing I tested it on Railway. I asked for a login code for `ADMIN_EMAIL`, read it in the Mailbox and signed in. From that session I created an API token, used it to build a bot through Typebot's REST API (a greeting, a question for your name, and a reply that uses it), published it, and chatted with it on the viewer. It asked for a name and answered "Nice to meet you, Railway." After restarting all five services I signed in again with a new code, and the bot was still there and still answered.

Idle, the five services used 0.82 GB of RAM (builder 0.44, viewer 0.30, Postgres 0.06, Mailbox and Redis 0.02 together), about $8 a month on Railway's usage pricing.

The tradeoff: every email Typebot sends lands in the Mailbox, including invitations and the emails your bots send with the Send Email block. People you invite get their codes there too, so you'd pass them on yourself. For real delivery on the Pro plan, point the `SMTP_*` variables on the Typebot service at your email provider (the Viewer reads them from there).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.4` | Database |
| Typebot | `baptistearno/typebot-builder:3.19.0` | Web service |
| Viewer | `baptistearno/typebot-viewer:3.19.0` | Web service |
| Mailbox | `axllent/mailpit:v1.31.4` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (generated) |
| `PORT` | Typebot | 3000 | Port Railway routes to |
| `HOSTNAME` | Typebot | :: | Listen address |
| `REDIS_URL` | Typebot | - | Redis over the private network (rate limits) |
| `SMTP_HOST` | Typebot | - | SMTP server; on Railway's Pro plan you can use your email provider's instead |
| `SMTP_PORT` | Typebot | 1025 | SMTP port |
| `ADMIN_EMAIL` | Typebot | - | Your email. Only this address can create an account; invite others from your workspace |
| `MAILBOX_URL` | Typebot | - | Where login codes arrive (see the Mailbox service for its password) |
| `SMTP_SECURE` | Typebot | false | true for port 465 |
| `TYPEBOT_URL` | Typebot | - | Open this and sign in with ADMIN_EMAIL; the login code arrives in the Mailbox |
| `DATABASE_URL` | Typebot | - | Postgres over the private network |
| `NEXTAUTH_URL` | Typebot | - | The builder's public URL |
| `SMTP_PASSWORD` | Typebot | (secret) | SMTP password |
| `SMTP_USERNAME` | Typebot | (secret) | SMTP login |
| `DISABLE_SIGNUP` | Typebot | true | Sign-up is closed to everyone except ADMIN_EMAIL and people you invite |
| `SMTP_IGNORE_TLS` | Typebot | true | The mailbox speaks plain SMTP; set false for a real provider |
| `ENCRYPTION_SECRET` | Typebot | (secret) | Encrypts stored credentials and signs sessions (generated; must be 32 characters) |
| `NEXT_PUBLIC_SMTP_FROM` | Typebot | - | Sender of Typebot's emails |
| `NEXT_PUBLIC_VIEWER_URL` | Typebot | - | Where published bots are served |
| `PORT` | Viewer | 3000 | Port Railway routes to |
| `HOSTNAME` | Viewer | :: | Listen address |
| `REDIS_URL` | Viewer | - | Redis over the private network (rate limits) |
| `SMTP_HOST` | Viewer | - | Same SMTP settings as the builder (Send Email blocks) |
| `SMTP_PORT` | Viewer | - | SMTP port |
| `SMTP_SECURE` | Viewer | - | true for port 465 |
| `DATABASE_URL` | Viewer | - | Postgres over the private network |
| `NEXTAUTH_URL` | Viewer | - | The builder's public URL |
| `SMTP_PASSWORD` | Viewer | (secret) | SMTP password |
| `SMTP_USERNAME` | Viewer | (secret) | SMTP login |
| `SMTP_IGNORE_TLS` | Viewer | - | Plain SMTP |
| `ENCRYPTION_SECRET` | Viewer | (secret) | Same secret as the builder |
| `NEXT_PUBLIC_SMTP_FROM` | Viewer | - | Sender of Typebot's emails |
| `NEXT_PUBLIC_VIEWER_URL` | Viewer | - | Where published bots are served |
| `PORT` | Mailbox | 8025 | Port Railway routes to |
| `MP_UI_AUTH` | Mailbox | - | Mailpit's web and API login |
| `MAILBOX_URL` | Mailbox | - | Typebot's emails, login codes included, arrive here. Sign in with MAILBOX_USER and MAILBOX_PASSWORD |
| `MAILBOX_USER` | Mailbox | (secret) | Mailbox login |
| `MP_SMTP_AUTH` | Mailbox | - | Mailpit's SMTP login |
| `SMTP_PASSWORD` | Mailbox | (secret) | Password Typebot uses to hand emails to the mailbox (generated) |
| `MP_MAX_MESSAGES` | Mailbox | 200 | Older emails are deleted past this count |
| `MP_UI_BIND_ADDR` | Mailbox | [::]:8025 | Inbox web page |
| `MAILBOX_PASSWORD` | Mailbox | (secret) | Mailbox password (generated) |
| `MP_SMTP_BIND_ADDR` | Mailbox | [::]:1025 | SMTP, private network only |
| `MP_DISABLE_VERSION_CHECK` | Mailbox | true | No update checks |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | Mailbox | true | Plain SMTP login is fine on the private network |
| `POSTGRES_DB` | Postgres | typebot | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |

## Configuration

- **Start command:** `/bin/sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --save "" --appendonly no'`
- **Healthcheck:** `/signin`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/healthz`
- **Healthcheck:** `/readyz`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Tags:** typebot, chatbot, chatbot-builder, forms, typeform-alternative, whatsapp

[View on Railway →](https://railway.com/deploy/typebot-2)
