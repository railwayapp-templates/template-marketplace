# Deploy Minecraft Server (w/ dashboard) on Railway

Deploy your Minecraft Server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BLEtpx)

## About

Minecraft Server for Java allows players to connect and play together in shared worlds with custom configurations and game modes.

Hosting a Minecraft server means running a Java application that manages player connections, world data, and game state across multiple concurrent users. The server handles world generation, player authentication, resource management, and network synchronization while maintaining persistent world data. Traditional deployment requires managing server resources, handling traffic spikes during peak play times, and maintaining uptime for consistent player experience. Railway simplifies this by providing automatic resource scaling, handling network configuration for player connections, and managing the underlying infrastructure so you only pay for what you use without worrying about server upgrades or stability issues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Minecraft Server | [ThallesP/railway-minecraft-template](https://github.com/ThallesP/railway-minecraft-template) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EULA` | - | By changing the setting above to TRUE you are indicating your agreement to our EULA (https://aka.ms/MinecraftEULA). |
| `MOTD` | - | Customizes the message displayed in the server list. |
| `TYPE` | PAPER | Software type |
| `MAX_MEMORY` | 8G | Defines the maximum amount of memory, which can be increased depending on your plan. |
| `JVM_DD_OPTS` | disable.watchdog:true | Configures Java Virtual Machine (JVM) options, specifically disabling the watchdog. |
| `MAX_TICK_TIME` | -1 | Sets the maximum time in milliseconds that a single tick can take before considering the server frozen. (-1 means unlimited) |
| `USE_AIKAR_FLAGS` | true | Determines whether to use optimization flags provided by the Aikar community for better server performance. |
| `ENABLE_AUTOPAUSE` | true | Requires App Sleeping in service settings. Allows automatic pausing of the server when no players are active. |
| `EXISTING_OPS_FILE` | SYNCHRONIZE | Defines the synchronization method for the existing ops (operators) file. |
| `ENABLE_ROLLING_LOGS` | true | Enables or disables the rolling of server logs for efficient file management. |
| `AUTOPAUSE_TIMEOUT_EST` | 0 | Initiate server sleep, specifying the duration (in seconds) until the server enters the sleep state after the last player disconnects. |
| `AUTOPAUSE_TIMEOUT_INIT` | 0 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 25565

**Category:** Other · **Languages:** TypeScript, CSS, HTML, Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/template/BLEtpx)
