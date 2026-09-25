# Deploy Sim on Railway

Sim 0.8.59: open-source visual builder for AI agent workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim)

## About

Sim is an open-source platform for building and running AI agent workflows on a visual canvas. You connect LLM blocks, tools, APIs, knowledge bases and more than a hundred integrations, then run workflows on schedules, webhooks or chat, with logs and versioning. It is an alternative to Flowise and n8n for AI-heavy automation.

This template runs the official Sim v0.8.59 images as three services with Railway Postgres (with pgvector) and Redis: `sim` is the app, `realtime` is the socket server for collaborative editing, and `migrations` applies the database schema and exits. Sign-up and login are limited to `SIM_ADMIN_EMAIL`, and a boot script creates that account with a generated password, so strangers cannot register. Encryption, auth and internal secrets are generated. Workflows, logs and credentials live in Postgres. The app needs about 1 GB of RAM. Add your own LLM API keys in the workspace settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| realtime | `ghcr.io/simstudioai/realtime:v0.8.59` | Web service |
| migrations | `ghcr.io/simstudioai/migrations:v0.8.59` | Worker |
| sim | `ghcr.io/simstudioai/simstudio:v0.8.59` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | realtime | 3002 |
| `NODE_ENV` | realtime | production |
| `BETTER_AUTH_SECRET` | realtime | (secret) |
| `INTERNAL_API_SECRET` | realtime | (secret) |
| `PORT` | sim | 3000 |
| `NODE_ENV` | sim | production |
| `SIM_SEED` | sim | // First boot only: create the account for SIM_ADMIN_EMAIL (the only email allowed to sign up).
const base = 'http://127.0.0.1:' + (process.env.PORT || '3000');
for (let i = 0; i < 180; i++) {
  try {
    if ((await fetch(base + '/api/health')).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 1000));
}
const r = await fetch(base + '/api/auth/sign-up/email', {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: process.env.NEXT_PUBLIC_APP_URL },
  body: JSON.stringify({
    email: process.env.SIM_ADMIN_EMAIL,
    password: process.env.SIM_ADMIN_PASSWORD,
    name: process.env.SIM_ADMIN_NAME || 'Admin',
  }),
});
const text = await r.text();
console.log(r.ok ? 'seed: created account ' + process.env.SIM_ADMIN_EMAIL : 'seed: not created (' + r.status + ' ' + text.slice(0, 120) + ')'); |
| `SIM_ADMIN_EMAIL` | sim | admin@example.com |
| `BETTER_AUTH_SECRET` | sim | (secret) |
| `SIM_ADMIN_PASSWORD` | sim | (secret) |
| `INTERNAL_API_SECRET` | sim | (secret) |
| `ALLOWED_LOGIN_EMAILS` | sim | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'cd /app/packages/db && exec bun run db:migrate'`
- **Start command:** `sh -c 'printf "%s\n" "$SIM_SEED" > /tmp/seed.mjs; bun apps/sim/bootstrap.js & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; bun /tmp/seed.mjs & wait $pid'`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sim)
