# Deploy SparkyFitness | (Just Updated) MyFitnessPal Alternative, Not Claimable by Strangers on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sparkyfitness-v161-or-myfitnesspal-alter)

## About

SparkyFitness is a self-hosted calorie and fitness tracker — a MyFitnessPal alternative you
own. Log food against a searchable database, track exercise, water, weight and body
measurements, keep progress photos, follow custom nutrient goals, and read it all back as
charts. It also ships an MCP server, so an AI assistant can log your meals for you.

This template deploys it **with your account already created and signup closed**. Upstream
leaves registration open and grants administrator to the first account created, so on a
public URL the first stranger to load the page owns the instance. Here the admin account is
written before the server ever binds the port it keeps, from a password Railway generates for
this deployment.

Three services: the React frontend behind nginx, the Node API server, and PostgreSQL. The
frontend is the only public one — the API is reached over Railway's private network, so there
is no second public domain and no request leaving the platform to come back in through the
edge. Food, exercise and measurement history live in PostgreSQL on a volume; profile
pictures, exercise images, check-in photos and database backups live on the API server's own
volume.

First boot runs a hundred-odd SQL migrations, creates the restricted application role, applies
row-level security policies and seeds your account, then starts serving. Redeploys skip
straight to the last step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `ghcr.io/bon5co/sparkyfitness-railway-server:latest` | Database |
| postgres | `postgres:18.3-alpine` | Database |
| web | `ghcr.io/bon5co/sparkyfitness-railway-web:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BETTER_AUTH_SECRET` | server | (secret) |
| `SPARKY_FITNESS_DB_PASSWORD` | server | (secret) |
| `SPARKY_FITNESS_ADMIN_PASSWORD` | server | (secret) |
| `SPARKY_FITNESS_APP_DB_PASSWORD` | server | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/sparkyfitness-v161-or-myfitnesspal-alter)
