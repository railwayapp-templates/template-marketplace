# Deploy miniserve on Railway

Serve any folder over HTTP with a browsable listing and uploads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/miniserve)

## About

Deploy miniserve when you want a directory on the internet in the time it takes to click once. miniserve is a small, self-contained Rust program that turns any folder into a browsable web page: a sortable listing, a search box, on-the-fly folder archives, drag-and-drop uploads, deletion, resumable downloads and read-only WebDAV. It is what people reach for instead of `python -m http.server` when the share has to outlive a terminal session, be reachable outside the LAN, and sit behind a password.

Self-host miniserve on Railway and this template configures the whole thing: one service named `miniserve` running the official `svenstaro/miniserve` image, a persistent volume mounted at `/data`, and a public HTTPS domain in front of it. Traffic terminates TLS at Railway's edge and reaches the container on port 8080, where every request except the health check is challenged with HTTP basic auth using the username and password you supply at deploy time. Files are served from `/data/files` and uploads staged in `/data/tmp` on the same volume, so a redeploy never loses them. No database or object storage is involved — the filesystem is the state.

![Diagram of the single miniserve service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789249057/miniserve-architecture.webp)

miniserve solves a narrow problem completely: getting files to other people over HTTP, with no account system, no database schema and no plugins to maintain. Self-host it when the alternative is emailing archives around, paying a file-sharing seat per person, or running a full file manager whose feature list you will never touch. It is one Rust binary on a slim Debian base, so the container starts in under a second.

Key features:

- HTTP basic auth with plaintext, SHA-256 or SHA-512 passwords, or a multi-user auth file
- Uploads, folder creation and deletion, each restrictable to a subdirectory
- Folder downloads generated on the fly as `.tar`, `.tar.gz` or `.zip`
- Search by filename, sortable columns, and range requests so downloads resume
- Read-only WebDAV, so the share mounts in Finder, Explorer or a file manager
- A rendered `README.md` per directory, a QR code panel, five colour themes, and a copy-pastable recursive `wget` line

The Railway architecture is deliberately flat: one service runs the app, one volume holds the data. The volume mounts at `/data` rather than at the served directory, and the start command creates `/data/files` and `/data/tmp` inside it — which keeps the `lost+found` directory every Linux filesystem carries out of your listing, and puts upload staging on the same filesystem as the destination.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| miniserve | `svenstaro/miniserve:0.35.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway health-checks |
| `MINISERVE_AUTH` | - | Combined credential miniserve reads |
| `MINISERVE_PATH` | /data/files | Directory served to visitors |
| `MINISERVE_PORT` | 8080 | Port miniserve listens on |
| `MINISERVE_TITLE` | miniserve | Heading shown instead of the host |
| `MINISERVE_HEADER` | Strict-Transport-Security:max-age=31536000; includeSubDomains | Extra response header |
| `MINISERVE_QRCODE` | true | Show the share QR code panel |
| `MINISERVE_README` | true | Render README.md under each listing |
| `MINISERVE_VERBOSE` | true | Emit access logs to stdout |
| `MINISERVE_WORKERS` | 4 | Server worker threads |
| `MINISERVE_PASSWORD` | (secret) | Basic-auth password |
| `MINISERVE_USERNAME` | (secret) | Basic-auth username |
| `MINISERVE_DIRS_FIRST` | true | Sort directories above files |
| `MINISERVE_ENABLE_TAR_GZ` | true | Streaming folder archive download |
| `MINISERVE_ENABLE_WEBDAV` | true | Read-only WebDAV PROPFIND support |
| `MINISERVE_MKDIR_ENABLED` | true | Enables the create-directory form |
| `MINISERVE_ALLOWED_RM_DIR` | / | Enables deletion everywhere |
| `MINISERVE_SHOW_WGET_FOOTER` | true | Copy-pastable recursive wget line |
| `MINISERVE_ALLOWED_UPLOAD_DIR` | / | Enables uploads everywhere |
| `MINISERVE_ON_DUPLICATE_FILES` | rename | Suffix instead of failing on a clash |
| `MINISERVER_TEMP_UPLOAD_DIRECTORY` | /data/tmp | Upload staging dir on the volume |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data/files /data/tmp && exec /app/miniserve'`
- **Healthcheck:** `/__miniserve_internal/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/miniserve)
