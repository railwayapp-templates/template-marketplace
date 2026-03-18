# Deploy Filebrowser-Quantum on Railway

The best free self-hosted web-based file manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filebrowser-quantum)

## About

Filebrowser-Quantum is a modern, self-hosted web file manager for browsing, uploading, sharing, and organizing files through a clean responsive UI. It supports multiple storage “sources,” indexed search with real-time updates, granular access control, and flexible authentication options.

Hosting Filebrowser-Quantum is mainly about persistence and access. You deploy the service (commonly via Docker), attach a persistent volume for its database/config/cache, and configure one or more “sources” that point to the directories you want to manage. You’ll set an admin password and can optionally enable SSO (OIDC), define sharing rules, and tune indexing/previews. Make sure the cache and database paths are writable and mapped to durable storage so data survives redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| filebrowser | [gtsteffaniak/filebrowser](https://github.com/gtsteffaniak/filebrowser) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FILEBROWSER_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/folder/`

**Category:** Other · **Languages:** Go, Vue, JavaScript, TypeScript, CSS, Makefile, HTML, Dockerfile, Slim, Shell

[View on Railway →](https://railway.com/deploy/filebrowser-quantum)
