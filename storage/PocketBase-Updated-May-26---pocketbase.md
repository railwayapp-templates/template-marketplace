# Deploy PocketBase [Updated May ’26] on Railway

PocketBase [May ’26] (Realtime DB, Auth & File Storage Backend) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase)

## About

Pocketbase is a free, open-source backend platform available on GitHub, offering real-time database, authentication, and file storage in a single lightweight Go binary. It’s designed to help developers build apps faster without managing heavy infrastructure.

You can self-host Pocketbase to keep all your app data, user authentication, and file storage entirely under your control, with zero third-party involvement. With Pocketbase, you get a real-time database, built-in auth, and admin dashboard out of the box - perfect for web apps, mobile apps, SaaS platforms, and internal tools.

![Hosting PocketBase backend on Railway Image](https://res.cloudinary.com/dojdzamvk/image/upload/Screenshot_2025-10-19_at_11.27.44_PM_whrkit "PocketBase deployment Dockerfile)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase-railway | [Shinyduo/pocketbase-railway](https://github.com/Shinyduo/pocketbase-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/pocketbase`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pocketbase)
