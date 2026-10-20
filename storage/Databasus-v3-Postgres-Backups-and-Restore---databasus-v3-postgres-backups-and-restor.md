# Deploy Databasus v3 Postgres Backups and Restore on Railway

Scheduled database backups to S3 with a dashboard, alerts and restore.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/databasus-v3-postgres-backups-and-restor)

## About

Databasus is an open source (Apache-2.0) tool that backs up PostgreSQL, MySQL, MariaDB and MongoDB on a schedule, keeps the files in S3 or other storage, alerts you on success or failure and restores from a web dashboard. This community template runs Databasus 3.61.0 with a Railway Bucket for backup storage and a locked-down admin account.

Databasus is a single Go service with a built-in web UI. It keeps its configuration, backup history and encrypted credentials in an embedded PostgreSQL 17 on its own volume, runs `pg_dump`, `mysqldump` or `mongodump` against your databases, compresses and encrypts the stream and uploads it to the storage you choose. Hosting it well means a persistent volume, a safe first login, reachable source databases and somewhere durable for the files. This template pins the official v3.61.0 image, creates your administrator from Railway variables before the dashboard goes online, turns off open sign-up, adds a Railway Bucket for off-volume backups, sets a healthcheck and stops the embedded database cleanly on every redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Databasus | `databasus/databasus:v3.61.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4005 | Port Railway routes the public domain and the healthcheck to. Databasus always listens on 4005; keep this value. |
| `LOG_LEVEL` | info | Log level: debug, info, warn or error. |
| `S3_BUCKET` | - | Railway Bucket name for the S3 API. Not read by Databasus: paste it into Storages, S3, Bucket. |
| `S3_REGION` | - | Railway Bucket region (auto). Not read by Databasus: paste it into Storages, S3, Region. |
| `SMTP_FROM` | - | Optional. Sender address, e.g. noreply@your-domain.com. Empty = SMTP_USER if it is an address. |
| `SMTP_HOST` | - | Optional instance mail server for invitations, password reset and sign-in codes. Railway allows outbound SMTP on the Pro plan only. |
| `SMTP_PORT` | - | Optional. SMTP port, e.g. 587 or 465. Required when SMTP_HOST is set. |
| `SMTP_USER` | (secret) | Optional. SMTP username. |
| `S3_ENDPOINT` | - | Railway Bucket endpoint. Not read by Databasus: paste it into Storages, S3, Endpoint. |
| `DATABASUS_URL` | - | Public URL of this instance, used in invitation and sign-in emails. |
| `SMTP_PASSWORD` | (secret) | Optional. SMTP password or API key. |
| `SMTP_SECURITY` | - | Optional. tls, starttls or none. Empty = tls on port 465, starttls on any other port. |
| `S3_ACCESS_KEY_ID` | - | Railway Bucket access key. Not read by Databasus: paste it into Storages, S3, Access key. |
| `LOG_FILE_IS_ENABLED` | false | false = log to stdout only (Railway keeps the logs). true also writes a rotating databasus.log on the volume. |
| `S3_SECRET_ACCESS_KEY` | (secret) | Railway Bucket secret key. Not read by Databasus: paste it into Storages, S3, Secret key. |
| `DATABASUS_ADMIN_EMAIL` | - | Required. Your email: the administrator account is created with it on first boot, before the dashboard goes online. You sign in with it. |
| `DATABASUS_ADMIN_PASSWORD` | (secret) | Initial administrator password, generated at deploy. Read on first boot only; change it later under your Databasus profile. |
| `DATABASUS_DISABLE_SIGNUP` | true | true = turn off open self-registration on first boot, so only users you invite can join. Applied once, together with the admin bootstrap. |
| `IS_DISABLE_ANONYMOUS_TELEMETRY` | false | Databasus sends anonymous usage telemetry by default (upstream default). Set true to opt out. |

## Configuration

- **Start command:** `/bin/bash -c 'set -eu; if ! grep -Eq "^[[:space:]]*exec gosu databasus [.]/main[[:space:]]*$" /app/start.sh; then echo "railway: unexpected /app/start.sh (no exec gosu databasus ./main), refusing to start without the admin bootstrap" >&2; exit 1; fi; RAILWAY_REAL_GOSU="$(command -v gosu)"; export RAILWAY_REAL_GOSU; railway_pg_stop() { "$RAILWAY_REAL_GOSU" databasus /usr/lib/postgresql/17/bin/pg_ctl -D /databasus-data/pgdata -m fast -w -t 30 stop || true; }; railway_bootstrap() { local marker=/databasus-data/.railway-admin-bootstrapped; if [ -f "$marker" ]; then echo "railway: admin already provisioned on this volume"; return 0; fi; local email="${DATABASUS_ADMIN_EMAIL:-}"; local password="${DATABASUS_ADMIN_PASSWORD:-}"; if [ -z "$email" ] || [ -z "$password" ]; then echo "railway: DATABASUS_ADMIN_EMAIL and DATABASUS_ADMIN_PASSWORD are required, refusing to start without an administrator" >&2; return 1; fi; echo "railway: creating admin $email before the web server starts"; if ! "$RAILWAY_REAL_GOSU" databasus ./main --create-user --email="$email" --password="$password" --role=admin; then echo "railway: admin creation failed, see the error above" >&2; return 1; fi; if [ "${DATABASUS_DISABLE_SIGNUP:-true}" = "true" ]; then if ! /usr/lib/postgresql/17/bin/psql -X -q -1 -v ON_ERROR_STOP=1 -d "$DATABASE_DSN" -c "INSERT INTO users_settings (is_allow_external_registrations) SELECT false WHERE NOT EXISTS (SELECT 1 FROM users_settings)" -c "UPDATE users_settings SET is_allow_external_registrations = false"; then echo "railway: could not turn off sign-up, set DATABASUS_DISABLE_SIGNUP=false to skip this step" >&2; return 1; fi; echo "railway: open sign-up turned off (an admin can turn it back on in Databasus settings)"; fi; "$RAILWAY_REAL_GOSU" databasus touch "$marker"; }; railway_on_term() { if [ -n "${RAILWAY_MAIN_PID:-}" ]; then kill -TERM "$RAILWAY_MAIN_PID" 2>/dev/null || true; fi; }; railway_run_main() { trap railway_on_term TERM INT; "$RAILWAY_REAL_GOSU" databasus ./main & RAILWAY_MAIN_PID=$!; local status=0; wait "$RAILWAY_MAIN_PID" || status=$?; while kill -0 "$RAILWAY_MAIN_PID" 2>/dev/null; do status=0; wait "$RAILWAY_MAIN_PID" || status=$?; done; echo "railway: Databasus exited with status $status, stopping embedded PostgreSQL"; railway_pg_stop; exit "$status"; }; railway_shim() { if [ "$#" -eq 2 ] && [ "$1" = databasus ] && [ "$2" = ./main ]; then if ! railway_bootstrap; then railway_pg_stop; exit 1; fi; railway_run_main; fi; exec "$RAILWAY_REAL_GOSU" "$@"; }; mkdir -p /tmp/railway-gosu-shim; { echo "#!/bin/bash"; declare -f railway_pg_stop railway_bootstrap railway_on_term railway_run_main railway_shim; echo "railway_shim \"\$@\""; } > /tmp/railway-gosu-shim/gosu; chmod 0755 /tmp/railway-gosu-shim/gosu; export PATH="/tmp/railway-gosu-shim:$PATH"; exec /app/start.sh'`
- **Healthcheck:** `/api/v1/system/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/databasus-data`

**Category:** Storage · **Tags:** databasus, backup, postgres, postgresql, mysql

[View on Railway →](https://railway.com/deploy/databasus-v3-postgres-backups-and-restor)
