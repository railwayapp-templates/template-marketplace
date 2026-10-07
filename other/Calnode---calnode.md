# Deploy Calnode on Railway

Calnode — self-hosted Calendly alt. Go binary + SQLite, MCP-native.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calnode)

## About

Self-hostable Calendly alternative in a single Go binary with embedded SQLite.
API-first and MCP-native, out of the box. No Redis, no Postgres, no separate
API server, no multi-gigabyte image.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/calnode)

Calnode is a single static Go binary compiled with `CGO_ENABLED=0` — one
process, one port, one file. The database is a standard SQLite file at
`/data/calnode.db`, easy to back up and easy to move.

Deployment surface:

- **Service `calnode`** — listens on `PORT` (default 3000), healthcheck at
  `/healthz` (returns `{"status":"ok"}`), admin UI at `/admin/`, JSON API at
  `/v1/*`, MCP server at `/mcp`.
- **Volume `calnode-data`** — mounted at `/data`; holds the SQLite database
  plus any object-storage backup state.

Railway maps the public domain to the service's `PORT`. `BASE_URL` must match
where your team actually lives (the `https://YOUR-SUB.up.railway.app` or
your custom domain) because Calnode derives OAuth redirect URIs, admin-UI
links, and invite links from it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calnode | [mc9max/calnode](https://github.com/mc9max/calnode) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for meeting times, reminders, log timestamps. Set to you, e.g. America/New_York. |
| `PORT` | 3000 | HTTP listen port. Calnode defaults to 3000; Railway maps the public domain to this port. |
| `BASE_URL` | http://localhost:3000 | Public identity host (e.g. https://book.example.com or https://<your-domain>.up.railway.app after deploy). Drives OAuth callbacks, the admin UI, and team-invite links. Set your real domain after the first deploy and redeploy — OAuth redirect URIs are computed from this value. |
| `DATABASE_URL` | sqlite:///data/calnode.db | SQLite driver pointing at the Railway volume mount. SQLite is the only store (pure-Go, no CGO, no Postgres). Keep this path — the directory is on the calnode-data volume. |
| `EMAIL_FROM_NAME` | Calnode | Optional — Display name for booking email sender. |
| `EMAIL_SMTP_HOST` | - | Optional — SMTP host for booking invitation / confirmation / reminder emails. Blank = emails are skipped (app still works; users get links in the UI). |
| `EMAIL_SMTP_PASS` | - | Optional — SMTP password. |
| `EMAIL_SMTP_PORT` | 587 | Optional — SMTP port (default 587, STARTTLS). |
| `EMAIL_SMTP_USER` | (secret) | Optional — SMTP username. |
| `PUBLIC_BASE_URL` | - | Optional booker-facing host for public booking links and outbound emails. Blank = inherits BASE_URL. Only set if your booking pages live on a different host than admin. |
| `GOOGLE_CLIENT_ID` | - | Optional — Google OAuth client ID (console.cloud.google.com). Add redirect URIs: {BASE_URL}/v1/auth/callback and {BASE_URL}/v1/calendar/callback. |
| `MICROSOFT_TENANT` | common | Microsoft tenant. Default 'common' allows personal + work/school Microsoft accounts. Set to a specific tenant ID to restrict to one organisation. |
| `LITESTREAM_REGION` | - | Optional — S3 region (required by some providers, optional by others). |
| `EMAIL_FROM_ADDRESS` | - | Optional — From address for booking emails, e.g. bookings@yourdomain.com. |
| `LITESTREAM_ENDPOINT` | - | Optional — S3 endpoint host. Required for any non-AWS provider (R2, B2, MinIO). Blank = AWS us-east-1. |
| `MICROSOFT_CLIENT_ID` | - | Optional — Microsoft 365 / Outlook client ID (Azure App registration). Web redirect URIs: {BASE_URL}/v1/auth/microsoft/callback and {BASE_URL}/v1/calendar/callback. |
| `GOOGLE_CLIENT_SECRET` | (secret) | Optional — Google OAuth client secret (pair with GOOGLE_CLIENT_ID). |
| `CALNODE_ENCRYPTION_KEY` | - | Envelope-encryption master key; auto-generated per deployment. REQUIRED for production (https BASE_URL). Rotatable later with `calnode rotate-key`. |
| `LITESTREAM_REPLICA_URL` | - | Optional — S3-compatible bucket for continuous SQLite backups (Litestream) and meeting recordings. e.g. s3://your-bucket/calnode. Blank = no remote backups; the calnode-data volume still holds the primary DB. |
| `CALNODE_RECOVERY_SECRET` | (secret) | Optional break-glass escrow. When set, a recovery-wrapped copy of the data key is stored so you can re-establish access with `calnode recover-key` if CALNODE_ENCRYPTION_KEY is ever lost. |
| `MICROSOFT_CLIENT_SECRET` | (secret) | Optional — Microsoft client secret (pair with MICROSOFT_CLIENT_ID). |
| `LITESTREAM_ACCESS_KEY_ID` | - | Optional — S3 access key for Litestream uploads (pair with LITESTREAM_REPLICA_URL). |
| `LITESTREAM_SECRET_ACCESS_KEY` | (secret) | Optional — S3 secret key for Litestream uploads (pair with LITESTREAM_REPLICA_URL). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/calnode)
