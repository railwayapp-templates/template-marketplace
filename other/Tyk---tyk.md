# Deploy Tyk on Railway

API gateway with auth, rate limits, quotas and analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tyk)

## About

Tyk is an open-source API gateway written in Go that sits in front of your services and handles what every API needs but no team wants to build twice: authentication, rate limiting, quotas, request and response transformation, versioning, caching and per-consumer analytics. It is licensed under MPL-2.0, so there is no request cap, no seat count and no licence key. Teams reach for it when internal services need one front door with real access control, or when a public API needs metered keys handed to consumers.

This template lets you self-host Tyk on Railway with the pieces the project documents for production already wired together. The **tyk-gateway** service is the only one with a public domain: it terminates your traffic, proxies it to the upstreams you configure, and serves Tyk's REST Admin API on the same host behind a generated secret. **Redis** is mandatory rather than optional — it holds API keys, quota counters, the rate limiter and the buffer of request records. **tyk-pump** drains that buffer every ten seconds into **Postgres**, where analytics survive restarts in the `tyk_analytics`, `tyk_aggregated` and `tyk_uptime_analytics` tables. A volume keeps API definitions and policies across redeploys.

![Tyk gateway, pump, Redis and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788970710/tyk-architecture.png)

A gateway is the one component you cannot afford to have somebody else rate-limit for you, which is why Tyk's core is self-hostable in full. It is a single Go binary, and scaling out means more copies against the same Redis, since keys, quotas and the limiter live there, not in process memory.

- Auth: bearer tokens, JWT with JWKS, HMAC, OAuth 2.0, mTLS and Open Policy Agent
- Per-key and per-policy rate limits, quotas and throttling, shared across replicas
- REST, GraphQL, gRPC, TCP and SSE upstreams, caching and circuit breakers
- Request and response transformation, URL rewriting and virtual endpoints
- Custom middleware in JavaScript, Go, Python or gRPC plugins

Tyk also sells a Dashboard, a Developer Portal and a multi-data-centre control plane; those are commercially licensed and not part of the open-source gateway. Managing this deployment means the Admin API, or `tyk-sync`, which applies definitions and policies from a Git repository.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| tyk-pump | `tykio/tyk-pump-docker-pub:v1.17` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| tyk-gateway | [gridalpha/tyk-railway](https://github.com/gridalpha/tyk-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | tyk-pump | 8083 | Health-check port |
| `TYK_PMP_LOGLEVEL` | tyk-pump | info | info, warn, error or debug |
| `TYK_PMP_PURGEDELAY` | tyk-pump | 10 | Seconds between Redis drains |
| `TYK_PMP_OMITCONFIGFILE` | tyk-pump | true | Ignore the image's example pump.conf |
| `TYK_PMP_PUMPS_SQL_TYPE` | tyk-pump | sql | Raw request records to SQL |
| `TYK_PMP_PUMPS_SQL_META_TYPE` | tyk-pump | postgres | SQL dialect |
| `TYK_PMP_ANALYTICSSTORAGETYPE` | tyk-pump | redis | Source of buffered records |
| `TYK_PMP_UPTIMEPUMPCONFIG_TYPE` | tyk-pump | postgres | SQL dialect |
| `TYK_PMP_PUMPS_SQLAGGREGATE_TYPE` | tyk-pump | sql_aggregate | Rolled-up analytics to SQL |
| `TYK_PMP_PUMPS_SQL_META_BATCHSIZE` | tyk-pump | 1000 | Rows written per batch |
| `TYK_PMP_ANALYTICSSTORAGECONFIG_HOST` | tyk-pump | - | Redis private hostname |
| `TYK_PMP_ANALYTICSSTORAGECONFIG_PORT` | tyk-pump | - | Redis port |
| `TYK_PMP_ANALYTICSSTORAGECONFIG_TYPE` | tyk-pump | redis | Source storage driver |
| `TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE` | tyk-pump | sql | Uptime writer defaults to mongo |
| `TYK_PMP_PUMPS_SQLAGGREGATE_META_TYPE` | tyk-pump | postgres | SQL dialect |
| `TYK_PMP_PUMPS_SQL_META_TABLESHARDING` | tyk-pump | false | One table, not per-day tables |
| `TYK_PMP_UPTIMEPUMPCONFIG_TABLESHARDING` | tyk-pump | false | One table, not per-day tables |
| `TYK_PMP_ANALYTICSSTORAGECONFIG_PASSWORD` | tyk-pump | (secret) | Redis password |
| `TYK_PMP_ANALYTICSSTORAGECONFIG_USERNAME` | tyk-pump | (secret) | Redis username |
| `TYK_PMP_PUMPS_SQL_META_CONNECTIONSTRING` | tyk-pump | - | Postgres connection string |
| `TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING` | tyk-pump | - | Postgres connection string |
| `TYK_PMP_PUMPS_SQLAGGREGATE_META_TABLESHARDING` | tyk-pump | false | One table, not per-day tables |
| `TYK_PMP_PUMPS_SQLAGGREGATE_META_CONNECTIONSTRING` | tyk-pump | - | Postgres connection string |
| `TYK_PMP_PUMPS_SQLAGGREGATE_META_STOREANALYTICSPERMINUTE` | tyk-pump | false | Hourly rather than per-minute rows |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the entrypoint |
| `PORT` | tyk-gateway | 8080 | HTTP listener and health-check port |
| `TYK_GW_SECRET` | tyk-gateway | (secret) | Credential for the /tyk/* Admin API |
| `TYK_GW_LOGLEVEL` | tyk-gateway | info | info, warn, error or debug |
| `TYK_GW_STORAGE_HOST` | tyk-gateway | - | Redis private hostname |
| `TYK_GW_STORAGE_PORT` | tyk-gateway | - | Redis port |
| `TYK_GW_ENABLEANALYTICS` | tyk-gateway | true | Record requests for the pump |
| `TYK_GW_STORAGE_PASSWORD` | tyk-gateway | (secret) | Redis password |
| `TYK_GW_STORAGE_USERNAME` | tyk-gateway | (secret) | Redis username |
| `TYK_GW_ANALYTICSCONFIG_POOLSIZE` | tyk-gateway | 4 | Analytics workers, not host core count |
| `TYK_GW_ANALYTICSCONFIG_RECORDSBUFFERSIZE` | tyk-gateway | 1000 | Buffered records before flush |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tyk)
