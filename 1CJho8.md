# Deploy Latitude on Railway

The Open-Source Prompt Engineering Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1CJho8)

## About

Latitude is an open-source prompt engineering platform that provides complete lifecycle management for AI applications. It enables teams to collaboratively design, test, deploy, and evaluate prompts with advanced versioning, monitoring, and deployment capabilities.

Hosting Latitude provides a comprehensive platform for AI prompt engineering that spans the entire development lifecycle from creation to production monitoring. Built for cross-functional teams, it offers collaborative prompt development with PromptL language support, interactive testing playgrounds, API deployment capabilities, and systematic evaluation tools. The self-hosted version gives you complete control over your AI development process while maintaining data privacy and security. With features like automatic logging, batch evaluations, dataset management, and seamless integrations, Latitude transforms how teams build and maintain reliable AI applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio-provision | `minio/mc` | Database |
| minio-console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| gateway | `ghcr.io/latitude-dev/gateway:latest` | Web service |
| migrations | `ghcr.io/latitude-dev/migrations:latest` | Worker |
| web | `ghcr.io/latitude-dev/web:latest` | Web service |
| workers | `ghcr.io/latitude-dev/workers:latest` | Worker |
| websockets | `ghcr.io/latitude-dev/websockets:latest` | Web service |
| minio-bucket | `minio/minio:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ENDPOINT` | minio-provision | - | The Minio bucket endpoint |
| `MINIO_ROOT_USER` | minio-provision | (secret) | The Minio S3 root user |
| `MINIO_PUBLIC_BUCKET` | minio-provision | railway-public | Name of the public S3 bucket |
| `MINIO_ROOT_PASSWORD` | minio-provision | (secret) | The Minio S3 root password |
| `MINIO_PRIVATE_BUCKET` | minio-provision | railway-private | Name of the private S3 bucket |
| `PORT` | minio-console | 9090 | The port the Console runs on internally |
| `PASSWORD` | minio-console | (secret) | The password to login to the Console |
| `USERNAME` | minio-console | (secret) | The username to login to the Console |
| `CONSOLE_MINIO_SERVER` | minio-console | - | The domain of the Minio server |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PORT` | gateway | 8787 | Port to expose for networking |
| `APP_URL` | gateway | - | Base URL for the web application |
| `NODE_ENV` | gateway | production | Node.js environment (e.g., development, production) |
| `S3_BUCKET` | gateway | - | The AWS S3 private bucket name |
| `SMTP_HOST` | gateway | smtp.gmail.com | The SMTP host that will send the email |
| `SMTP_PASS` | gateway | your_app_password | SMTP password for sending emails |
| `SMTP_PORT` | gateway | 465 | SMTP server port |
| `SMTP_USER` | gateway | (secret) | SMTP username (email address) for sending emails |
| `APP_DOMAIN` | gateway | up.railway.app | Domain for the web application |
| `AWS_REGION` | gateway | auto | The AWS Region the S3 bucket sits |
| `CACHE_HOST` | gateway | - | The Redis hostname |
| `CACHE_PORT` | gateway | - | The Redis port |
| `DRIVE_DISK` | gateway | s3 | File storage driver (local or s3) |
| `QUEUE_HOST` | gateway | - | The Redis hostname |
| `QUEUE_PORT` | gateway | - | The Redis port |
| `GATEWAY_SSL` | gateway | false | Whether the gateway uses SSL |
| `SMTP_SECURE` | gateway | true | Whether to use a secure SMTP connection (TLS/SSL) |
| `DATABASE_URL` | gateway | - | Database connection URL |
| `GATEWAY_PORT` | gateway | 8787 | Port for the API gateway |
| `MAILGUN_HOST` | gateway | api.eu.mailgun.net | Host for Mailgun API |
| `POSTGRES_USER` | gateway | (secret) | Username for the Postgres database |
| `AWS_ACCESS_KEY` | gateway | - | The AWS S3 access key |
| `AWS_SECRET_KEY` | gateway | (secret) | The AWS S3 secret key |
| `CACHE_PASSWORD` | gateway | (secret) | The Redis password |
| `MAIL_TRANSPORT` | gateway | smtp | Email transport method (e.g., mailpit, mailgun) |
| `QUEUE_PASSWORD` | gateway | (secret) | The Redis password |
| `FILE_PUBLIC_PATH` | gateway | files | Public URL path segment for files |
| `GATEWAY_HOSTNAME` | gateway | - | Hostname for the API gateway |
| `GOOGLE_CLIENT_ID` | gateway | fake | Google OAuth client ID |
| `MAILGUN_PROTOCOL` | gateway | https | Protocol for Mailgun API |
| `PUBLIC_S3_BUCKET` | gateway | - | The AWS S3 public bucket name |
| `FROM_MAILER_EMAIL` | gateway | hello@latitude.localhost | Sender email address |
| `GATEWAY_BIND_PORT` | gateway | 8787 | Port the gateway binds to |
| `POSTGRES_PASSWORD` | gateway | (secret) | Password for the Postgres database (migrations) |
| `READ_DATABASE_URL` | gateway | - | Read database connection URL |
| `WEBSOCKETS_SERVER` | gateway | - | URL for the WebSocket server |
| `FILES_STORAGE_PATH` | gateway | /app/storage/files | Local path for private files storage |
| `GOOGLE_REDIRECT_URI` | gateway | - | Redirect URI for Google OAuth |
| `READ_2_DATABASE_URL` | gateway | - | Read database connection URL |
| `GATEWAY_BIND_ADDRESS` | gateway | - | Address the gateway binds to |
| `GOOGLE_CLIENT_SECRET` | gateway | (secret) | Google OAuth client secret |
| `MAILGUN_EMAIL_DOMAIN` | gateway | latitude.localhost | Email domain for Mailgun |
| `FILE_STORAGE_ROOT_PATH` | gateway | /app/storage/files | Root path for file storage |
| `WEBSOCKETS_SERVER_PORT` | gateway | 8080 | Port for the WebSocket server |
| `NEXT_PUBLIC_POSTHOG_KEY` | gateway | your_posthog_key | Posthog key for analytics |
| `DEFAULT_PROVIDER_API_KEY` | gateway | (secret) | Default OpenAI API key for providers |
| `NEXT_PUBLIC_POSTHOG_HOST` | gateway | your_posthog_host | Posthog host for analytics |
| `PUBLIC_FILES_STORAGE_PATH` | gateway | /app/apps/web/public/files | Local path for public files storage |
| `WEBSOCKET_SECRET_TOKEN_KEY` | gateway | (secret) | Secret key for WebSocket tokens |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | gateway | - | Encryption key for Next.js server actions |
| `WEBSOCKET_REFRESH_SECRET_TOKEN_KEY` | gateway | (secret) | Secret key for WebSocket refresh tokens |
| `APP_URL` | migrations | - | Base URL for the web application |
| `NODE_ENV` | migrations | production | Node.js environment (e.g., development, production) |
| `S3_BUCKET` | migrations | - | The AWS S3 private bucket name |
| `SMTP_HOST` | migrations | smtp.gmail.com | The SMTP host that will send the email |
| `SMTP_PASS` | migrations | your_app_password | SMTP password for sending emails |
| `SMTP_PORT` | migrations | 465 | SMTP server port |
| `SMTP_USER` | migrations | (secret) | SMTP username (email address) for sending emails |
| `APP_DOMAIN` | migrations | up.railway.app | Domain for the web application |
| `AWS_REGION` | migrations | auto | The AWS Region the S3 bucket sits |
| `CACHE_HOST` | migrations | - | The Redis hostname |
| `CACHE_PORT` | migrations | - | The Redis port |
| `DRIVE_DISK` | migrations | s3 | File storage driver (local or s3) |
| `QUEUE_HOST` | migrations | - | The Redis hostname |
| `QUEUE_PORT` | migrations | - | The Redis port |
| `GATEWAY_SSL` | migrations | false | Whether the gateway uses SSL |
| `SMTP_SECURE` | migrations | true | Whether to use a secure SMTP connection (TLS/SSL) |
| `DATABASE_URL` | migrations | - | Database connection URL |
| `GATEWAY_PORT` | migrations | 8787 | Port for the API gateway |
| `MAILGUN_HOST` | migrations | api.eu.mailgun.net | Host for Mailgun API |
| `POSTGRES_USER` | migrations | (secret) | Username for the Postgres database |
| `AWS_ACCESS_KEY` | migrations | - | The AWS S3 access key |
| `AWS_SECRET_KEY` | migrations | (secret) | The AWS S3 secret key |
| `CACHE_PASSWORD` | migrations | (secret) | The Redis password |
| `MAIL_TRANSPORT` | migrations | smtp | Email transport method (e.g., mailpit, mailgun) |
| `QUEUE_PASSWORD` | migrations | (secret) | The Redis password |
| `FILE_PUBLIC_PATH` | migrations | files | Public URL path segment for files |
| `GATEWAY_HOSTNAME` | migrations | - | Hostname for the API gateway |
| `GOOGLE_CLIENT_ID` | migrations | fake | Google OAuth client ID |
| `MAILGUN_PROTOCOL` | migrations | https | Protocol for Mailgun API |
| `PUBLIC_S3_BUCKET` | migrations | - | The AWS S3 public bucket name |
| `FROM_MAILER_EMAIL` | migrations | hello@latitude.localhost | Sender email address |
| `GATEWAY_BIND_PORT` | migrations | 8787 | Port the gateway binds to |
| `POSTGRES_PASSWORD` | migrations | (secret) | Password for the Postgres database (migrations) |
| `READ_DATABASE_URL` | migrations | - | Read database connection URL |
| `WEBSOCKETS_SERVER` | migrations | - | URL for the WebSocket server |
| `FILES_STORAGE_PATH` | migrations | /app/storage/files | Local path for private files storage |
| `GOOGLE_REDIRECT_URI` | migrations | - | Redirect URI for Google OAuth |
| `READ_2_DATABASE_URL` | migrations | - | Read database connection URL |
| `GATEWAY_BIND_ADDRESS` | migrations | - | Address the gateway binds to |
| `GOOGLE_CLIENT_SECRET` | migrations | (secret) | Google OAuth client secret |
| `MAILGUN_EMAIL_DOMAIN` | migrations | latitude.localhost | Email domain for Mailgun |
| `FILE_STORAGE_ROOT_PATH` | migrations | /app/storage/files | Root path for file storage |
| `WEBSOCKETS_SERVER_PORT` | migrations | 8080 | Port for the WebSocket server |
| `NEXT_PUBLIC_POSTHOG_KEY` | migrations | your_posthog_key | Posthog key for analytics |
| `DEFAULT_PROVIDER_API_KEY` | migrations | (secret) | Default OpenAI API key for providers |
| `NEXT_PUBLIC_POSTHOG_HOST` | migrations | your_posthog_host | Posthog host for analytics |
| `PUBLIC_FILES_STORAGE_PATH` | migrations | /app/apps/web/public/files | Local path for public files storage |
| `WEBSOCKET_SECRET_TOKEN_KEY` | migrations | (secret) | Secret key for WebSocket tokens |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | migrations | - | Encryption key for Next.js server actions |
| `WEBSOCKET_REFRESH_SECRET_TOKEN_KEY` | migrations | (secret) | Secret key for WebSocket refresh tokens |
| `PORT` | web | 8080 | Port to expose for networking |
| `APP_URL` | web | - | Base URL for the web application |
| `NODE_ENV` | web | production | Node.js environment (e.g., development, production) |
| `S3_BUCKET` | web | - | The AWS S3 private bucket name |
| `SMTP_HOST` | web | smtp.gmail.com | The SMTP host that will send the email |
| `SMTP_PASS` | web | your_app_password | SMTP password for sending emails |
| `SMTP_PORT` | web | 465 | SMTP server port |
| `SMTP_USER` | web | (secret) | SMTP username (email address) for sending emails |
| `APP_DOMAIN` | web | up.railway.app | Domain for the web application |
| `AWS_REGION` | web | auto | The AWS Region the S3 bucket sits |
| `CACHE_HOST` | web | - | The Redis hostname |
| `CACHE_PORT` | web | - | The Redis port |
| `DRIVE_DISK` | web | s3 | File storage driver (local or s3) |
| `QUEUE_HOST` | web | - | The Redis hostname |
| `QUEUE_PORT` | web | - | The Redis port |
| `GATEWAY_SSL` | web | false | Whether the gateway uses SSL |
| `SMTP_SECURE` | web | true | Whether to use a secure SMTP connection (TLS/SSL) |
| `DATABASE_URL` | web | - | Database connection URL |
| `GATEWAY_PORT` | web | 8787 | Port for the API gateway |
| `MAILGUN_HOST` | web | api.eu.mailgun.net | Host for Mailgun API |
| `POSTGRES_USER` | web | (secret) | Username for the Postgres database |
| `AWS_ACCESS_KEY` | web | - | The AWS S3 access key |
| `AWS_SECRET_KEY` | web | (secret) | The AWS S3 secret key |
| `CACHE_PASSWORD` | web | (secret) | The Redis password |
| `MAIL_TRANSPORT` | web | smtp | Email transport method (e.g., mailpit, mailgun) |
| `QUEUE_PASSWORD` | web | (secret) | The Redis password |
| `FILE_PUBLIC_PATH` | web | files | Public URL path segment for files |
| `GATEWAY_HOSTNAME` | web | - | Hostname for the API gateway |
| `GOOGLE_CLIENT_ID` | web | fake | Google OAuth client ID |
| `MAILGUN_PROTOCOL` | web | https | Protocol for Mailgun API |
| `PUBLIC_S3_BUCKET` | web | - | The AWS S3 public bucket name |
| `FROM_MAILER_EMAIL` | web | hello@latitude.localhost | Sender email address |
| `GATEWAY_BIND_PORT` | web | 8787 | Port the gateway binds to |
| `POSTGRES_PASSWORD` | web | (secret) | Password for the Postgres database (migrations) |
| `READ_DATABASE_URL` | web | - | Read database connection URL |
| `WEBSOCKETS_SERVER` | web | - | URL for the WebSocket server |
| `FILES_STORAGE_PATH` | web | /app/storage/files | Local path for private files storage |
| `GOOGLE_REDIRECT_URI` | web | - | Redirect URI for Google OAuth |
| `READ_2_DATABASE_URL` | web | - | Read database connection URL |
| `GATEWAY_BIND_ADDRESS` | web | - | Address the gateway binds to |
| `GOOGLE_CLIENT_SECRET` | web | (secret) | Google OAuth client secret |
| `MAILGUN_EMAIL_DOMAIN` | web | latitude.localhost | Email domain for Mailgun |
| `FILE_STORAGE_ROOT_PATH` | web | /app/storage/files | Root path for file storage |
| `WEBSOCKETS_SERVER_PORT` | web | 8080 | Port for the WebSocket server |
| `NEXT_PUBLIC_POSTHOG_KEY` | web | your_posthog_key | Posthog key for analytics |
| `DEFAULT_PROVIDER_API_KEY` | web | (secret) | Default OpenAI API key for providers |
| `NEXT_PUBLIC_POSTHOG_HOST` | web | your_posthog_host | Posthog host for analytics |
| `PUBLIC_FILES_STORAGE_PATH` | web | /app/apps/web/public/files | Local path for public files storage |
| `WEBSOCKET_SECRET_TOKEN_KEY` | web | (secret) | Secret key for WebSocket tokens |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | web | - | Encryption key for Next.js server actions |
| `WEBSOCKET_REFRESH_SECRET_TOKEN_KEY` | web | (secret) | Secret key for WebSocket refresh tokens |
| `APP_URL` | workers | - | Base URL for the web application |
| `NODE_ENV` | workers | production | Node.js environment (e.g., development, production) |
| `S3_BUCKET` | workers | - | The AWS S3 private bucket name |
| `SMTP_HOST` | workers | smtp.gmail.com | The SMTP host that will send the email |
| `SMTP_PASS` | workers | your_app_password | SMTP password for sending emails |
| `SMTP_PORT` | workers | 465 | SMTP server port |
| `SMTP_USER` | workers | (secret) | SMTP username (email address) for sending emails |
| `APP_DOMAIN` | workers | up.railway.app | Domain for the web application |
| `AWS_REGION` | workers | auto | The AWS Region the S3 bucket sits |
| `CACHE_HOST` | workers | - | The Redis hostname |
| `CACHE_PORT` | workers | - | The Redis port |
| `DRIVE_DISK` | workers | s3 | File storage driver (local or s3) |
| `QUEUE_HOST` | workers | - | The Redis hostname |
| `QUEUE_PORT` | workers | - | The Redis port |
| `GATEWAY_SSL` | workers | false | Whether the gateway uses SSL |
| `SMTP_SECURE` | workers | true | Whether to use a secure SMTP connection (TLS/SSL) |
| `DATABASE_URL` | workers | - | Database connection URL |
| `GATEWAY_PORT` | workers | 8787 | Port for the API gateway |
| `MAILGUN_HOST` | workers | api.eu.mailgun.net | Host for Mailgun API |
| `POSTGRES_USER` | workers | (secret) | Username for the Postgres database |
| `AWS_ACCESS_KEY` | workers | - | The AWS S3 access key |
| `AWS_SECRET_KEY` | workers | (secret) | The AWS S3 secret key |
| `CACHE_PASSWORD` | workers | (secret) | The Redis password |
| `MAIL_TRANSPORT` | workers | smtp | Email transport method (e.g., mailpit, mailgun) |
| `QUEUE_PASSWORD` | workers | (secret) | The Redis password |
| `FILE_PUBLIC_PATH` | workers | files | Public URL path segment for files |
| `GATEWAY_HOSTNAME` | workers | - | Hostname for the API gateway |
| `GOOGLE_CLIENT_ID` | workers | fake | Google OAuth client ID |
| `MAILGUN_PROTOCOL` | workers | https | Protocol for Mailgun API |
| `PUBLIC_S3_BUCKET` | workers | - | The AWS S3 public bucket name |
| `FROM_MAILER_EMAIL` | workers | hello@latitude.localhost | Sender email address |
| `GATEWAY_BIND_PORT` | workers | 8787 | Port the gateway binds to |
| `POSTGRES_PASSWORD` | workers | (secret) | Password for the Postgres database (migrations) |
| `READ_DATABASE_URL` | workers | - | Read database connection URL |
| `WEBSOCKETS_SERVER` | workers | - | URL for the WebSocket server |
| `FILES_STORAGE_PATH` | workers | /app/storage/files | Local path for private files storage |
| `GOOGLE_REDIRECT_URI` | workers | - | Redirect URI for Google OAuth |
| `READ_2_DATABASE_URL` | workers | - | Read database connection URL |
| `GATEWAY_BIND_ADDRESS` | workers | - | Address the gateway binds to |
| `GOOGLE_CLIENT_SECRET` | workers | (secret) | Google OAuth client secret |
| `MAILGUN_EMAIL_DOMAIN` | workers | latitude.localhost | Email domain for Mailgun |
| `FILE_STORAGE_ROOT_PATH` | workers | /app/storage/files | Root path for file storage |
| `WEBSOCKETS_SERVER_PORT` | workers | 8080 | Port for the WebSocket server |
| `NEXT_PUBLIC_POSTHOG_KEY` | workers | your_posthog_key | Posthog key for analytics |
| `DEFAULT_PROVIDER_API_KEY` | workers | (secret) | Default OpenAI API key for providers |
| `NEXT_PUBLIC_POSTHOG_HOST` | workers | your_posthog_host | Posthog host for analytics |
| `PUBLIC_FILES_STORAGE_PATH` | workers | /app/apps/web/public/files | Local path for public files storage |
| `WEBSOCKET_SECRET_TOKEN_KEY` | workers | (secret) | Secret key for WebSocket tokens |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | workers | - | Encryption key for Next.js server actions |
| `WEBSOCKET_REFRESH_SECRET_TOKEN_KEY` | workers | (secret) | Secret key for WebSocket refresh tokens |
| `APP_URL` | websockets | - | Base URL for the web application |
| `NODE_ENV` | websockets | production | Node.js environment (e.g., development, production) |
| `S3_BUCKET` | websockets | - | The AWS S3 private bucket name |
| `SMTP_HOST` | websockets | smtp.gmail.com | The SMTP host that will send the email |
| `SMTP_PASS` | websockets | your_app_password | SMTP password for sending emails |
| `SMTP_PORT` | websockets | 465 | SMTP server port |
| `SMTP_USER` | websockets | (secret) | SMTP username (email address) for sending emails |
| `APP_DOMAIN` | websockets | up.railway.app | Domain for the web application |
| `AWS_REGION` | websockets | auto | The AWS Region the S3 bucket sits |
| `CACHE_HOST` | websockets | - | The Redis hostname |
| `CACHE_PORT` | websockets | - | The Redis port |
| `DRIVE_DISK` | websockets | s3 | File storage driver (local or s3) |
| `QUEUE_HOST` | websockets | - | The Redis hostname |
| `QUEUE_PORT` | websockets | - | The Redis port |
| `GATEWAY_SSL` | websockets | false | Whether the gateway uses SSL |
| `SMTP_SECURE` | websockets | true | Whether to use a secure SMTP connection (TLS/SSL) |
| `DATABASE_URL` | websockets | - | Database connection URL |
| `GATEWAY_PORT` | websockets | 8787 | Port for the API gateway |
| `MAILGUN_HOST` | websockets | api.eu.mailgun.net | Host for Mailgun API |
| `POSTGRES_USER` | websockets | (secret) | Username for the Postgres database |
| `AWS_ACCESS_KEY` | websockets | - | The AWS S3 access key |
| `AWS_SECRET_KEY` | websockets | (secret) | The AWS S3 secret key |
| `CACHE_PASSWORD` | websockets | (secret) | The Redis password |
| `MAIL_TRANSPORT` | websockets | smtp | Email transport method (e.g., mailpit, mailgun) |
| `QUEUE_PASSWORD` | websockets | (secret) | The Redis password |
| `FILE_PUBLIC_PATH` | websockets | files | Public URL path segment for files |
| `GATEWAY_HOSTNAME` | websockets | - | Hostname for the API gateway |
| `GOOGLE_CLIENT_ID` | websockets | fake | Google OAuth client ID |
| `MAILGUN_PROTOCOL` | websockets | https | Protocol for Mailgun API |
| `PUBLIC_S3_BUCKET` | websockets | - | The AWS S3 public bucket name |
| `FROM_MAILER_EMAIL` | websockets | hello@latitude.localhost | Sender email address |
| `GATEWAY_BIND_PORT` | websockets | 8787 | Port the gateway binds to |
| `POSTGRES_PASSWORD` | websockets | (secret) | Password for the Postgres database (migrations) |
| `READ_DATABASE_URL` | websockets | - | Read database connection URL |
| `WEBSOCKETS_SERVER` | websockets | - | URL for the WebSocket server |
| `FILES_STORAGE_PATH` | websockets | /app/storage/files | Local path for private files storage |
| `GOOGLE_REDIRECT_URI` | websockets | - | Redirect URI for Google OAuth |
| `READ_2_DATABASE_URL` | websockets | - | Read database connection URL |
| `GATEWAY_BIND_ADDRESS` | websockets | - | Address the gateway binds to |
| `GOOGLE_CLIENT_SECRET` | websockets | (secret) | Google OAuth client secret |
| `MAILGUN_EMAIL_DOMAIN` | websockets | latitude.localhost | Email domain for Mailgun |
| `FILE_STORAGE_ROOT_PATH` | websockets | /app/storage/files | Root path for file storage |
| `WEBSOCKETS_SERVER_PORT` | websockets | 8080 | Port for the WebSocket server |
| `NEXT_PUBLIC_POSTHOG_KEY` | websockets | your_posthog_key | Posthog key for analytics |
| `DEFAULT_PROVIDER_API_KEY` | websockets | (secret) | Default OpenAI API key for providers |
| `NEXT_PUBLIC_POSTHOG_HOST` | websockets | your_posthog_host | Posthog host for analytics |
| `PUBLIC_FILES_STORAGE_PATH` | websockets | /app/apps/web/public/files | Local path for public files storage |
| `WEBSOCKET_SECRET_TOKEN_KEY` | websockets | (secret) | Secret key for WebSocket tokens |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | websockets | - | Encryption key for Next.js server actions |
| `WEBSOCKET_REFRESH_SECRET_TOKEN_KEY` | websockets | (secret) | Secret key for WebSocket refresh tokens |
| `PORT` | minio-bucket | - | The port the Bucket runs on internally |
| `MINIO_ROOT_USER` | minio-bucket | (secret) | Root MinIO user |
| `MINIO_PUBLIC_HOST` | minio-bucket | - | Public bucket host |
| `MINIO_PUBLIC_PORT` | minio-bucket | 443 | Public Bucket port |
| `MINIO_PRIVATE_HOST` | minio-bucket | - | Private Bucket host |
| `MINIO_PRIVATE_PORT` | minio-bucket | 9000 | Private Bucket port |
| `MINIO_ROOT_PASSWORD` | minio-bucket | (secret) | Root MinIO password |
| `MINIO_PUBLIC_ENDPOINT` | minio-bucket | - | Public Bucket endpoint |
| `MINIO_PRIVATE_ENDPOINT` | minio-bucket | - | Private Bucket endpoint |
| `MINIO_BROWSER_REDIRECT_URL` | minio-bucket | - | Ensure the browser receives a valid reachable URL |
| `POSTGRES_DB` | Postgres | latitude_production | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/railway-public && /usr/bin/mc anonymous set public minio/railway-public/public && /usr/bin/mc mb minio/railway-private && exit 0"`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/1CJho8)
