# Deploy Homarr [Updated Mar ’26] on Railway

Homarr [Mar ’26] (Customizable Dashboard & App Integrations) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/homarr)

## About

**Homarr** is a free, open-source dashboard and homepage management tool available on [GitHub](https://github.com/ajnart/homarr). It lets you organize and access all your apps, services, and integrations from a single, clean dashboard. Unlike traditional dashboards, Homarr is designed to be lightweight, visually appealing, and extremely customizable. Whether you are a home server enthusiast running **Homarr Docker** or an enterprise experimenting with **Proxmox integration**, Homarr makes managing your digital environment seamless.

With Homarr, you get a central dashboard that integrates with apps like Sonarr, Radarr, Plex, Jellyfin, and more. You can monitor your services, reset your password securely, and deploy it on Docker with just a few commands.

You can **self host Homarr** to take full control of your dashboard, integrations, and customization without depending on third-party platforms. Homarr requires no steep learning curve; thanks to its **Docker support** and **docker-compose setup**, you can have it running in minutes.

When you deploy Homarr on **Railway**, all the heavy lifting—like server setup, scaling, backups, and updates—is automated. You get a **plug-and-play Homarr dashboard**, with complete freedom to integrate all your services while Railway handles infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homarr-labs/homarr | `ghcr.io/homarr-labs/homarr` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HOSTNAME` | 0.0.0.0 |
| `SECRET_ENCRYPTION_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appdata`

**Category:** Other

[View on Railway →](https://railway.com/template/homarr)
