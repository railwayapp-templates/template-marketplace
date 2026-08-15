# Deploy HomeDrive - Simple Google Drive on Railway

Self Hosted ,Simple google drive Clone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homedrive)

## About

Hosting home-drive on Railway simplifies deploying a modern SvelteKit application. Railway manages the underlying infrastructure and builds the application directly from the source code. To ensure that your uploaded files persist across deployments and restarts, a persistent storage volume is required.

Networking is handled automatically, with Railway provisioning a secure HTTPS domain for public access. Because home-drive relies on the local filesystem to store files rather than an external database, scaling should be restricted to a single instance to prevent filesystem fragmentation and missing uploads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| home-drive | [bilalnawaz072/home-drive](https://github.com/bilalnawaz072/home-drive) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | bind the host |
| `PORT` | 3000 | port where app listens |
| `FILES_DIR` | /app/files | directory to store files |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/files`

**Category:** Storage · **Languages:** Svelte, TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/homedrive)
