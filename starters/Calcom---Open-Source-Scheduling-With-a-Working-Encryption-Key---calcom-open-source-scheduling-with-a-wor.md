# Deploy Cal.com - Open Source Scheduling, With a Working Encryption Key on Railway

Open-source Calendly alternative, with a working encryption key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-open-source-scheduling-with-a-wor)

## About

Cal.com is the open-source scheduling platform - a self-hosted alternative to
Calendly with booking pages, availability rules, calendar sync, and team
scheduling. This template runs the official `calcom/cal.com` image against a
pinned Postgres database.

Cal.com stores its data in Postgres and encrypts sensitive fields - OAuth
tokens for connected calendars, CalDAV credentials, two-factor secrets - with
a symmetric key read from `CALENDSO_ENCRYPTION_KEY`. That key has to be
exactly 32 bytes: Cal.com's `crypto.ts` decodes it with `Buffer.from(key,
"latin1")`, one byte per character, so any length other than 32 characters
throws `RangeError: Invalid key length` the first time the app tries to
encrypt something.

This template generates that key as a clean 32-character string. The
catalog's most-installed Cal.com template does not: its `CALENDSO_ENCRYPTION_KEY`
carries a stray leading quote and a trailing `=` left over from copying a
`.env` line into a template variable, making it 34 characters. The deployment
itself succeeds - Postgres connects, the app boots, the health check passes -
because nothing touches the encryption key until a user actually connects a
calendar or turns on two-factor authentication. At that point it throws.
Confirmed on this template by registering an admin account and enabling
two-factor authentication through Cal.com's own API: it returned a working
TOTP secret and QR code. The same request against the malformed 34-character
key is exactly the failure mode reported in
[calcom/cal.diy#8017](https://github.com/calcom/cal.diy/issues/8017), "Can't
set 2FA because of Invalid key length."

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Cal.com | `calcom/cal.com:v6.2.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | calcom | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | Cal.com | 3000 | - |
| `NEXTAUTH_SECRET` | Cal.com | (secret) | - |
| `MAX_OLD_SPACE_SIZE` | Cal.com | 4096 | - |
| `ORGANIZATIONS_ENABLED` | Cal.com | true | - |
| `GOOGLE_API_CREDENTIALS` | Cal.com | (secret) | JSON service account credentials for Google Calendar/Meet integration. Leave blank to skip Google integration. |
| `CALCOM_TELEMETRY_DISABLED` | Cal.com | false | - |
| `NEXT_PUBLIC_LICENSE_CONSENT` | Cal.com | agree | - |
| `NEXT_PUBLIC_SINGLE_ORG_SLUG` | Cal.com | false | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/calcom-open-source-scheduling-with-a-wor)
