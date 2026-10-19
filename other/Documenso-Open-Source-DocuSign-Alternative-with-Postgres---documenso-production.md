# Deploy Documenso | Open-Source DocuSign Alternative with Postgres on Railway

E-signatures on your own server, with the signing certificate made on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/documenso-production?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=documenso-production)

[Documenso](https://documenso.com/) is the open-source DocuSign alternative. Upload a PDF, place signature, initials, date and text fields, and send it to one or more recipients in order. Each signed document comes back sealed with a digital signature and a signing certificate, with an audit log of every view and signature. It also has reusable templates, direct signing links, teams and a REST API with webhooks. This template runs the official Documenso image with Postgres, and creates both the signing certificate and your admin account on first boot, so you can sign in and seal documents right away, even without an email provider.

The stack is two services: Documenso and Postgres.

- **Upstream's image, pinned.** Documenso runs from the official `documenso/documenso` image at a fixed release (v2.20.0), not `latest`. A thin wrapper ([source](https://github.com/two-workspaces/documenso)) adds one entrypoint script for the first-boot steps below. Upgrading means bumping the tag.
- **A signing certificate on first boot.** Documenso can't seal documents without a `.p12` certificate, and that is normally a manual OpenSSL step. On first boot the entrypoint creates a self-signed RSA certificate (valid 10 years, named after your domain) on a volume at `/opt/documenso/cert.p12`, protected by a generated passphrase. Later boots reuse it.
- **An admin who can sign in without SMTP.** Documenso only lets verified email addresses sign in, so a fresh install with no mail server has no working login. On first boot the entrypoint signs up `DOCUMENSO_ADMIN_EMAIL` through Documenso's own sign-up endpoint, on a port Railway doesn't route, then marks the email as verified and grants the account admin rights.
- **Sign-up closed.** Public sign-up is off by default (`NEXT_PUBLIC_DISABLE_SIGNUP=true`), so a stranger who finds your URL can't create an account on your instance. People you send documents to don't need an account to sign.
- **Generated secrets.** `NEXTAUTH_SECRET`, both encryption keys, the certificate passphrase and the admin password are generated at deploy time.
- **Migrations on every boot.** The database migrations run before the server starts, and Railway's health check on `/api/health` only switches traffic once they finish. Uploaded and signed PDFs are stored in Postgres.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Documenso | [two-workspaces/documenso](https://github.com/two-workspaces/documenso) | Web service |
| Postgres | `postgres:17.11-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Documenso | 3000 | Port Documenso listens on - leave as is |
| `NEXTAUTH_SECRET` | Documenso | (secret) | Signs session cookies - changing it logs everyone out |
| `DOCUMENSO_ADMIN_EMAIL` | Documenso | - | Your email - the admin account, created and verified on first boot so you can sign in without SMTP |
| `NEXT_PRIVATE_SMTP_HOST` | Documenso | - | SMTP server for signing invitations and notifications (Railway allows outbound SMTP on Pro only) |
| `NEXT_PRIVATE_SMTP_PORT` | Documenso | 587 | SMTP port |
| `NEXT_PUBLIC_WEBAPP_URL` | Documenso | - | Public URL of Documenso (signing links, emails, sign-in) - set it to your custom domain after adding one |
| `DOCUMENSO_ADMIN_PASSWORD` | Documenso | (secret) | Admin password, set on first boot only - copy it from here to sign in, then change it in Documenso |
| `NEXT_PRIVATE_SMTP_SECURE` | Documenso | false | true for implicit TLS (port 465), false for STARTTLS (587) |
| `NEXT_PRIVATE_DATABASE_URL` | Documenso | - | Postgres on the private network (documents are stored in the database) |
| `NEXT_PRIVATE_SMTP_PASSWORD` | Documenso | (secret) | SMTP password |
| `NEXT_PRIVATE_SMTP_USERNAME` | Documenso | (secret) | SMTP username |
| `NEXT_PUBLIC_DISABLE_SIGNUP` | Documenso | true | Public sign-up is closed; set to false to let teammates register (they need SMTP to verify their email) |
| `DOCUMENSO_DISABLE_TELEMETRY` | Documenso | - | Set to true to stop Documenso's anonymous usage telemetry (app version and installation ID only) |
| `NEXT_PRIVATE_ENCRYPTION_KEY` | Documenso | - | Encrypts stored secrets such as 2FA keys. BACK IT UP - changing it breaks existing 2FA and stored credentials |
| `NEXT_PRIVATE_RESEND_API_KEY` | Documenso | (secret) | Resend API key, used when NEXT_PRIVATE_SMTP_TRANSPORT=resend |
| `NEXT_PRIVATE_SMTP_FROM_NAME` | Documenso | Documenso | Sender name for Documenso emails |
| `NEXT_PRIVATE_SMTP_TRANSPORT` | Documenso | smtp-auth | smtp-auth for SMTP, or resend to send over HTTPS with NEXT_PRIVATE_RESEND_API_KEY (works on every Railway plan) |
| `NEXT_PRIVATE_SIGNING_TRANSPORT` | Documenso | local | Seal signed documents with the certificate file on the volume |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | Documenso | - | Sender address, e.g. noreply@example.com |
| `NEXT_PRIVATE_SIGNING_PASSPHRASE` | Documenso | - | Passphrase of the signing certificate - set before first boot, it must match the .p12 file |
| `NEXT_PRIVATE_INTERNAL_WEBAPP_URL` | Documenso | http://localhost:3000 | How Documenso reaches itself for background jobs and fonts - must use PORT |
| `NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH` | Documenso | /opt/documenso/cert.p12 | Signing certificate - a self-signed one is created here on first boot; replace the file to use your own |
| `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` | Documenso | - | Encrypts short-lived tokens - must differ from NEXT_PRIVATE_ENCRYPTION_KEY |
| `POSTGRES_DB` | Postgres | documenso | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/documenso`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/documenso-production)
