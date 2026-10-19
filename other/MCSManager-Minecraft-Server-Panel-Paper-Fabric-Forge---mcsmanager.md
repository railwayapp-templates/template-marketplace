# Deploy MCSManager | Minecraft Server Panel (Paper, Fabric, Forge) on Railway

Minecraft server panel: one-click Paper, Fabric, Forge; web console, files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcsmanager)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/mcsmanager?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=mcsmanager)

[MCSManager](https://mcsmanager.com/) is a popular open-source web panel for game servers, used by many Minecraft server owners, especially in China. This template runs the panel and its daemon in one Railway service. You install Paper, Purpur, Fabric, Forge or NeoForge from its app market, then run them from the browser: live console, file manager, scheduled tasks, and user accounts with their own permissions.

It's one service, a Railway volume, and a TCP proxy for players.

- **Locked down from the start.** Normally, whoever opens a new MCSManager panel first gets to create the admin. Here, the `admin` account is created during the first boot with the password from your variables, before the panel is reachable.
- **Panel and daemon together.** The daemon that runs your game servers lives in the same container and is already connected as the node "Railway". The console and file uploads go through your Railway domain.
- **Java 25 and Java 21 built in.** Java 25 runs Minecraft 26.x and 1.21.x. Older modpacks can get another Java from the panel's Java Manager.
- **Survives redeploys.** Instances, worlds and panel settings live on the volume. On a redeploy the daemon stops every server cleanly so worlds are saved.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MCSManager | [two-workspaces/mcsmanager](https://github.com/two-workspaces/mcsmanager) (root: /) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the panel listens on behind the Railway domain - leave as is |
| `MCSM_LANGUAGE` | en_us | Panel language on first boot: en_us, zh_cn, zh_tw, ja_jp, ko_kr, de_de, fr_fr, es_es, pt_br, ru_ru, th_th, tr_tr - change it later in Settings |
| `MCSM_ADMIN_PASSWORD` | (secret) | Password for the panel's 'admin' login, set on first boot only (9-36 chars with a-z, A-Z and 0-9) - change it in the panel afterwards |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mcsmanager)
