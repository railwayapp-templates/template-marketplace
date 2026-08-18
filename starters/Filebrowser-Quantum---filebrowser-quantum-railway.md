# Deploy Filebrowser Quantum on Railway

Dropbox alternative.  File manager: browse, search and share files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filebrowser-quantum-railway)

## About

FileBrowser Quantum turns a disk into a fast, private web drive: a single Go binary that indexes your files, serves them through a modern browser UI, previews images, video, audio, PDFs, Office documents and 3D models, and hands out share links to people with no account. It is a substantial fork of the original File Browser, rebuilt after that project went into maintenance mode, adding search that answers as you type, multiple sources with include/exclude rules, per-user permissions, and OIDC, LDAP, JWT and proxy login alongside passwords with TOTP. Teams reach for it when Dropbox is more than they need and Nextcloud more than they want to run.

Deploy FileBrowser Quantum on Railway and you get one service, one volume and no database to babysit. The container builds from a public source repository wrapping the upstream image, renders the app's `config.yaml` at boot so the port and share URLs follow the platform, and handles volume ownership so the app still runs unprivileged. Everything durable sits on the volume: files in `/data/files`, the user and share database at `/data/database.db`, index and thumbnails in `/data/cache`. Self-host FileBrowser Quantum this way and a redeploy is a container swap that the drive, accounts and share links all survive.

![FileBrowser Quantum Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786979258/e20ad229-d952-40e7-9489-ca894b76e293.png)

FileBrowser Quantum is a file manager that lives next to your data instead of copying it into somebody else's cloud. It watches one or more directories, keeps a SQLite index of what it finds, and exposes that through a web UI, a REST API with a Swagger page at `/swagger`, and a mountable WebDAV endpoint. It suits files that already sit on a server — media, scans, exports, design assets — where what you lack is a way to browse, search and hand them out.

- Indexed search returning matches as you type, filtered by name, type and size
- Thumbnails and previews for images, video, audio, PDFs, Office files, 3D models
- Share links with optional password, expiry, download limits and upload-only mode
- Per-user scopes with granular create, modify, delete and share permissions
- Password login with TOTP, plus OIDC, LDAP, JWT and reverse-proxy authentication
- WebDAV at `/dav`, plus an installable progressive web app

The template is deliberately small: one service holds the whole application — HTTP server, indexer, previewer and API in one process — and the volume is the only other moving part. Embedded state means nothing to provision, and it means one replica: two containers cannot share that database, and the volume is what makes Railway retire the old container before starting the new one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| filebrowser | [gridalpha/filebrowser-quantum-railway](https://github.com/gridalpha/filebrowser-quantum-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listening port |
| `FILEBROWSER_TOTP_SECRET` | (secret) | Encrypts stored TOTP secrets |
| `FILEBROWSER_INSTANCE_NAME` | FileBrowser Quantum | Title shown in the UI |
| `FILEBROWSER_ADMIN_PASSWORD` | (secret) | Admin password, applied every boot |
| `FILEBROWSER_JWT_TOKEN_SECRET` | (secret) | Signs sessions and share links |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/filebrowser-quantum-railway)
