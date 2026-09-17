# Deploy GrowthBook [Updated Sep'26] on Railway

GrowthBook — Feature Flags & A/B Testing, no per-seat fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/growthbook-feature-flags)

## About

GrowthBook is an open-source feature flagging and A/B testing platform — a self-hosted alternative to LaunchDarkly, Statsig, and Optimizely with unlimited flags, experiments, and seats. Roll out features gradually, run kill-switches, and analyze experiments warehouse-native against your own Snowflake or BigQuery data, no per-seat or per-MAU fees. This template deploys the full stack with MongoDB, generated secrets, and — crucially — the frontend and API behind one hostname so the session cookie works, avoiding the "No authorization token" error that breaks most self-hosted deployments.

---

GrowthBook has a specific architecture that trips up most self-hosted deployments — getting it right is the whole game, and this template handles it.

**Frontend and API must share a domain — or login breaks.** This is the critical one: GrowthBook is two apps, a frontend (port 3000) and a separate API (port 3100), and browsers only keep the session cookie if both are served from the same registrable domain. Split them and you hit GrowthBook's infamous "No authorization token was found" error, unable to log in — the most common self-hosted failure. This template serves both behind one hostname with `APP_ORIGIN` and `API_HOST` set correctly, so authentication works on the first try.

**Never change `ENCRYPTION_KEY` after setup.** GrowthBook uses it to encrypt your data-source credentials (the keys to your Snowflake, BigQuery, or Postgres). Change it after data sources exist and those credentials become unreadable, requiring a migration script to recover. This template generates it once and keeps it stable, along with `JWT_SECRET` (which must be a strong random value — the default throws an error in production). Back the key up externally.

**MongoDB is the database — not Postgres.** Unlike most tools, GrowthBook stores everything (flags, experiments, metrics, users) in MongoDB, so this template includes and wires it over the private network with a persistent volume. File uploads live on a second volume; both survive redeploys, and MongoDB is the primary backup target.
**Warehouse-native experimentation — your data stays put.** GrowthBook's standout is that it queries your existing data warehouse (Snowflake, BigQuery, Redshift, ClickHouse, Postgres) directly for experiment analysis, rather than copying event data into a third-party platform. Connect your warehouse as a data source and run A/B tests against tables you already have. After deploy, open your Railway domain to create the first organization and admin, then add SDK connections and start shipping flags.

**Unlimited everything in the core.** GrowthBook's core is MIT-licensed and free to self-host with unlimited flags, experiments, seats, and traffic — only enterprise features (SSO, SCIM, approval workflows, the visual editor) need a commercial key. A ten-person team on GrowthBook Cloud's $40/seat Pro tier saves roughly $4,800 a year by self-hosting.

Typical cost: **~$10–15/month** on Railway for GrowthBook and MongoDB. The self-hosted core is free — no flag-evaluation, per-seat, or per-MAU fees, unlike LaunchDarkly or Statsig.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GrowthBook | `growthbook/growthbook` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GrowthBook | 3000 | PORT |
| `API_HOST` | GrowthBook | - | Port forwarded domain to 3100 (Required, fill in later) |
| `NODE_ENV` | GrowthBook | production | NODE_ENV |
| `APP_ORIGIN` | GrowthBook | - | Port forwarded domain to 3000 (Required, fill in later) |
| `JWT_SECRET` | GrowthBook | (secret) | JWT_SECRET |
| `MONGODB_URI` | GrowthBook | - | MONGODB_URI |
| `BACKEND_PORT` | GrowthBook | 3100 | BACKEND_PORT |
| `ENCRYPTION_KEY` | GrowthBook | - | ENCRYPTION_KEY |
| `SECRET_API_KEY` | GrowthBook | (secret) | SECRET_API_KEY |
| `GB_STATS_ENGINE_MIN_POOL_SIZE` | GrowthBook | 0 | Setting this variable to 0 ensures the stats engine only starts a Python instance when required, saving memory. |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/local/src/app/packages/back-end/uploads`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/growthbook-feature-flags)
