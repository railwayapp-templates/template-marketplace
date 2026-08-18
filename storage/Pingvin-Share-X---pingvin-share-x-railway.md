# Deploy Pingvin Share X on Railway

Share files by link with expiry, passwords and reverse uploads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pingvin-share-x-railway)

## About

Pingvin Share X is an open source file sharing platform for anyone who wants WeTransfer's workflow without its size limits, retention rules or data residency questions. Drop files into the browser, get a link back, and set how long it lives, how many people may open it and whether a password is needed. Reverse shares invert it: send a link and they upload to you. It is the maintained fork of Pingvin Share, archived in May 2026.

Deploy Pingvin Share X on Railway and the awkward parts of self-hosting it are wired up already. The template runs the official `smp46/pingvin-share-x` image behind its bundled Caddy front end, points storage at a Railway object storage bucket so shares are not capped by disk size, keeps the database on a persistent volume, and adds a private ClamAV service that scans uploads. An administrator account is created on first boot and registration starts off, so nobody can claim your instance while you read this page.

![Pingvin Share X Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786979505/29f8eeb9-e6fe-4e54-8b99-2a39d2debb92.png)

Self-hosting matters here because the files are the sensitive part: contracts, raw footage, medical scans, build artefacts. A hosted transfer service decides retention and jurisdiction for you; a self-hosted one does not. The app is a Next.js front end and a NestJS API in one container, fronted by Caddy so both answer on one origin. Metadata lives in SQLite on the volume; file bytes go to the bucket.

- Share links with expiry dates, visitor limits and optional passwords
- Reverse shares: recipients upload to you without an account
- Email recipients, so a share is delivered rather than pasted
- OIDC and LDAP sign-in beside local accounts, plus TOTP two-factor
- ClamAV scanning, with infected files removed from the share
- Local disk or S3-compatible storage, switchable in the admin panel
- Per-user quotas, and 32 interface languages

ClamAV talks to the app over Railway's private network and is never exposed publicly. While it restarts or fetches signatures uploads still succeed — scanning is best-effort, not blocking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clamav | `clamav/clamav:stable` | Database |
| pingvin-share-x | [gridalpha/pingvin-share-x-railway](https://github.com/gridalpha/pingvin-share-x-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FRESHCLAM_CHECKS` | clamav | 2 | Signature update checks per day |
| `CLAMAV_NO_MILTERD` | clamav | true | Skip the unused mail milter |
| `PORT` | pingvin-share-x | 3000 | Port the bundled Caddy serves |
| `S3_KEY` | pingvin-share-x | - | File bucket key id |
| `APP_URL` | pingvin-share-x | - | Public URL used in share links |
| `S3_REGION` | pingvin-share-x | - | File bucket region |
| `S3_SECRET` | pingvin-share-x | (secret) | File bucket secret |
| `S3_ENABLED` | pingvin-share-x | true | Store files in object storage |
| `ADMIN_EMAIL` | pingvin-share-x | admin@example.com | First admin email address |
| `CLAMAV_HOST` | pingvin-share-x | - | Private virus scanner host |
| `CLAMAV_PORT` | pingvin-share-x | 3310 | Virus scanner clamd port |
| `S3_ENDPOINT` | pingvin-share-x | - | File bucket endpoint |
| `ADMIN_PASSWORD` | pingvin-share-x | (secret) | First admin password, created once |
| `ADMIN_USERNAME` | pingvin-share-x | (secret) | First admin username |
| `S3_BUCKET_NAME` | pingvin-share-x | - | File bucket name |
| `SECURE_COOKIES` | pingvin-share-x | true | Mark session cookies secure |
| `S3_USE_CHECKSUM` | pingvin-share-x | false | Checksums only when API requires |
| `ALLOW_REGISTRATION` | pingvin-share-x | false | Keep self-registration closed |
| `ALLOW_UNAUTHENTICATED_SHARES` | pingvin-share-x | false | Only signed-in users create shares |

## Configuration

- **Volume:** `/var/lib/clamav`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/app/backend/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pingvin-share-x-railway)
