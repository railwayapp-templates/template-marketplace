# Deploy Notesnook Sync Server on Railway

Self-hosted, end-to-end encrypted Notesnook notes sync server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notesnook-sync-server)

## About

[Notesnook](https://notesnook.com) is an open-source, end-to-end encrypted note-taking app.
This template deploys the self-hosted Notesnook **sync server**: the backend that the official
Notesnook apps (web, desktop, mobile) connect to instead of Notesnook's own servers, so your
encrypted notes sync through infrastructure you control.

The sync server is six cooperating services, and this template runs and wires all of them:
the sync API, the identity (authentication) server, a realtime events server, the Monograph
published-notes server, MinIO for attachment storage, and MongoDB as a single-node replica
set. Each public service receives its own HTTPS domain; the services reach each other over
Railway's private network; the shared secret and storage credentials are generated for you;
and the two data volumes (database and attachments) persist across redeploys. The container
images are pinned, and the MongoDB and MinIO images are thin wrappers that initiate the
replica set and create the attachments bucket at startup. After deploying, you point an
official Notesnook app at your four service URLs under Settings → Servers, create your
account, and then disable further signups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sse | [RockinPaul/notesnook_railway_template](https://github.com/RockinPaul/notesnook_railway_template) (root: sse) | Web service |
| notesnook-server | [RockinPaul/notesnook_railway_template](https://github.com/RockinPaul/notesnook_railway_template) (root: notesnook-server) | Web service |
| minio | [RockinPaul/notesnook_railway_template](https://github.com/RockinPaul/notesnook_railway_template) (root: minio) | Web service |
| monograph | [RockinPaul/notesnook_railway_template](https://github.com/RockinPaul/notesnook_railway_template) (root: monograph) | Web service |
| identity | [RockinPaul/notesnook_railway_template](https://github.com/RockinPaul/notesnook_railway_template) (root: identity) | Web service |
| mongo | [RockinPaul/notesnook_railway_template](https://github.com/RockinPaul/notesnook_railway_template) (root: mongo) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NOTESNOOK_API_SECRET` | sse | (secret) |
| `NOTESNOOK_API_SECRET` | notesnook-server | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `NOTESNOOK_API_SECRET` | identity | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/notesnook-sync-server)
