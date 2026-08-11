# Deploy DocuSeal | (Just Updated) DocuSign Alternative Nobody Else Can Claim, Documents Survive Redeploys on Railway

Self-hosted DocuSign alternative. Documents survive redeploys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-or-just-updated-docusign-altern)

## About

DocuSeal is an open-source document signing platform — a self-hosted DocuSign alternative. Build
fillable PDF forms in a WYSIWYG editor, send them for signature, collect legally binding
e-signatures with a PKCS#7 signing certificate, and keep every document on infrastructure you
control. This template runs DocuSeal 3.1.7 with Postgres, an admin account seeded before the URL
is ever reachable, and a volume so signed documents survive redeploys.

DocuSeal is a Rails application that stores its records in Postgres and its actual files —
uploaded PDFs, signed documents, attachments, the audit trail — on disk through ActiveStorage,
under `WORKDIR` (`/data/docuseal`), unless S3, GCS or Azure is configured. Two things about that
matter on a platform that redeploys containers:

- **The files need a volume.** Without one, Postgres keeps the template and submission rows while
  the documents themselves vanish on the next deploy — the app still lists them, and every
  download 404s.
- **The instance must be claimed at boot.** DocuSeal's first-run `/setup` page skips
  authentication for as long as no user exists, so on a public URL the first stranger who opens it
  becomes the administrator of an account holding your documents.

This template addresses both. The admin account, the `app_url` config and the e-signature
certificate are created before Puma binds a port, and the volume is created and given to the
service user before the app starts. Puma's worker count is computed from the container's own CPU
and memory limits rather than the host's core count. The image is pinned by digest, because
DocuSeal ships roughly weekly and migrates its database forward on boot.

Credentials are generated per deploy. The admin e-mail is `admin@example.com` and the password is
the generated `DOCUSEAL_ADMIN_PASSWORD` variable — change the e-mail before deploying if you like,
and change the password inside the app after your first sign-in. Re-seeding runs on every boot, so
setting a new `DOCUSEAL_ADMIN_PASSWORD` and redeploying is also a supported password reset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| docuseal | `ghcr.io/bon5co/docuseal-railway:3.1.7` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY_BASE` | docuseal | (secret) |
| `DOCUSEAL_ADMIN_PASSWORD` | docuseal | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/docuseal-or-just-updated-docusign-altern)
