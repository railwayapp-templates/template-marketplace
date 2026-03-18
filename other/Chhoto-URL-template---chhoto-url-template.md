# Deploy Chhoto URL template on Railway

Chhoto URL: lightweight self-hosted URL shortener built in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chhoto-url-template)

## About

Chhoto URL is a lightweight, open-source URL shortener written in Rust. It focuses on simplicity, performance, and self-hosting, allowing you to generate short links with optional expiration, analytics, and password protection without relying on third-party SaaS providers.

Hosting Chhoto URL involves deploying a single Rust-based web service backed by a SQLite database. The application exposes an HTTP API and web UI for managing shortened links. On Railway, this typically means deploying the official Docker image or building from source, configuring environment variables, and attaching a persistent volume to store the SQLite database. No external cache or message queue is required, which keeps the infrastructure minimal. Railway handles networking, port exposure, and restarts, while the mounted volume ensures link data persists across deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chhoto URL | `sintan1729/chhoto-url:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `port` | 4567 |
| `db_url` | /data/chhoto.sqlite |
| `api_key` | (secret) |
| `password` | (secret) |
| `slug_style` | Pair |
| `ensure_acid` | True |
| `public_mode` | Disable |
| `slug_length` | 16 |
| `use_wal_mode` | True |
| `hash_algorithm` | Argon2 |
| `listen_address` | 0.0.0.0 |
| `redirect_method` | PERMANENT |
| `try_longer_slug` | True |
| `disable_frontend` | False |
| `cache_control_header` | no-cache |
| `allow_capital_letters` | True |
| `public_mode_expiry_delay` | 3600 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chhoto-url-template)
