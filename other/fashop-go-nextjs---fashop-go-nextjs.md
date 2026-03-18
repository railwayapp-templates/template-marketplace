# Deploy fashop (go nextjs) on Railway

Deploy and Host fashop (go nextjs) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fashop-go-nextjs)

## About

**fashop** is a modern full-stack e-commerce template built with Go and Next.js. It provides a scalable backend API written in Go and a fast, SEO-friendly frontend powered by Next.js. The template is designed for building online fashion stores or product showcase platforms with a clean architecture and production-ready setup.

Hosting fashop involves deploying a full-stack web application consisting of a Go backend service and a Next.js frontend. The Go server handles business logic, API endpoints, and database communication, while Next.js delivers a high-performance frontend with server-side rendering and modern UI components.

When deployed on Railway, both services can run in a managed environment with automatic builds, environment variable management, and scalable infrastructure. Railway simplifies the deployment process by handling networking, service orchestration, and runtime configuration, allowing developers to focus on building features instead of managing infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| api | [maithanhduyan/fashop](https://github.com/maithanhduyan/fashop) (root: /apps/api/) | TCP service |
| web | [maithanhduyan/fashop](https://github.com/maithanhduyan/fashop) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | api | 8080 | - |
| `JWT_SECRET` | api | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 8080

**Category:** Other · **Languages:** TypeScript, Go, CSS, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/fashop-go-nextjs)
