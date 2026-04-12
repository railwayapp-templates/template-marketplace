# Deploy Anchor on Railway

Offline first, self hostable note taking application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anchor)

## About

Anchor is an offline-first, self-hostable note-taking application designed for speed, privacy, and simplicity. It features a rich text editor, custom tags, offline editing capabilities, and seamless synchronization across web and mobile devices, ensuring your notes are always accessible and secure.

Deploying Anchor on Railway provides a streamlined, one-click experience to get your secure note-taking backend up and running in minutes. Anchor is beautifully packaged as a single Docker container combining a Next.js frontend, a Nest.js API server, and an embedded PostgreSQL database handled dynamically out-of-the-box. This architecture allows the entire stack to run as a single Railway service without configuring external databases. Once deployed, all you need to do is attach a persistent volume to the `/data` directory to ensure your notebooks, attachments, and database survive container restarts, giving you a reliable personal knowledge base.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zhfahim/anchor:latest | `ghcr.io/zhfahim/anchor:latest` | Database |

## Configuration

- **TCP Proxies:** 3000
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/anchor)
