# Deploy filebrowser on Railway

Web-based file manager. Upload, preview, edit files through a clean UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filebrowser)

## About

### How It Works on Railway

File Browser runs inside a single Alpine-based container (Alpine 3.20, ~30 MB). The Dockerfile downloads the File Browser Go binary (v2.63.17) at build time and configures it to listen on the port assigned by Railway via the `PORT` environment variable. A health check pings `/health` to verify the container is serving requests.

The service is self-contained — no external database, cache, or dependencies are needed. All user data (files + metadata) lives inside the container's filesystem at `/srv`.

### Resource Profile

| Metric | Value |
|--------|-------|
| Image size | ~30 MB uncompressed |
| RAM usage | 15–50 MB idle (~100 MB under heavy file operations) |
| CPU usage | Negligible idle; burst during thumbnail generation |
| Startup time | ~2 seconds after image pulled |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| filebrowser | [INAPP-Mobile/railway-filebrowser](https://github.com/INAPP-Mobile/railway-filebrowser) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FB_PASSWORD` | (secret) |
| `FB_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/filebrowser)
