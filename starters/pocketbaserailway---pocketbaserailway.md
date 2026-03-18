# Deploy pocketbase_railway on Railway

A Pocketbase template deployable on railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pocketbaserailway)

## About

pocketbase_railway is a Go-based PocketBase application that uses PocketBase as a framework, allowing you to extend its functionality with custom Go code. It serves static files from the `pb_public` directory and can be easily customized with additional routes, hooks, and middleware while maintaining all of PocketBase's built-in features like authentication, file storage, and real-time subscriptions.

Hosting pocketbase_railway on Railway involves building a statically-linked Go binary using a multi-stage Docker build process. The application uses PocketBase's embedded SQLite database by default, which requires a persistent volume mount at `/pb_data` to ensure data persistence across deployments. The Dockerfile follows Go best practices by using dependency caching, static linking with `-extldflags "-static"`, and a minimal `busybox:glibc` base image for a small final container size. Railway automatically handles port binding through the `PORT` environment variable, and the application listens on all interfaces (`0.0.0.0`) to work seamlessly with Railway's networking layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase_railway | [metruzanca/pocketbase_railway](https://github.com/metruzanca/pocketbase_railway) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb_data`

**Category:** Starters · **Languages:** Dockerfile, Go, HTML

[View on Railway →](https://railway.com/template/pocketbaserailway)
