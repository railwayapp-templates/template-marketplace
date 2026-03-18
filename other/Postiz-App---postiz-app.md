# Deploy Postiz App on Railway

Postiz is an all-in-one platform for social media management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-app)

## About

### Important: Postiz v2.12+ Requires Temporal ⚠️

Use this [Postiz (Temporal) template](https://railway.com/deploy/postiz-temporal) for the latest version of Postiz (v2.12 and above).

Starting with [v2.12.0](https://github.com/gitroomhq/postiz-app/releases/tag/v2.12.0), Postiz migrated its job queue infrastructure from BullMQ to Temporal. If you are deploying Postiz v2.12 or later, you must use this [Postiz (Temporal) template](https://railway.com/deploy/postiz-temporal).

This Postiz App template (without Temporal) only works for v2.11 and below and is not compatible with newer versions due to the new infrastructure.

<img alt="Postiz Logo" src="https://github.com/user-attachments/assets/f0d30d70-dddb-4142-8876-e9aa6ed1cb99" width="280">
Postiz is a social media scheduling and management platform that allows you to create, schedule, and publish content across multiple social media platforms from a single dashboard. Built with modern web technologies, it provides analytics, team collaboration features, and automated posting capabilities for streamlined social media management.

![Image 1](https://github.com/user-attachments/assets/a27ee220-beb7-4c7e-8c1b-2c44301f82ef)

Hosting Postiz App involves deploying a full-stack application with multiple interconnected services. The deployment requires a Node.js runtime environment, PostgreSQL database for storing user data and scheduled posts, Redis for caching and session management, and proper SSL configuration for secure communications. The application also needs persistent storage for uploaded media files and proper environment configuration for social media API integrations. Railway simplifies this complex deployment by providing automated service orchestration, built-in SSL certificates, and seamless scaling capabilities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postiz | `ghcr.io/gitroomhq/postiz-app:v2.11.3` | Web service |
| Redis | `bitnamilegacy/redis:latest` | Database |
| Postgis | `ghcr.io/railwayapp-templates/timescale-postgis-ssl:pg17-ts2.17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postiz | 3000 | - |
| `IS_GENERAL` | Postiz | true | - |
| `JWT_SECRET` | Postiz | (secret) | - |
| `NOT_SECURED` | Postiz | true | - |
| `DATABASE_URL` | Postiz | - | Redis Connection (reference your Redis service) |
| `STORAGE_PROVIDER` | Postiz | local | - |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | Database Connection (reference your PostgreSQL service) |
| `DISABLE_REGISTRATION` | Postiz | false | Only allow single registration, then disable signup |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `NO_TS_TUNE` | Postgis | true | Do not run timescaledb-tune at Startup. This improves memory usage of the database. |
| `POSTGRES_DB` | Postgis | postiz | Default database created when image is started. |
| `DATABASE_URL` | Postgis | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgis | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgis | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgis | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/postiz-app)
