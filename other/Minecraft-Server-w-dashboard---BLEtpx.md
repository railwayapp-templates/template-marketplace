# Deploy Minecraft Server (w/ dashboard) on Railway

Java Minecraft server (Paper) with a web console, file browser and volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/BLEtpx)

## About

A Java Edition Minecraft server running Paper through the widely used `itzg/minecraft-server` image, plus a small web dashboard built for this template: a live console, a file browser for the world and plugins, and a server status view, all behind a Railway login. Players connect through a public TCP address; the world lives on a persistent volume.

The template is a single service. Its Dockerfile starts from `itzg/minecraft-server`, which downloads the requested server type and version on boot (Paper by default), runs it on Java 21 with Aikar's JVM flags, and keeps the world under `/data`, where the Railway volume is mounted. Alongside the game server the container runs the dashboard on a separate port, exposed on the service's public HTTPS domain. Players do not use that domain; they connect to the TCP proxy address Railway assigns to port 25565, which you will find as `RAILWAY_TCP_PROXY_DOMAIN` and `RAILWAY_TCP_PROXY_PORT` in the service variables.

The dashboard signs you in with your Railway account and only admits people who can see this service in the Railway project, so there is no separate admin password to manage. From it you can run console commands, tail the log, upload plugins and edit configuration files.

The one thing you must do at deploy time is set `EULA` to `TRUE`, which records your agreement to the [Minecraft End User License Agreement](https://aka.ms/MinecraftEULA). The server refuses to start with any other value.

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
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, CSS, HTML, Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/BLEtpx)
