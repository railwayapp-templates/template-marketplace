# Deploy Postiz | Social Media Scheduler with Temporal (No Elasticsearch) on Railway

Schedule posts to 30+ social networks. Temporal, Postgres, Redis. v2.25.1

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/postiz-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=postiz-production)

[Postiz](https://postiz.com/) is an open-source social media scheduler. You write a post once, then schedule or publish it to X, LinkedIn, Instagram, Facebook, Threads, Bluesky, Mastodon, YouTube, TikTok, Pinterest, Reddit, Discord, Telegram and more than 20 other channels. It has a calendar, an AI writer, team workspaces, comments and approvals, analytics, a public API and an MCP server for AI agents. This template runs Postiz v2.25.1 with its own Temporal server on Postgres, so it needs no Elasticsearch.

The stack has four services: Postiz, Temporal, Redis and Postgres.

- **Postiz** is the official `ghcr.io/gitroomhq/postiz-app` image (pinned at v2.25.1). It runs the web app, the API and the Temporal worker that publishes your posts. Uploaded media is stored on a volume at `/uploads` and served from your own domain, so the social networks can fetch it.
- **Temporal** schedules every post and retries failed publishes. It is the production `temporalio/server` image, not the deprecated `auto-setup` image. Schema migrations run on every deploy. It uses Postgres for advanced visibility, so the search attributes Postiz needs (`organizationId`, `postId`) work without Elasticsearch, which would add a JVM using 1 GB or more.
- **Postgres** holds Postiz's data and Temporal's two databases. One Postgres serves both apps.
- **Redis** is a cache only, with no volume.

Two fixes are baked in:

- **The session cookie is host-only.** Postiz sets its login cookie on the parent domain. On a `*.up.railway.app` address that parent domain is `.railway.app`, so the browser would send your session to every app hosted on Railway. This template's nginx rewrites the cookie to your exact host. With a custom domain it does the same.
- **Sign-up is closed after the first account.** `DISABLE_REGISTRATION=true` lets the first person to sign up create the workspace and blocks everyone after that. Invite teammates from Settings. Set it to `false` if you want public sign-up. No email provider is needed, because accounts are activated straight away when none is configured.

### After deploying

1. Open the Postiz domain and **sign up right away**. The first account owns the instance.
2. Connect your channels. Most networks need you to create a developer app and add its keys as variables on the **Postiz** service, for example `X_API_KEY` and `X_API_SECRET`, `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`, or `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`. Use `https:///integrations/social/` as the redirect URL. The full list is in the [Postiz provider docs](https://docs.postiz.com/providers). Bluesky, Mastodon (any instance), Nostr, Lemmy, Dev.to, Hashnode, Medium and WordPress connect with just a login, key or token.
3. Optional: set `OPENAI_API_KEY` to turn on the AI writer, image generation and agent features. Set `EMAIL_PROVIDER=resend` with `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS` and `EMAIL_FROM_NAME` to send notification emails. Railway blocks SMTP on most plans, but Resend's HTTP API works.

For a custom domain, add it to the Postiz service and set `MAIN_URL`, `FRONTEND_URL` and `NEXT_PUBLIC_BACKEND_URL` (the domain followed by `/api`) to it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postiz | [two-workspaces/postiz](https://github.com/two-workspaces/postiz) (root: /) | Web service |
| Temporal | [two-workspaces/temporal](https://github.com/two-workspaces/temporal) (root: /server) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.10.2-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postiz | 5000 | Port nginx listens on inside the Postiz image - leave as is |
| `MAIN_URL` | Postiz | - | Public URL of this Postiz - change to your custom domain after adding one |
| `REDIS_URL` | Postiz | - | Redis on the private network (family=0 lets ioredis use IPv6) |
| `JWT_SECRET` | Postiz | (secret) | Signs login sessions - auto-generated, keep it secret |
| `DATABASE_URL` | Postiz | - | Postgres on the private network |
| `FRONTEND_URL` | Postiz | - | Same as MAIN_URL |
| `OPENAI_API_KEY` | Postiz | (secret) | Optional: enables the AI writer, image generation and agent features |
| `TEMPORAL_ADDRESS` | Postiz | - | Temporal frontend (gRPC) on the private network |
| `DISABLE_REGISTRATION` | Postiz | true | true = only the first sign-up is allowed (that account owns the workspace); invite teammates from Settings. Set to false to open public sign-up |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | - | MAIN_URL followed by /api |
| `PORT` | Temporal | 7243 | Frontend HTTP API port, used by Railway's health check - leave as is |
| `DB_PORT` | Temporal | 5432 | Postgres port |
| `POSTGRES_PWD` | Temporal | - | Postgres password |
| `POSTGRES_USER` | Temporal | (secret) | Postgres user (creates the temporal and temporal_visibility databases) |
| `POSTGRES_SEEDS` | Temporal | - | Postgres host on the private network |
| `DEFAULT_NAMESPACE` | Temporal | default | Namespace Postiz uses (created on first boot) |
| `NUM_HISTORY_SHARDS` | Temporal | 4 | History shards. Fixed on first boot and can never change; 4 is plenty for a scheduler |
| `POSTGRES_DB` | Postgres | postiz | Database name (Temporal adds temporal and temporal_visibility next to it) |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |

## Configuration

- **Healthcheck:** `/api/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Healthcheck:** `/api/v1/system-info`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD"`

**Category:** CMS · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/postiz-production)
