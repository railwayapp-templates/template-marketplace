# Deploy OpenList [Updated May '26] on Railway

OpenList [May '26] (Open-Source File Listing & Cloud Storage) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openlist-storage)

## About

OpenList is an open-source file listing and directory indexing platform designed to help developers and teams host, browse, and share files through a clean web interface. It is commonly used as a modern alternative to traditional directory listings, allowing you to turn cloud storage or local file systems into a searchable, user-friendly web app.
OpenList focuses on simplicity, speed, and control. Instead of locking you into proprietary file-sharing services, it gives you a self-hosted solution where you own your data and customize how files are presented. Whether you want a private file index, a public download portal, or a lightweight file browser, OpenList makes it easy.
With a minimal backend and a fast frontend, OpenList is ideal for developers who want a self-hosted file listing service without unnecessary complexity. And with Railway, deploying OpenList becomes a true one-click experience.

Self hosting OpenList means you control where your files live, how they are accessed, and who can view them. You are not dependent on third-party dashboards, pricing changes, or storage limits imposed by SaaS providers.
Traditionally, self hosting OpenList would require setting up a server, configuring runtime dependencies, managing ports, and keeping the service online. This is where Railway changes the game.
With Railway, you can deploy OpenList in minutes. Railway automatically provisions containers, handles environment variables, and keeps your service running without manual DevOps work.
Railway allows you to focus on using OpenList, not maintaining servers. Once deployed, your OpenList instance is live with a public URL, ready to serve files instantly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openlist-railway | [Shinyduo/openlist-railway](https://github.com/Shinyduo/openlist-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5244 |
| `UMASK` | 022 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/openlist/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openlist-storage)
