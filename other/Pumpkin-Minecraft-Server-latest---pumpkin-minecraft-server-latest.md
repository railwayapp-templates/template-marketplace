# Deploy Pumpkin Minecraft Server (latest) on Railway

Fast Rust-based Minecraft server with Java and Bedrock support.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pumpkin-minecraft-server-latest)

## About

PumpkinMC is a Minecraft server written entirely in Rust, offering full multithreaded tick execution instead of the single-threaded JVM tick loop that Bukkit, Spigot, and Paper are built on. It supports both Java Edition and Bedrock Edition clients, is configured through TOML files instead of server.properties, and aims to be a lightweight, high-performance alternative for admins who want lower memory overhead than a traditional Java server.

Hosting PumpkinMC means running a single Rust binary in a Docker container, with a persistent volume for your world data, player data, and TOML configuration files. Unlike JVM-based servers, there's no memory or garbage collection tuning involved. Networking needs both a TCP port for Java clients and a UDP port for Bedrock clients, so your deployment should expose both if you want cross-play. PumpkinMC is still under active, heavy development, so admins should expect some rough edges around world persistence and chunk loading rather than treat it as a production-ready replacement for a mature server like Paper.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pumpkinmc | `ghcr.io/pumpkin-mc/pumpkin:sha-80e6fce` | Database |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/pumpkin`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pumpkin-minecraft-server-latest)
