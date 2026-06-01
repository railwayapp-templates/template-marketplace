# Deploy Grimmory — Self-Hosted Digital Library on Railway on Railway

Self-host Grimmory: ebooks, comics & audiobooks with Kobo sync. Free.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grimmory-digital-library)

## About

Grimmory is the open-source successor to BookLore — a self-hosted digital library for people
who take their reading seriously. Smart rule-based shelves, automatic metadata lookup from
Google Books and Open Library, a built-in in-browser reader with annotations and highlights,
Kobo and KOReader sync, OPDS support, BookDrop automated ingestion, and multi-user accounts
with OIDC authentication. Supports EPUB, MOBI, AZW3, PDF, CBZ/CBR comics, and audiobooks
(M4B, MP3) from a single library.

This template deploys Grimmory v2.3.0 with a private MariaDB sidecar — pinned to a stable
release tag, pre-wired on Railway's private networking, with persistent volumes for app data
and database storage.

---

Running Grimmory in production requires coordinating the application server and a MariaDB
database with private networking, persistent volumes for both services, and a public HTTPS
endpoint for browser access, device sync, and OPDS catalog requests. Without a managed host,
you're configuring Docker Compose, inter-service networking, SSL, and volume mounts manually.

This template pins Grimmory to `v2.3.0` rather than a floating `latest` tag, keeps
database traffic on private networking, and pre-configures both volumes at deploy time.
Library metadata, reading progress, annotations, and user accounts survive every redeploy.

Typical cost: **~$5–10/month** on Railway's Hobby plan. Kindle Unlimited costs $9.99/month
with no ownership of the books. Grimmory is free — your library is yours permanently.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Deploy Grimmory | [sahilrupani/grimmory](https://github.com/sahilrupani/grimmory) | Database |
| Mariadb | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Deploy Grimmory | Etc/UTC | Timezone (e.g. Etc/UTC, America/New_York) |
| `USER_ID` | Deploy Grimmory | 1000 | - |
| `GROUP_ID` | Deploy Grimmory | 1000 | - |
| `DISK_TYPE` | Deploy Grimmory | LOCAL | - |
| `DATABASE_PASSWORD` | Deploy Grimmory | (secret) | - |
| `DATABASE_USERNAME` | Deploy Grimmory | (secret) | - |
| `MARIADB_USER` | Mariadb | (secret) | - |
| `MARIADB_DATABASE` | Mariadb | booklore | - |
| `MARIADB_PASSWORD` | Mariadb | (secret) | - |
| `MARIADB_ROOT_PASSWORD` | Mariadb | (secret) | - |

## Configuration

- **Volume:** `/booklore-data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/grimmory-digital-library)
