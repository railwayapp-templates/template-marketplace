# Deploy Copyparty on Railway

Self-hosted copyparty web file server & cloud drive in one container

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/copyparty-1)

## About

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/copyparty-1)

copyparty is a fast, minimal, self-contained web file server, cloud-client, and cloud-drive in a **single pure-Python package**. It serves files over HTTP, FTP, and Samba — with a modern web UI for browsing, uploading, and sharing — and needs no external database or object storage. Anonymous visitors get **read-only** access (open file sharing); the `admin` account gets **write** access (upload, delete, rename). Deploy it on Railway in minutes.

copyparty runs as a single Docker container on port `3923`. Railway provides compute, TLS at the edge (the app serves plain HTTP inside the container), and a public URL. All user files and copyparty state live at `/srv` — mount a Railway Volume there so your files survive restarts and redeploys. No Postgres, Redis, or S3 required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| copyparty | [INAPP-Mobile/copyparty](https://github.com/INAPP-Mobile/copyparty) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `CP_PASS` | REQUIRED. Password for the `admin` account (used for uploads / writes / management) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/copyparty-1)
