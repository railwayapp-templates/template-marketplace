# Deploy Leaderboard on Railway

Real-time leaderboard with Next.js, Node.js, Socket.io, and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/leaderboard)

## About

A full-stack real-time leaderboard app with live score updates via WebSockets.

This template deploys three services on Railway: a Node.js/Express/Socket.io API backend, a Next.js frontend, and a Redis database. The backend handles score submissions and real-time broadcasting via WebSockets. Redis stores sorted sets for fast rank lookups. The frontend connects to both the REST API and the Socket.io server to display live-updating scores. All services are pre-wired with reference variables so they connect automatically on first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| leaderboard | [dannysummers/leaderboard](https://github.com/dannysummers/leaderboard) (root: backend) | Web service |
| Frontend | [dannysummers/leaderboard](https://github.com/dannysummers/leaderboard) (root: frontend) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | leaderboard | 8080 | - |
| `NODE_ENV` | leaderboard | production | - |
| `DEMO_MODE` | leaderboard | true | - |
| `MAX_SCORE` | leaderboard | 999999 | - |
| `MIN_SCORE` | leaderboard | 100 | - |
| `ADMIN_API_KEY` | leaderboard | (secret) | - |
| `DEMO_INTERVAL` | leaderboard | 5000 | - |
| `NODE_ENV` | Frontend | production | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/leaderboard)
