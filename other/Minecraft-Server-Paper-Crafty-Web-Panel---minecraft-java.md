# Deploy Minecraft Server | Paper + Crafty Web Panel on Railway

Paper server with Crafty web panel: join in minutes, nightly backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-java)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/minecraft-java?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=minecraft-java)

A Minecraft Java Edition server your friends can join a few minutes after you click deploy, run from a web panel instead of a terminal. The server is [Paper](https://papermc.io/), the fast, plugin-ready fork of the vanilla server. The panel is [Crafty Controller](https://craftycontrol.com/), where you get the live console, a file manager, players, backups and schedules in your browser.

It's one service, a Railway volume, and a TCP proxy for players.

- **Ready to join.** On first boot the template creates a Paper server on the newest release, points it at Railway's TCP proxy, and starts it. The memory it gets is sized to your plan.
- **Run it from the browser.** Use Crafty's panel for the console, config and file editing, plugin uploads, scheduled restarts and commands, and extra admin accounts with their own permissions.
- **Nightly backups.** At 04:00 UTC Crafty zips the server and keeps the last 3. Files Paper downloads again anyway are skipped, so a fresh world backs up in about 70 MB.
- **Survives redeploys.** On a redeploy Crafty saves the world and stops the server cleanly, then starts it again. Crash detection restarts it if it ever dies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Minecraft | [nomideusz/minecraft-crafty-railway](https://github.com/nomideusz/minecraft-crafty-railway) (root: /) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EULA` | - | Type TRUE to accept the Minecraft EULA (https://aka.ms/MinecraftEULA) - the server is created once you do |
| `PORT` | 8080 | Port the panel listens on behind the Railway domain - leave as is |
| `CRAFTY_ADMIN_PASSWORD` | (secret) | Password for the panel's 'admin' login, set on first boot only - change it in Crafty afterwards |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/minecraft-java)
