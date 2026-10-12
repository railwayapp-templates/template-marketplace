# Deploy Documenso v2 Document Signing on Railway

Send and sign PDFs with audit trails. Self-hosted DocuSign alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-v2-document-signing)

## About

Documenso is an open-source document signing platform: upload a PDF or Word file, place fields, send it to signers, and receive a digitally sealed PDF with a full audit trail. This community template runs Documenso v2 on Railway with Postgres, a Redis job queue, DOCX conversion and its own signing certificate.

Documenso is a single Node.js web app that needs Postgres, a background job system for e-mails, sealing and webhooks, file storage for documents, and an X.509 certificate to seal completed PDFs. The certificate is the step most self-hosters get stuck on. This template creates a unique self-signed certificate on a volume at first boot, runs migrations as a pre-deploy step, uses BullMQ on Redis for jobs, stores documents in a Railway Bucket, adds Gotenberg so .docx uploads work, and creates your first admin account so you can sign in before any e-mail provider is set up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Gotenberg | `gotenberg/gotenberg:8.37.0-libreoffice` | Worker |
| Documenso | [baranberkay96/documenso-railway](https://github.com/baranberkay96/documenso-railway) (branch: main) (root: /services/documenso) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `PORT` | Gotenberg | 3000 | Port Gotenberg listens on ([::], dual-stack); used for the healthcheck. |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | Gotenberg | (secret) | Basic-auth password Documenso uses for conversions. |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | Gotenberg | (secret) | Basic-auth user Documenso uses for conversions. |
| `PORT` | Documenso | 3000 | Port the Documenso server listens on; Railway routes traffic and healthchecks here. |
| `NEXTAUTH_SECRET` | Documenso | (secret) | Signs sessions and CSRF cookies. Changing it signs everyone out. |
| `SIGNING_CERT_DAYS` | Documenso | 3650 | Validity of the self-signed certificate in days. |
| `DOCUMENSO_ADMIN_NAME` | Documenso | Administrator | Display name of the first administrator. |
| `DOCUMENSO_ADMIN_EMAIL` | Documenso | - | E-mail of the first administrator. The template creates this account (verified, ADMIN role) on first boot so you can sign in without an e-mail provider. |
| `NEXT_PRIVATE_REDIS_URL` | Documenso | - | Redis for the BullMQ job queue. family=0 lets ioredis use IPv4 or IPv6 on the private network. |
| `NEXT_PRIVATE_SMTP_HOST` | Documenso | - | SMTP host (outbound SMTP needs Railway Pro). Optional. |
| `NEXT_PRIVATE_SMTP_PORT` | Documenso | 587 | SMTP port (587 STARTTLS, 465 TLS). |
| `NEXT_PUBLIC_WEBAPP_URL` | Documenso | - | Public URL (links in e-mails, signing pages, CSRF origin). Change it when you add a custom domain. |
| `DOCUMENSO_ADMIN_PASSWORD` | Documenso | (secret) | Password of the first administrator (used once at creation; change it in your profile afterwards). |
| `NEXT_PRIVATE_SMTP_SECURE` | Documenso | - | Set true for implicit TLS (port 465). Optional. |
| `SIGNING_CERT_COMMON_NAME` | Documenso | - | Common name of the self-signed certificate created at first boot (shown in PDF signature panels). |
| `NEXT_PRIVATE_DATABASE_URL` | Documenso | - | Postgres connection string (private network). |
| `NEXT_PRIVATE_REDIS_PREFIX` | Documenso | documenso | Key prefix for the job queues. |
| `SIGNING_CERT_ORGANIZATION` | Documenso | Documenso Self-Hosted | Organization name in the self-signed certificate. Set your company name before the first deploy. |
| `NEXT_PRIVATE_JOBS_PROVIDER` | Documenso | bullmq | Background jobs (e-mails, sealing, webhooks, reminders) on BullMQ + Redis, upstream's recommended self-hosted production provider. |
| `NEXT_PRIVATE_SMTP_PASSWORD` | Documenso | (secret) | SMTP password. Optional. |
| `NEXT_PRIVATE_SMTP_USERNAME` | Documenso | (secret) | SMTP username. Optional. |
| `NEXT_PRIVATE_UPLOAD_BUCKET` | Documenso | - | Bucket name. |
| `NEXT_PRIVATE_UPLOAD_REGION` | Documenso | - | Bucket region. |
| `NEXT_PUBLIC_DISABLE_SIGNUP` | Documenso | false | Set true to disable all new sign-ups once your team is in (the admin account is created by the bootstrap). |
| `DOCUMENSO_DISABLE_TELEMETRY` | Documenso | true | Opt out of Documenso's anonymous instance telemetry (version and installation ID). Set false to share it. |
| `NEXT_PRIVATE_ENCRYPTION_KEY` | Documenso | - | Primary key (min. 32 characters) for encrypted fields such as 2FA secrets and API tokens. Never change it after first boot. |
| `NEXT_PRIVATE_RESEND_API_KEY` | Documenso | (secret) | Resend API key (HTTP e-mail API, works on every Railway plan). Recommended way to send signing requests. |
| `NEXT_PRIVATE_SMTP_FROM_NAME` | Documenso | Documenso | Sender display name for e-mails. |
| `NEXT_PRIVATE_SMTP_TRANSPORT` | Documenso | - | E-mail transport. Empty = automatic: resend when NEXT_PRIVATE_RESEND_API_KEY is set, otherwise smtp-auth. Also accepts smtp-api and mailchannels. |
| `NEXT_PRIVATE_UPLOAD_ENDPOINT` | Documenso | - | S3 endpoint (Railway Bucket). |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | Documenso | s3 | Store documents in the Railway Bucket (s3). Set to database to keep them in Postgres instead. |
| `NEXT_PRIVATE_GOOGLE_CLIENT_ID` | Documenso | - | Optional Google OAuth client ID for 'Sign in with Google'. |
| `NEXT_PRIVATE_SIGNING_TRANSPORT` | Documenso | local | Sign with a local .p12 certificate (created on the volume at first boot). |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | Documenso | - | Sender address, e.g. sign@yourcompany.com (must be a domain verified with your e-mail provider). |
| `NEXT_PRIVATE_SIGNING_PASSPHRASE` | Documenso | - | Passphrase protecting the signing certificate. The certificate on the volume only opens with this value: do not change it after first boot. |
| `NEXT_PRIVATE_DIRECT_DATABASE_URL` | Documenso | - | Direct connection used by Prisma migrations (same as above without a pooler). |
| `NEXT_PRIVATE_GOOGLE_CLIENT_SECRET` | Documenso | (secret) | Optional Google OAuth client secret. |
| `NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID` | Documenso | - | Bucket access key. |
| `NEXT_PRIVATE_ALLOWED_SIGNUP_DOMAINS` | Documenso | - | Comma-separated e-mail domains allowed to sign up, e.g. yourcompany.com. Empty = any domain. |
| `NEXT_PRIVATE_DOCUMENT_CONVERSION_URL` | Documenso | - | Gotenberg service that converts uploaded .docx files to PDF (private network). |
| `NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH` | Documenso | /opt/documenso/cert.p12 | Certificate path on the volume. Replace the file (or set NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS to a base64 .p12) to use a CA-issued certificate. |
| `NEXT_PRIVATE_UPLOAD_FORCE_PATH_STYLE` | Documenso | false | Railway Buckets use virtual-hosted URLs; set true only for a legacy bucket that requires path-style. |
| `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` | Documenso | - | Secondary encryption key (min. 32 characters). Never change it after first boot. |
| `NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY` | Documenso | (secret) | Bucket secret key. |
| `NEXT_PUBLIC_DOCUMENT_SIZE_UPLOAD_LIMIT` | Documenso | 10 | Maximum document upload size in MB. |
| `NEXT_PRIVATE_DOCUMENT_CONVERSION_PASSWORD` | Documenso | (secret) | Shared with Gotenberg: references its basic-auth password (edit it there). |
| `NEXT_PRIVATE_DOCUMENT_CONVERSION_USERNAME` | Documenso | (secret) | Shared with Gotenberg: references its basic-auth user (edit it there). |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Start command:** `gotenberg --api-enable-basic-auth --libreoffice-deny-private-ips --api-timeout=500s --libreoffice-auto-start --libreoffice-start-timeout=300s --pdfengines-disable-routes --webhook-disable`
- **Healthcheck:** `/health`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/documenso`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Tags:** documenso, e-signature, document-signing, docusign-alternative, pdf · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/documenso-v2-document-signing)
