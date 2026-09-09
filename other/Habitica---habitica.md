# Deploy Habitica on Railway

Gamified habit tracking, dailies, to-dos, parties and challenges

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/habitica)

## About

Habitica turns the boring parts of a day into a role-playing game. Habits, dailies and to-dos sit on one board, and finishing them earns experience, gold and loot for a pixel-art avatar that levels up, learns a class and takes damage when you skip a daily. Open source since 2013, it is used by students, ADHD communities and anyone who has bounced off a plain checklist. Self-host Habitica to keep your task list and streak history on your own infrastructure.

This template deploys Habitica on Railway as three services. **habitica** builds the Node.js API and the Vue web client from upstream source and serves both on one public domain. **mongo** runs MongoDB 7 as a single-member replica set with keyfile authentication on a persistent volume — Habitica's change streams and transactions require one. **Redis** backs the API rate limiter. Only the app service is reachable publicly, and the site sits behind HTTP basic auth by default, because Habitica has no setting for closing registration.

![Diagram of the Habitica, MongoDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788855635/habitica-architecture.png)

Habitica is a habit tracker, to-do list and daily planner wrapped in a lightweight RPG. Its premise is that a reward loop beats willpower: completed tasks pay experience and gold, missed dailies cost health, and gold buys equipment, pets and rewards you define yourself. Key features:

- Habits, dailies, to-dos and custom rewards on one board, with tags, checklists and due dates
- An avatar with health, experience, levels, classes, equipment, pets and mounts
- Parties and guilds for shared quests, plus challenges that push a task list to members
- A REST API (v3 and v4) with per-user keys, which community tools are built on
- Data export, and an admin panel for user support and moderation

The app service holds no state and can be redeployed freely; MongoDB owns everything durable on its volume, and Redis holds only rate-limiter counters.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| habitica | [gridalpha/habitica-railway](https://github.com/gridalpha/habitica-railway) | Web service |
| Redis | `redis:8.2` | Database |
| mongo | [gridalpha/habitica-railway](https://github.com/gridalpha/habitica-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | habitica | - | Public URL the app links to |
| `REDIS_HOST` | habitica | - | Rate limiter Redis host |
| `REDIS_PORT` | habitica | - | Rate limiter Redis port |
| `NODE_DB_URI` | habitica | - | MongoDB replica set connection string |
| `ADMIN_USERNAME` | habitica | (secret) | Habitica account promoted to admin panel |
| `REDIS_PASSWORD` | habitica | (secret) | Rate limiter Redis password |
| `SESSION_SECRET` | habitica | (secret) | Signs the session cookie |
| `SESSION_SECRET_KEY` | habitica | (secret) | AES-256-GCM key for signed links |
| `RATE_LIMITER_ENABLED` | habitica | true | Per-IP API rate limiting via Redis |
| `SITE_HTTP_AUTH_ENABLED` | habitica | true | Site-wide HTTP basic auth gate |
| `SITE_HTTP_AUTH_PASSWORDS` | habitica | (secret) | Comma-separated gate passwords |
| `SITE_HTTP_AUTH_USERNAMES` | habitica | (secret) | Comma-separated gate usernames |
| `ENABLE_CONSOLE_LOGS_IN_PROD` | habitica | true | Required or nothing is logged |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mongo | 8080 | Health endpoint port, not MongoDB |
| `PRIVATE_URL` | mongo | mongo.railway.internal:27017 | Private address for the app |
| `MONGO_KEYFILE_SEED` | mongo | - | Derives the replica-set keyfile |
| `MONGO_INITDB_DATABASE` | mongo | habitica | Database created on first boot |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Root password, first boot only |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Root user created on first boot |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/habitica)
