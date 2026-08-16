# Deploy Documenso | (Just Updated) DocuSign Alternative Whose Signed Documents Actually Complete on Railway

E-signing that actually seals: per-deploy certificate, admin already seeded

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-or-just-updated-docusign-alter)

## About

Documenso is the open-source alternative to DocuSign: upload a PDF, place signature and form
fields, send it to signers, and get back a sealed, digitally signed document. This template runs
Documenso 2.16.0 with Postgres, and — unlike a stock deployment — it comes up with a signing
certificate and an administrator account already in place.

Documenso is a Node application that stores everything in Postgres, including the uploaded and
completed documents. It needs three things a plain container does not have on a hosting platform:
a PKCS#12 signing certificate to seal completed envelopes, an account with the `ADMIN` role
(Documenso creates every account as a plain user and ships no seeding command), and a writable
place to keep the certificate across redeploys.

This template supplies all three. On first boot it generates a self-signed signing certificate
onto the volume, seeds the administrator from a generated password before the web server accepts
its first request, and repairs the volume's ownership for the non-root user the image runs as.
The certificate is kept, so it does not change under you on the next deploy; the administrator
password is re-applied on every boot, so changing the variable and redeploying is a working
password reset even with no mail server configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| documenso | `ghcr.io/bon5co/documenso-railway:2.16.0` | Web service |
| postgres | `postgres:17-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NEXTAUTH_SECRET` | documenso | (secret) |
| `DOCUMENSO_ADMIN_PASSWORD` | documenso | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/documenso`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/documenso-or-just-updated-docusign-alter)
