# Deploy Pingvin Share - Google Drive Alternative on Railway

Self-hosted file-sharing platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pingvinshare)

## About

Pingvin Share is an open-source, self-hosted file sharing platform designed as a lightweight alternative to commercial services. It allows users to upload files, set expiration dates, secure shares with passwords, and send download links via email. It provides an intuitive web interface for managing shared files efficiently.

Railway hosts Pingvin Share using its containerized infrastructure, allowing the prebuilt Docker image to run seamlessly. Railway manages the underlying compute, reverse proxying, public networking, domain generation, and SSL/TLS termination automatically.

Pingvin Share uses SQLite by default to store metadata and application configurations, alongside local filesystem storage for uploaded assets. Because container file systems are ephemeral, attaching persistent storage via a Railway Volume is required to prevent data loss across deployments or restarts.

Railway simplifies network routing by routing incoming HTTPS traffic directly to the container's configured web port. Scalability can be achieved through resource upgrades, and custom environments can easily be configured via environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pingvin-share | `stonith404/pingvin-share:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `TRUST_PROXY` | true |

## Configuration

- **Volume:** `/opt/app/backend/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pingvinshare)
