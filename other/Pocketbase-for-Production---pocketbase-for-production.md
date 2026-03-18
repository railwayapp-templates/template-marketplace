# Deploy Pocketbase for Production on Railway

Open-source backend in 1 with Realtime DB, Auth, and File Storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pocketbase-for-production)

## About

PocketBase is a powerful open-source backend that combines a real-time SQLite database, user authentication, file storage, and an easy-to-use admin dashboard into a single, high-performance Go executable. It is designed to simplify the development of web and mobile apps by providing a ready-to-use backend infrastructure out of the box.

Hosting PocketBase for production involves managing a single-binary application that relies on a local SQLite database. Unlike traditional microservices that require separate database servers, PocketBase thrives on disk-based storage. To ensure data persistence on platforms like Railway, you must attach a **Persistent Volume** to store the `pb_data` directory; otherwise, your data will be lost during deployments. Production setups also require configuring environment variables for secure admin access, setting up automated backups, and ensuring an SSL-enabled domain is linked to the PocketBase instance to handle secure real-time WebSocket connections and authentication flows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [zxdev7/pocketbase](https://github.com/zxdev7/pocketbase) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/pocketbase-for-production)
