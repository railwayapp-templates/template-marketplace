# Deploy Cloudreve on Railway

Self-hosted Cloud Storage - Open source alternative to google drive

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudreve-1)

## About

![image](https://raw.githubusercontent.com/cloudreve/docs/master/images/homepage.png)

Cloudreve is an open source, self-hosted cloud storage and file management platform. It provides a modern web interface to store, manage, and share files across multiple backends, including local storage, S3, OneDrive, and other cloud providers. With support for multi-user management, WebDAV, and direct upload, Cloudreve is a flexible Google Drive alternative.

Hosting Cloudreve on Railway allows you to quickly deploy a scalable, private cloud storage solution without complex setup. Once deployed, Cloudreve gives you a fully managed file hub with browser-based access, user accounts, and seamless integration with multiple storage providers. You can upload, download, and stream directly between client and cloud storage, manage permissions, and even enable background torrent or Aria2 downloads. With Railway handling your infrastructure, you can focus entirely on managing your files and collaboration platform.

I’ve personally tested many open source storage systems while searching for something that can truly replace Google Drive. Nextcloud and its forks didn’t quite fit my needs; Filebrowser is great but lacks some advanced features. Cloudreve, however, feels polished, modern, and capable, bringing together the best of both worlds. Try it out and see if it can become your new all-in-one file storage solution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| cloudreve | `cloudreve/cloudreve` | Web service |
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CR_CONF_Database.Type` | cloudreve | postgres |
| `CR_CONF_Redis.Password` | cloudreve | (secret) |
| `CR_CONF_Database.Password` | cloudreve | (secret) |
| `VALKEY_PORT` | Valkey | 6379 |
| `VALKEY_USER` | Valkey | (secret) |
| `VALKEY_PASSWORD` | Valkey | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cloudreve/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cloudreve-1)
