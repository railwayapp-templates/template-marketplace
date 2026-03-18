# Deploy Outline Wiki on Railway

Fast, collaborative knowledge base and wiki for your team.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-wiki)

## About

Outline is a fast, collaborative knowledge base for your team built using React and Node.js. It supports real-time collaborative editing, Markdown, and full-text search, with a clean interface for building and sharing team knowledge.

Hosting Outline on Railway provisions all required infrastructure with minimal configuration. The template includes a dedicated PostgreSQL database for storing documents, collections, and user data, a Redis instance for caching and real-time collaboration, and a Railway Bucket for file storage. Outline runs as a single container exposing port 3000. Database migrations run automatically on startup, so you're ready to sign in immediately after deployment.

PostgreSQL, Redis, and the storage bucket communicate with Outline over Railway's private network, keeping internal traffic off the public internet with zero egress fees. Outline itself is publicly accessible via your configured domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Outline | `outlinewiki/outline:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Redis server hostname. Auto-injected by Railway. |
| `REDISPORT` | Redis | 6379 | Redis server port. |
| `REDISUSER` | Redis | default | Redis authentication username. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias for REDIS_PASSWORD for client compatibility. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password. Auto-generated on deployment. |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to Redis externally. |
| `URL` | Outline | - | Publicly accessible URL of your Outline instance, e.g. https://wiki.mycompany.com |
| `PORT` | Outline | 3000 | Port Outline listens on. |
| `NODE_ENV` | Outline | production | Node environment. Should always be production for deployed instances. |
| `REDIS_URL` | Outline | - | Redis connection URL. Auto-injected from the Redis service. |
| `SMTP_HOST` | Outline | - | SMTP server hostname, e.g. smtp.resend.com. Required for invitations and notifications. |
| `SMTP_PORT` | Outline | - | SMTP server port. Usually 465 for TLS or 587 for STARTTLS. |
| `AWS_REGION` | Outline | - | Storage bucket region. Auto-injected from the Railway Bucket service. |
| `AWS_S3_ACL` | Outline | private | Access control for uploaded files. Private serves files via signed URLs. |
| `SECRET_KEY` | Outline | (secret) | Hex-encoded 32-byte secret key for encrypting session data. Auto-generated on deployment. |
| `FORCE_HTTPS` | Outline | true | Auto-redirect HTTP to HTTPS. Set to false if SSL is terminated at an external load balancer. |
| `SMTP_SECURE` | Outline | true | Optional. Use TLS for SMTP. Defaults to true. Set to false for STARTTLS on port 587. |
| `DATABASE_URL` | Outline | - | PostgreSQL connection URL. Auto-injected from the Postgres service. |
| `FILE_STORAGE` | Outline | s3 | Storage backend for file uploads. Set to s3 for S3-compatible services, or local to store on disk. |
| `UTILS_SECRET` | Outline | (secret) | Hex-encoded 32-byte secret key for utility functions. Auto-generated on deployment. |
| `OIDC_AUTH_URI` | Outline | - | Optional. OIDC authorization endpoint URI. |
| `SMTP_PASSWORD` | Outline | (secret) | SMTP authentication password. |
| `SMTP_USERNAME` | Outline | (secret) | SMTP authentication username. |
| `ENABLE_UPDATES` | Outline | true | Send anonymized statistics to the maintainers to check for updates. |
| `OIDC_CLIENT_ID` | Outline | - | Optional. OIDC client ID. Required if using a generic OIDC provider for authentication. |
| `OIDC_TOKEN_URI` | Outline | (secret) | Optional. OIDC token endpoint URI. |
| `AZURE_CLIENT_ID` | Outline | - | Optional. Microsoft Entra client ID. Required if using Microsoft as your authentication provider. |
| `SLACK_CLIENT_ID` | Outline | - | Optional. Slack OAuth client ID. Required if using Slack as your authentication provider. |
| `SMTP_FROM_EMAIL` | Outline | - | Sender address for outgoing emails. Supports mailbox format, e.g. Outline <noreply@mycompany.com> |
| `WEB_CONCURRENCY` | Outline | 2 | Number of server processes to spawn. Divide available memory by 512 for a rough estimate. |
| `GOOGLE_CLIENT_ID` | Outline | - | Google OAuth client ID. Required if using Google as your authentication provider. |
| `AWS_ACCESS_KEY_ID` | Outline | - | Storage access key ID. Auto-injected from the Railway Bucket service. |
| `DISCORD_CLIENT_ID` | Outline | - | Optional. Discord OAuth client ID. Required if using Discord as your authentication provider. |
| `DISCORD_SERVER_ID` | Outline | - | Optional. Discord server ID to restrict sign-in to members of a specific server. |
| `OIDC_DISPLAY_NAME` | Outline | - | Optional. Display name shown on the sign-in button for your OIDC provider. |
| `OIDC_USERINFO_URI` | Outline | - | Optional. OIDC userinfo endpoint URI. |
| `OIDC_CLIENT_SECRET` | Outline | (secret) | Optional. OIDC client secret. Required if using a generic OIDC provider for authentication. |
| `AZURE_CLIENT_SECRET` | Outline | (secret) | Optional. Microsoft Entra client secret. Required if using Microsoft as your authentication provider. |
| `SLACK_CLIENT_SECRET` | Outline | (secret) | Optional. Slack OAuth client secret. Required if using Slack as your authentication provider. |
| `DISCORD_SERVER_ROLES` | Outline | - | Optional. Comma-separated Discord role IDs to restrict sign-in to specific roles. |
| `GOOGLE_CLIENT_SECRET` | Outline | (secret) | Google OAuth client secret. Required if using Google as your authentication provider. |
| `AWS_SECRET_ACCESS_KEY` | Outline | (secret) | Storage secret access key. Auto-injected from the Railway Bucket service. |
| `AZURE_RESOURCE_APP_ID` | Outline | - | Optional. Microsoft Entra resource app ID. Required if using Microsoft as your authentication provider. |
| `DISCORD_CLIENT_SECRET` | Outline | (secret) | Optional. Discord OAuth client secret. Required if using Discord as your authentication provider. |
| `AWS_S3_FORCE_PATH_STYLE` | Outline | true | Use path-style S3 URLs. Required for Railway Buckets and most S3-compatible services. |
| `AWS_S3_UPLOAD_BUCKET_URL` | Outline | - | Storage endpoint URL. Auto-injected from the Railway Bucket service. |
| `AWS_S3_UPLOAD_BUCKET_NAME` | Outline | - | Storage bucket name. Auto-injected from the Railway Bucket service. |
| `FILE_STORAGE_UPLOAD_MAX_SIZE` | Outline | 26214400 | Maximum upload size in bytes. Default is 26214400 (25MB). |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/outline-wiki)
