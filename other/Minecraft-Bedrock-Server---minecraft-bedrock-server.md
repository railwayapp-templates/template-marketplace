# Deploy Minecraft Bedrock Server on Railway

A Minecraft Bedrock server template with UDP Proxied with playit.gg

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-bedrock-server)

## About

Minecraft Bedrock Server is the official dedicated server for Minecraft's cross-platform edition, letting mobile, console, and Windows players join the same world over UDP.

Runs via the itzg/minecraft-bedrock-server Docker image. Since Railway only proxies TCP publicly, a playit.gg agent tunnels UDP traffic to the server so players can connect

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playit.gg | `ghcr.io/playit-cloud/playit-agent` | Worker |
| bedrock | `itzg/minecraft-bedrock-server` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY` | playit.gg | (secret) | Playit.gg Secret Key can be obtained by following Agent Setup Wizard |
| `EULA` | bedrock | true | Accept Minecraft EULA |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-bedrock-server)
