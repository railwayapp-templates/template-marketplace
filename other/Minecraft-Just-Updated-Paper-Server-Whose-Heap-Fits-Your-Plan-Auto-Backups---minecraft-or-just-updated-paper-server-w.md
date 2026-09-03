# Deploy Minecraft | (Just Updated) Paper Server Whose Heap Fits Your Plan, Auto Backups on Railway

Paper server whose heap fits your plan, plus rotating world backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-or-just-updated-paper-server-w)

## About

A Paper Minecraft server (Minecraft 26.2) on one service and one volume, reachable over a Railway
TCP proxy. Paper is the high-performance Spigot/Bukkit-compatible server, so plugins work and the
tick loop is faster than vanilla.

Two things a hosted Minecraft server actually has to do, which this template does and the
alternatives do not: **the JVM heap is sized to the plan you deployed on, and your world is backed
up on a schedule.**

A Minecraft server is a long-lived Java process whose memory ceiling is set at launch and cannot be
changed afterwards. That makes `MAX_MEMORY` the single most consequential setting on the deploy, and
it is the one that is usually wrong: a container reports the *host's* total memory, not its own
limit, so a fixed value baked into a template is either far larger than the container can supply —
in which case the JVM grows into it and the container is killed — or so small that the server stalls
on garbage collection.

This template reads the container's own cgroup memory limit at boot, reserves a share of it for the
JVM's off-heap footprint (metaspace, thread stacks, the operating system) and gives the rest to the
heap. Setting `MAX_MEMORY` yourself turns the sizing off, so tuning is still available.

The second problem is durability. A Minecraft world is a live-mutating set of region files; copying
them while the server is writing produces an archive that may not load. The backup here goes through
RCON — `save-off`, `save-all flush`, archive, `save-on` — so what lands in `/data/backups` is a
consistent snapshot, taken on a schedule and rotated.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minecraft | `ghcr.io/bon5co/minecraft-railway@sha256:227b4d2a147e5674cca5727ad8589b1eea86aa3eb2a4c9363c81bf9484ee9e12` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RCON_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-or-just-updated-paper-server-w)
