# Deploy Formbricks | Open-Source Typeform & Qualtrics Alternative on Railway

Surveys, NPS and in-app feedback on your own Postgres, Hub and Cube

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-surveys)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/formbricks-surveys?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=formbricks-surveys)

[Formbricks](https://formbricks.com/) is the open-source alternative to Typeform and Qualtrics: link surveys, website and in-app surveys, NPS and CSAT, with targeting, multi-language surveys, webhooks and an API, on data you own. This template runs Formbricks 6 with every service it needs to start: Postgres with pgvector, Valkey, Formbricks Hub, Cube and SpiceDB. Uploads go to a Railway bucket.

Formbricks 6 is no longer a single container. It refuses to start without SpiceDB for authorization, and it needs Hub (feedback records) and Cube (analytics) as well. This template runs the full stack in six services and a bucket:

- **Formbricks**: the official `ghcr.io/formbricks/formbricks:6.0.2` image. A small wrapper runs what upstream's compose does in one-shot jobs before the server starts: database migrations, loading the SpiceDB schema, and setting CORS on the bucket. The health check on `/health` waits for all of that, and upgrading means bumping the image tag.
- **SpiceDB**: the official `authzed/spicedb:v1.52.0` image (the `-debug` variant, which includes a shell). It migrates its datastore on boot and keeps relationships in Postgres's built-in `postgres` database, separate from the app's data.
- **Hub**: the official `ghcr.io/formbricks/hub:0.8.7` image. It shares the Formbricks database, as upstream does, so it waits for Formbricks to create its tables and then runs its own goose and River migrations.
- **Cube**: the official `ghcr.io/formbricks/cube:1.7.47-1` image, with upstream's `cube.js` and feedback-record schema built in, since Railway can't bind-mount config files.
- **Postgres 17 with pgvector** and **Valkey 8** (sessions, cache, rate limits, background jobs), each with its own volume.
- **A Railway bucket** for survey images, file-upload answers and logos. Formbricks uploads straight from the browser with presigned POSTs, so the app sets the bucket's CORS rule for your domain on every boot.

Every secret (auth, encryption, cron, Hub and Cube keys, SpiceDB key, database and Valkey passwords) is generated per deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Formbricks | [two-workspaces/formbricks](https://github.com/two-workspaces/formbricks) (root: /formbricks) | Web service |
| SpiceDB | `authzed/spicedb:v1.52.0-debug` | Worker |
| Valkey | `valkey/valkey:8.1.9-alpine` | Database |
| Hub | `ghcr.io/formbricks/hub:0.8.7` | Worker |
| Postgres | `pgvector/pgvector:0.8.7-pg17` | Database |
| Cube | [two-workspaces/formbricks](https://github.com/two-workspaces/formbricks) (root: /cube) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Formbricks | 3000 | Port Formbricks listens on - leave as is |
| `HOSTNAME` | Formbricks | :: | Listen on IPv6 and IPv4 so Railway's private network and health check can reach it |
| `MAIL_FROM` | Formbricks | - | Optional sender address, e.g. surveys@example.com (all SMTP settings need real values; Railway allows outbound SMTP on Pro only) |
| `REDIS_URL` | Formbricks | - | Valkey for sessions, cache, rate limits and background jobs (family=0 lets it connect over IPv6) |
| `S3_REGION` | Formbricks | - | Railway bucket region |
| `SMTP_HOST` | Formbricks | - | Optional SMTP server for invites, verification and password resets |
| `SMTP_PORT` | Formbricks | - | SMTP port, e.g. 587 or 465 |
| `SMTP_USER` | Formbricks | (secret) | SMTP username |
| `WEBAPP_URL` | Formbricks | - | Public URL of Formbricks (links, emails, uploads CORS) - set it to your custom domain after adding one |
| `CRON_SECRET` | Formbricks | (secret) | Protects the internal cron API |
| `HUB_API_KEY` | Formbricks | (secret) | Shared key between Formbricks and Formbricks Hub (the Hub service reads it from here) |
| `HUB_API_URL` | Formbricks | - | Formbricks Hub on the private network |
| `DATABASE_URL` | Formbricks | - | Postgres (with pgvector) on the private network |
| `NEXTAUTH_URL` | Formbricks | - | Auth base URL - keep equal to WEBAPP_URL |
| `AUTHZED_TOKEN` | Formbricks | (secret) | SpiceDB preshared key |
| `S3_ACCESS_KEY` | Formbricks | - | Railway bucket access key |
| `S3_SECRET_KEY` | Formbricks | (secret) | Railway bucket secret key |
| `SMTP_PASSWORD` | Formbricks | (secret) | SMTP password |
| `CUBEJS_API_URL` | Formbricks | - | Cube analytics API on the private network |
| `ENCRYPTION_KEY` | Formbricks | - | Encrypts 2FA secrets and single-use survey links. BACK IT UP - changing it breaks them |
| `MAIL_FROM_NAME` | Formbricks | - | Optional sender name |
| `S3_BUCKET_NAME` | Formbricks | - | Railway bucket for survey images, file-upload answers and logos |
| `AUTHZED_ENABLED` | Formbricks | true | Formbricks 6 refuses to start without SpiceDB authorization |
| `NEXTAUTH_SECRET` | Formbricks | (secret) | Signs sessions and sign-up tokens. Changing it logs everyone out |
| `S3_ENDPOINT_URL` | Formbricks | - | Railway bucket endpoint |
| `AUTHZED_ENDPOINT` | Formbricks | - | SpiceDB gRPC on the private network |
| `AUTHZED_INSECURE` | Formbricks | true | Plaintext gRPC - traffic stays on Railway's private network |
| `CUBEJS_API_SECRET` | Formbricks | (secret) | Signs analytics queries to Cube (the Cube service reads it from here) |
| `CUBEJS_JWT_ISSUER` | Formbricks | formbricks-web | Issuer claim on Cube tokens - must match the Cube service |
| `AUTHZED_SYSTEM_KEY` | Formbricks | formbricks | SpiceDB system object id |
| `AUTHZED_CONSISTENCY` | Formbricks | fully_consistent | Required by Formbricks 6 |
| `CUBEJS_JWT_AUDIENCE` | Formbricks | formbricks-cube | Audience claim on Cube tokens - must match the Cube service |
| `S3_FORCE_PATH_STYLE` | Formbricks | 0 | Railway buckets use virtual-host style URLs - keep 0 |
| `SMTP_SECURE_ENABLED` | Formbricks | - | 1 for implicit TLS (port 465), 0 for STARTTLS |
| `PASSWORD_RESET_DISABLED` | Formbricks | (secret) | No password-reset emails (needs SMTP). Set to 0 after configuring SMTP |
| `EMAIL_VERIFICATION_DISABLED` | Formbricks | 1 | No email verification on sign-up (needs SMTP). Set to 0 after configuring SMTP |
| `PORT` | SpiceDB | 9090 | Metrics port, used as the health check (only answers once the datastore is migrated) |
| `SPICEDB_LOG_FORMAT` | SpiceDB | json | Log format |
| `SPICEDB_DATASTORE_ENGINE` | SpiceDB | postgres | SpiceDB stores relationships in Postgres |
| `SPICEDB_DATASTORE_CONN_URI` | SpiceDB | - | SpiceDB uses the built-in postgres database, separate from the formbricks one |
| `SPICEDB_GRPC_PRESHARED_KEY` | SpiceDB | - | Auto-generated key Formbricks uses to call SpiceDB |
| `VALKEY_PASSWORD` | Valkey | (secret) | Auto-generated Valkey password |
| `PORT` | Hub | 8080 | Port Hub listens on - leave as is |
| `API_KEY` | Hub | (secret) | Shared with Formbricks |
| `DATABASE_URL` | Hub | - | Hub shares the Formbricks database, as upstream does |
| `FORMBRICKS_HEALTH_URL` | Hub | - | Hub waits for this before migrating: Formbricks must create its tables in the shared database first (Prisma refuses a non-empty schema) |
| `POSTGRES_DB` | Postgres | formbricks | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user (superuser - Hub creates the vector and pgcrypto extensions) |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | Cube | 4000 | Port Cube listens on - leave as is |
| `CUBEJS_DB_HOST` | Cube | - | Postgres host |
| `CUBEJS_DB_NAME` | Cube | - | Database name |
| `CUBEJS_DB_PASS` | Cube | - | Database password |
| `CUBEJS_DB_PORT` | Cube | 5432 | Postgres port |
| `CUBEJS_DB_TYPE` | Cube | postgres | Cube reads Hub's feedback records from Postgres |
| `CUBEJS_DB_USER` | Cube | (secret) | Database user |
| `CUBEJS_API_SECRET` | Cube | (secret) | Shared with Formbricks |
| `CUBEJS_JWT_ISSUER` | Cube | formbricks-web | Must match Formbricks |
| `CUBEJS_JWT_AUDIENCE` | Cube | formbricks-cube | Must match Formbricks |
| `CUBEJS_DEFAULT_API_SCOPES` | Cube | meta,data | API scopes |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | Cube | memory | In-memory cache and queue, as in upstream's compose (no Cube Store needed) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "until spicedb datastore migrate head; do sleep 3; done && exec spicedb serve --telemetry-endpoint="`
- **Healthcheck:** `/metrics`
- **Start command:** `/bin/sh -c "chown -R valkey:valkey /data && exec docker-entrypoint.sh valkey-server --requirepass $VALKEY_PASSWORD --appendonly yes --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "until wget -q -O /dev/null $FORMBRICKS_HEALTH_URL; do echo Waiting for Formbricks to finish its migrations; sleep 5; done && goose -dir /app/migrations postgres $DATABASE_URL up && river migrate-up --database-url $DATABASE_URL && exec /app/hub-api"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`

**Category:** Analytics · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/formbricks-surveys)
