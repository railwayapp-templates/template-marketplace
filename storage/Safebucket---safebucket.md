# Deploy Safebucket on Railway

File transfer and sharing: send files via expiring links. WeTransfer, 2FA

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/safebucket)

## About

# Safebucket

Secure, self-hosted file sharing: buckets, sharing with people inside and outside your team, MFA, trash retention, and an audit trail — behind your own domain.

## What you get

- **Safebucket** — the app (API + web UI) on a public domain
- **Postgres 17** — the database, on a volume with daily backups
- **MinIO** — S3-compatible file storage, on a volume with daily backups; your browser uploads and downloads files directly against it with presigned URLs

## Setup

Fill in exactly two fields at deploy time:

- **Admin email** — your login
- **Admin password** — pick something strong; you can enable MFA after logging in

Everything else (session signing key, MFA encryption key, database and storage passwords) is generated fresh for your deployment. When the deploy finishes, open the Safebucket service's URL and log in.

## Notes

- Invite/share emails are written to files inside the container by default (not sent). To send real email, set `NOTIFIER__TYPE=smtp` and add `NOTIFIER__SMTP__HOST`, `__PORT`, `__USERNAME`, `__PASSWORD`, `__SENDER`, `__TLS_MODE` on the Safebucket service.
- The audit trail is stored on the container filesystem and resets on redeploys. Point `ACTIVITY__TYPE=loki` at a Loki service for a persistent trail.
- Single-instance by design (in-memory cache and queue). Add Valkey (`CACHE__TYPE=valkey`) and NATS JetStream (`EVENTS__TYPE=jetstream`) before scaling out.

Template source and companion storage image: https://github.com/hmseeb/safebucket-railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `ghcr.io/hmseeb/safebucket-railway-minio:latest` | Database |
| Safebucket | `ghcr.io/safebucket/safebucket:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MinIO | 9000 | The port the file storage service listens on inside its container. Leave this alone. |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | The admin password for your file storage. Generated fresh for your deployment. Safebucket picks it up automatically. |
| `GOGC` | Safebucket | 50 | Keeps the server's memory use modest. Leave this alone. |
| `PORT` | Safebucket | 8080 | The port the Safebucket server listens on inside its container. Leave this alone. |
| `APP__PORT` | Safebucket | 8080 | Same port, in the format Safebucket reads. Leave this alone. |
| `CACHE__TYPE` | Safebucket | memory | Rate limits and sessions are kept in the app's own memory. Fine for a single instance; switch to a Valkey service before scaling to multiple instances. |
| `APP__API_URL` | Safebucket | - | The public web address of your Safebucket. Filled in automatically from this service's domain. |
| `APP__PROFILE` | Safebucket | default | Runs the API and background workers together in one service. Leave this alone. |
| `APP__WEB_URL` | Safebucket | - | Where the web app lives. Same address as the API because the UI is bundled. Filled in automatically. |
| `EVENTS__TYPE` | Safebucket | memory | Background jobs are queued in the app's own memory. Fine for a single instance; switch to NATS JetStream before scaling to multiple instances. |
| `STORAGE__TYPE` | Safebucket | minio | Where uploaded files live. Points at the bundled MinIO service. Leave this alone. |
| `ACTIVITY__TYPE` | Safebucket | filesystem | Where the audit trail is stored. Files inside the container by default, which resets on each deploy. Switch to loki with a Loki service for a persistent audit trail. |
| `APP__LOG_LEVEL` | Safebucket | info | How chatty the server logs are. Use debug when troubleshooting. |
| `DATABASE__TYPE` | Safebucket | postgres | Which kind of database to use. Leave this alone. |
| `NOTIFIER__TYPE` | Safebucket | filesystem | Where invite and share emails go. By default they are written to files inside the container instead of being sent. To send real email, change this to smtp and add the NOTIFIER__SMTP__* settings from the README. |
| `APP__ADMIN_EMAIL` | Safebucket | - | The email address for the first admin account. You log in with this after the deploy finishes. |
| `APP__MFA_REQUIRED` | Safebucket | false | Set to true to force every user to set up two-factor authentication. |
| `APP__TOKEN_SECRET` | Safebucket | (secret) | Signs login sessions. Generated fresh for your deployment. Never share it and never change it after launch. |
| `APP__ADMIN_PASSWORD` | Safebucket | (secret) | The password for the first admin account. Pick something strong; you can enable MFA after logging in. |
| `APP__ALLOWED_ORIGINS` | Safebucket | - | Which websites are allowed to talk to your Safebucket from a browser. Defaults to your own domain, which is what you want. |
| `APP__MAX_UPLOAD_SIZE` | Safebucket | 53687091200 | The largest allowed upload, in bytes. Defaults to 50 GB. |
| `APP__TRUSTED_PROXIES` | Safebucket | 0.0.0.0/0,::/0 | Tells Safebucket to trust Railway's edge proxy so the audit trail records real visitor addresses instead of the proxy's. |
| `AUTH__PROVIDERS__KEYS` | Safebucket | local | Which login methods are enabled. Email and password by default; see the Safebucket docs to add single sign-on. |
| `APP__MFA_ENCRYPTION_KEY` | Safebucket | - | Encrypts users' two-factor authentication secrets. Must stay exactly 32 characters. Generated fresh; never change it after users enroll MFA. |
| `DATABASE__POSTGRES__HOST` | Safebucket | - | The private address of the Postgres service. Filled in automatically. |
| `DATABASE__POSTGRES__NAME` | Safebucket | - | The database name. Copied automatically from the Postgres service. |
| `DATABASE__POSTGRES__PORT` | Safebucket | 5432 | The Postgres port. Leave this alone. |
| `DATABASE__POSTGRES__USER` | Safebucket | (secret) | The database account. Copied automatically from the Postgres service. |
| `STORAGE__MINIO__ENDPOINT` | Safebucket | - | The private address the server uses to reach file storage. Filled in automatically. |
| `APP__TRASH_RETENTION_DAYS` | Safebucket | 7 | How many days deleted files stay in the trash before being removed for good. |
| `STORAGE__MINIO__CLIENT_ID` | Safebucket | safebucket | The storage account name, baked into the MinIO image. Leave this alone. |
| `APP__STATIC_FILES__ENABLED` | Safebucket | true | Serves the web app from this same service. Leave this alone. |
| `DATABASE__POSTGRES__SSLMODE` | Safebucket | require | Encrypts the database connection. The bundled Postgres supports this out of the box. |
| `STORAGE__MINIO__BUCKET_NAME` | Safebucket | safebucket | The storage bucket files are kept in. The MinIO service creates it on first boot. Leave this alone. |
| `AUTH__PROVIDERS__LOCAL__NAME` | Safebucket | local | Login provider setting. Leave this alone. |
| `AUTH__PROVIDERS__LOCAL__TYPE` | Safebucket | local | Login provider setting. Leave this alone. |
| `DATABASE__POSTGRES__PASSWORD` | Safebucket | (secret) | The database password. Copied automatically from the Postgres service. |
| `STORAGE__MINIO__CLIENT_SECRET` | Safebucket | (secret) | The password Safebucket uses to reach its file storage. Copied automatically from the MinIO service. |
| `ACTIVITY__FILESYSTEM__DIRECTORY` | Safebucket | /app/data/activity | Where the audit trail files are written. Leave this alone. |
| `NOTIFIER__FILESYSTEM__DIRECTORY` | Safebucket | /app/data/notifications | Where unsent notification emails are written. Leave this alone. |
| `STORAGE__MINIO__EXTERNAL_ENDPOINT` | Safebucket | - | The public address your browser uploads and downloads files through. Filled in automatically from the MinIO service's domain. |
| `EVENTS__QUEUES__BUCKET_EVENTS__NAME` | Safebucket | safebucket-bucket-events | Internal queue name. Leave this alone. |
| `EVENTS__QUEUES__NOTIFICATIONS__NAME` | Safebucket | safebucket-notifications | Internal queue name. Leave this alone. |
| `EVENTS__QUEUES__OBJECT_DELETION__NAME` | Safebucket | safebucket-object-deletion | Internal queue name. Leave this alone. |
| `AUTH__PROVIDERS__LOCAL__SHARING__ALLOWED` | Safebucket | true | Lets users share files with people outside your Safebucket. |
| `POSTGRES_DB` | Postgres | safebucket | The name of the database created on first launch. |
| `POSTGRES_USER` | Postgres | (secret) | The database account created on first launch. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | The database password, generated fresh for your deployment. Never share it. |

## Configuration

- **Healthcheck:** `/minio/health/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/safebucket)
