# Deploy Colanode on Railway

Open-source Notion alternative with local-first data control.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/colanode)

## About

Colanode is an open-source, local-first collaboration workspace that combines real-time chat, rich text editing, customizable databases, and file management. Built with privacy and data control in mind, it enables seamless collaboration whether online or offline, similar to Notion but self-hosted.

Hosting Colanode involves deploying a client-server architecture where the server handles data synchronization and storage while clients (web or desktop) provide the user interface. The system uses a local-first approach with SQLite for local storage and PostgreSQL for server-side persistence. Real-time collaboration is powered by Conflict-free Replicated Data Types (CRDTs) via Yjs, enabling multiple users to edit simultaneously without conflicts. The deployment requires PostgreSQL with pgvector extension, Redis for caching, and S3-compatible storage for file management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Colanode Server | `ghcr.io/colanode/server` | Web service |
| Redis | `redis:8.2.1` | Database |
| pgvector | `pgvector/pgvector:pg17` | Database |
| Colanode Web | `ghcr.io/colanode/web` | Web service |
| MinIO Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| MinIO Bucket | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_DB` | Colanode Server | 0 | Redis database number to use |
| `REDIS_URL` | Colanode Server | - | Complete Redis connection string with authentication |
| `SMTP_HOST` | Colanode Server | - | SMTP server hostname or IP address |
| `SMTP_PORT` | Colanode Server | - | SMTP server port (typically 587 for TLS, 465 for SSL, 25 for plain) |
| `SMTP_USER` | Colanode Server | (secret) | Username for SMTP server authentication |
| `AI_ENABLED` | Colanode Server | false | Enables/disables experimental AI integration features |
| `SERVER_MODE` | Colanode Server | standalone | Deployment mode - standalone or k8s cluster configuration |
| `SERVER_NAME` | Colanode Server | Colanode | Display name for the server shown in the desktop app |
| `POSTGRES_URL` | Colanode Server | - | Complete PostgreSQL connection string with credentials and database |
| `SMTP_ENABLED` | Colanode Server | false | Enables/disables email functionality |
| `SERVER_AVATAR` | Colanode Server | '' | URL for server avatar image in the login screen |
| `SMTP_PASSWORD` | Colanode Server | (secret) | Password for SMTP server authentication |
| `SMTP_EMAIL_FROM` | Colanode Server | - | Email address that appears as the sender |
| `STORAGE_S3_BUCKET` | Colanode Server | colanode | S3 bucket name for file storage |
| `STORAGE_S3_REGION` | Colanode Server | us-east-1 | AWS region or S3-compatible storage region |
| `SERVER_CORS_ORIGIN` | Colanode Server | - | Allowed origins for Cross-Origin Resource Sharing requests |
| `SERVER_PATH_PREFIX` | Colanode Server | - | Custom URL path prefix (e.g., '/colanode' instead of root '/') |
| `USER_MAX_FILE_SIZE` | Colanode Server | 104857600 | Maximum individual file upload size (in bytes) |
| `USER_STORAGE_LIMIT` | Colanode Server | 10737418240 | Maximum storage space per user (in bytes) |
| `ACCOUNT_OTP_TIMEOUT` | Colanode Server | 600 | Time limit for one-time password validity (in seconds) |
| `SERVER_CORS_MAX_AGE` | Colanode Server | - | Cache duration for CORS preflight requests (in seconds) |
| `STORAGE_S3_ENDPOINT` | Colanode Server | - | S3-compatible storage endpoint URL |
| `SMTP_EMAIL_FROM_NAME` | Colanode Server | - | Display name that appears as the sender |
| `STORAGE_S3_ACCESS_KEY` | Colanode Server | - | Access key for S3 authentication |
| `STORAGE_S3_SECRET_KEY` | Colanode Server | (secret) | Secret key for S3 authentication |
| `ACCOUNT_GOOGLE_ENABLED` | Colanode Server | - | Enables/disables Google OAuth login functionality |
| `ACCOUNT_GOOGLE_CLIENT_ID` | Colanode Server | - | Google OAuth application client ID |
| `ACCOUNT_VERIFICATION_TYPE` | Colanode Server | automatic | How new accounts are verified (automatic/manual/email) |
| `STORAGE_S3_FORCE_PATH_STYLE` | Colanode Server | true | Forces path-style URLs instead of virtual-hosted-style |
| `ACCOUNT_GOOGLE_CLIENT_SECRET` | Colanode Server | (secret) | Google OAuth application client secret |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | pgvector | railway | Default database created when image is started. |
| `DATABASE_URL` | pgvector | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | pgvector | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | pgvector | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | MinIO Console | 9090 | - |
| `PASSWORD` | MinIO Console | (secret) | - |
| `USERNAME` | MinIO Console | (secret) | - |
| `MINIO_ROOT_USER` | MinIO Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | MinIO Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | MinIO Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/colanode)
