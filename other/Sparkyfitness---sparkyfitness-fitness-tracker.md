# Deploy Sparkyfitness on Railway

Track nutrition, workouts, water and weight on your own Railway instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sparkyfitness-fitness-tracker)

## About

SparkyFitness is a self-hosted nutrition and fitness tracker built for households: food logging against a calculated calorie and macro budget, workouts, hydration, sleep, fasting, mood, medications and body measurements, under one account tree with family sharing. It is what people reach for when MyFitnessPal starts charging for barcode scanning and data export — self-host SparkyFitness and every entry stays in your own database.

Deploy SparkyFitness on Railway and you get the project's documented production topology already wired: an nginx web service serving the React app and reverse-proxying the API on the same origin, an API service that migrates and runs the scheduled wearable syncs, and a managed PostgreSQL database. Only the web service gets a public domain, and a volume on the API service persists uploaded photos and backups.

![SparkyFitness Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787076809/ea27fe37-8d66-487e-9782-8dbd8df8ece8.png)

Most tracking apps do one thing well and charge for it, so covering nutrition, training, sleep and body composition means three or four apps per person with no report spanning them. SparkyFitness merges them into one schema, which is what makes cross-domain reporting possible.

- Food logging against Open Food Facts, USDA, FatSecret, Nutritionix, Mealie and Wger, plus barcode scanning
- Strength and cardio logging with presets and the Free Exercise DB
- Hydration, sleep stages, fasting, mood, medication and cycle tracking
- Wearable sync from Apple Health, Health Connect, Fitbit, Garmin, Withings, Polar, Oura and Hevy
- Family accounts with seven granular per-member permissions
- Optional bring-your-own-key AI chat, an MCP endpoint, OIDC sign-on, passkeys, MFA
- CSV import and free export

The deployment splits the app the way upstream's production Compose file does. The **web service** is nginx: it serves the single-page app and proxies `/api`, `/uploads`, `/mcp` and `/health-data` to the API privately, so the browser only ever talks to one origin — which is what keeps the session cookie working. The **API service** migrates on boot and creates its own least-privilege database role.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sparkyfitness | [gridalpha/sparkyfitness-railway](https://github.com/gridalpha/sparkyfitness-railway) | Web service |
| sparkyfitness-server | `codewithcj/sparkyfitness_server:v1.6.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sparkyfitness | 8080 | nginx listening port |
| `NGINX_RATE_LIMIT` | sparkyfitness | 5r/s | Per-client limit on auth routes |
| `NGINX_WORKER_PROCESSES` | sparkyfitness | 2 | nginx worker count |
| `SPARKY_FITNESS_SERVER_HOST` | sparkyfitness | - | Private API hostname |
| `SPARKY_FITNESS_SERVER_PORT` | sparkyfitness | 3010 | API port to proxy to |
| `SPARKY_FITNESS_FRONTEND_URL` | sparkyfitness | - | Public origin for CORS headers |
| `TZ` | sparkyfitness-server | Etc/UTC | Server timezone |
| `PORT` | sparkyfitness-server | 3010 | Health-check port selector |
| `NODE_ENV` | sparkyfitness-server | production | Node runtime mode |
| `BETTER_AUTH_SECRET` | sparkyfitness-server | (secret) | Signs sessions, encrypts TOTP secrets |
| `SPARKY_FITNESS_DB_HOST` | sparkyfitness-server | - | Private Postgres hostname |
| `SPARKY_FITNESS_DB_NAME` | sparkyfitness-server | - | Application database name |
| `SPARKY_FITNESS_DB_PORT` | sparkyfitness-server | - | Postgres port |
| `SPARKY_FITNESS_DB_USER` | sparkyfitness-server | (secret) | Owner account used for migrations |
| `ALLOW_PRIVATE_NETWORK_AI` | sparkyfitness-server | false | Block non-admin AI URLs to internal hosts |
| `SPARKY_FITNESS_LOG_LEVEL` | sparkyfitness-server | INFO | Server log verbosity |
| `ALLOW_PRIVATE_NETWORK_CORS` | sparkyfitness-server | false | Reject private-network browser origins |
| `SPARKY_FITNESS_ADMIN_EMAIL` | sparkyfitness-server | - | Sign up with this email to be admin |
| `SPARKY_FITNESS_APP_DB_USER` | sparkyfitness-server | (secret) | Least-privilege role created at boot |
| `SPARKY_FITNESS_DB_PASSWORD` | sparkyfitness-server | (secret) | Owner account password |
| `SPARKY_FITNESS_SERVER_PORT` | sparkyfitness-server | 3010 | API listening port |
| `SPARKY_FITNESS_FRONTEND_URL` | sparkyfitness-server | - | Public URL for CORS and auth |
| `SPARKY_FITNESS_DISABLE_SIGNUP` | sparkyfitness-server | false | Set true once your accounts exist |
| `SPARKY_FITNESS_APP_DB_PASSWORD` | sparkyfitness-server | (secret) | Password for that role |
| `SPARKY_FITNESS_PUBLIC_API_DOCS` | sparkyfitness-server | false | Keep Swagger behind authentication |
| `SPARKY_FITNESS_FORCE_EMAIL_LOGIN` | sparkyfitness-server | (secret) | Lock-out fail-safe if OIDC misconfigured |
| `SPARKY_FITNESS_API_ENCRYPTION_KEY` | sparkyfitness-server | - | Encrypts stored provider credentials |
| `SPARKY_FITNESS_CUSTOM_BACKUP_DIRECTORY` | sparkyfitness-server | /data/backup | Backup dump path on the volume |
| `SPARKY_FITNESS_CUSTOM_UPLOADS_DIRECTORY` | sparkyfitness-server | /data/uploads | Image storage path on the volume |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'mkdir -p "$SPARKY_FITNESS_CUSTOM_UPLOADS_DIRECTORY" "$SPARKY_FITNESS_CUSTOM_BACKUP_DIRECTORY"; exec ./node_modules/.bin/tsx index.ts'`
- **Healthcheck:** `/api/health`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sparkyfitness-fitness-tracker)
