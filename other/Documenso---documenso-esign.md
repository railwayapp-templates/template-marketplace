# Deploy Documenso on Railway

DocuSign Alternative. Sign PDFs, send signing links and seal documents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-esign)

## About

Documenso is an open-source document signing platform — the self-hosted alternative to DocuSign, Adobe Sign and PandaDoc. Upload a PDF, drop signature, name, date and text fields onto it, and email each recipient a tokenised link. Recipients sign in the browser without creating an account, and when the last one finishes Documenso seals the file with a genuine PAdES digital signature backed by an X.509 certificate you control.

Self-host Documenso on Railway with everything already wired together: the application container, PostgreSQL for documents and audit logs, Redis driving the BullMQ queue that sends mail and seals finished PDFs, an object storage bucket for every file, Mailpit providing SMTP and a browsable inbox, and Gotenberg converting `.docx` uploads to PDF. Deploy Documenso and the signing certificate is generated on first boot, your owner account is created from the email and password you supply, and registration is scoped to your own email domain.

![Documenso Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786975527/82507dc3-fa05-4bcb-83e7-9102bc79e738.png)

Documenso is a TypeScript application built on React Router and Prisma, released under AGPL-3.0. Teams self-host it when signed agreements are too sensitive to sit with a third party, and because per-seat signature pricing scales badly once a whole company sends contracts.

Key features:

- Drag-and-drop fields: signature, initials, name, date, text, number, checkbox, radio, dropdown
- Reusable templates and direct signing links for repeat paperwork
- Signing order, expiry dates and automatic reminders
- Full audit trail, plus a signing certificate attached to the completed file
- Teams and organisations with roles, plus Google, Microsoft and OIDC sign-in
- REST API and webhooks for wiring signature requests into your own product

The application container serves the web UI and API and, because the queue driver runs in-process, also consumes background jobs. PostgreSQL holds document metadata, recipients, fields, users and the audit log. Redis backs the BullMQ queue that delivers email, seals completed PDFs and sweeps for reminders and expiries. The bucket holds the PDF bytes. Mailpit gives the instance a working SMTP endpoint from the first minute and can relay to a real provider later, and Gotenberg runs LibreOffice headlessly so `.docx` uploads become PDFs before signing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gotenberg | `gotenberg/gotenberg:8-libreoffice` | Worker |
| Redis | `redis:8.2` | Database |
| Mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| documenso | [gridalpha/documenso-railway](https://github.com/gridalpha/documenso-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gotenberg | 3000 | API listening port |
| `GOTENBERG_ROLE` | Gotenberg | converter | Descriptive label only |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | Gotenberg | (secret) | Converter basic auth password |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | Gotenberg | (secret) | Converter basic auth user |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | Mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | Mailpit | - | Inbox login, user:password |
| `MP_WEBROOT` | Mailpit | / | Inbox served at the domain root |
| `MP_DATABASE` | Mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | Mailpit | - | Accepted SMTP credentials |
| `SMTP_PASSWORD` | Mailpit | (secret) | SMTP password consumed by Documenso |
| `SMTP_USERNAME` | Mailpit | (secret) | SMTP username consumed by Documenso |
| `MP_MAX_MESSAGES` | Mailpit | 5000 | Messages retained before rotation |
| `MP_SMTP_AUTH_ACCEPT_ANY` | Mailpit | false | Require the configured credentials |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | Mailpit | true | Allow auth on the plaintext private port |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | documenso | 3000 | HTTP server listening port |
| `NEXTAUTH_SECRET` | documenso | (secret) | Session token signing key |
| `DOCUMENSO_CERT_ORG` | documenso | Documenso on Railway | Generated certificate organisation |
| `DOCUMENSO_ADMIN_NAME` | documenso | Admin | Owner display name |
| `DOCUMENSO_ADMIN_EMAIL` | documenso | - | Owner email, created on first boot |
| `NEXT_PRIVATE_REDIS_URL` | documenso | - | Redis connection string |
| `NEXT_PRIVATE_SMTP_HOST` | documenso | - | Mail host on the private network |
| `NEXT_PRIVATE_SMTP_PORT` | documenso | 1025 | Mail submission port |
| `NEXT_PUBLIC_WEBAPP_URL` | documenso | - | Public app URL in emails and links |
| `DOCUMENSO_ADMIN_PASSWORD` | documenso | (secret) | Owner password, needs a special character |
| `NEXT_PRIVATE_SMTP_SECURE` | documenso | false | No implicit TLS on port 1025 |
| `NEXT_PRIVATE_DATABASE_URL` | documenso | - | Pooled Postgres connection string |
| `NEXT_PRIVATE_REDIS_PREFIX` | documenso | documenso | Queue key namespace |
| `NEXT_PRIVATE_JOBS_PROVIDER` | documenso | bullmq | Redis-backed background job queue |
| `NEXT_PRIVATE_SMTP_PASSWORD` | documenso | (secret) | SMTP password |
| `NEXT_PRIVATE_SMTP_USERNAME` | documenso | (secret) | SMTP username |
| `NEXT_PRIVATE_UPLOAD_BUCKET` | documenso | - | Bucket name |
| `NEXT_PRIVATE_UPLOAD_REGION` | documenso | - | Bucket region |
| `DOCUMENSO_DISABLE_TELEMETRY` | documenso | true | Disable anonymous telemetry |
| `NEXT_PRIVATE_ENCRYPTION_KEY` | documenso | - | Symmetric encryption key, 32+ chars |
| `NEXT_PRIVATE_SMTP_FROM_NAME` | documenso | Documenso | Sender display name |
| `NEXT_PRIVATE_SMTP_TRANSPORT` | documenso | smtp-auth | SMTP with username and password |
| `NEXT_PRIVATE_UPLOAD_ENDPOINT` | documenso | - | Bucket API endpoint |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | documenso | s3 | Store documents in object storage |
| `NEXT_PRIVATE_SIGNING_TRANSPORT` | documenso | local | Sign with a local keystore |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | documenso | - | Sender address |
| `NEXT_PRIVATE_SIGNING_PASSPHRASE` | documenso | - | Keystore passphrase, keep stable |
| `NEXT_PRIVATE_DIRECT_DATABASE_URL` | documenso | - | Direct connection used by migrations |
| `NEXT_PRIVATE_INTERNAL_WEBAPP_URL` | documenso | http://localhost:3000 | Self-request address |
| `NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID` | documenso | - | Bucket access key |
| `NEXT_PRIVATE_SMTP_UNSAFE_IGNORE_TLS` | documenso | true | Private plaintext hop to Mailpit |
| `NEXT_PRIVATE_DOCUMENT_CONVERSION_URL` | documenso | - | DOCX to PDF converter |
| `NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH` | documenso | /opt/documenso/cert.p12 | Keystore path on the volume |
| `NEXT_PRIVATE_UPLOAD_FORCE_PATH_STYLE` | documenso | true | Path-style bucket addressing |
| `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` | documenso | - | Secondary encryption key |
| `NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY` | documenso | (secret) | Bucket secret key |
| `NEXT_PUBLIC_DOCUMENT_SIZE_UPLOAD_LIMIT` | documenso | 50 | Upload limit shown in MB |
| `NEXT_PRIVATE_DOCUMENT_CONVERSION_PASSWORD` | documenso | (secret) | Converter basic auth password |
| `NEXT_PRIVATE_DOCUMENT_CONVERSION_USERNAME` | documenso | (secret) | Converter basic auth user |

## Configuration

- **Start command:** `/usr/bin/tini -- gotenberg --api-enable-basic-auth`
- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/opt/documenso`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/documenso-esign)
