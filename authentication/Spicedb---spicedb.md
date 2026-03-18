# Deploy Spicedb on Railway

Deploying Authzed Spicedb

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spicedb)

## About

Hosting SpiceDB mainly involves running the SpiceDB service plus a supported datastore for durable relationship storage (commonly PostgreSQL for single-region setups, or CockroachDB/Spanner for higher throughput or multi-region needs). You’ll configure environment variables for datastore connection info and service ports, run migrations/bootstrapping as needed, and ensure your deployment has health checks, logs, and a plan for scaling. If you scale to multiple SpiceDB instances, you’ll also consider how requests are dispatched across instances and monitor performance. ([AuthZed][2])

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| authzed/spicedb | `authzed/spicedb:v1.49.0` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SPICEDB_GRPC_URL` | - | GPRC connection url to SpiceDB. Must use the preshared-key |
| `SPICEDB_HTTP_URL` | - | HTTP url to connect to SpiceDB. Recommended to use GRPC url instead |
| `SPICEDB_HTTP_ENABLED` | true | Used to access the healthpoint http route. Use the grpc api instead |
| `SPICEDB_DATASTORE_ENGINE` | postgres | What database store to use: "cockroachdb", "postgres", "mysql", or "spanner"  |
| `SPICEDB_DATASTORE_CONN_URI` | - | Connection uri to datastore of your choice. |
| `SPICEDB_GRPC_PRESHARED_KEY` | - | A shared secret used to authenticate gRPC clients connecting to SpiceDB. Requests must include this key or they will be rejected. |

## Configuration

- **Start command:** `spicedb serve`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/spicedb)
