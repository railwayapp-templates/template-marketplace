# Deploy Unleash on Railway

Open-source feature flag platform — a LaunchDarkly alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unleash-railway)

## About

Unleash is an open-source feature management platform that lets teams ship code continuously and decide separately when users see a feature. Instead of long-lived release branches, developers wrap new work in a feature flag, merge it, and control the rollout from a web UI — off for everyone, on for internal testers, on for 5% of traffic, or on everywhere. It is the LaunchDarkly alternative for teams who want progressive delivery without sending user data to a third-party SaaS.

Self-host Unleash on Railway with the full production shape wired up: the `unleash` server (admin UI, admin API and client API), a managed PostgreSQL database holding every flag, strategy, environment and user, an `unleash-edge` caching layer your SDKs connect to instead of the server, and a managed Redis that lets Edge restore its cache after a restart. Applications poll Edge over its public URL; Edge polls the server across Railway's private network; only Edge and the admin UI face the internet.

![Unleash Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786825834/51dd5fea-c9c9-4f35-a620-241a16fd59f9.png)

Unleash separates deployment from release. A flag is defined once, then configured per environment, so the same build can be dark in production while fully on in development. Evaluation happens inside your application through an SDK, so no user attribute leaves your infrastructure.

Key capabilities:

- **Activation strategies** — percentage rollouts with sticky bucketing, user or IP lists, and constraint-based targeting on any context field.
- **Environments** — `development` and `production` ship enabled, each with its own strategies and tokens.
- **SDKs** — Node.js, Java, Go, Rust, Ruby, Python, .NET, PHP, React, Next.js, Vue, iOS, Android and Flutter.
- **Playground** — evaluate a flag against a hand-written context and see why it resolved true or false.
- **Metrics, audit log and REST API** — per-flag usage from connected SDKs, every change recorded, and everything the UI does scriptable with an admin token.

How the services fit together: `unleash` owns all state and serves the admin UI; **PostgreSQL** is that state, so it is the only thing to back up; `unleash-edge` caches flag configuration in memory and answers SDK traffic in under a millisecond; **Redis** reloads that cache after a restart.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| unleash-edge | `unleashorg/unleash-edge:latest` | Web service |
| Redis | `redis:8.2` | Database |
| unleash | `unleashorg/unleash-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | unleash-edge | 3063 | HTTP server listening port |
| `TOKENS` | unleash-edge | (secret) | Token used to fetch flag data |
| `REDIS_URL` | unleash-edge | - | Redis backing the Edge cache |
| `TRUST_PROXY` | unleash-edge | true | Read client IP from forwarded headers |
| `UPSTREAM_URL` | unleash-edge | http://unleash.railway.internal:4242 | Private address of the server |
| `DISABLE_TOKENS_ENDPOINT` | unleash-edge | (secret) | Hide unauthenticated token listing |
| `DISABLE_FEATURES_ENDPOINT` | unleash-edge | true | Hide unauthenticated cached-flag dump |
| `DISABLE_INSTANCE_DATA_ENDPOINT` | unleash-edge | true | Hide unauthenticated instance details |
| `DISABLE_METRICS_BATCH_ENDPOINT` | unleash-edge | true | Hide unauthenticated buffered metrics |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | unleash | 4242 | HTTP server listening port |
| `EDGE_URL` | unleash | - | Edge URL shown in SDK setup |
| `LOG_LEVEL` | unleash | info | Application log verbosity |
| `UNLEASH_URL` | unleash | - | Public base URL for links |
| `DATABASE_SSL` | unleash | false | Private network connection, no TLS |
| `DATABASE_URL` | unleash | - | PostgreSQL connection string |
| `NODE_OPTIONS` | unleash | --max-old-space-size=2048 | Node heap ceiling for the container |
| `SECURE_HEADERS` | unleash | true | Enable HSTS and content security policy |
| `UNLEASH_SECRET` | unleash | (secret) | Session and cookie signing key |
| `DATABASE_POOL_MAX` | unleash | 10 | Maximum pooled database connections |
| `INIT_BACKEND_API_TOKENS` | unleash | (secret) | Seeded server-side SDK token |
| `INIT_FRONTEND_API_TOKENS` | unleash | (secret) | Seeded frontend SDK token |
| `UNLEASH_DEFAULT_ADMIN_PASSWORD` | unleash | (secret) | First administrator password |
| `UNLEASH_DEFAULT_ADMIN_USERNAME` | unleash | (secret) | First administrator username |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/app/unleash-edge edge`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/unleash-railway)
