# Deploy Apache Superset | Open Source Tableau Alternative on Railway

Self-host Apache Superset — open-source BI and data visualization

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/superset)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/superset?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Apache Superset is a modern, open-source data exploration and visualization platform — think Tableau or Looker, but free and self-hostable. It lets analysts and engineers query any SQL-speaking database, build rich interactive dashboards, and schedule alerts and reports without handing data to a SaaS vendor.

Deploy Apache Superset on Railway with a pre-wired PostgreSQL metadata database, a Redis cache and Celery broker, and dedicated worker and beat services. Self-host Superset in minutes, keep full control of your BI stack, and pay only for the compute you use.

![Apache Superset Railway Architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776594994/superset_railway_arch_gjnpfy.png)

Apache Superset (v6.0.1) is a web application built on Flask, React, and SQLAlchemy. It ships its own query engine (SQL Lab), a drag-and-drop chart builder with 50+ visualization types, a dashboard layout engine with cross-filters and drill-down, and a role-based access control system.

Key capabilities:
- **SQL Lab** — interactive SQL IDE with query history, scheduled queries, and async execution via Celery
- **50+ visualizations** — time series, geospatial (Deck.gl), pivot tables, heatmaps, Sankey, and more
- **Alerts & scheduled reports** — CRON-driven email/Slack delivery of dashboards and anomaly alerts
- **Semantic layer** — virtual datasets, calculated columns, metrics with Jinja templating
- **Dashboard RBAC** — row-level security, per-dashboard roles, embedded SDK

Architecture on Railway uses five services: the Superset gunicorn web app, a Celery worker for async SQL queries and report generation, a Celery beat scheduler for cron jobs, a PostgreSQL metadata database, and a Redis instance for caching and the Celery broker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Superset | `apache/superset:latest` | Web service |
| Superset-Worker | `apache/superset:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Superset-Beat | `apache/superset:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `DEV_MODE` | Superset | false | Disable dev-mode editable install |
| `REDIS_URL` | Superset | - | Redis broker + cache URL |
| `PYTHONPATH` | Superset | /app/pythonpath | Location of superset_config.py |
| `DATABASE_URL` | Superset | - | Metadata DB connection string |
| `SUPERSET_ENV` | Superset | production | Production mode flag |
| `SUPERSET_PORT` | Superset | 8088 | Internal gunicorn port |
| `ADMIN_PASSWORD` | Superset | (secret) | Specify Bootstrap admin password. Note bootstrap username is 'admin' |
| `DATABASE_DIALECT` | Superset | postgresql | Triggers psycopg2-binary install |
| `SUPERSET_CONFIG_B64` | Superset | aW1wb3J0IG9zClNRTEFMQ0hFTVlfREFUQUJBU0VfVVJJID0gb3MuZW52aXJvbi5nZXQoIkRBVEFCQVNFX1VSTCIpCnIgPSBvcy5lbnZpcm9uLmdldCgiUkVESVNfVVJMIiwgInJlZGlzOi8vbG9jYWxob3N0OjYzNzkiKS5yc3RyaXAoIi8iKQpjbGFzcyBDZWxlcnlDb25maWc6CiAgICBicm9rZXJfdXJsID0gciArICIvMCIKICAgIHJlc3VsdF9iYWNrZW5kID0gciArICIvMSIKQ0VMRVJZX0NPTkZJRyA9IENlbGVyeUNvbmZpZwpDQUNIRV9DT05GSUcgPSB7IkNBQ0hFX1RZUEUiOiAiUmVkaXNDYWNoZSIsICJDQUNIRV9SRURJU19VUkwiOiByICsgIi8yIiwgIkNBQ0hFX0RFRkFVTFRfVElNRU9VVCI6IDMwMCwgIkNBQ0hFX0tFWV9QUkVGSVgiOiAic3VwZXJzZXRfIn0KREFUQV9DQUNIRV9DT05GSUcgPSB7IkNBQ0hFX1RZUEUiOiAiUmVkaXNDYWNoZSIsICJDQUNIRV9SRURJU19VUkwiOiByICsgIi8zIiwgIkNBQ0hFX0RFRkFVTFRfVElNRU9VVCI6IDMwMCwgIkNBQ0hFX0tFWV9QUkVGSVgiOiAic3VwZXJzZXRfZGF0YV8ifQpGRUFUVVJFX0ZMQUdTID0geyJBTEVSVF9SRVBPUlRTIjogVHJ1ZSwgIkRBU0hCT0FSRF9SQkFDIjogVHJ1ZSwgIkVNQkVEREVEX1NVUEVSU0VUIjogVHJ1ZX0KVEFMSVNNQU5fRU5BQkxFRCA9IEZhbHNlCldURl9DU1JGX0VOQUJMRUQgPSBUcnVlCldURl9DU1JGX1RJTUVfTElNSVQgPSBOb25lClNFU1NJT05fQ09PS0lFX0hUVFBPTkxZID0gVHJ1ZQpTRVNTSU9OX0NPT0tJRV9TRUNVUkUgPSBUcnVlClNFU1NJT05fQ09PS0lFX1NBTUVTSVRFID0gIkxheCIKRU5BQkxFX1BST1hZX0ZJWCA9IFRydWUK | Base64 superset_config.py, feel free to update it with another base64 key at bootstrap |
| `SUPERSET_SECRET_KEY` | Superset | (secret) | Flask session signing key |
| `SUPERSET_LOAD_EXAMPLES` | Superset | no | Skip loading example dashboards |
| `DEV_MODE` | Superset-Worker | false | Disable dev mode |
| `REDIS_URL` | Superset-Worker | - | Redis broker + cache URL |
| `PYTHONPATH` | Superset-Worker | /app/pythonpath | Config file location |
| `DATABASE_URL` | Superset-Worker | - | Metadata DB connection string |
| `SUPERSET_ENV` | Superset-Worker | production | Production mode |
| `SUPERSET_PORT` | Superset-Worker | 8088 | Not used by worker, kept consistent |
| `ADMIN_PASSWORD` | Superset-Worker | (secret) | Match web service admin |
| `DATABASE_DIALECT` | Superset-Worker | postgresql | psycopg2 install trigger |
| `SUPERSET_CONFIG_B64` | Superset-Worker | - | Base64 config |
| `SUPERSET_SECRET_KEY` | Superset-Worker | (secret) | Match web service key |
| `SUPERSET_LOAD_EXAMPLES` | Superset-Worker | no | Skip examples |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `DEV_MODE` | Superset-Beat | false | Disable dev mode |
| `REDIS_URL` | Superset-Beat | - | Redis broker + cache URL |
| `PYTHONPATH` | Superset-Beat | /app/pythonpath | Config file location |
| `DATABASE_URL` | Superset-Beat | - | Metadata DB connection string |
| `SUPERSET_ENV` | Superset-Beat | production | Production mode |
| `SUPERSET_PORT` | Superset-Beat | 8088 | Not used by beat, kept consistent |
| `ADMIN_PASSWORD` | Superset-Beat | (secret) | Match web service admin |
| `DATABASE_DIALECT` | Superset-Beat | postgresql | psycopg2 install trigger |
| `SUPERSET_CONFIG_B64` | Superset-Beat | - | Base64 config |
| `SUPERSET_SECRET_KEY` | Superset-Beat | (secret) | Match web service key |
| `SUPERSET_LOAD_EXAMPLES` | Superset-Beat | no | Skip examples |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "mkdir -p /app/pythonpath && echo \"$SUPERSET_CONFIG_B64\" | base64 -d > /app/pythonpath/superset_config.py && /app/docker/docker-init.sh && /app/docker/docker-bootstrap.sh app-gunicorn"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "mkdir -p /app/pythonpath && echo \"$SUPERSET_CONFIG_B64\" | base64 -d > /app/pythonpath/superset_config.py && /app/docker/docker-bootstrap.sh worker"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "mkdir -p /app/pythonpath && echo \"$SUPERSET_CONFIG_B64\" | base64 -d > /app/pythonpath/superset_config.py && rm -f /tmp/celerybeat.pid && /app/docker/docker-bootstrap.sh beat"`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/superset)
