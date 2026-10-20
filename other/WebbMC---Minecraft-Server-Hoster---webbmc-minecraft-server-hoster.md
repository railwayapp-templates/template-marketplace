# Deploy WebbMC - Minecraft Server Hoster on Railway

Self-hosted Minecraft server panel for Paper, Fabric, Velocity and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webbmc-minecraft-server-hoster)

## About

WebbMC is a self-hosted Minecraft server panel, in the spirit of Crafty Controller. From one web page you can run Paper, Purpur, Fabric, Vanilla, Velocity and BungeeCord servers, with a live console, plugins, files, backups, schedules and players. Everyone signs in with their own account and manages their own servers.

WebbMC is a single Node.js app with no database. This template builds it from the repository's Dockerfile, which includes Java 25, 21 and 17, so both new and older Minecraft versions run. Worlds, backups and settings are stored on a volume at `/data`, so they survive redeploys. The panel is served on Railway's public HTTPS domain, and players join through a TCP Proxy to port 25565. The panel shows that address on each server's card. **After deploying, open the panel and create your account straight away: the first account created becomes the admin.** Give the service enough memory for each server's maximum RAM.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WebbMC | [web-beck/WebbMC](https://github.com/web-beck/WebbMC) | TCP service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, CSS, Shell, C#, PowerShell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/webbmc-minecraft-server-hoster)
