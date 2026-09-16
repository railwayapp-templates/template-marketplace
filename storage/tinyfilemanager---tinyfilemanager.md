# Deploy tinyfilemanager on Railway

Browser-based file manager for a folder on your server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tinyfilemanager)

## About

Tiny File Manager is a web-based file manager written as a single PHP file. It gives you a browser UI over a directory on a server: upload, download, rename, move, copy, zip, unzip, preview and edit files, with login accounts and optional read-only users. Developers and small teams use it instead of FTP or a full cloud-storage suite. Self-host Tiny File Manager for a private drop box for build artefacts, client deliverables or backups.

Deploy Tiny File Manager on Railway and you get one service, **tinyfilemanager**, running the app on PHP 8.4 with Apache, plus a persistent volume at `/data`. Uploads live in `/data/files`, PHP sessions in `/data/sessions` so a redeploy does not sign you out, and the generated configuration in `/data/config.php`. The admin login is built at startup from the password you supply, and the files are published at an unguessable generated prefix so direct links and previews work without exposing them under a guessable URL.

![Diagram of the Tiny File Manager service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789391763/tinyfilemanager-architecture.webp)

Tiny File Manager puts a usable file browser in front of a directory, with no database, no workers and no build step. The whole application is one PHP file plus a translation catalogue, so it starts in under a second and idles on a few megabytes. Teams reach for it when a collaboration platform is overkill — handing a designer a folder of assets, or keeping an SSH-free way to fix a config file.

Key features:

- Create, rename, copy, move, delete and download files and folders
- Chunked, drag-and-drop uploads, plus upload from a remote URL
- Zip and tar compression and extraction in place
- Built-in code editor with syntax highlighting and 35+ themes
- Per-user accounts, read-only users and per-user home directories
- Direct links, hover previews for images, search and IP allow-listing

The Railway architecture is flat: the **tinyfilemanager** service is the whole application and the volume is the storage tier. There is no database, because the app keeps no state beyond the files and a small settings file, both on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tinyfilemanager | [gridalpha/tinyfilemanager-railway](https://github.com/gridalpha/tinyfilemanager-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port Apache listens on |
| `TFM_TIMEZONE` | Etc/UTC | Timezone for displayed timestamps |
| `TFM_ADMIN_USER` | (secret) | Admin login name |
| `TFM_EDIT_FILES` | true | Enable the built-in file editor |
| `TFM_IP_RULESET` | OFF | App-level IP allow/deny mode |
| `TFM_MAX_UPLOAD_MB` | 512 | Upload ceiling for PHP and the app |
| `TFM_ONLINE_VIEWER` | false | Google document preview, off by default |
| `TFM_ADMIN_PASSWORD` | (secret) | Admin password, hashed at startup |
| `TFM_DATETIME_FORMAT` | Y-m-d H:i | Date format of the modified column |
| `TFM_GLOBAL_READONLY` | false | Make every account read-only |
| `TFM_HIGHLIGHTJS_STYLE` | vs | Syntax highlighting theme |
| `TFM_PATH_DISPLAY_MODE` | relative | Show paths relative to the root |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tinyfilemanager)
