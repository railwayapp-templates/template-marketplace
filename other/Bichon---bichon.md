# Deploy Bichon on Railway

A lightweight, high-performance Rust email archiver with WebUI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bichon)

## About

Bichon is an open source email archiving system that synchronizes emails from IMAP servers, indexes them for full text search, and provides a REST API for programmatic access. It is designed for archiving and searching rather than sending emails, and runs as a standalone server with a built in WebUI.  
https://github.com/rustmailer/bichon

On Railway, you deploy the Bichon container and attach a persistent volume for its data directory. The official Docker example exposes port `15630` and mounts `/data` for storage. You must also configure the encryption password as documented in the repository. Bichon connects to external IMAP servers, so it requires valid mailbox credentials and network access to those providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bichon | `rustmailer/bichon:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BICHON_ROOT_DIR` | /data |
| `BICHON_LOG_LEVEL` | info |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bichon)
