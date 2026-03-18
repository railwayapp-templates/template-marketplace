# Deploy Minecraft Server Spigot on Railway

Deploy your own minecraft server on spigot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Fm2T4D)

## About

This template provides a ready-to-use Minecraft server powered by Spigot, a high-performance fork of the Minecraft server that supports plugins via the Bukkit API. It’s optimized for multiplayer gameplay and plugin extensibility, making it perfect for both casual hosting and community projects.

Features:
	•	Based on official Spigot builds
	•	Easy configuration via environment variables
	•	Plugin-ready: supports Bukkit/Spigot plugins
	•	Auto EULA acceptance & version configuration
	•	Dockerized for one-click deployment
	•	Persistent volume support for world & config data

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| spigot | `nimmis/spigot` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `EULA` | true |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/minecraft`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Fm2T4D)
