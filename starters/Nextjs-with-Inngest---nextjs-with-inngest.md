# Deploy Nextjs with Inngest on Railway

Nextjs + Inngest starter template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-with-inngest)

## About

Next.js is a powerful React framework for building modern web applications, while Inngest is an event-driven queue and background job platform. Together, they allow developers to easily build, queue, and execute reliable background tasks, scheduled jobs, and complex workflows directly within their Next.js API routes without managing external worker servers.

Deploying a self-hosted Inngest setup alongside Next.js on Railway involves running both the Next.js application and the open-source Inngest server as separate services within a single project. The Inngest server requires Redis and PostgreSQL backing services to manage state and queues.

The core challenge is establishing secure, reliable communication between the two. The Next.js app must expose an API endpoint (usually `/api/inngest`) and actively sync its available functions with the Inngest server upon deployment. This template simplifies this by configuring the necessary environment variables and a custom startup script to ensure seamless service discovery, authentication, and background execution out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| InngestApp | `inngest/inngest:v1.17.6` | Web service |
| InngestRedis | `redis:8.2.1` | Database |
| nextjs | [darseen/nextjs-inngest](https://github.com/darseen/nextjs-inngest) | Web service |
| InngestPostgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | InngestApp | 8288 | Port |
| `INNGEST_PORT` | InngestApp | 8288 | Inngest port |
| `INNGEST_EVENT_KEY` | InngestApp | - | Inngest event key |
| `INNGEST_REDIS_URI` | InngestApp | - | Redis URL |
| `INNGEST_SIGNING_KEY` | InngestApp | - | Inngest signing key |
| `INNGEST_POSTGRES_URI` | InngestApp | - | Postgres URL |
| `REDISHOST` | InngestRedis | - | Redis host |
| `REDISPORT` | InngestRedis | 6379 | Redis port |
| `REDISUSER` | InngestRedis | default | Redis user |
| `REDIS_URL` | InngestRedis | - | Redis URL |
| `REDISPASSWORD` | InngestRedis | (secret) | Redis passowrd |
| `REDIS_PASSWORD` | InngestRedis | (secret) | Redis passowrd |
| `REDIS_PUBLIC_URL` | InngestRedis | - | Redis public URL |
| `INNGEST_BASE_URL` | nextjs | http://inngestapp.railway.internal:8288 | The Inngest service's internal URL |
| `INNGEST_EVENT_KEY` | nextjs | - | The event key defined in the inngest service |
| `INNGEST_SERVE_PATH` | nextjs | /api/inngest | The Inngest defined API endpoint path in your app |
| `INNGEST_SIGNING_KEY` | nextjs | - | The signing key defined in the inngest service |
| `INNGEST_SERVE_ORIGIN` | nextjs | http://nextjs.railway.internal:8080 | The internal URL of your nextjs service |
| `POSTGRES_DB` | InngestPostgres | railway | Postgres database |
| `DATABASE_URL` | InngestPostgres | - | Database URL |
| `POSTGRES_USER` | InngestPostgres | (secret) | Postgres user |
| `POSTGRES_PASSWORD` | InngestPostgres | (secret) | Postgres password |
| `DATABASE_PUBLIC_URL` | InngestPostgres | - | Database public URL |

## Configuration

- **Start command:** `/bin/sh -c "inngest start --event-key $INNGEST_EVENT_KEY --signing-key $INNGEST_SIGNING_KEY --postgres-uri $INNGEST_POSTGRES_URI --redis-uri $INNGEST_REDIS_URI"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "(node -e \"setTimeout(() => fetch('http://127.0.0.1:8080/api/inngest', { method: 'PUT' }).catch(console.error), 10000)\") & pnpm start"`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/nextjs-with-inngest)
