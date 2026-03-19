# Deploy FastAPI + Clerk + Supabase + Redis on Railway

Python API with Clerk auth, Supabase, and Redis caching

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-clerk-supabase-redis)

## About

Most developers waste their first week rebuilding the same backend: auth, database wiring, caching, and deployment. Skip all of it.

LaunchStack is your backend foundation. A fully working, production-ready FastAPI backend with authentication, PostgreSQL, and Redis. Deployed and live on Railway in under a minute.

No setup spiral. No boilerplate fatigue. Just a backend that works.

Everything is already connected, configured, and running.

Authentication that just works. Clerk JWT auth is fully wired. Works instantly with SwiftUI, React, Next.js, React Native, Flutter, Vue, Angular, and more. No auth logic to write. Just verify tokens and go.

A real production database. Supabase PostgreSQL with built-in REST API, Row Level Security, and a generous free tier. Already integrated and ready to query.

Blazing fast caching. Redis is automatically provisioned on Railway. Sub-millisecond response times for repeated requests with configurable TTL per endpoint.

Live API playground. Swagger UI at /docs. Test everything instantly without touching Postman.

Built-in reliability. Health checks at /health so Railway can auto-restart your service if anything breaks.

Working API patterns. Prebuilt CRUD endpoints showing authentication, caching, and database queries working together. Copy and extend for your own features.

Built to scale. Async FastAPI with uvicorn. Handles concurrency out of the box and scales horizontally as your traffic grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LaunchStack | [pwdtsrfvyn-oss/fastapi-clerk-supabase-starter](https://github.com/pwdtsrfvyn-oss/fastapi-clerk-supabase-starter) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SUPABASE_URL` | LaunchStack | - | Your Supabase project URL (Settings > API) |
| `CLERK_JWKS_URL` | LaunchStack | - | Clerk JWKS URL (API Keys > Advanced) |
| `SUPABASE_SERVICE_KEY` | LaunchStack | - | Supabase service role key (Settings > API) |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/fastapi-clerk-supabase-redis)
