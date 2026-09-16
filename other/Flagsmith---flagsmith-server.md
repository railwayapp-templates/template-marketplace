# Deploy Flagsmith on Railway

Feature flag and remote config platform with SDKs for 20 languages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flagsmith-server)

## About

Flagsmith is an open-source feature flag, remote config and A/B testing platform. Teams use it to ship code behind a switch: merge with the feature off, turn it on for one beta customer, roll it out to ten percent of traffic, kill it from a dashboard when something breaks — no redeploy. It doubles as remote config, so values like a ranking model name or a rate limit live outside your build. SDKs cover roughly twenty languages, and self-hosting Flagsmith keeps every evaluation, identity and trait on infrastructure you control.

This template runs the production shape, not a single container. **flagsmith** serves the REST API and the React dashboard on one public domain. **flagsmith-task-processor** is a private worker draining the async queue — audit records, environment-document rebuilds, webhooks and e-mail — so a dashboard toggle returns immediately. **Postgres** holds flags, identities, segments and the API analytics. **Redis** is the shared cache tier for environment objects, documents and rate-limit buckets, so a flag change invalidates once rather than once per process.

![Diagram of the Flagsmith web, task processor, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789367770/flagsmith-architecture.webp)

Flagsmith separates the decision to release from the act of deploying. Code checks a flag; its value lives in Flagsmith, scoped to a project, an environment, a segment or one named identity. Teams self-host it when evaluation touches user data they cannot send to a vendor, or when they want their own latency profile.

Key features:

- Boolean flags and remote config values, versioned per environment
- Segments: rules over user traits (plan, country, app version)
- Identity overrides that pin one user to a value
- Percentage rollouts and multivariate flags for A/B tests
- Change requests, scheduled changes, and local-evaluation SDKs

The four services divide cleanly. `flagsmith` owns HTTP — dashboard, admin API, SDK endpoints — plus migrations on every boot. `flagsmith-task-processor` runs the same image with a different entry point and no public domain: it waits for migrations, then polls Postgres for queued tasks. Postgres is the system of record and stores API usage analytics, keeping InfluxDB out of the topology. Redis caches the environment document, so SDKs polling every sixty seconds hit Postgres once per TTL rather than once per poll.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| flagsmith | `flagsmith/flagsmith:latest` | Web service |
| Redis | `redis:8.2` | Database |
| flagsmith-task-processor | `flagsmith/flagsmith:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | flagsmith | 8000 | Health-check port; app binds 8000 |
| `ADMIN_EMAIL` | flagsmith | admin@example.com | Login identity of the first superuser |
| `ENVIRONMENT` | flagsmith | production | Runtime environment label |
| `DATABASE_URL` | flagsmith | - | Postgres connection string |
| `EMAIL_BACKEND` | flagsmith | django.core.mail.backends.console.EmailBackend | Log mail until SMTP is configured |
| `TASK_RUN_METHOD` | flagsmith | TASK_PROCESSOR | Send async work to the worker service |
| `FLAGSMITH_DOMAIN` | flagsmith | - | Host used in invite and reset links |
| `GUNICORN_TIMEOUT` | flagsmith | 300 | Worker timeout in seconds |
| `DJANGO_SECRET_KEY` | flagsmith | (secret) | Django signing key, must stay stable |
| `DJANGO_ALLOWED_HOSTS` | flagsmith | * | Railway's edge routes strictly by Host |
| `ENVIRONMENT_CACHE_BACKEND` | flagsmith | django_redis.cache.RedisCache | Shared environment-object cache |
| `ENVIRONMENT_CACHE_LOCATION` | flagsmith | - | Redis database 0 |
| `USE_POSTGRES_FOR_ANALYTICS` | flagsmith | true | Store analytics in Postgres, not InfluxDB |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | flagsmith | - | Trusted origin for dashboard POSTs |
| `USER_THROTTLE_CACHE_BACKEND` | flagsmith | django_redis.cache.RedisCache | Shared rate-limit buckets |
| `USER_THROTTLE_CACHE_LOCATION` | flagsmith | - | Redis database 2 |
| `ALLOW_ADMIN_INITIATION_VIA_CLI` | flagsmith | true | Seed superuser, organisation and project at boot |
| `ALLOW_ADMIN_INITIATION_VIA_URL` | flagsmith | false | Close the anonymous admin-creation endpoint |
| `ALLOW_REGISTRATION_WITHOUT_INVITE` | flagsmith | false | Close public sign-up |
| `CACHE_ENVIRONMENT_DOCUMENT_BACKEND` | flagsmith | django_redis.cache.RedisCache | Shared environment-document cache |
| `CACHE_ENVIRONMENT_DOCUMENT_SECONDS` | flagsmith | 60 | Environment-document cache TTL |
| `CACHE_ENVIRONMENT_DOCUMENT_LOCATION` | flagsmith | - | Redis database 1 |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | flagsmith-task-processor | 8000 | Health-check port; app binds 8000 |
| `ENVIRONMENT` | flagsmith-task-processor | production | Runtime environment label |
| `DATABASE_URL` | flagsmith-task-processor | - | Postgres connection string |
| `EMAIL_BACKEND` | flagsmith-task-processor | django.core.mail.backends.console.EmailBackend | Log mail until SMTP is configured |
| `TASK_RUN_METHOD` | flagsmith-task-processor | TASK_PROCESSOR | Marks this process as the worker tier |
| `FLAGSMITH_DOMAIN` | flagsmith-task-processor | - | Host used in mailed links |
| `DJANGO_SECRET_KEY` | flagsmith-task-processor | (secret) | Same signing key as the API |
| `DJANGO_ALLOWED_HOSTS` | flagsmith-task-processor | * | Health prober sends its own Host |
| `ENVIRONMENT_CACHE_BACKEND` | flagsmith-task-processor | django_redis.cache.RedisCache | Shared environment-object cache |
| `ENVIRONMENT_CACHE_LOCATION` | flagsmith-task-processor | - | Redis database 0 |
| `USE_POSTGRES_FOR_ANALYTICS` | flagsmith-task-processor | true | Store analytics in Postgres, not InfluxDB |
| `CACHE_ENVIRONMENT_DOCUMENT_BACKEND` | flagsmith-task-processor | django_redis.cache.RedisCache | Shared environment-document cache |
| `CACHE_ENVIRONMENT_DOCUMENT_SECONDS` | flagsmith-task-processor | 60 | Environment-document cache TTL |
| `CACHE_ENVIRONMENT_DOCUMENT_LOCATION` | flagsmith-task-processor | - | Redis database 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/readiness/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'flagsmith waitfordb --migrations --waitfor 900 && exec flagsmith start task-processor'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/flagsmith-server)
