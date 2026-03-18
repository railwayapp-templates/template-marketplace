# Deploy Django REST Framework on Railway

Django REST Framework with postgres, redis and whitenoise

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/-gX--G)

## About

Introducing a streamlined Django template for seamless deployment on Railway! This setup features the Django Rest Framework (DRF) for building robust APIs, Redis for caching, PostgreSQL for database management, and Whitenoise for efficient static file handling. Ideal for developers looking to accelerate project launches with minimal configuration, this template provides a ready-to-use environment, ensuring a smooth development experience. Perfect for API-driven applications, it leverages the full power of DRF while simplifying the complexities of infrastructure setup with Redis and PostgreSQL integration. Start building and deploying faster than ever!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| drf-api | [michallm/drf-api](https://github.com/michallm/drf-api) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DEBUG` | drf-api | - | Django Debug: True or False |
| `SECRET_KEY` | drf-api | (secret) | Super SECRET key |
| `CSRF_TRUSTED_ORIGINS` | drf-api | - | https:// + railway public domain |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/-gX--G)
