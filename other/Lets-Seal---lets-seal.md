# Deploy Let's Seal on Railway

Certificate authority and PKI: sign and verify any file or document.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lets-seal)

## About

[Let's Seal](https://letsseal.org) is the open standard for proving any file is real: unaltered, sealed by a known certificate, and in existence by a certain date. Seal PDFs, images, email, and software artifacts; send documents for signature; issue branded certificates and credentials. Anyone can verify a seal forever, free, with no account. It is the Let's Encrypt of document proof: open source (Apache-2.0), run as a public-benefit project, and free forever.

This template deploys the full Let's Seal engine, the same code that runs the hosted service, with no hosted-only paths. Three services come up wired together:

1. **Let's Seal (web)**: the dashboard, sealing and signature flows, the public verification portal, and the REST API. Public, health-checked, with sealed files stored on a persistent volume.
2. **Signing Service**: holds your certificate authority and performs all cryptographic signing. It has no public domain and is only reachable by the web app over Railway's private network.
3. **PostgreSQL**: the database, with daily volume backups.

On first boot the signing service creates your own certificate authority on its volume automatically: a root certificate, a signing intermediate, the transparency-log key, and the identity issuer. There is no manual key ceremony. Every secret (session keys, audit-chain key, service tokens, key passphrases) is generated fresh per deployment, so no two deployments share anything. There is no telemetry and no phone-home.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| signing | `ghcr.io/hmseeb/letsseal-railway-signing:latest` | Database |
| web | `ghcr.io/hmseeb/letsseal-railway-web:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | signing | 8081 |
| `LETSSEAL_SERVICE_TOKEN` | signing | (secret) |
| `PORT` | web | 3000 |
| `AUTH_SECRET` | web | (secret) |
| `CRON_SECRET` | web | (secret) |
| `TRUSTED_PROXY` | web | xff |
| `AUTH_TRUST_HOST` | web | true |
| `AUDIT_HMAC_SECRET` | web | (secret) |
| `LETSSEAL_SERVICE_TOKEN` | web | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Volume:** `/app/ca/out`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/web/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/lets-seal)
