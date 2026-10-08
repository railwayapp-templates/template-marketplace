# Deploy Activepieces on Railway

Open-source no-code automation. Self-host Activepieces on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-5)

## About

![Activepieces](https://github.com/activepieces/activepieces/raw/main/docs/resources/templates.gif)

Activepieces is an open-source, self-hosted automation platform and a no-code alternative to Zapier and Make. Build workflows with a visual editor, connect 760+ apps and AI steps, and keep your data on your own infrastructure. It can also expose your integrations as an MCP server for AI assistants.

Hosting Activepieces means running the app together with a Postgres database that stores your flows, connections and run history. This template deploys everything pre-wired on Railway, so you skip the manual setup. Sensitive connections are encrypted with `AP_ENCRYPTION_KEY`, logins are signed with `AP_JWT_SECRET`, and `AP_FRONTEND_URL` points to your public domain so webhooks and OAuth redirects work. Run logs and files live in the database by default, and you can switch to S3-compatible storage later with no migration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Activepieces | `activepieces/activepieces:0.92.1` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AP_DB_TYPE` | Activepieces | POSTGRES | Database type used to store Activepieces data |
| `AP_REDIS_URL` | Activepieces | - | Full Redis connection URL |
| `AP_S3_BUCKET` | Activepieces | - | Name of the S3 bucket |
| `AP_S3_REGION` | Activepieces | - | Region of the S3 bucket |
| `AP_JWT_SECRET` | Activepieces | (secret) | Signs authentication tokens |
| `AP_S3_ENDPOINT` | Activepieces | - | Endpoint URL of the S3-compatible service |
| `AP_FRONTEND_URL` | Activepieces | - | The public URL used to build redirect URLs and webhook URLs |
| `AP_POSTGRES_URL` | Activepieces | - | Full Postgres connection string |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Encryption key for connections |
| `AP_S3_ACCESS_KEY_ID` | Activepieces | - | Access key ID |
| `AP_TELEMETRY_ENABLED` | Activepieces | false | Activepieces analytics |
| `AP_S3_USE_SIGNED_URLS` | Activepieces | false | Route file traffic directly to S3 via pre-signed URLs, bypassing the API server |
| `AP_S3_SECRET_ACCESS_KEY` | Activepieces | (secret) | Secret access key |
| `AP_FILE_STORAGE_LOCATION` | Activepieces | S3 | Where files are stored |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-5)
