# Deploy GrowthBook | Open Source LaunchDarkly Alternative on Railway on Railway

Self Host GrowthBook: Feature Flags, A/B Testing & Analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/self-host-growthbook)

## About

GrowthBook is an open-source feature flagging, A/B testing, and product analytics platform — the self-hosted alternative to LaunchDarkly and Statsig used by teams who want full data control and warehouse-native experimentation without per-seat pricing surprises. 

Deploy GrowthBook on Railway with this template and you get the full stack pre-wired.

The app bundles a NextJS front-end, an ExpressJS API, and a Python stats engine into a single Docker image. This template handles the multi-service orchestration so you can self-host GrowthBook on Railway in minutes, not hours.

---

GrowthBook is a warehouse-native experimentation platform. Unlike tools that store your event data on their servers, GrowthBook queries your existing data warehouse directly — your data stays where it already lives. It was built for teams that run serious experiments and want statistical rigour (CUPED, Sequential testing, Bayesian analysis, Bandits, SRM checks) without building an in-house platform.

**Key features:**
- Feature flags with advanced targeting, gradual rollouts, and percentage-based splits
- A/B testing with a world-class stats engine — CUPED, Sequential, Bayesian, Bandit support
- Warehouse-native: queries BigQuery, Snowflake, Redshift, Databricks, Postgres, and more
- 24+ SDKs — React, Node, Python, Go, iOS, Android, PHP, Ruby, and more
- Visual editor for no-code experiment setup
- OpenFeature-compatible for vendor-neutral flag evaluation

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GrowthBook | `growthbook/growthbook:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GrowthBook | 3000 | HTTP server listening port |
| `API_HOST` | GrowthBook | - | Public API service base URL (reset after generating domain – see template overview: https://railway.com/deploy/self-host-growthbook) |
| `NODE_ENV` | GrowthBook | production | Application runtime environment mode |
| `APP_ORIGIN` | GrowthBook | - | Intentionally empty. For now set to `${{RAILWAY_PUBLIC_DOMAIN}}`, but ⚠️ you won't be able to access the UI without setting this up correctly — read the overview after deployment for steps: https://railway.com/deploy/self-host-growthbook |
| `JWT_SECRET` | GrowthBook | (secret) | Secret for signing authentication tokens |
| `MONGODB_URI` | GrowthBook | - | MongoDB connection string for GrowthBook |
| `BACKEND_PORT` | GrowthBook | 3100 | Internal backend service port |
| `UPLOAD_METHOD` | GrowthBook | local | File upload storage backend |
| `ENCRYPTION_KEY` | GrowthBook | - | Key encrypting stored sensitive data |
| `DISABLE_TELEMETRY` | GrowthBook | true | Disable anonymous usage telemetry |
| `MONGOHOST` | MongoDB | - | Internal MongoDB host address |
| `MONGOPORT` | MongoDB | 27017 | MongoDB server listening port |
| `MONGOUSER` | MongoDB | - | MongoDB authentication username |
| `MONGO_URL` | MongoDB | - | Internal MongoDB connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB password environment reference |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public MongoDB connection string |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | MongoDB root user password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB root username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/local/src/app/packages/back-end/uploads`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Analytics

[View on Railway →](https://railway.com/template/self-host-growthbook)
