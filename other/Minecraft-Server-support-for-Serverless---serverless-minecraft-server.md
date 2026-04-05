# Deploy Minecraft Server (support for Serverless) on Railway

Minecraft server with support for serverless

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/serverless-minecraft-server)

## About

#### You must enable serverless yourself. Click the minecraft-server service, go to settings and go down to serverless, enable it and deploy

Minecraft Server using [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server) and a custom made proxy (in Rust)

See https://docker-minecraft-server.readthedocs.io/en/latest/variables/ for configuration

**Supports Forge, Fabric, Vanilla, Paper, Bukkit, Spigot, Quilt and more!**

By hosting a Minecraft server on Railway and enabling the Serverless option, your service costs nothing while idle by sleeping.

Maintaining a Minecraft has never been easier. The proxy holds TCP request when your server is waking up from sleep and connects players to the server once ready.

You can customize nearly anything you normally could on a Minecraft server. See https://docker-minecraft-server.readthedocs.io/en/latest/variables/ for more info

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [aapelix/proxy](https://github.com/aapelix/proxy) | TCP service |
| minecraft-server | `itzg/minecraft-server:latest` | Database |

## Environment variables

| Variable | Service | Description |
| --------- | ------- | ----------- |
| `PORT` | proxy | Port this proxy listens on (optional, default 25565) |
| `BACKEND_ADDR` | proxy | Internal address the Minecraft server is at (including the port) |
| `EULA` | minecraft-server | Set as true |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other · **Languages:** Rust

[View on Railway →](https://railway.com/deploy/serverless-minecraft-server)
