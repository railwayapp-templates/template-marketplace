# Deploy Calibre on Railway

Your personal ebook library, self-hosted and accessible anywhere.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calibre)

## About

Calibre-Web is a self-hosted web application for browsing, reading, managing, and sharing ebook libraries through a browser. It works with a standard Calibre library and adds multi-user access, OPDS feeds, metadata management, ebook uploads, in-browser reading, Kobo sync, and optional ebook conversion capabilities.

Hosting Calibre-Web on Railway provides a persistent, browser-accessible ebook library without managing your own server. The deployment runs Calibre-Web in a LinuxServer container, exposes the web interface on port `8083`, and stores application configuration together with the Calibre library on a Railway Volume mounted at `/config`.

For Railway's single-volume-per-service model, the ebook library can be stored under `/config/books`. Calibre-Web then uses `/config/books` as the Calibre database location, where the library's `metadata.db` file and ebook files are stored persistently across deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calibre-web | `linuxserver/calibre-web:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 1000 | Group ID used by LinuxServer for Calibre-Web files |
| `PORT` | 8083 | Railway public HTTP target port; Calibre-Web listens on 8083 |
| `PUID` | 1000 | User ID used by LinuxServer for Calibre-Web files |
| `DOCKER_MODS` | linuxserver/mods:universal-calibre | Add Calibre ebook conversion binaries; x86-64 only |
| `OAUTHLIB_RELAX_TOKEN_SCOPE` | (secret) | Optional compatibility setting for Google OAuth |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/calibre)
