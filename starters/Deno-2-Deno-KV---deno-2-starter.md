# Deploy 🦖 Deno 2 & Deno KV on Railway

Deploy and Host 🦖 Deno 2 & Deno KV with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/deno-2-starter)

## About

A production-ready starter template showcasing Deno KV with a web interface. 
Since Railway's default runtime doesn't support Deno 2 yet, this template uses a custom Docker configuration to ensure full compatibility.

Simple starter template with some example code for common use cases.

- 🌐 **Web Interface**: Simple HTTP server with HTML and JSON endpoints
- 🗄️ **Deno KV Storage**: Deno's built-in persistent key-value store based on SQLite in folder /db.
- 🚂 **Railway Ready**: Configured for deployment without dev files

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Railway-DENO2-DENO_KV | [Eetezadi/Railway-DENO2-DENO_KV](https://github.com/Eetezadi/Railway-DENO2-DENO_KV) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `DENO_VERSION` | 2.5.0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/db`

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/deno-2-starter)
