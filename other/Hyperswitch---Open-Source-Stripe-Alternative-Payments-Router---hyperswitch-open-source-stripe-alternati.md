# Deploy Hyperswitch - Open-Source Stripe Alternative (Payments Router) on Railway

Self-host Hyperswitch on Railway. Open-source Stripe alternative in Rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hyperswitch-open-source-stripe-alternati)

## About

Hyperswitch is a production-grade open-source payments orchestrator built in Rust by Juspay. It unifies 100+ payment processors (Stripe, Adyen, Checkout.com, PayPal, Braintree...) behind one API, with smart routing, automatic retries, cost observability, and a self-hosted control center — a true open alternative to closed orchestration platforms.

This template deploys the complete Hyperswitch stack on Railway, fully self-hosted with zero external dependencies. It provisions five services: the Rust payments router (with automatic Postgres migrations), the Control Center admin dashboard, the Web Checkout SDK (compiled from source with your Railway URLs baked in), Postgres, and a private Redis. All services are pre-wired through Railway's internal networking and use generated secrets, making the deploy reproducible and secure by default. After deploy, create your admin account, connect a payment processor, configure routing, and start accepting payments through a unified API or the embedded checkout.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hyperswitch-control-center | `juspaydotin/hyperswitch-control-center` | Web service |
| hyperswitch-router | [XavTo/Hyperswitch](https://github.com/XavTo/Hyperswitch) | Web service |
| Redis | `redis:7-alpine` | Database |
| hyperswitch-web | [XavTo/hyperswitch-web](https://github.com/XavTo/hyperswitch-web) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `default__server__host` | hyperswitch-control-center | 0.0.0.0 | Bind address inside the container, must stay 0.0.0.0 for Railway to route traffic |
| `default__server__port` | hyperswitch-control-center | 9000 | Internal port the Control Center listens on, exposed via Railway target port |
| `default__features__email` | hyperswitch-control-center | false | Disable email-based features (password reset, invites) since no SMTP is configured in this template |
| `default__endpoints__api_url` | hyperswitch-control-center | - | Public URL of the Hyperswitch router service, used by the Control Center frontend to call the API |
| `default__endpoints__sdk_url` | hyperswitch-control-center | - | Public URL of the Web SDK loader, used by the Control Center to embed the checkout preview |
| `ROUTER__REDIS__HOST` | hyperswitch-router | - | Redis host on private network |
| `ROUTER__REDIS__PORT` | hyperswitch-router | 6379 | Redis port |
| `ROUTER__SERVER__HOST` | hyperswitch-router | 0.0.0.0 | Bind address for Railway |
| `ROUTER__SERVER__PORT` | hyperswitch-router | 8080 | Internal port |
| `ROUTER__USER__BASE_URL` | hyperswitch-router | - | Public URL for user redirects |
| `ROUTER__SERVER__WORKERS` | hyperswitch-router | 4 | Worker threads count |
| `ROUTER__REDIS__POOL_SIZE` | hyperswitch-router | 5 | Redis connection pool size |
| `ROUTER__SERVER__BASE_URL` | hyperswitch-router | - | Public URL of the router |
| `ROUTER__ANALYTICS__SOURCE` | hyperswitch-router | sqlx | Analytics backend (Postgres, no ClickHouse needed) |
| `ROUTER__REDIS__DEFAULT_TTL` | hyperswitch-router | 300 | Default cache TTL in seconds |
| `ROUTER__LOCKER__MOCK_LOCKER` | hyperswitch-router | true | Mock PCI vault for dev/test only |
| `ROUTER__LOG__CONSOLE__LEVEL` | hyperswitch-router | INFO | Log verbosity |
| `ROUTER__SECRETS__JWT_SECRET` | hyperswitch-router | (secret) | Auto-generated JWT signing secret |
| `ROUTER__USER__FORCE_COOKIES` | hyperswitch-router | false | Use Bearer header instead of cookies (cross-domain safe) |
| `ROUTER__REDIS__AUTO_PIPELINE` | hyperswitch-router | true | Pipeline Redis commands for perf |
| `ROUTER__ANALYTICS__SQLX__HOST` | hyperswitch-router | - | Analytics DB host |
| `ROUTER__ANALYTICS__SQLX__PORT` | hyperswitch-router | 5432 | Analytics DB port |
| `ROUTER__LOG__CONSOLE__ENABLED` | hyperswitch-router | true | Enable stdout logging |
| `ROUTER__MASTER_DATABASE__HOST` | hyperswitch-router | - | Main DB host |
| `ROUTER__MASTER_DATABASE__PORT` | hyperswitch-router | 5432 | Main DB port |
| `ROUTER__REDIS__MAX_FEED_COUNT` | hyperswitch-router | 200 | Max items per Redis stream read |
| `ROUTER__LOCKER__LOCKER_ENABLED` | hyperswitch-router | false | Disable real card vault |
| `ROUTER__REDIS__CLUSTER_ENABLED` | hyperswitch-router | false | Single-node Redis mode |
| `ROUTER__REDIS__REQUEST_TIMEOUT` | hyperswitch-router | 5 | Redis request timeout in seconds |
| `ROUTER__REPLICA_DATABASE__HOST` | hyperswitch-router | - | Read replica host (same as master here) |
| `ROUTER__REPLICA_DATABASE__PORT` | hyperswitch-router | 5432 | Read replica port |
| `ROUTER__SECRETS__ADMIN_API_KEY` | hyperswitch-router | (secret) | Auto-generated admin API key |
| `ROUTER__USER__TOTP_ISSUER_NAME` | hyperswitch-router | Hyperswitch | 2FA issuer name shown in authenticator apps |
| `ROUTER__ANALYTICS__SQLX__DBNAME` | hyperswitch-router | - | Analytics DB name |
| `ROUTER__MASTER_DATABASE__DBNAME` | hyperswitch-router | - | Main DB name |
| `ROUTER__SECRETS__MASTER_ENC_KEY` | hyperswitch-router | (secret) | Auto-generated encryption master key |
| `ROUTER__LOG__CONSOLE__LOG_FORMAT` | hyperswitch-router | json | Structured JSON logs |
| `ROUTER__REDIS__STREAM_READ_COUNT` | hyperswitch-router | 1 | Redis stream read batch size |
| `ROUTER__REPLICA_DATABASE__DBNAME` | hyperswitch-router | - | Read replica DB name |
| `ROUTER__ANALYTICS__SQLX__PASSWORD` | hyperswitch-router | (secret) | Analytics DB password |
| `ROUTER__ANALYTICS__SQLX__USERNAME` | hyperswitch-router | (secret) | Analytics DB user |
| `ROUTER__MASTER_DATABASE__PASSWORD` | hyperswitch-router | (secret) | Main DB password |
| `ROUTER__MASTER_DATABASE__USERNAME` | hyperswitch-router | (secret) | Main DB user |
| `ROUTER__REDIS__USE_LEGACY_VERSION` | hyperswitch-router | false | Use modern Redis protocol (RESP3) |
| `ROUTER__ANALYTICS__SQLX__POOL_SIZE` | hyperswitch-router | 3 | Analytics connection pool size |
| `ROUTER__MASTER_DATABASE__POOL_SIZE` | hyperswitch-router | 5 | Main DB connection pool size |
| `ROUTER__REPLICA_DATABASE__PASSWORD` | hyperswitch-router | (secret) | Read replica password |
| `ROUTER__REPLICA_DATABASE__USERNAME` | hyperswitch-router | (secret) | Read replica user |
| `ROUTER__SERVER__REQUEST_BODY_LIMIT` | hyperswitch-router | 16384 | Max request body size in bytes |
| `ROUTER__REDIS__UNRESPONSIVE_TIMEOUT` | hyperswitch-router | 10 | Redis health check timeout |
| `ROUTER__REPLICA_DATABASE__POOL_SIZE` | hyperswitch-router | 5 | Read replica connection pool size |
| `ROUTER__USER__FORCE_TWO_FACTOR_AUTH` | hyperswitch-router | false | Disable mandatory 2FA for users |
| `ROUTER__SECRETS__RECON_ADMIN_API_KEY` | hyperswitch-router | (secret) | Auto-generated reconciliation admin key |
| `ROUTER__REDIS__MAX_IN_FLIGHT_COMMANDS` | hyperswitch-router | 5000 | Max concurrent Redis commands |
| `ROUTER__REDIS__DEFAULT_COMMAND_TIMEOUT` | hyperswitch-router | 30 | Default Redis command timeout |
| `ROUTER__USER__PASSWORD_VALIDITY_IN_DAYS` | hyperswitch-router | (secret) | Password expiry policy |
| `ROUTER__REDIS__DISABLE_AUTO_BACKPRESSURE` | hyperswitch-router | false | Enable Redis backpressure handling |
| `ROUTER__ANALYTICS__SQLX__CONNECTION_TIMEOUT` | hyperswitch-router | 10 | Analytics DB connect timeout |
| `ROUTER__MASTER_DATABASE__CONNECTION_TIMEOUT` | hyperswitch-router | 10 | Main DB connect timeout |
| `ROUTER__REPLICA_DATABASE__CONNECTION_TIMEOUT` | hyperswitch-router | 10 | Read replica connect timeout |
| `ROUTER__USER__TWO_FACTOR_AUTH_EXPIRY_IN_SECS` | hyperswitch-router | 300 | 2FA code validity duration |
| `PORT` | hyperswitch-web | 9050 | Internal port served by http-server |
| `envSdkUrl` | hyperswitch-web | - | Public URL of this Web SDK service, baked into the bundle at build time |
| `envBackendUrl` | hyperswitch-web | - | Public URL of the router, baked into the SDK so it calls your own backend |
| `POSTGRES_DB` | Postgres | railway | Default database name created on first boot |
| `DATABASE_URL` | Postgres | - | Internal connection string for other Railway services |
| `POSTGRES_USER` | Postgres | (secret) | Default superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated 32-char password |
| `DATABASE_PUBLIC_URL` | Postgres | - | External connection string for tools like psql or pgAdmin |

## Configuration

- **Start command:** `node dist/server/server.js`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/entrypoint.sh`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, PLpgSQL, Dockerfile, ReScript, JavaScript, TypeScript, CSS, HTML, Makefile

[View on Railway →](https://railway.com/deploy/hyperswitch-open-source-stripe-alternati)
