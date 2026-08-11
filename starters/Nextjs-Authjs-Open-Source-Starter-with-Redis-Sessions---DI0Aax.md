# Deploy Next.js + Auth.js | Open Source Starter with Redis Sessions on Railway

Next.js starter with Auth.js sign-in and Redis-backed sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/DI0Aax)

## About

A Next.js starter with authentication already working: Auth.js for sign-in and sessions, Redis behind an HTTP API for session storage and rate limiting, and an Nx workspace layout ready for a second app or a shared library.

Three services. The Next.js app builds from a Git repository; Redis stores sessions on a persistent volume; and a small HTTP layer in front of Redis speaks the Upstash REST protocol, so the app talks to it with `@upstash/redis` and would work unchanged on an edge runtime later.

Session secrets are generated per deployment and the public URL is wired into the auth configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| http | `ghcr.io/ikatsuba/serverless-redis:latest` | Database |
| nxnext | [IKatsuba/nxnext](https://github.com/IKatsuba/nxnext) | Web service |
| Redis | `redis/redis-stack` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SR_TOKEN` | http | (secret) | Super secret token |
| `REDIS_URL` | http | - | Private Redis URL |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | Private Network Workaround for Alpine-based images |
| `AUTH_URL` | nxnext | - | Site Host |
| `AUTH_SECRET` | nxnext | (secret) | Auth Secret |
| `UPSTASH_REDIS_URL` | nxnext | - | Redis URL |
| `UPSTASH_REDIS_TOKEN` | nxnext | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | nxnext | true | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/DI0Aax)
