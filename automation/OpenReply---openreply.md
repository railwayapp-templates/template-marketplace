# Deploy OpenReply on Railway

Instagram comment-to-DM automation with Postgres, Redis, and a worker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openreply)

## About

OpenReply is an open source Instagram comment-to-DM tool. A person comments a keyword named in your post, Meta sends the event to your deployment, and an always-on worker sends the private reply through Meta's official API. It includes campaign analytics, tracked links, an inbox, workspaces, and DM logs without seat limits or plan caps.

This template deploys the Next.js web app, a long-running BullMQ worker, Postgres, and Redis. The web service receives users, OAuth callbacks, and Meta webhooks. The worker survives retries and rate-limit windows, and polls every five minutes for comments that webhooks missed.

Only the web service is public. Railway generates the database and Redis credentials, a session secret, the Instagram-token encryption key, the cron secret, and the webhook verification token. The `/api/health` endpoint returns 200 only when Postgres, Redis, the queue, and the worker heartbeat are all healthy.

OpenReply sends messages to third parties, so use it only for explicit opt-in campaigns. The post must say that commenting a named keyword triggers a DM, and the campaign must match that keyword. Do not enable **Match any word** to message every commenter. OpenReply uses Meta's official API, deduplicates each comment, and enforces Meta's documented 750 private replies per account per hour.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/hmseeb/openreply-railway:1.0.0` | Web service |
| redis | `redis:8.2` | Database |
| worker | `ghcr.io/hmseeb/openreply-railway:1.0.0` | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 3000 | - |
| `EMAIL_FROM` | web | - | Verified sender, for example OpenReply <login@example.com> |
| `CRON_SECRET` | web | (secret) | - |
| `ENCRYPTION_KEY` | web | - | Exactly 64 hexadecimal characters; shared with the worker to encrypt Instagram tokens |
| `RESEND_API_KEY` | web | (secret) | Resend API key used for login magic links. Use a key authorized for the EMAIL_FROM domain |
| `NEXTAUTH_SECRET` | web | (secret) | - |
| `INSTAGRAM_APP_ID` | web | - | Instagram product app ID from Meta, not the Facebook app ID |
| `FACEBOOK_APP_SECRET` | web | (secret) | Facebook app secret from Meta App Settings, used to verify webhook signatures |
| `INSTAGRAM_APP_SECRET` | web | (secret) | Instagram product app secret from Meta |
| `WEBHOOK_VERIFY_TOKEN` | web | (secret) | Paste this generated value into Meta webhook configuration after deployment |
| `META_GRAPH_API_VERSION` | web | v25.0 | - |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `NEXTAUTH_SECRET` | worker | (secret) | - |
| `FACEBOOK_APP_SECRET` | worker | (secret) | - |
| `INSTAGRAM_APP_SECRET` | worker | (secret) | - |
| `WEBHOOK_VERIFY_TOKEN` | worker | (secret) | - |
| `COMMENT_POLL_INTERVAL_MS` | worker | 300000 | Poll every five minutes for comments missed by webhooks |
| `COMMENT_POLL_MAX_PER_SWEEP` | worker | 30 | Conservative per-campaign cap for each polling sweep |
| `COMMENT_POLL_LOOKBACK_HOURS` | worker | 72 | - |
| `POSTGRES_DB` | postgres | openreply | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |

## Configuration

- **Start command:** `/usr/local/bin/boot.sh web`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/usr/local/bin/boot.sh worker`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/openreply)
