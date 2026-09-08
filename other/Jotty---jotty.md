# Deploy Jotty on Railway

Self-hosted checklists and markdown notes with encryption and SSO

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jotty)

## About

Jotty (jotty.page) is a lightweight, self-hosted app for personal checklists and markdown notes. It stores everything as plain files on your own disk, supports kanban checklists, note encryption, sharing, MFA, OIDC single sign-on and a REST API, and installs as a PWA on phones.

Jotty is a single Next.js service that keeps all data as JSON and markdown files under one directory. This template runs the official `ghcr.io/fccview/jotty:1.27.0` image with a persistent Railway volume mounted at `/app/data`, a health check on `/api/health`, and the HTTPS session mode already wired to your Railway domain. There is no database to provision. Deploy, open the URL, create the admin account, start writing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jotty | `ghcr.io/fccview/jotty:1.27.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 0 | See PUID. |
| `PORT` | 3000 | Port the app listens on. Matches the domain target port. |
| `PUID` | 0 | Run as root so the app can write to the Railway volume. Leave as is. |
| `HTTPS` | true | Secure session cookies. Railway terminates TLS at the edge, so leave this on. |
| `APP_URL` | - | Public address of your instance. Sessions and SSO redirects are built from it. |
| `HOSTNAME` | :: | Listen address. Leave as is; Railway reaches containers over IPv6. |
| `NODE_ENV` | production | Run mode. |
| `INTERNAL_API_URL` | http://localhost:3000 | Server-side self calls. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jotty)
