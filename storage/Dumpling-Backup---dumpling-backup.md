# Deploy Dumpling Backup on Railway

Verified pg_dump/mysqldump backups into your own S3 bucket. No state.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumpling-backup)

## About

Dumpling Backup is a single container that runs `pg_dump` or `mysqldump` on a schedule, checks the archive with `pg_restore --list` while it streams, and uploads it straight into an S3-compatible bucket you own (Cloudflare R2, Amazon S3, Backblaze B2, Wasabi, MinIO). No disk, no state, no UI. If the archive would not restore, the run fails and tells your webhook instead of showing a green tick.

Deploy this template into the project that holds your Postgres or MySQL service, then set four variables: the database URL (use `${{Postgres.DATABASE_URL}}` so the dump travels over Railway's private network, with no public TCP proxy and no allow-list), the bucket name and the two bucket keys. The container runs one backup at start, then on its cron schedule (02:00 UTC daily by default); set `SCHEDULE=once` and a Railway cron schedule on the service if you prefer Railway to drive the timing. Retention keeps the newest N files and only ever deletes files the tool wrote; an optional passphrase encrypts every file with OpenSSL-compatible AES-256. The image tag follows the PostgreSQL client major (`:16`, `:17`, `:18`), so pick the one matching your server and your dumps stay restorable with the `pg_restore` you already have.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dumpling-backup | `ghcr.io/siddhujz/dumpling-backup:18` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SCHEDULE` | 0 2 * * * | Cron expression in UTC (default: 02:00 daily), @daily/@hourly, or "once" to run a single backup and exit (use that with Railway's own cron schedule setting). A backup also runs at start. |
| `KEEP_LAST` | 14 | Keep this many newest backups and delete older ones that this tool wrote (0 = keep everything). Set KEEP_DAYS as well to also expire by age. |
| `S3_BUCKET` | - | Name of the S3-compatible bucket the backups are written to (Amazon S3, Cloudflare R2, Backblaze B2, Wasabi, Spaces, Hetzner, MinIO). Files land at <BACKUP_NAME>/<timestamp>.dump inside it. |
| `S3_REGION` | auto | Bucket region. "auto" works for Cloudflare R2; use the real region for Amazon S3 (e.g. eu-central-1) and Backblaze B2 (e.g. us-west-004). |
| `PASSPHRASE` | - | Optional. Encrypts every backup file with AES-256 (OpenSSL compatible: openssl enc -d -aes-256-cbc -pbkdf2). Keep it somewhere other than the bucket; without it the files cannot be read. |
| `BACKUP_NAME` | - | Folder inside the bucket for this database's backups. Defaults to the database name. Letters, digits, dot, underscore, dash. |
| `S3_ENDPOINT` | - | Endpoint URL for Cloudflare R2 (https://<accountid>.r2.cloudflarestorage.com), Backblaze B2, Wasabi, Spaces, Hetzner or MinIO. Leave empty for Amazon S3. |
| `WEBHOOK_URL` | - | Optional. Slack or Discord incoming webhook (or any URL accepting a JSON POST), called when a backup fails. Set NOTIFY_ON_SUCCESS=true to also hear about successes. |
| `DATABASE_URL` | - | postgres:// or mysql:// URL of the database to back up. In a project with a Postgres service, use ${{Postgres.DATABASE_URL}} so the backup runs over the private network. |
| `S3_ACCESS_KEY_ID` | - | Access key id for the bucket. Use a key scoped to this bucket with object read, write and delete (delete is only needed for retention). |
| `S3_SECRET_ACCESS_KEY` | (secret) | Secret access key that goes with S3_ACCESS_KEY_ID. Stored only in this service's variables; the backup tool never prints it. |

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dumpling-backup)
