# Deploy Sharely on Railway

Self-hosted file sharing with ShareX, API, and MongoDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sharely-1)

## About

A self-hosted file sharing platform with a clean web interface, ShareX integration, and API access. Upload screenshots, files, and media — then instantly share them via short links.

Sharely is a Node.js and MongoDB application that provides a modern web interface for file uploads, gallery viewing, and shareable links. It supports chunked uploads up to 2 GB, automatic thumbnail generation for video and PDF files, and social media embed optimization with Open Graph metadata.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo | `mongo:7` | Database |
| sharely | [mc9max/sharely](https://github.com/mc9max/sharely) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGO_DB_NAME` | mongo | sharely |
| `MONGO_APP_USER` | mongo | (secret) |
| `MONGO_APP_PASSWORD` | mongo | (secret) |
| `TZ` | sharely | UTC |
| `PORT` | sharely | 3000 |
| `NODE_ENV` | sharely | production |
| `UPLOAD_DIR` | sharely | /app/uploads |
| `SESSION_SECRET` | sharely | (secret) |
| `MAX_FILE_SIZE_MB` | sharely | 100 |
| `ALLOW_REGISTRATION` | sharely | true |

## Configuration

- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`

**Category:** Storage · **Languages:** JavaScript, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/sharely-1)
