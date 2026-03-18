# Deploy Go Auth Service on Railway

Deploy and Host Go Auth Service with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-auth-service)

## About

Go Auth Service is a production-ready authentication microservice built with Go that provides JWT-based authentication with OAuth 2.0 support for Google, GitHub, and Microsoft. It handles user registration, login, session management, and role-based access control for modern SaaS applications.

Hosting Go Auth Service on Railway provides a complete authentication infrastructure for your applications. The service requires PostgreSQL for user data storage and optionally Redis for session caching. Railway's automatic deployments from GitHub, built-in PostgreSQL and Redis services, and environment variable management make it straightforward to deploy and scale. The service exposes REST APIs for user authentication, OAuth flows, and service-to-service user queries, making it ideal as a standalone auth microservice that integrates with your existing backend services (Python, Node.js, etc.).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-auth-service | [rubenszinho/go-auth-service](https://github.com/rubenszinho/go-auth-service) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | go-auth-service | - | Values must be 'production' or 'development' |
| `HOST` | go-auth-service | 0.0.0.0 | - |
| `PORT` | go-auth-service | 8080 | - |
| `LOG_LEVEL` | go-auth-service | info | - |
| `JWT_EXPIRY` | go-auth-service | 24h | - |
| `JWT_SECRET` | go-auth-service | (secret) | - |
| `LOG_FORMAT` | go-auth-service | json | - |
| `BCRYPT_COST` | go-auth-service | 12 | - |
| `CORS_ORIGINS` | go-auth-service | - | CORS must not be * on production mode |
| `AUTH_FRONTEND_URL` | go-auth-service | - | e.g. "https://auth-client.com" |
| `RATE_LIMIT_WINDOW` | go-auth-service | 1h | - |
| `JWT_REFRESH_EXPIRY` | go-auth-service | 168h | - |
| `RATE_LIMIT_REQUESTS` | go-auth-service | 100 | - |
| `GITHUB_CLIENT_SECRET` | go-auth-service | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | go-auth-service | (secret) | - |
| `MICROSOFT_CLIENT_SECRET` | go-auth-service | (secret) | - |
| `ENABLE_EMAIL_DOMAIN_FILTER` | go-auth-service | false | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Go, Makefile, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/go-auth-service)
