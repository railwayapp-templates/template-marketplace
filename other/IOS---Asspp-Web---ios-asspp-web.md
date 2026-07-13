# Deploy IOS - Asspp Web on Railway

Self-hosted iOS app installer and downloader with zero-trust relay.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ios-asspp-web)

## About

AssppWeb is an open-source, self-hosted web interface designed for acquiring and OTA-installing iOS apps outside the App Store. It utilizes a zero-trust browser-side architecture to interact directly with Apple APIs, providing a secure, independent package distribution solution for personal and development environments.

![Preview](https://raw.githubusercontent.com/Lakr233/AssppWeb/main/resources/preview.png)

Hosting AssppWeb on Railway provides a reliable, single-container deployment backed by secure cloud storage. Railway builds the application directly from the published container image, exposes the required HTTP/WebSocket ports, and attaches persistent Volumes to preserve IPA packages and cache files across releases.

Since OTA iOS app installation requires a secure connection, Railway's automatic HTTPS domain provisioning simplifies the setup process. By deploying on Railway, you benefit from automatic GitHub deployments, logs, metric monitoring, and easy vertical scaling without operational overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AssppWeb | `ghcr.io/lakr233/assppweb:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The container listening port |
| `DATA_DIR` | /data | Directory where package data and caches are stored |
| `ACCESS_PASSWORD` | (secret) | Optional password to protect the web UI and API |
| `MAX_DOWNLOAD_MB` | 0 | Reject downloads larger than this limit in MB (0 to disable) |
| `DOWNLOAD_THREADS` | 8 | Number of parallel download threads (usually 1-32) |
| `AUTO_CLEANUP_DAYS` | 7 | Delete cached IPA files older than this many days (0 to disable) |
| `AUTO_CLEANUP_MAX_MB` | 0 | Delete oldest cached files when storage exceeds this limit in MB (0 to disable) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ios-asspp-web)
