# Deploy Lago [Updated Aug '26] on Railway

Lago [Aug '26] (Open-Source Usage-Based Billing & Metering) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lago-1)

## About

Lago is the open-source billing and metering platform for usage-based pricing, subscriptions, and automated invoicing. It's the tool teams reach for when flat per-seat pricing doesn't fit, and they need to actually meter what customers use.

Billing systems sit in a strange spot. They're not customer-facing in the way your product is, but they handle some of the most sensitive data in your business: invoices, payment records, usage history, sometimes the exact API keys or account details tied to how a customer gets charged. That's exactly the kind of thing worth keeping on infrastructure you control rather than routing through a third party.

The financial argument for self-hosting Lago specifically is unusually strong compared to most self-hosted tools in this project, because most billing platforms don't charge a flat SaaS fee, they charge a percentage of your own revenue. Stripe Billing runs roughly 0.7% of billing volume with no base fee. Chargebee's Performance tier is $599 a month plus a 0.75% overage rate that climbs toward 1% as you scale. A company processing $500K a month in subscriptions pays Stripe Billing something like $3,500 a month just for the billing layer, and that number only grows as the business grows. Self-hosted Lago has no revenue-percentage fee at all. Your cost is a flat infrastructure bill, completely decoupled from how much you actually bill your own customers.

Here's the thing worth knowing before you deploy this specific template: Lago's full docker-compose.yml documents a more elaborate production shape, Postgres with the `pg_partman` extension, a dedicated Sidekiq worker, a scheduled "clock" process, and a Gotenberg service for PDF invoices, split out for horizontal scaling. This template deploys the simpler, proven shape instead: Postgres, Redis, API, and frontend, four services, using the API image's own default startup command, which self-migrates and runs the full app in one process. This matches Railway's own real, live reference deployment. If you're running high invoice volume and want dedicated background workers, Lago's own docs cover adding them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| tender-friendship | [shruti060701/lago-railway](https://github.com/shruti060701/lago-railway) (root: /front) | Web service |
| peaceful-determination | [shruti060701/lago-railway](https://github.com/shruti060701/lago-railway) (root: /postgres) | Database |
| lago-railway | [shruti060701/lago-railway](https://github.com/shruti060701/lago-railway) (root: /api) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Alias, resolves to `redis.railway.internal`. |
| `REDISPORT` | Redis | 6379 | Standard Redis port. |
| `REDISUSER` | Redis | default | Default Redis ACL user. |
| `REDIS_URL` | Redis | - | Full connection string, this is what `lago-railway` and `worker` reference via `${{Redis.REDIS_URL}}`. |
| `REDISPASSWORD` | Redis | (secret) |  Alias of `REDIS_PASSWORD`. |
| `REDIS_PASSWORD` | Redis | (secret) | Password portion of the connection string. |
| `REDIS_PUBLIC_URL` | Redis | - | Public (external) connection string, not used by this template since api/worker connect over the private network. |
| `API_URL` | tender-friendship | - | Tells the frontend where the API lives. |
| `APP_ENV` | tender-friendship | production | Standard environment setting. |
| `LAGO_OAUTH_PROXY_URL` | tender-friendship | https://proxy.getlago.com | Lago's own hosted OAuth proxy, used for optional Google SSO login. Hardcoded in Lago's own compose. |
| `POSTGRES_DB` | peaceful-determination | lago | Database name the api/worker services connect to. |
| `POSTGRES_USER` | peaceful-determination | (secret) | Database user. |
| `POSTGRES_PASSWORD` | peaceful-determination | (secret) | **Do not use `${{secret()}}` here** (see Known Findings). Must match the password embedded in `DATABASE_URL` on both `lago-railway` and `worker` exactly. |
| `RAILS_ENV` | lago-railway | production | Standard Rails environment setting. |
| `REDIS_URL` | lago-railway | - | Redis connection string. |
| `DATABASE_URL` | lago-railway | - | Postgres connection string. Uses a literal password, not `${{secret()}}` (see Known Findings). |
| `LAGO_API_URL` | lago-railway | - | Public URL of the API. **Generate the API's domain BEFORE setting this** ([[reference_railway_generate_domain_before_public_domain_vars]]). |
| `LAGO_FRONT_URL` | lago-railway | - | Public URL of the frontend. Same domain-first ordering rule applies. |
| `SECRET_KEY_BASE` | lago-railway | (secret) | Rails secret key, required for the app to boot at all. |
| `RAILS_LOG_TO_STDOUT` | lago-railway | true | Ensures logs are visible via `railway logs`. |
| `LAGO_DISABLE_SEGMENT` | lago-railway | true | Opts out of Lago's own anonymous usage analytics. |
| `LAGO_RSA_PRIVATE_KEY` | lago-railway | - | Signs outgoing webhooks. Must be a real generated key, never the compose file's own placeholder. |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | lago-railway | - | Encrypts sensitive stored data. |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | lago-railway | - | Encrypts sensitive stored data (deterministic mode). |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | lago-railway | - | Salt for the encryption key derivation. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/postgres`
- **Healthcheck:** `/health`

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/lago-1)
