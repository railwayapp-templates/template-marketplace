# Deploy Sign Documents Without DocuSign Fees — Self-Host DocuSeal on Railway on Railway

Self-host DocuSeal: legal e-signatures. No DocuSign per-envelope fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-esignature)

## About

![DocuSeal open-source e-signature platform](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1758479532/docuseal-self-hosting-on-railway_gx3of6.png)

DocuSeal is the open-source e-signature platform with **17k+ GitHub stars** — build PDF
signing forms with a visual drag-and-drop editor, manage multiple signers, send automatic
email reminders, generate audit trails, and embed signing workflows directly into your
application via REST API. ESIGN Act, UETA, and eIDAS compliant for legally binding
signatures in the US and EU.

**DocuSign's median annual contract is $17,250.** A 50-person team paying DocuSign per-seat
pricing spends $39,000/year. DocuSeal on Railway costs ~$2–5/month — under $60/year.
Unlimited documents. Unlimited signatures. No per-envelope fees. Ever.

---

Running DocuSeal in production requires a persistent PostgreSQL database for documents and
audit logs, a public HTTPS endpoint for signer access links (signers don't need an account —
they access documents via a unique URL), and email configuration for signature request
notifications. Without a managed host, you're configuring Docker, SSL, volume mounts, and
email relay manually.

Railway handles all of it. This template deploys DocuSeal pre-connected to Railway-managed
PostgreSQL 17 SSL over private networking, with a public HTTPS domain provisioned
automatically — signer links work immediately after deploy.

Typical cost: **~$2–5/month** on Railway's Hobby plan. DocuSign starts at $15/user/month
for basic features, $45+/user/month for API access. PandaDoc starts at $19/user/month.
DocuSeal on Railway gives you unlimited documents, unlimited signers, and full API access at
flat compute cost — no per-signature fees, no per-envelope caps, no user seat limits.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Docuseal | [docusealco/docuseal-railway](https://github.com/docusealco/docuseal-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY_BASE` | Docuseal | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/docuseal-esignature)
