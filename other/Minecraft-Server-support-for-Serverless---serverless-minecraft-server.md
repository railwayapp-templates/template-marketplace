# Deploy Minecraft Server (support for Serverless) on Railway

Minecraft server with support for serverless

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/serverless-minecraft-server)

## About

#### You must enable serverless yourself. Click the minecraft-server service, go to settings and go down to serverless, enable it and deploy

Minecraft Server using [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server) and [Haproxy](https://www.haproxy.org/)

See https://docker-minecraft-server.readthedocs.io/en/latest/variables/ for configuration

**Supports Forge, Fabric, Vanilla, Paper, Bukkit, Spigot, Quilt and more!**

By hosting a Minecraft server on Railway and enabling the Serverless option, your service costs nothing while idle by sleeping.

Maintaining a Minecraft has never been easier. Haproxy holds TCP request when your server is waking up from sleep and connects players to the server once ready.

You can customize nearly anything you normally could on a Minecraft server. See https://docker-minecraft-server.readthedocs.io/en/latest/variables/ for more info

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minecraft-server | `itzg/minecraft-server:latest` | Database |
| haproxy | [aapelix/haproxy](https://github.com/aapelix/haproxy) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `EULA` | minecraft-server | - | Set as true |
| `MC_PORT` | haproxy | 25565 | Port your server listens on (default 25565) |

## Configuration

- **Volume:** `/data`
- **TCP Proxies:** 25565

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/serverless-minecraft-server)
