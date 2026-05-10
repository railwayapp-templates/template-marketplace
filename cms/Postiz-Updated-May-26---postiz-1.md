# Deploy Postiz [Updated May '26] on Railway

Postiz [May '26] (Schedule Posts to X, LinkedIn & Reddit) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-1)

## About

Postiz is an open-source social media scheduling platform. It lets you plan, publish, and analyze posts across Twitter, LinkedIn, Reddit, Facebook, TikTok, and more. Think Buffer or Hootsuite, but you own the data. There are no per-channel fees.

Why pay $60 per month for Buffer's Team plan when you don't have to? Postiz self-hosted on Railway costs ~$5-10 per month with unlimited channels and accounts. That's a ~$600 per year saving for a single user. For a five-person marketing team, the gap widens to $3,000 per year.

This template deploys Postiz with managed PostgreSQL and Redis. Auto-generated JWT secrets and a public HTTPS domain come pre-wired. Railway handles SSL, container restarts, and private networking. You don't touch infrastructure. Your social tokens, post data, and analytics stay on your own instance. No third-party tracking. No usage caps. Scaling up is a slider away if your audience grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postiz | `ghcr.io/gitroomhq/postiz-app:v2.11.3` | Web service |
| Redis | `redis:8.2.1` | Database |
| Redis-ji9v | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | postiz | 5000 |
| `IS_GENERAL` | postiz | true |
| `JWT_SECRET` | postiz | (secret) |
| `STORAGE_PROVIDER` | postiz | local |
| `UPLOAD_DIRECTORY` | postiz | /uploads |
| `BACKEND_INTERNAL_URL` | postiz | http://localhost:3000 |
| `DISABLE_REGISTRATION` | postiz | false |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT` | Redis-ji9v | 6379 |
| `REDISUSER` | Redis-ji9v | default |
| `REDISPASSWORD` | Redis-ji9v | (secret) |
| `REDIS_PASSWORD` | Redis-ji9v | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/postiz-1)
