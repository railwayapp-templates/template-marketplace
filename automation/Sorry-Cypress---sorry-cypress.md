# Deploy Sorry Cypress on Railway

Self-hosted Cypress dashboard alternative for parallel test running

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sorry-cypress)

## About

Host your own Cypress dashboard on Railway. This template provisions MongoDB, Director, API, and Dashboard services with a persistent volume for test data.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/sorry-cypress)

Sorry Cypress is a four-service app on Railway:

1. **MongoDB** — stateful database with a persistent volume mounted at `/data/db`
2. **Director** — stateless HTTP service that receives CI run requests
3. **API** — stateless GraphQL server that reads/writes MongoDB
4. **Dashboard** — static React SPA that calls the API

Inter-service traffic uses Railway's internal networking (`*.railway.internal`). The dashboard is the only service exposed publicly. The director can optionally be exposed if you need CI runners outside Railway to reach it.

### Persistent Storage

The MongoDB service mounts a 5 GB volume at `/data/db`. All test metadata, results, screenshots, and video references persist across restarts. The other three services are stateless and can be rebuilt without data loss.

### Scaling

- Director and API scale horizontally for high test volume
- Dashboard is a static SPA — a single instance handles many concurrent browser clients
- MongoDB is single-instance; scale vertically by increasing volume size

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb | `mongo:4.4` | Database |
| director | `agoldis/sorry-cypress-director:latest` | Worker |
| dashboard | `agoldis/sorry-cypress-dashboard:latest` | Web service |
| api | `agoldis/sorry-cypress-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) | MongoDB root password. Auto-generated on deploy. |
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | (secret) | MongoDB root username. Used for initial database setup. |
| `PORT` | director | 1234 | Director HTTP port. CI runners send run requests here. |
| `MONGODB_URI` | director | - | MongoDB connection string. Auto-wired to the mongodb companion service. |
| `DASHBOARD_URL` | director | - | Public dashboard URL (CORS / webhook origin). Auto-wired to the dashboard service. |
| `PORT` | dashboard | 8080 | Dashboard web port. Railway exposes this publicly. |
| `GRAPHQL_SCHEMA_URL` | dashboard | - | Public API URL loaded by dashboard JS. Auto-wired to the api service. |
| `PORT` | api | 4000 | GraphQL API port. Dashboard queries this port. |
| `MONGODB_URI` | api | - | MongoDB connection string. Auto-wired to the mongodb companion service. |

## Configuration

- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/sorry-cypress)
