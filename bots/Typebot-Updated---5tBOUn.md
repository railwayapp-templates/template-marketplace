# Deploy Typebot (Updated) on Railway

[Premium Template] Easy Way To Create Advanced Chatbots

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/5tBOUn)

## About

Hack the bot game: Build faster, Chat smarter

Typebot is a no-code platform that enables you to effortlessly create and integrate advanced chatbots into websites and chat platforms like WhatsApp.

Picture a bot that goes beyond answering questions: it builds relationships, shares content, sparks conversations, and reflects your business's personality and values. With over 3 billion people on messaging apps, it's time to connect with your customers where they are.

![Alt text](https://pub-56484c30fcce438d8df90ccca62ed640.r2.dev/images/templates/typebot/typebot-builder-1.png "Typebot Builder")

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Builder | `baptistearno/typebot-builder:latest` | Web service |
| MinIO Creator | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |
| MinIO | `minio/minio:latest` | Database |
| Viewer | `baptistearno/typebot-viewer:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Builder | 3000 | - |
| `S3_PORT` | Builder | 443 | S3 Host port number |
| `S3_BUCKET` | Builder | - | Name of the bucket where assets will be uploaded in |
| `SMTP_HOST` | Builder | - | SMTP host. Gmail is known to not work |
| `SMTP_PORT` | Builder | 465 | SMTP port |
| `ADMIN_EMAIL` | Builder | - | The email that will get an UNLIMITED plan on user creation. The associated user will be able to bypass database rules. |
| `S3_ENDPOINT` | Builder | - | S3 endpoint |
| `SMTP_SECURE` | Builder | true | If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| `NEXTAUTH_URL` | Builder | - | The builder base URL |
| `S3_ACCESS_KEY` | Builder | - | S3 access key |
| `S3_SECRET_KEY` | Builder | (secret) | S3 key |
| `SMTP_PASSWORD` | Builder | (secret) | SMTP password |
| `SMTP_USERNAME` | Builder | (secret) | SMTP username, can be the same as the admin email |
| `ENCRYPTION_SECRET` | Builder | (secret) | A key used to encrypt sensitive data |
| `SMTP_AUTH_DISABLED` | Builder | false | To disable the authentication by email |
| `NEXT_PUBLIC_SMTP_FROM` | Builder | - | SMTP from email address |
| `NEXT_PUBLIC_VIEWER_URL` | Builder | - | The viewer base URL |
| `MINIO_ROOT_USER` | MinIO Creator | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO Creator | (secret) | - |
| `PORT` | MinIO | 9000 | MinIO port |
| `MINIO_BUCKET` | MinIO | typebot | MinIO default bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO secret key |
| `PORT` | Viewer | 3000 | - |
| `S3_PORT` | Viewer | 443 | S3 Host port number |
| `S3_BUCKET` | Viewer | - | Name of the bucket where assets will be uploaded in |
| `SMTP_HOST` | Viewer | - | SMTP host. (i.e. smtp.host.com) |
| `SMTP_PORT` | Viewer | - | SMTP port |
| `ADMIN_EMAIL` | Viewer | - | The email that will get an UNLIMITED plan on user creation. The associated user will be able to bypass database rules. |
| `S3_ENDPOINT` | Viewer | - | S3 endpoint |
| `SMTP_SECURE` | Viewer | - | If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| `NEXTAUTH_URL` | Viewer | - | The builder base URL |
| `S3_ACCESS_KEY` | Viewer | - | S3 access key |
| `S3_SECRET_KEY` | Viewer | (secret) | S3 Key |
| `SMTP_PASSWORD` | Viewer | (secret) | SMTP password |
| `SMTP_USERNAME` | Viewer | (secret) | SMTP username |
| `ENCRYPTION_SECRET` | Viewer | (secret) | A key used to encrypt sensitive data |
| `SMTP_AUTH_DISABLED` | Viewer | - | To disable the authentication by email |
| `NEXT_PUBLIC_SMTP_FROM` | Viewer | - | SMTP from email address |
| `NEXT_PUBLIC_VIEWER_URL` | Viewer | - | The viewer base URL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Start command:** `/bin/sh -c "minio server --address [::]:$PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/5tBOUn)
