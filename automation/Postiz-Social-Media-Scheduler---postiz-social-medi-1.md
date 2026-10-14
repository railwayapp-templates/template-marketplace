# Deploy Postiz Social Media Scheduler on Railway

Open-source social media scheduler Postiz release with automatic updates.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-social-medi-1)

## About

Postiz is an open-source social media scheduler. Write a post once, schedule it for X, LinkedIn, Bluesky, Mastodon, Instagram, Facebook, Threads, YouTube, TikTok, Reddit and more than 20 other networks, and let Postiz publish it on time. It includes a calendar, team workspaces, analytics, a public API and an MCP server for AI agents.

This template runs Postiz with everything it needs: the Postiz app, a Temporal server that schedules and publishes posts, Postgres and Redis. Your account is created on first boot from the email you enter and a generated password, and sign-ups stay closed, so nobody else can claim your instance.

After deploying, open the Postiz URL and sign in with `POSTIZ_ADMIN_EMAIL` and `POSTIZ_ADMIN_PASSWORD` from the Postiz service's Variables tab. Then add channels: each social network needs a developer app whose keys you set as variables on the Postiz service.

The template pins the Postiz and Temporal versions. A GitHub Action picks up new Postiz releases the same day, runs the full stack through a smoke test, and only then publishes the update. Railway then shows an "update available" notice in your project, and you apply it when it suits you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Temporal | [aimranov27/postiz-railway](https://github.com/aimranov27/postiz-railway) (root: /temporal) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Postiz | [aimranov27/postiz-railway](https://github.com/aimranov27/postiz-railway) (root: /postiz) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_PORT` | Temporal | - | Postgres port. |
| `POSTGRES_PWD` | Temporal | - | Postgres password. |
| `POSTGRES_USER` | Temporal | (secret) | Postgres user. Needs permission to create databases. |
| `POSTGRES_SEEDS` | Temporal | - | Postgres host. Temporal keeps its data in the `temporal` and `temporal_visibility` databases there. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `MAIN_URL` | Postiz | - | Public URL of Postiz. |
| `RUN_CRON` | Postiz | true | Checks every hour for posts that were missed in the last three hours and publishes them. |
| `REDIS_URL` | Postiz | - | Redis connection string. |
| `JWT_SECRET` | Postiz | (secret) | Signs login sessions. Changing it logs everyone out. |
| `DATABASE_URL` | Postiz | - | Postgres connection string. |
| `FRONTEND_URL` | Postiz | - | Public URL of the Postiz web app. Also the base of OAuth redirect URLs. |
| `OPENAI_API_KEY` | Postiz | (secret) | Optional. OpenAI API key for Postiz's AI features. |
| `TEMPORAL_ADDRESS` | Postiz | - | Temporal server on the private network. |
| `POSTIZ_ADMIN_EMAIL` | Postiz | - | Email for your Postiz account. It is created on first boot, before the public URL opens. |
| `DISABLE_REGISTRATION` | Postiz | true | Allows only one sign-up, the account above. Set to false to let team members sign up. |
| `POSTIZ_ADMIN_PASSWORD` | Postiz | (secret) | Password for your Postiz account. Generated for you. Change it later in Postiz's settings, not here. |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | - | Public URL of the Postiz API. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Healthcheck:** `/api/v1/namespaces/default`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/postiz-social-medi-1)
