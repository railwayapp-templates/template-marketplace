# Deploy UserTour Production Template on Railway

Open-Source User Onboarding Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/usertour-production-template)

## About

The UserTour Production Template on Railway provisions everything you need to run UserTour as a managed, production-ready service. With a single deploy, Railway spins up the UserTour app container, a PostgreSQL database, and a Redis instance, wires the services together via environment variables, and exposes a secure public URL. 

 You’re mainly responsible for configuring secrets (app URL, database credentials, JWT/secret keys, email and tracking domains) and connecting your product to the hosted UserTour instance. Scaling, restarts, persistent storage, and logs are handled by Railway so you can focus on crafting onboarding flows instead of infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| usertour/usertour:latest | `usertour/usertour:latest` | Web service |
| UsertourPostgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| UsertourRedis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | usertour/usertour:latest | /graphql | GraphQL API endpoint, default is /graphql |
| `DOC_URL` | usertour/usertour:latest | https://docs.usertour.com | - |
| `NODE_ENV` | usertour/usertour:latest | production | Email Service Configuration |
| `EMAIL_HOST` | usertour/usertour:latest | - | Ex. smtp.email.com |
| `EMAIL_PASS` | usertour/usertour:latest | - | Ex. your_email_password |
| `EMAIL_PORT` | usertour/usertour:latest | - | Ex. 587 |
| `EMAIL_USER` | usertour/usertour:latest | (secret) | Ex. smtp server username |
| `JWT_SECRET` | usertour/usertour:latest | (secret) | - |
| `POSTHOG_KEY` | usertour/usertour:latest | your_posthog_key | - |
| `EMAIL_SENDER` | usertour/usertour:latest | - | Your App <support@example.com> |
| `POSTHOG_HOST` | usertour/usertour:latest | your_posthog_host | - |
| `USERTOUR_TOKEN` | usertour/usertour:latest | (secret) | Usertour Environment token |
| `GITHUB_CLIENT_ID` | usertour/usertour:latest | your_github_client_id | - |
| `GOOGLE_CLIENT_ID` | usertour/usertour:latest | your_google_client_id | - |
| `NEST_SERVER_PORT` | usertour/usertour:latest | 3000 | - |
| `EMAIL_AUTH_ENABLED` | usertour/usertour:latest | true | - |
| `GITHUB_AUTH_ENABLED` | usertour/usertour:latest | false | - |
| `GITHUB_CALLBACK_URL` | usertour/usertour:latest | http://localhost:8011/api/auth/github/callback | - |
| `GOOGLE_AUTH_ENABLED` | usertour/usertour:latest | false | - |
| `GOOGLE_CALLBACK_URL` | usertour/usertour:latest | http://localhost:8011/api/auth/google/callback | - |
| `JWT_EXPIRATION_TIME` | usertour/usertour:latest | 1h | - |
| `GITHUB_CLIENT_SECRET` | usertour/usertour:latest | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | usertour/usertour:latest | (secret) | - |
| `AWS_S3_SECRET_ACCESS_KEY` | usertour/usertour:latest | (secret) | - |
| `JWT_REFRESH_EXPIRATION_TIME` | usertour/usertour:latest | 7d | - |
| `POSTGRES_DB` | UsertourPostgres | railway | Default database created when image is started. |
| `DATABASE_URL` | UsertourPostgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | UsertourPostgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | UsertourPostgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | UsertourPostgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | UsertourRedis | 6379 | - |
| `REDISUSER` | UsertourRedis | default | - |
| `REDIS_URL` | UsertourRedis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | UsertourRedis | (secret) | - |
| `REDIS_PASSWORD` | UsertourRedis | (secret) | - |
| `REDIS_PUBLIC_URL` | UsertourRedis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/usertour-production-template)
