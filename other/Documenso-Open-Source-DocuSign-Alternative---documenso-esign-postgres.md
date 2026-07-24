# Deploy Documenso — Open Source DocuSign Alternative on Railway

Self-hosted document signing with Postgres — no per-envelope fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-esign-postgres)

## About

Documenso is the leading open-source document signing platform — a self-hosted alternative to DocuSign and PandaDoc. Upload a PDF, place signature and field boxes, send it for signing, and get a legally sound audit trail, all on infrastructure you own. No per-envelope pricing, no seat limits. This template deploys Documenso with a managed PostgreSQL database and the signing certificate handled the Railway way.

---

Documenso digitally signs PDFs, and digital signing requires a certificate — a `.p12` file that cryptographically seals each document. On a normal server you mount that file into the container. **Railway can't mount a file from a host**, which is exactly where most Documenso-on-Railway attempts stall.

The correct approach, and the one this template uses, is `NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS` — the certificate base64-encoded and passed as an environment variable. Documenso's own documentation names this as the method for Railway and Vercel. Two rules that trip people up:

- **The certificate must have a passphrase.** A password-less `.p12` throws `Failed to get private key bags` and signing fails outright. Set `NEXT_PRIVATE_SIGNING_PASSPHRASE`.
- **Never generate the certificate inside the container.** If the container is rebuilt, an internally generated cert is lost and signatures become inconsistent. Always provide it externally.

Three secrets must be generated once and kept stable, each at least 32 characters: `NEXTAUTH_SECRET` (sessions), plus `NEXT_PRIVATE_ENCRYPTION_KEY` and `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` (which encrypt stored data). Documenso also needs both `NEXT_PRIVATE_DATABASE_URL` and `NEXT_PRIVATE_DIRECT_DATABASE_URL`; without a pooler, both use the same Railway Postgres string.

Typical cost: **~$5–15/month** on Railway for a small instance with Postgres. DocuSign bills per envelope and per seat; self-hosted Documenso has neither.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Documenso | `documenso/documenso:v2.9.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Documenso | 3000 | - |
| `NEXTAUTH_SECRET` | Documenso | (secret) | - |
| `NEXT_PRIVATE_SMTP_HOST` | Documenso | - | SMTP server host address |
| `NEXT_PRIVATE_SMTP_PASS` | Documenso | - | SMTP authentication password credential |
| `NEXT_PRIVATE_SMTP_USER` | Documenso | (secret) | SMTP authentication username credential |
| `NEXT_PUBLIC_DISABLE_SIGNUP` | Documenso | false | - |
| `DOCUMENSO_DISABLE_TELEMETRY` | Documenso | true | - |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | Documenso | database | - |
| `NEXT_PRIVATE_SIGNING_TRANSPORT` | Documenso | local | - |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | Documenso | - | Default sender email address |
| `NEXT_PUBLIC_FEATURE_BILLING_ENABLED` | Documenso | false | - |
| `NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS` | Documenso | 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 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/documenso-esign-postgres)
