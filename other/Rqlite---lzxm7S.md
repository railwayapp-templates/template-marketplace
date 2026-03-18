# Deploy Rqlite on Railway

Lightweight, easy-to-use, distributed relational database built on SQLite

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lzxm7S)

## About

# Rqlite

rqlite is a distributed relational database that combines the simplicity of SQLite with the robustness of a fault-tolerant, highly available cluster. It's developer-friendly, its operation is straightforward, and its design ensures reliability with minimal complexity.

Read the docs to learn more about it (itz awesome) https://rqlite.io

Everything is ready! No need to change env variables

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rqlite/rqlite | `rqlite/rqlite` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4001 | Port to listen on |
| `DATA_DIR` | /rqlite/file/data | Where the data should be placed |
| `HTTP_ADDR` | :4001 | Listen Addr |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rqlite/file/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/lzxm7S)
