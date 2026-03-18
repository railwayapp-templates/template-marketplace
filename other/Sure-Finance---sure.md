# Deploy Sure Finance on Railway

The personal finance app for everyone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sure)

## About

**Sure** is the all-in-one personal finance app for everyone. Track, optimize, and grow your money with ease. Connect your accounts, manage budgets, and understand your finances through beautiful, simple insights.

Hosting **Sure** on Railway gives you a fast and effortless way to bring your personal finance hub online. No setup or configuration needed. Everything runs automatically in the cloud. Within minutes, you can start tracking your accounts, visualizing your budgets, and exploring your financial data from anywhere, all with the same secure experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Sure | `ghcr.io/we-promise/sure:latest` | Web service |
| Worker | `ghcr.io/we-promise/sure:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | The hostname or private domain where the Redis server is hosted. |
| `REDISPORT` | Redis | 6379 | The TCP port Redis listens on for incoming connections (default: 6379). |
| `REDISUSER` | Redis | default | The username used to authenticate with the Redis server |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | A variable referencing the Redis password used for authentication. |
| `REDIS_PASSWORD` | Redis | (secret) | The actual password or auto-generated secret key for Redis access. |
| `SECRET_KEY_BASE` | Redis | (secret) | A long, random secret string used by the application to securely encrypt, hash, and sign sensitive data. |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `DB_HOST` | Sure | - | The hostname or IP address of the PostgreSQL database server. |
| `DB_PORT` | Sure | - | The network port PostgreSQL is listening on (default is 5432). |
| `REDIS_URL` | Sure | - | The full connection URL for the Redis cache instance. |
| `POSTGRES_DB` | Sure | - | The name of the PostgreSQL database your app connects to. |
| `SELF_HOSTED` | Sure | true | Toggles the hosted features off |
| `POSTGRES_USER` | Sure | (secret) | The username used to authenticate with PostgreSQL. |
| `SECRET_KEY_BASE` | Sure | (secret) | A secret key used by the app for encryption and signing. |
| `POSTGRES_PASSWORD` | Sure | (secret) | The password for the PostgreSQL user account. |
| `DB_HOST` | Worker | - | The hostname or IP address of your PostgreSQL database server. |
| `DB_PORT` | Worker | - | The port number used to connect to the PostgreSQL database (default: 5432). |
| `REDIS_URL` | Worker | - | The connection URL for the Redis instance used for caching or background jobs. |
| `POSTGRES_DB` | Worker | - | The name of the PostgreSQL database your app connects to. |
| `SELF_HOSTED` | Worker | true | Indicates the app is running on your own infrastructure instead of a managed service. |
| `POSTGRES_USER` | Worker | (secret) | The username used to log in to the PostgreSQL database. |
| `SECRET_KEY_BASE` | Worker | (secret) | A long, random secret string used by the application to securely encrypt, hash, and sign sensitive data. |
| `POSTGRES_PASSWORD` | Worker | (secret) | The password associated with the PostgreSQL user account. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `bundle exec rails server -b 0.0.0.0 -p 3000`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bundle exec sidekiq`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sure)
