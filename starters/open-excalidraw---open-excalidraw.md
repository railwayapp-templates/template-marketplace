# Deploy open-excalidraw on Railway

Self-hostable collaborative drawing built on Excalidraw

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-excalidraw)

## About

Open Excalidraw is a self-hostable collaboration and persistence layer built
around the published Excalidraw editor: named drawing dashboards,
authenticated real-time editing, revision history with restore, email-based
invitations with owner/editor/viewer permissions, public read-only share
links, and per-drawing chat.

The template deploys one prebuilt application service
(`ghcr.io/strangenoob/open-excalidraw`) beside Railway's managed PostgreSQL.
Railway generates the authentication secret and the operator recovery token,
references the private database URL, and mounts a persistent volume at
`/data/assets` for binary assets. The image applies database migrations
before each start. No user-entered variables are required. SMTP is optional:
without it, owners copy invitation links for manual delivery.

The application service must run as exactly one replica: real-time
collaboration state lives in-process, and the asset volume mounts to a
single instance. Scaling out is unsupported.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | `ghcr.io/strangenoob/open-excalidraw:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first start. |
| `DATABASE_URL` | Postgres | - | Private-network connection string composed from the credentials above; the app service references it. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name used to initialize the database; PGUSER and the connection URLs reference it. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password; generated fresh for each deployment. |
| `PORT` | app | 3000 | Port Railway probes for healthchecks; matches the app's listen port (APP_PORT default 3000). |
| `S3_BUCKET` | app | - | S3-compatible asset storage: set STORAGE_DRIVER=s3 plus these to replace the local volume (STORAGE_LOCAL_PATH is then unused). |
| `S3_REGION` | app | auto | Bucket region; "auto" works for R2, use the real region for AWS/B2/Spaces/Wasabi. |
| `SMTP_FROM` | app | Open Excalidraw <noreply@example.com> | From header for outgoing mail; use a domain your SMTP provider allows. |
| `SMTP_HOST` | app | - | Optional SMTP for verification, invitation, and password-reset emails; blank keeps the manual-link flow via ADMIN_RESET_TOKEN. |
| `SMTP_PORT` | app | 587 | SMTP port; 587 for STARTTLS, 465 with SMTP_SECURE=true. |
| `SMTP_USER` | app | (secret) | SMTP username. |
| `S3_ENDPOINT` | app | - | Endpoint URL; omit for AWS S3. R2: https://<account_id>.r2.cloudflarestorage.com, B2: https://s3.<region>.backblazeb2.com, MinIO: http://<host>:9000. |
| `SMTP_SECURE` | app | false | true for implicit TLS (port 465); false for STARTTLS. |
| `ADMIN_EMAILS` | app | - | Comma-separated emails allowed on the admin page (user list, disable/delete, instance counts). Blank disables admin entirely. The admin account's email must be VERIFIED: via the SMTP verification email or a Google/GitHub/OIDC sign-in. |
| `APP_BASE_URL` | app | - | Public origin of the deployment; used for auth callbacks, share links, and socket-origin checks. Defaults to the generated Railway domain. |
| `DATABASE_URL` | app | - | PostgreSQL connection string; references the bundled Postgres service. |
| `SMTP_PASSWORD` | app | (secret) | SMTP password or API key. |
| `OIDC_CLIENT_ID` | app | - | OIDC client id; all three OIDC values must be set to enable SSO. |
| `STORAGE_DRIVER` | app | local | Binary asset storage driver: "local" volume or "s3" for any S3-compatible bucket. |
| `OIDC_ISSUER_URL` | app | - | Optional generic OIDC SSO (Keycloak, Authentik, Authelia, ...). Issuer base URL or full discovery URL; HTTPS required. |
| `GITHUB_CLIENT_ID` | app | - | Optional GitHub OAuth sign-in; create an OAuth app with callback ${APP_BASE_URL}/api/auth/callback/github. |
| `GOOGLE_CLIENT_ID` | app | - | Optional Google OAuth sign-in; create credentials at console.cloud.google.com with redirect ${APP_BASE_URL}/api/auth/callback/google. |
| `S3_ACCESS_KEY_ID` | app | - | Access key for the bucket. |
| `ADMIN_RESET_TOKEN` | app | (secret) | Operator token for the SMTP-less password recovery flow; generated at deploy time. |
| `BETTER_AUTH_SECRET` | app | (secret) | Session and auth signing secret; generated at deploy time. |
| `OIDC_CLIENT_SECRET` | app | (secret) | OIDC client secret. |
| `OIDC_PROVIDER_NAME` | app | - | Sign-in button label, e.g. "Keycloak"; defaults to "SSO". |
| `STORAGE_LOCAL_PATH` | app | /data/assets | Asset directory for the local driver; must match the volume mount path. |
| `S3_FORCE_PATH_STYLE` | app | false | true for MinIO and other path-style-only endpoints. |
| `GITHUB_CLIENT_SECRET` | app | (secret) | Secret for the GitHub OAuth app; both values must be set to enable the provider. |
| `GOOGLE_CLIENT_SECRET` | app | (secret) | Secret for the Google OAuth client; both values must be set to enable the provider. |
| `S3_SECRET_ACCESS_KEY` | app | (secret) | Secret key for the bucket. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/assets`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/open-excalidraw)
