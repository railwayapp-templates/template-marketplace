# Deploy Medplum on Railway

Deploy Medplum on Railway. Healthcare backend with FHIR support. One click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medplum)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ympAeH?referralCode=9uHSFr&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic)

Medplum is an open-source healthcare platform built around HL7 FHIR. It provides APIs, authentication, storage, and a ready-to-use web app for building modern healthcare applications such as EHRs, patient portals, and clinical workflows.

Hosting Medplum requires a PostgreSQL database for persistence, Redis for caching and job queues, and optional file storage for binary data. The platform consists of two main services:

- **Medplum Server** → FHIR API, authentication, and backend logic  
- **Medplum App** → Frontend web application served via Nginx  

Railway provisions all required services, handles networking, SSL, and environment configuration.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Medplum Server | `medplum/medplum-server:latest` | Web service |
| Medplum App | `medplum/medplum-app:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | medplum | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Medplum Server | 8103 | Server port |
| `MEDPLUM_PORT` | Medplum Server | - | Server port |
| `MEDPLUM_BASE_URL` | Medplum Server | - | Server base URL |
| `MEDPLUM_REDIS_HOST` | Medplum Server | - | Redis host |
| `MEDPLUM_REDIS_PORT` | Medplum Server | - | Redis port |
| `MEDPLUM_APP_BASE_URL` | Medplum Server | - | Medplum App URL |
| `MEDPLUM_DATABASE_HOST` | Medplum Server | - | Postgres host |
| `MEDPLUM_DATABASE_PORT` | Medplum Server | - | Postgres port |
| `MEDPLUM_MAX_JSON_SIZE` | Medplum Server | 1mb | Medplum max JSON size |
| `MEDPLUM_SUPPORT_EMAIL` | Medplum Server | "Medplum" <support@medplum.com> | Support email |
| `MEDPLUM_BINARY_STORAGE` | Medplum Server | file:./binary/ | Binary storage |
| `MEDPLUM_MAX_BATCH_SIZE` | Medplum Server | 50mb | Max batch size |
| `MEDPLUM_REDIS_PASSWORD` | Medplum Server | (secret) | Redis password |
| `MEDPLUM_ALLOWED_ORIGINS` | Medplum Server | * | Allowed origins |
| `MEDPLUM_DATABASE_DBNAME` | Medplum Server | - | Postgres database name |
| `MEDPLUM_GOOGLE_CLIENT_ID` | Medplum Server | - | Google OAuth Client ID |
| `MEDPLUM_STORAGE_BASE_URL` | Medplum Server | - | Storage base URL |
| `MEDPLUM_DATABASE_PASSWORD` | Medplum Server | (secret) | Postgres password |
| `MEDPLUM_DATABASE_USERNAME` | Medplum Server | (secret) | Postgres username |
| `MEDPLUM_RECAPTCHA_SITE_KEY` | Medplum Server | - | reCAPTCHA site key |
| `MEDPLUM_BOT_LAMBDA_ROLE_ARN` | Medplum Server | - | ARN of the Lambda execution role |
| `MEDPLUM_GOOGLE_CLIENT_SECRET` | Medplum Server | (secret) | Google OAuth Client Secret |
| `MEDPLUM_RECAPTCHA_SECRET_KEY` | Medplum Server | (secret) | reCAPTCHA secret key |
| `MEDPLUM_BOT_LAMBDA_LAYER_NAME` | Medplum Server | medplum-bot-layer | Name of the lambda layer |
| `MEDPLUM_INTROSPECTION_ENABLED` | Medplum Server | true | Enable OAuth introspection endpoint |
| `MEDPLUM_VM_CONTEXT_BOTS_ENABLED` | Medplum Server | false | Enable VM Context (local) bots |
| `MEDPLUM_DEFAULT_BOT_RUNTIME_VERSION` | Medplum Server | awslambda | Default bot runtime version |
| `MEDPLUM_SHUTDOWN_TIMEOUT_MILLISECONDS` | Medplum Server | 30000 | Graceful shutdown timeout in milliseconds |
| `GOOGLE_CLIENT_ID` | Medplum App | - | Google OAuth Client ID |
| `MEDPLUM_BASE_URL` | Medplum App | - | Medplum Server URL |
| `MEDPLUM_CLIENT_ID` | Medplum App | - | Medplum Client ID |
| `RECAPTCHA_SITE_KEY` | Medplum App | - | reCAPTCHA site key |
| `MEDPLUM_REGISTER_ENABLED` | Medplum App | true | Enable public user registration |
| `MEDPLUM_AWS_TEXTRACT_ENABLED` | Medplum App | false | Enable AWS Textract |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node --require ./packages/server/dist/otel/instrumentation.js packages/server/dist/index.js env`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/medplum)
