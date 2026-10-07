# Deploy Inbox Zero | Open-Source AI Email Assistant for Gmail and Outlook on Railway

AI email assistant for Gmail and Outlook with your own LLM key and cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inbox-zero)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/inbox-zero?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=inbox-zero)

[Inbox Zero](https://www.getinboxzero.com/) is the open-source AI email assistant for Gmail and Outlook. You describe how you want your email handled in plain English: label and archive newsletters, draft replies in your voice, flag cold outreach, follow up on threads nobody answered. Inbox Zero applies those rules to new mail as it arrives. It also has one-click bulk unsubscribe, a reply tracker, email digests, meeting briefs and an assistant chat over your inbox. This template runs the full self-hosted version with every premium feature unlocked, using your own AI provider key, so your mail never passes through someone else's SaaS.

The stack is four services: Inbox Zero, Redis-HTTP, Redis and Postgres.

- **Inbox Zero** is the Next.js web app and API on the public domain. It receives Gmail push notifications and Outlook webhooks, runs your rules through the LLM and acts on your mailbox.
- **Scheduled jobs built in.** Upstream runs a separate cron container that calls the app's job endpoints. Here the same loops run inside the Inbox Zero service and start once the app is healthy: scheduled actions and snoozes every 15 minutes, automation jobs, digests, meeting briefs and follow-up reminders, and Gmail/Outlook watch renewal every 6 hours. That keeps real-time notifications from expiring.
- **Redis-HTTP** is [serverless-redis-http](https://github.com/hiett/serverless-redis-http), the Upstash-compatible REST proxy that upstream's compose file also uses. Inbox Zero talks to Redis through it for caching, rate limits and locks.
- **Redis** backs that proxy and the live inbox updates in the UI.
- **Postgres** holds users, connected accounts, rules, history and encrypted OAuth tokens.
- **Safe first boot.** On a fresh deploy Postgres is often still starting. Upstream's start script skips failed migrations and boots anyway, which leaves an app without tables. This template retries the migrations until they succeed, and only then starts the server.
- **Locked to you.** Only the addresses in `AUTH_ALLOWED_EMAILS` can sign up, so nobody else can use your instance or your AI key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| Redis-HTTP | `hiett/serverless-redis-http:0.0.10` | Database |
| Inbox Zero | [nomideusz/inbox-zero-railway](https://github.com/nomideusz/inbox-zero-railway) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `SRH_IPV6` | Redis-HTTP | true | Listen on IPv6 for Railway's private network - leave as is |
| `SRH_MODE` | Redis-HTTP | env | Single Redis connection from the variables below - leave as is |
| `SRH_TOKEN` | Redis-HTTP | (secret) | Bearer token Inbox Zero uses for the proxy |
| `SRH_CONNECTION_STRING` | Redis-HTTP | - | Redis on the private network - leave as is |
| `PORT` | Inbox Zero | 3000 | Port Inbox Zero listens on - leave as is |
| `HOSTNAME` | Inbox Zero | :: | Listen on IPv4 and IPv6 - leave as is |
| `REDIS_URL` | Inbox Zero | - | Redis for live inbox updates - private network, leave as is |
| `DIRECT_URL` | Inbox Zero | - | Postgres connection for migrations - leave as is |
| `AUTH_SECRET` | Inbox Zero | (secret) | Signs login sessions |
| `CRON_SECRET` | Inbox Zero | (secret) | Authenticates the built-in scheduled jobs |
| `LLM_API_KEY` | Inbox Zero | (secret) | API key for the provider in DEFAULT_LLMS (Anthropic, OpenAI, Google, OpenRouter, ...) - needs API billing, not a chat subscription |
| `API_KEY_SALT` | Inbox Zero | (secret) | Salt for hashing user API keys - never change |
| `DATABASE_URL` | Inbox Zero | - | Postgres connection - private network, leave as is |
| `DEFAULT_LLMS` | Inbox Zero | anthropic:claude-sonnet-5-5 | Main model as provider:model, e.g. openai:gpt-6-luna or google:gemini-3.8-flash |
| `ECONOMY_LLMS` | Inbox Zero | anthropic:claude-haiku-4-5 | Cheaper model for high-volume tasks, same provider:model format - optional, falls back to DEFAULT_LLMS |
| `REDIS_HTTP_URL` | Inbox Zero | - | Upstash-compatible Redis REST proxy - private network, leave as is |
| `GOOGLE_CLIENT_ID` | Inbox Zero | - | Google OAuth client ID (see the template README for the redirect URIs) - set to skipped if you only use Outlook |
| `INTERNAL_API_KEY` | Inbox Zero | (secret) | Authenticates internal job calls |
| `INTERNAL_API_URL` | Inbox Zero | http://localhost:3000 | Background jobs call the app inside its own container - leave as is |
| `REDIS_HTTP_TOKEN` | Inbox Zero | (secret) | Token for the Redis REST proxy - leave as is |
| `EMAIL_ENCRYPT_SALT` | Inbox Zero | - | Salt for token encryption - never change after the first sign-in |
| `AUTH_ALLOWED_EMAILS` | Inbox Zero | - | Comma-separated email addresses allowed to sign up - everyone else is refused, so nobody else can use your AI key |
| `MICROSOFT_CLIENT_ID` | Inbox Zero | - | Microsoft Entra application (client) ID - optional, for Outlook accounts |
| `EMAIL_ENCRYPT_SECRET` | Inbox Zero | (secret) | Encrypts stored OAuth tokens - never change after the first sign-in |
| `GOOGLE_CLIENT_SECRET` | Inbox Zero | (secret) | Google OAuth client secret - set to skipped if you only use Outlook |
| `NEXT_PUBLIC_BASE_URL` | Inbox Zero | - | Public URL - set it to your custom domain after adding one, and update the OAuth redirect URIs to match |
| `MICROSOFT_CLIENT_SECRET` | Inbox Zero | (secret) | Microsoft Entra client secret value - optional, for Outlook accounts |
| `GOOGLE_PUBSUB_TOPIC_NAME` | Inbox Zero | - | Pub/Sub topic for Gmail push notifications: projects/<project-id>/topics/<topic> - set to skipped if you only use Outlook |
| `MICROSOFT_WEBHOOK_CLIENT_STATE` | Inbox Zero | - | Verifies Outlook webhook notifications - leave as is |
| `NEXT_PUBLIC_EMAIL_SEND_ENABLED` | Inbox Zero | true | Allows sending and replying from Inbox Zero |
| `GOOGLE_PUBSUB_VERIFICATION_TOKEN` | Inbox Zero | (secret) | Token for the Pub/Sub push endpoint: https://<domain>/api/google/webhook?token=<this value> |
| `NEXT_PUBLIC_BYPASS_PREMIUM_CHECKS` | Inbox Zero | true | Unlocks all features on a self-hosted instance - leave as is |
| `POSTGRES_DB` | Postgres | inboxzero | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes --dir /data"`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/inbox-zero)
