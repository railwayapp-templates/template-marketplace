# Deploy Better Auth on Railway

A ready to use auth server! Secure by default and extremely configurable.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VOQsdL)

## About

## Better Auth Server Template

A simple but production-ready authentication server that gives you complete control over your user data. This template provides email/password authentication with Redis session storage and a clean API, all powered by Hono.js and Bun.
For complete documentation, visit [Better Auth Docs](https://www.better-auth.com).

## What's Included
- Email/password authentication (login, registration, logout)
- Session management with Redis
- OpenAPI documentation out of the box
- Health check endpoint
- Single binary deployment

## Getting Started
After deployment, your auth server will be accessible at your Railway-provided URL. Use the following endpoints:
- `GET /health` - Check the health of the server
- `GET /api/auth/reference` - Scalar docs for all of the OpenAPI endpoints
- `GET /api/auth/sign-out` - Logout a user
- `POST /api/auth/sign-up/email` - Register a new user
```
{
  "name": "",
  "email": "",
  "password": "",
  "callbackURL": ""
}
```
- `POST /api/auth/sign-in/email` - Login a user
```
{
  "email": "",
  "password": "",
  "callbackURL": "",
  "rememberMe": ""
}
```

Connect your frontend using the Better Auth client library and point it to your new auth server or use your own http client.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `redis:8.2.1` | Database |
| Better-Auth Server | [kadumedim/better-auth-starter](https://github.com/kadumedim/better-auth-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_URL` | Better-Auth Server | - | Redis URL |
| `DATABASE_URL` | Better-Auth Server | - | Postgres DB URL |
| `BETTER_AUTH_URL` | Better-Auth Server | - | For redirects |
| `BETTER_AUTH_SECRET` | Better-Auth Server | (secret) | API Secret |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/VOQsdL)
