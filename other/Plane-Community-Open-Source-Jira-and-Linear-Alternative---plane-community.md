# Deploy Plane Community | Open-Source Jira and Linear Alternative on Railway

Plane project tracker with a Railway bucket and an admin ready on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-community)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/plane-community?utm_medium=integration&utm_source=button&utm_campaign=plane-community)

[Plane](https://plane.so/) is the open-source project tracker: work items, cycles (sprints), modules, a wiki with real-time collaborative pages, saved views, intake and analytics, in a fast keyboard-first interface. This template runs Plane Community Edition 1.4.2 on Plane's official all-in-one image with Postgres, Redis, RabbitMQ and a Railway bucket, and creates your admin account on first boot, so Plane's instance setup page is never open to whoever finds the URL first.

The stack is four services and a bucket: Plane, Postgres, Redis, RabbitMQ and the Uploads bucket.

- **One Plane service, upstream's own image.** The web app, API, background workers, scheduler, real-time editor server and proxy run together in Plane's all-in-one image, pinned to 1.4.2. There is one deploy to watch and one set of logs.
- **Admin ready, god mode closed.** Plane's instance settings at `/god-mode` belong to whoever opens them first. Here the first boot creates the admin from your email and a generated password, so there is nothing to claim.
- **Uploads in a Railway bucket.** Attachments, images and covers go straight from the browser to the bundled bucket. There is no MinIO service to size, back up or keep an image for.
- **Sized for Railway.** Upstream starts one background worker process per CPU the container can see: dozens on Railway's hosts, about 150 MB each. This template runs two, so Plane idles around 0.8 GB instead of several GB.
- **Logs where you look for them.** The all-in-one image writes every process's log to files inside the container; here they go to Railway's log view.
- **Closed sign-up.** Only people you invite to a workspace can create an account.
- **Upgrades that migrate themselves.** Every boot runs Plane's database migrations before serving.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ | `rabbitmq:4.1.8-alpine` | Database |
| Plane | [nomideusz/plane-railway](https://github.com/nomideusz/plane-railway) (root: /plane) | Web service |
| Redis | `redis:8.10.2-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Auto-generated RabbitMQ password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | RabbitMQ user |
| `RABBITMQ_DEFAULT_VHOST` | RabbitMQ | plane | RabbitMQ virtual host |
| `PORT` | Plane | 80 | Port Plane's built-in proxy listens on - leave as is |
| `AMQP_URL` | Plane | - | RabbitMQ task queue on the private network |
| `REDIS_URL` | Plane | - | Redis cache on the private network |
| `AWS_REGION` | Plane | - | Railway bucket region |
| `SECRET_KEY` | Plane | (secret) | Signs sessions - changing it logs everyone out |
| `DOMAIN_NAME` | Plane | - | Domain Plane is served on - set it to your custom domain after adding one |
| `APP_PROTOCOL` | Plane | https | Railway serves the domain over HTTPS |
| `DATABASE_URL` | Plane | - | Postgres on the private network |
| `ENABLE_SIGNUP` | Plane | 0 | First boot only: 0 lets only people you invite sign up, 1 lets anyone. Later, change it in /god-mode |
| `FILE_SIZE_LIMIT` | Plane | 52428800 | Largest attachment in bytes (50 MB) |
| `TRUSTED_PROXIES` | Plane | 0.0.0.0/0 ::/0 | Trust Railway's edge for the client IP and HTTPS headers |
| `AWS_ACCESS_KEY_ID` | Plane | - | Railway bucket access key |
| `PLANE_ADMIN_EMAIL` | Plane | - | Your email - the admin login for Plane and its /god-mode settings, created on first boot |
| `AWS_S3_BUCKET_NAME` | Plane | - | Railway bucket for attachments, images and exports |
| `PLANE_ORGANIZATION` | Plane | My Company | Instance name shown in /god-mode |
| `AWS_S3_ENDPOINT_URL` | Plane | - | Railway bucket endpoint |
| `PLANE_ADMIN_PASSWORD` | Plane | (secret) | Admin password, set on first boot only - copy it from here to log in, then change it in Plane |
| `AWS_SECRET_ACCESS_KEY` | Plane | (secret) | Railway bucket secret key |
| `LIVE_SERVER_SECRET_KEY` | Plane | (secret) | Shared secret between the API and the real-time editor server |
| `CELERY_WORKER_CONCURRENCY` | Plane | 2 | Background worker processes, ~150 MB each. Upstream's default of one per CPU means dozens on Railway |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `POSTGRES_DB` | Postgres | plane | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/api/instances/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save '' --appendonly no"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/plane-community)
