# Deploy blnk-railway on Railway

One-click deployment of Blnk in Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/blnk-railway-1)

## About

**blnk-railway** is a Railway-ready setup for running Blnk Core in production. It provides a clean way to deploy the Blnk API and background workers, and connect them to managed Postgres and Redis without maintaining your own infrastructure.

Hosting blnk-railway on Railway means running Blnk Core as one or more Railway services and attaching managed infrastructure. You deploy the API and worker separately, then connect them to Railway Postgres for persistence and Railway Redis for queues and caching. Railway handles networking, secrets, restarts, and scaling, so you can focus on building on top of the ledger instead of managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blnk-server | `jerryenebeli/blnk:0.12.2` | Web service |
| typesense | `typesense/typesense:29.0` | Web service |
| blnk-worker | `jerryenebeli/blnk:0.12.2` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BLNK_REDIS_DNS` | blnk-server | - | 	The Redis connection string that specifies the host, port, and authentication details for your Redis instance.  |
| `BLNK_SERVER_PORT` | blnk-server | 5001 | The network port on which the server listens for incoming connections. |
| `BLNK_TYPESENSE_DNS` | blnk-server | http://typesense:8080 | The URL endpoint for your TypeSense server instance. |
| `BLNK_TYPESENSE_KEY` | blnk-server | - | The URL endpoint for your TypeSense server instance. |
| `BLNK_DATA_SOURCE_DNS` | blnk-server | - | The database connection string that specifies the location, credentials, and parameters for connecting to your database.  |
| `PORT` | typesense | 8080 | Where the TypeSense service listens on |
| `TYPESENSE_API_KEY` | typesense | (secret) | The API key used for authenticating requests to your TypeSense instance.  |
| `BLNK_REDIS_DNS` | blnk-worker | - | The Redis connection string that specifies the host, port, and authentication details for your Redis instance.  |
| `BLNK_SERVER_PORT` | blnk-worker | - | The network port on which the server listens for incoming connections. |
| `BLNK_TYPESENSE_DNS` | blnk-worker | - | 	The URL endpoint for your TypeSense server instance. |
| `BLNK_TYPESENSE_KEY` | blnk-worker | - | The API key used for authenticating requests to your TypeSense instance.  |
| `BLNK_DATA_SOURCE_DNS` | blnk-worker | - | The database connection string that specifies the location, credentials, and parameters for connecting to your database.  |
| `POSTGRES_DB` | postgres | postgres | Default database name created when the Postgres service starts. |
| `DATABASE_URL` | postgres | - | Full Postgres connection string for internal Railway-to-Railway access. |
| `POSTGRES_USER` | postgres | (secret) | Primary Postgres user created for the database service. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated root password used by the Postgres service itself. |
| `DATABASE_PUBLIC_URL` | postgres | - | Postgres connection string exposed via Railway’s TCP proxy for external access. |
| `REDISHOST` | redis | - | Internal hostname for the Redis service inside Railway’s private network. |
| `REDISPORT` | redis | - | Port Redis listens on. Usually 6379. |
| `REDISUSER` | redis | - | Username used to authenticate with Redis. |
| `REDIS_URL` | redis | - | Full Redis connection string for internal Railway-to-Railway access. |
| `REDISPASSWORD` | redis | (secret) | Password used by clients to authenticate with Redis. |
| `REDIS_PASSWORD` | redis | (secret) | Generated password used by the Redis service itself. |
| `REDIS_PUBLIC_URL` | redis | - | Redis connection string exposed via Railway’s TCP proxy for external access. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -lc 'exec /opt/typesense-server --data-dir=/data --api-key="$TYPESENSE_API_KEY" --listen-port="$PORT" --thread-pool-size=4'`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Start command:** `blnk workers`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Starters

[View on Railway →](https://railway.com/template/blnk-railway-1)
