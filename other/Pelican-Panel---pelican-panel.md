# Deploy Pelican Panel on Railway

From prehistoric to peak performance: Pelican takes flight!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pelican-panel)

## About

Pelican Panel is a next-generation, open-source game server management panel. Built as a modern successor to Pterodactyl, it allows users to manage multiple game servers through a sleek, intuitive web interface. It features robust user management, granular permissions, and support for a wide array of game titles.

Hosting Pelican Panel on Railway provides a streamlined environment for running your game management infrastructure. This specific template utilizes a lightweight, self-contained setup leveraging SQLite for database management and the local filesystem for storage. By deploying on Railway, you get a pre-configured web environment with the necessary PHP runtime and system libraries already in place. Once the infrastructure is live, you will simply need to follow the official web-based installation process to finalize your panel setup and start managing your gaming community.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pelican | `ghcr.io/pelican-dev/panel:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BEHIND_PROXY` | true |
| `XDG_DATA_HOME` | /pelican-data |
| `TRUSTED_PROXIES` | 0.0.0.0/0 |

## Configuration

- **Start command:** `/bin/ash -c "chmod -R 755 /pelican-data/* && chown -R www-data:www-data /pelican-data /var/www/html && exec su -s /bin/ash www-data -c '/bin/ash /entrypoint.sh supervisord -n -c /etc/supervisord.conf'"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pelican-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pelican-panel)
