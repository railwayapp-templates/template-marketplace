# Deploy Typebot on Railway

Build advanced chatbots visually

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/typebot)

## About

Typebot is an open-source chatbot builder that provides a visual, drag-and-drop interface for creating interactive conversational experiences. It enables the creation of engaging chatbots, conversational forms, and automated workflows without requiring extensive coding knowledge, making it ideal for lead generation, customer support, surveys, and user engagement.

Hosting Typebot gives you access to a powerful chatbot creation platform capable of handling multiple concurrent conversations, managing user interactions, and integrating with various external services. Typebot offers a visual flow builder, conditional logic, data collection capabilities, and webhook integrations. The platform excels at creating engaging user experiences through interactive conversations, automated responses, and seamless data capture. Typebot deployments benefit from scalable resources and Railway's private network capabilities for secure integrations to services like Valkey, Postgres, and MinIO.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:latest` | Database |
| MinIO | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Builder | `baptistearno/typebot-builder:latest` | Web service |
| Viewer | `baptistearno/typebot-viewer:latest` | Web service |
| MinIO Bucket Creator | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VALKEY_URL` | Valkey | - | Private database URL |
| `VALKEY_HOST` | Valkey | - | Private hostname |
| `VALKEY_PORT` | Valkey | 6379 | Private port |
| `VALKEY_USER` | Valkey | (secret) | Default username |
| `VALKEY_PASSWORD` | Valkey | (secret) | Authentication password |
| `VALKEY_PUBLIC_URL` | Valkey | - | Public database URL |
| `VALKEY_PUBLIC_HOST` | Valkey | - | Public hostname |
| `VALKEY_PUBLIC_PORT` | Valkey | - | Public port |
| `PORT` | MinIO | 9000 | MinIO port |
| `MINIO_BUCKET` | MinIO | typebot | MinIO default bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO secret key |
| `PORT` | Console | 9090 | The port the Console runs on internally |
| `PASSWORD` | Console | (secret) | The password to login to the Console |
| `USERNAME` | Console | (secret) | The username to login to the Console |
| `CONSOLE_MINIO_SERVER` | Console | - | The domain of the Minio server |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Builder | 3000 | - |
| `SCOPE` | Builder | builder | Set the correct scope, used when deploying from the repository |
| `S3_PORT` | Builder | 443 | S3 Host port number |
| `HOSTNAME` | Builder | 0.0.0.0 | - |
| `REDIS_URL` | Builder | - | Used to - Rate limit the sign in requests based on user IP & Enable multiple media upload on WhatsApp |
| `S3_BUCKET` | Builder | - | Name of the bucket where assets will be uploaded in |
| `SMTP_HOST` | Builder | - | SMTP host. Gmail is known to not work |
| `SMTP_PORT` | Builder | 465 | SMTP port |
| `ADMIN_EMAIL` | Builder | - | The email that will get an UNLIMITED plan on user creation. The associated user will be able to bypass database rules. |
| `S3_ENDPOINT` | Builder | - | S3 endpoint |
| `SMTP_SECURE` | Builder | true | If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| `DATABASE_URL` | Builder | - | The database URL |
| `NEXTAUTH_URL` | Builder | - | The builder base URL |
| `S3_ACCESS_KEY` | Builder | - | S3 access key |
| `S3_SECRET_KEY` | Builder | (secret) | S3 key |
| `SMTP_PASSWORD` | Builder | (secret) | SMTP password |
| `SMTP_USERNAME` | Builder | (secret) | SMTP username, This email doubles as the email used for the admin user, the admin user will get an unlimited plan |
| `DISABLE_SIGNUP` | Builder | false | Disable new user sign ups. Invited users are still able to sign up |
| `ENCRYPTION_SECRET` | Builder | (secret) | A key used to encrypt sensitive data |
| `SMTP_AUTH_DISABLED` | Builder | false | To disable the authentication by email |
| `NEXT_PUBLIC_SMTP_FROM` | Builder | - | SMTP from email address |
| `DEFAULT_WORKSPACE_PLAN` | Builder | UNLIMITED | Default workspace plan on user creation or when a user creates a new workspace. Possible values are `FREE`, `STARTER`, `PRO`, `LIFETIME`, `UNLIMITED` |
| `NEXT_PUBLIC_VIEWER_URL` | Builder | - | The viewer base URL |
| `NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE` | Builder | 10 | Limits the size of each file in megabytes that can be uploaded in the bots |
| `PORT` | Viewer | 3000 | - |
| `SCOPE` | Viewer | viewer | Set the correct scope, used when deploying from the repository |
| `S3_PORT` | Viewer | 443 | S3 Host port number |
| `HOSTNAME` | Viewer | 0.0.0.0 | - |
| `REDIS_URL` | Viewer | - | Used to - Rate limit the sign in requests based on user IP & Enable multiple media upload on WhatsApp |
| `S3_BUCKET` | Viewer | - | Name of the bucket where assets will be uploaded in |
| `SMTP_HOST` | Viewer | - | SMTP host. (i.e. smtp.host.com) |
| `SMTP_PORT` | Viewer | - | SMTP port |
| `ADMIN_EMAIL` | Viewer | - | The email that will get an UNLIMITED plan on user creation. The associated user will be able to bypass database rules. |
| `S3_ENDPOINT` | Viewer | - | S3 endpoint |
| `SMTP_SECURE` | Viewer | - | If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| `DATABASE_URL` | Viewer | - | The database URL |
| `NEXTAUTH_URL` | Viewer | - | The builder base URL |
| `S3_ACCESS_KEY` | Viewer | - | S3 access key |
| `S3_SECRET_KEY` | Viewer | (secret) | S3 Key |
| `SMTP_PASSWORD` | Viewer | (secret) | SMTP password |
| `SMTP_USERNAME` | Viewer | (secret) | SMTP username |
| `ENCRYPTION_SECRET` | Viewer | (secret) | A key used to encrypt sensitive data |
| `SMTP_AUTH_DISABLED` | Viewer | - | To disable the authentication by email |
| `NEXT_PUBLIC_SMTP_FROM` | Viewer | - | SMTP from email address |
| `NEXT_PUBLIC_VIEWER_URL` | Viewer | - | The viewer base URL |
| `MINIO_ROOT_USER` | MinIO Bucket Creator | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket Creator | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/signin`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/typebot)
