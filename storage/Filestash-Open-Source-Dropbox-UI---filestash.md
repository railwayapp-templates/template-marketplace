# Deploy Filestash | Open Source Dropbox UI on Railway

Self-Host Filestash. Web file manager for S3, FTP, SFTP, NFS& more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filestash)

## About

Filestash is an open-source web file manager that puts a polished, multi-user UI in front of storage you already have — S3, FTP, SFTP, SMB, WebDAV, NFS, Git, Backblaze B2, MinIO, IPFS, Storj, even Dropbox or Google Drive. Self-host Filestash on Railway to turn any backend into a fast, browser-accessible file portal with sharing, previews, image/PDF/office viewers, and an admin console — without writing a custom Nextcloud-sized stack.

This Railway template deploys the official `machines/filestash:latest` Docker image with a persistent volume mounted at `/app/data/state` (config + embedded SQLite + plugins + search index + logs in one place), a public HTTPS domain on port 8334, and an idempotent start command that pre-creates the state subdirectories Filestash expects on first boot.

Filestash is the "Dropbox UI for everyone's existing storage": it doesn't own bytes, it federates them. It's written in Go, ships as a single ~344 MB Docker image bundling `ffmpeg`, `tinytex`, `emacs-nox`, `poppler-utils`, and `tor` so previews work out of the box, and persists everything (admin config, embedded SQLite sessions/audit log, full-text search index, installed plugins) under one volume.

Key features:
- 20+ storage backends (S3, FTP, SFTP, SMB, WebDAV, NFS, Git, B2, Storj, Dropbox, Google Drive, IPFS, …)
- Browser previews for images, video, audio, PDF, Office files, code, markdown
- Per-share public links with optional password protection and expiration
- OAuth2 / SAML / OpenID / LDAP authentication plugins
- Role-based access control via the admin console
- Hot-pluggable plugin system (`/app/data/state/plugins/`)
- Built-in full-text search across mounted backends

The architecture on Railway is single-service: one container, one Railway volume. No external database or cache required — SQLite under the volume handles all state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Filestash | `machines/filestash:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8334 | Public-facing port (Filestash hardcodes 8334) |
| `CANARY` | true | Enable newer/beta Filestash features |
| `LOG_LEVEL` | INFO | Log verbosity (DEBUG, INFO, WARNING, ERROR) |
| `APPLICATION_URL` | - | Public URL for share links and OAuth callbacks |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /app/data/state/log /app/data/state/config /app/data/state/db /app/data/state/certs /app/data/state/plugins /app/data/state/search && exec /app/filestash'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/state`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/filestash)
