# Deploy Typebot Builder and Viewer Stack on Railway

Chatbot builder and viewer with Postgres, Valkey and S3-compatible files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-builder-and-viewer-stack)

## About

Chatbot builder and viewer with Postgres, Valkey and S3-compatible files.

This deployment fork provisions Valkey, MinIO, Console, Postgres, Builder, Viewer, MinIO Bucket Creator. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) (branch: main) | Web service |
| Viewer | `baptistearno/typebot-viewer@sha256:9658d71b8310df97df4d48e5f1e8f159b70d738e8e33c5a087cda1d498278a5c` | Web service |
| Builder | `baptistearno/typebot-builder@sha256:5483d1b4e030e6419ccde98cb0b935ca51e127a7d656c55121d66e8fe9ccf8f4` | Web service |
| Valkey | `valkey/valkey@sha256:418652cfb58ef879d4978c33553735d7147016032d5aefaa14c828e611eb9dfd` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:34c3e49e7ed2aaef6c575fb23bb37b878007e97752d3bf27ccb550046f893ca7` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) (branch: main) | Web service |
| MinIO Bucket Creator | `curlimages/curl@sha256:a134550be58ab783810e613ae96fd253c38f7bdd16d9bf9be350700c7a29ac06` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MinIO | 9000 | MinIO port |
| `MINIO_BUCKET` | MinIO | typebot | MinIO default bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO secret key |
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
| `VALKEY_URL` | Valkey | - | Private database URL |
| `VALKEY_HOST` | Valkey | - | Private hostname |
| `VALKEY_PORT` | Valkey | 6379 | Private port |
| `VALKEY_USER` | Valkey | (secret) | Default username |
| `VALKEY_PASSWORD` | Valkey | (secret) | Authentication password |
| `VALKEY_PUBLIC_HOST` | Valkey | - | Public hostname |
| `VALKEY_PUBLIC_PORT` | Valkey | - | Public port |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Console | 9090 | The port the Console runs on internally |
| `PASSWORD` | Console | (secret) | The password to login to the Console |
| `USERNAME` | Console | (secret) | The username to login to the Console |
| `CONSOLE_MINIO_SERVER` | Console | - | The domain of the Minio server |
| `MC_SHA256` | MinIO Bucket Creator | 01f866e9c5f9b87c2b09116fa5d7c06695b106242d829a8bb32990c00312e891 | - |
| `MC_CONFIG_DIR` | MinIO Bucket Creator | /tmp/mc-config | - |
| `MC_DOWNLOAD_URL` | MinIO Bucket Creator | https://github.com/minio/mc/releases/download/RELEASE.2025-08-13T08-35-41Z/mc.linux-amd64.RELEASE.2025-08-13T08-35-41Z | - |
| `MINIO_ROOT_USER` | MinIO Bucket Creator | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket Creator | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "exec minio server --address [::]:$PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Healthcheck:** `/signin`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `/bin/sh -c 'set -eu
curl --fail --location --retry 3 --output /tmp/mc "$MC_DOWNLOAD_URL"
printf '"'"'%s  /tmp/mc
'"'"' "$MC_SHA256" | sha256sum -c -
chmod +x /tmp/mc
i=0
until /tmp/mc alias set local "$MINIO_ENDPOINT" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" >/dev/null 2>&1 && /tmp/mc ready local >/dev/null 2>&1; do
  i=$((i + 1)); [ "$i" -lt 60 ] || exit 1; sleep 2
done
/tmp/mc mb --ignore-existing "local/$MINIO_BUCKET"
/tmp/mc anonymous set download "local/$MINIO_BUCKET/public"
'`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/typebot-builder-and-viewer-stack)
