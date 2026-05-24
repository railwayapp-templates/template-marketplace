# Deploy Rustpad Persistent - Collaborative Editor with SQLite on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustpad-persistent)

## About

Run Rustpad, a lightweight collaborative editor, with SQLite-backed persistence on a Railway volume.

- `rustpad`: public collaborative editor service
- Persistent `/data` volume
- SQLite database stored at `/data/rustpad.sqlite3`
- Railway public domain and single-service deployment

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustpad | `ekzhang/rustpad:latest` | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rustpad-persistent)
