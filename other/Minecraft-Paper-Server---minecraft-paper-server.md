# Deploy Minecraft Paper Server on Railway

Paper Minecraft server with persistent worlds. EULA acceptance required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-paper-server)

## About

A single Paper Java Edition server with a pinned runtime and Paper build, a persistent `/data` volume, and public TCP access. There is no web dashboard or HTTP endpoint.

This configuration uses Paper 26.2 build 121 on Java 25 through `itzg/minecraft-server:2026.9.0-java25`, pinned by digest. The initial and maximum JVM heap are 2G. Heap is not total container RAM: allow additional JVM/native overhead and measure your workload before adding plugins or players.

### Required EULA choice and connection

1. Read the [Minecraft EULA](https://aka.ms/MinecraftEULA). Set required `EULA=TRUE` yourself **only if you accept it**. There is intentionally no default acceptance.
2. Deploy with `/data` attached before startup and sufficient memory above the heap limit.
3. Wait for `Done (` in application logs; first boot downloads Paper and generates the world. Railway `SUCCESS` alone is not Minecraft protocol readiness.
4. In the Paper service's TCP Proxy settings, copy its actual `host:external-port`. Container port 25565 is not necessarily the assigned external port.
5. Use a compatible Minecraft Java Edition client: Multiplayer → Direct Connection. Verify a protocol status/ping response and real player connection before inviting others.

Online mode is enabled, so players need legitimate Java Edition accounts. Online authentication is not a whitelist. Configure a whitelist before sharing a private server's address. The exact configuration passed a Minecraft status and matching ping/pong exchange (Paper 26.2, protocol 776). Player authentication and world persistence across restart remain unverified; protocol readiness is not a full gameplay or persistence test.

### Gameplay and operation defaults

- `TYPE=PAPER`, `VERSION=26.2`, `PAPER_BUILD=121`.
- `INIT_MEMORY=2G`, `MAX_MEMORY=2G`, `USE_AIKAR_FLAGS=TRUE`.
- Survival mode, normal difficulty, maximum 20 players, view distance 8, simulation distance 6, and MOTD `Paper on Railway`. The player limit is a setting, not a tested capacity guarantee.
- `ONLINE_MODE=TRUE`; `ENABLE_RCON=FALSE`. There is no public remote-administration port or generated admin login.
- `PAUSE_WHEN_EMPTY_SECONDS=60` uses native empty-server ticking pause. Legacy itzg process-freeze autopause is disabled. The JVM remains resident: idle pause does not release the heap or eliminate memory charges.
- `MAX_TICK_TIME=60000`; environment-managed server properties are overwritten at startup. Change the corresponding environment variables rather than only editing `server.properties`.

### Worlds, plugins and backups

Worlds, plugins, logs and configuration belong under `/data`. Keep one server writer and avoid overlapping deployments against the same world. Back up and test restore before upgrades or plugin changes. Before relying on persistence, create a unique world/file marker, restart, and read back the same content. A volume or listening socket alone is insufficient.

Manage files through Railway's authenticated access mechanisms, which require your own authorized account/key; this is not a public SSH daemon. If enabling RCON later, supply a strong secret and keep port 25575 private.

Startup can download Paper YAML defaults from the mutable `Shonz1/minecraft-default-configs` repository. Runtime and jar pins do not pin that additional dependency. Review downloaded settings and upstream changes before use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paper | `itzg/minecraft-server:2026.9.0-java25@sha256:4e29d14082d94748f945edad3ee5307b97adc730fec49860199f5e52218a9ae3` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | - |
| `EULA` | - | Required personal choice: read https://aka.ms/MinecraftEULA and set TRUE only if you accept. No default acceptance. |
| `MODE` | survival | - |
| `MOTD` | Paper on Railway | - |
| `TYPE` | PAPER | - |
| `VERSION` | 26.2 | - |
| `DIFFICULTY` | normal | - |
| `MAX_MEMORY` | 2G | - |
| `ENABLE_RCON` | FALSE | - |
| `INIT_MEMORY` | 2G | - |
| `MAX_PLAYERS` | 20 | - |
| `ONLINE_MODE` | TRUE | - |
| `PAPER_BUILD` | 121 | - |
| `MAX_TICK_TIME` | 60000 | - |
| `VIEW_DISTANCE` | 8 | - |
| `USE_AIKAR_FLAGS` | TRUE | - |
| `ENABLE_AUTOPAUSE` | FALSE | - |
| `SIMULATION_DISTANCE` | 6 | - |
| `PAUSE_WHEN_EMPTY_SECONDS` | 60 | - |
| `OVERRIDE_SERVER_PROPERTIES` | TRUE | - |
| `STOP_SERVER_ANNOUNCE_DELAY` | 0 | - |

## Configuration

- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-paper-server)
