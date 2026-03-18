# Deploy Outline Knowledge Base on Railway

Beautiful, realtime collaborative, feature packed, and markdown compatible.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/LNLiaz)

## About

Lost in a mess of Docs? Never quite sure who has access? Colleagues requesting the same information repeatedly in chat? It’s time to get your team’s knowledge organized.

Deploy a local storage first Docker Image of the Outline Knowledge Base.

This template deploys Redis, Postgres and the Outline Docker container linking them for a minimal deployment.

Note: If opting to stay with local storage, remove AWS environment variables. This will ensure that file uploads work correctly.

Note: You must use ONE OF EITHER Google, Slack, or Microsoft for a working installation or you'll have no sign-in options.

It is possible to setup email-only login after you've signed in with one of the options above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| Outline | `outlinewiki/outline` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | The hostname or IP address of the Redis server (e.g., redis.railway.internal or an external host like redis.example.com). |
| `REDISPORT` | Redis | 6379 | The port number on which the Redis server is listening (default is usually 6379 for non-TLS connections). |
| `REDISUSER` | Redis | default | The username for authenticating to the Redis server (required for ACL-enabled Redis instances; often blank or "default" if not using ACLs). |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | The password for authenticating to the Redis server (used in combination with REDISUSER for ACL authentication). |
| `REDIS_PASSWORD` | Redis | (secret) | Alternative or legacy name for the Redis authentication password (some clients/templates use this instead of REDISPASSWORD; Outline's underlying ioredis library supports password via this or in the URL). |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `URL` | Outline | - | URL should point to the fully qualified, publicly accessible URL. If using a proxy the port in URL and PORT may be different. |
| `PORT` | Outline | 3000 | URL should point to the fully qualified, publicly accessible URL. If using a proxy the port in URL and PORT may be different. |
| `CDN_URL` | Outline | - | If using a Cloudfront/Cloudflare distribution or similar it can be set below. This will cause paths to javascript, stylesheets, and images to be updated to the hostname defined in CDN_URL. In your CDN configuration the origin server should be set to the same as URL. |
| `NODE_ENV` | Outline | production | Set Node Environment |
| `LOG_LEVEL` | Outline | info | Configure lowest severity level for server logs. Should be one of error, warn, info, http, verbose, debug and silly |
| `PGSSLMODE` | Outline | disable | Disable SSL for connecting to Postgres |
| `REDIS_URL` | Outline | - | Redis URL |
| `SMTP_HOST` | Outline | - | To support sending outgoing transactional emails such as "document updated" or "you've been invited" you'll need to provide authentication for an SMTP server |
| `SMTP_PORT` | Outline | - | To support sending outgoing transactional emails such as "document updated" or "you've been invited" you'll need to provide authentication for an SMTP server |
| `AWS_REGION` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `AWS_S3_ACL` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `SECRET_KEY` | Outline | (secret) | Generate a hex-encoded 64-byte random key. |
| `SENTRY_DSN` | Outline | - | Optionally enable Sentry (sentry.io) to track errors and performance |
| `FORCE_HTTPS` | Outline | true | Auto-redirect to https in production. The default is true but you may set to false if you can be sure that SSL is terminated at an external loadbalancer. |
| `OIDC_SCOPES` | Outline | - | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `DATABASE_URL` | Outline | - | Postgres Database URL |
| `FILE_STORAGE` | Outline | local | Specify what storage system to use. Possible value is one of "s3" or "local". For "local", the avatar images and document attachments will be saved on local disk. |
| `SLACK_APP_ID` | Outline | - | https://wiki.generaloutline.com/share/be25efd1-b3ef-4450-b8e5-c4a4fc11e02a |
| `UTILS_SECRET` | Outline | (secret) | Generate a unique random key. |
| `OIDC_AUTH_URI` | Outline | - | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `SENTRY_TUNNEL` | Outline | - | Optionally enable Sentry (sentry.io) to track errors and performance |
| `SMTP_PASSWORD` | Outline | (secret) | To support sending outgoing transactional emails such as "document updated" or "you've been invited" you'll need to provide authentication for an SMTP server |
| `SMTP_USERNAME` | Outline | (secret) | To support sending outgoing transactional emails such as "document updated" or "you've been invited" you'll need to provide authentication for an SMTP server |
| `ENABLE_UPDATES` | Outline | true | Have the installation check for updates by sending anonymized statistics to the maintainers |
| `OIDC_CLIENT_ID` | Outline | - | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `OIDC_TOKEN_URI` | Outline | (secret) | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `AZURE_CLIENT_ID` | Outline | - | https://docs.getoutline.com/s/hosting/doc/microsoft-azure-UVz6jsIOcv |
| `AZURE_TENANT_ID` | Outline | - | Optional user experience improvement. If user is signed into multiple tenancies, this variable automatically selects the right tenancy. |
| `SLACK_CLIENT_ID` | Outline | - | https://docs.getoutline.com/s/hosting/doc/slack-sgMujR8J9J |
| `SMTP_FROM_EMAIL` | Outline | - | To support sending outgoing transactional emails such as "document updated" or "you've been invited" you'll need to provide authentication for an SMTP server |
| `WEB_CONCURRENCY` | Outline | 1 | How many processes should be spawned. As a reasonable rule divide your servers available memory by 512 for a rough estimate |
| `DEFAULT_LANGUAGE` | Outline | en_US | The default interface language. See translate.getoutline.com for a list of available language codes and their rough percentage translated. |
| `GOOGLE_CLIENT_ID` | Outline | - | https://docs.getoutline.com/s/hosting/doc/google-hOuvtCmTqQ |
| `AWS_ACCESS_KEY_ID` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `COLLABORATION_URL` | Outline | - | https://github.com/outline/outline/blob/main/docs/SERVICES.md |
| `OIDC_DISPLAY_NAME` | Outline | - | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `OIDC_USERINFO_URI` | Outline | - | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `OIDC_CLIENT_SECRET` | Outline | (secret) | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `AZURE_CLIENT_SECRET` | Outline | (secret) | https://docs.getoutline.com/s/hosting/doc/microsoft-azure-UVz6jsIOcv |
| `GOOGLE_ANALYTICS_ID` | Outline | - | Optionally enable google analytics to track pageviews in the knowledge base |
| `OIDC_USERNAME_CLAIM` | Outline | (secret) | https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `SLACK_CLIENT_SECRET` | Outline | (secret) | https://docs.getoutline.com/s/hosting/doc/slack-sgMujR8J9J |
| `GOOGLE_CLIENT_SECRET` | Outline | (secret) | https://docs.getoutline.com/s/hosting/doc/google-hOuvtCmTqQ |
| `RATE_LIMITER_ENABLED` | Outline | true | Optionally enable rate limiter at application web server |
| `AWS_S3_ACCELERATE_URL` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `AWS_SECRET_ACCESS_KEY` | Outline | (secret) | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `AZURE_RESOURCE_APP_ID` | Outline | - | https://docs.getoutline.com/s/hosting/doc/microsoft-azure-UVz6jsIOcv |
| `RATE_LIMITER_REQUESTS` | Outline | 1000 | Configure default throttling parameters for rate limiter |
| `SLACK_MESSAGE_ACTIONS` | Outline | true | https://wiki.generaloutline.com/share/be25efd1-b3ef-4450-b8e5-c4a4fc11e02a |
| `AWS_S3_FORCE_PATH_STYLE` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `AWS_S3_UPLOAD_BUCKET_URL` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `SLACK_VERIFICATION_TOKEN` | Outline | (secret) | https://wiki.generaloutline.com/share/be25efd1-b3ef-4450-b8e5-c4a4fc11e02a |
| `AWS_S3_UPLOAD_BUCKET_NAME` | Outline | - | https://wiki.generaloutline.com/share/125de1cc-9ff6-424b-8415-0d58c809a40f |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | Outline | - | If "local" is configured for FILE_STORAGE above, then this sets the parent directory under which all attachments/images go. Make sure that the process has permissions to create this path and also to write files to it. |
| `FILE_STORAGE_IMPORT_MAX_SIZE` | Outline | 5120000 | Override the maximum size of document imports, could be required if you have especially large Word documents with embedded imagery |
| `FILE_STORAGE_UPLOAD_MAX_SIZE` | Outline | 26214400 | Maximum allowed size for the uploaded attachment. |
| `RATE_LIMITER_DURATION_WINDOW` | Outline | 60 | Configure default throttling parameters for rate limiter |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Outline | true | When set to "true" or "1", enables Outline's private networking optimizations for Alpine-based deployments (e.g., in Railway or similar container platforms). This can improve performance and reduce overhead in private/internal network setups. |
| `AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE` | Outline | 1 | Set to "1" or "true" to suppress the AWS SDK for JavaScript v2 maintenance mode / deprecation warning in console logs. (The v2 SDK is in maintenance mode since 2024 and will reach end-of-support in 2025; this var silences the repeated startup nag message without affecting functionality.) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/LNLiaz)
