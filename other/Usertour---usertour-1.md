# Deploy Usertour on Railway

Usertour is an open-source user onboarding platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/usertour-1)

## About

Railway handles deployment automatically.  
This template provisions the Usertour app along with its required services.

---

When you host Usertour yourself:

- You retain **full control** of your data
- You are responsible for infrastructure and backups
- AGPL v3 license applies to self-hosted usage

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| usertour | `usertour/usertour` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| PgBouncer | `railwayapp/pgbouncer:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | usertour | 80 | The PORT variable is the port your app must listen on, and with Railway’s custom port, it must match that value. |
| `EMAIL_HOST` | usertour | - | Email server address.  |
| `EMAIL_PASS` | usertour | - | Email service password |
| `EMAIL_PORT` | usertour | - | Email server port |
| `EMAIL_USER` | usertour | (secret) | Email service account |
| `JWT_SECRET` | usertour | (secret) | JWT token secret key |
| `Redis_HOST` | usertour | - | Redis server address |
| `Redis_PASS` | usertour | - | Redis server password |
| `Redis_PORT` | usertour | - | Redis server port |
| `DATABASE_URL` | usertour | - | PostgreSQL database connection URL.  |
| `EMAIL_SENDER` | usertour | - | Email sender name and address |
| `AWS_S3_BUCKET` | usertour | - | AWS S3 bucket name |
| `AWS_S3_DOMAIN` | usertour | - | AWS S3 domain |
| `AWS_S3_REGION` | usertour | - | AWS S3 region |
| `APP_HOMEPAGE_URL` | usertour | - | Application homepage URL |
| `GITHUB_CLIENT_ID` | usertour | - | GitHub OAuth client ID |
| `GOOGLE_CLIENT_ID` | usertour | - | Google OAuth client ID |
| `EMAIL_AUTH_ENABLED` | usertour | true | Enable/disable email authentication |
| `LOGIN_REDIRECT_URL` | usertour | (secret) | URL to redirect after login |
| `DATABASE_DIRECT_URL` | usertour | - | Direct PostgreSQL database connection URL.  |
| `GITHUB_AUTH_ENABLED` | usertour | - | Enable/disable GitHub authentication |
| `GITHUB_CALLBACK_URL` | usertour | - | GitHub OAuth callback URL |
| `GOOGLE_AUTH_ENABLED` | usertour | - | Enable/disable Google authentication |
| `GOOGLE_CALLBACK_URL` | usertour | - | Google OAuth callback URL |
| `JWT_EXPIRATION_TIME` | usertour | 1h | JWT token expiration time (e.g. 1h) |
| `AWS_S3_ACCESS_KEY_ID` | usertour | - | AWS S3 access key ID |
| `GITHUB_CLIENT_SECRET` | usertour | (secret) | GitHub OAuth client secret |
| `GOOGLE_CLIENT_SECRET` | usertour | (secret) | Google OAuth client secret |
| `USERTOUR_COOKIE_DOMAIN` | usertour | - | Domain where cookies are valid and can be accessed |
| `USERTOUR_COOKIE_SECURE` | usertour | - | Controls whether cookies can only be transmitted over HTTPS. |
| `AWS_S3_SECRET_ACCESS_KEY` | usertour | (secret) | AWS S3 secret access key |
| `JWT_REFRESH_EXPIRATION_TIME` | usertour | 7d | JWT refresh token expiration time (e.g. 7d) |
| `POSTGRES_DB` | Postgres | usertour | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRESQL_PORT` | PgBouncer | 5432 | - |
| `PGBOUNCER_POOL_MODE` | PgBouncer | transaction | - |
| `POSTGRESQL_PASSWORD` | PgBouncer | (secret) | - |
| `POSTGRESQL_USERNAME` | PgBouncer | (secret) | - |
| `PGBOUNCER_LISTEN_ADDRESS` | PgBouncer | * | - |
| `PGBOUNCER_MAX_CLIENT_CONN` | PgBouncer | 300 | - |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | PgBouncer | 20 | - |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/usertour-1)
