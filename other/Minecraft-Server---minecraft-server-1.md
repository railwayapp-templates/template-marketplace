# Deploy Minecraft Server on Railway

Paper Minecraft server with web console and plugins for friends

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-server-1)

## About

Run a private Paper Minecraft Java server for friends without managing a VPS. Crafty Controller gives you a browser console, file manager, players, schedules, backups, and server settings. Caddy publishes that panel safely through Railway, while Railway gives the game its own TCP address.

This template deploys two pinned services: **Crafty Controller** runs the panel and your Paper server, and **Caddy** publishes the panel on a public web address. The Minecraft world, server files, Crafty settings, and backups are stored on the **Crafty Controller** service's persistent Railway volume.

The **Caddy** service's URL is the management console, not the address players enter in Minecraft. Players use the separate TCP Proxy address on the **Crafty Controller** service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy | `caddy:2.11.4-alpine` | Web service |
| Crafty Controller | `arcadiatechnology/crafty-4:4.10.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Caddy | 8080 | Port Caddy listens on; matches the Caddy service's public HTTP proxy. |
| `CRAFTY_HOST` | Caddy | - | Private hostname of the Crafty Controller service; Caddy proxies the panel to it over Railway's private network. |
| `TZ` | Crafty Controller | Etc/UTC | Optional IANA timezone for panel and Minecraft server timestamps. |
| `CRAFTY_ADMIN_PASSWORD` | Crafty Controller | (secret) | Generated panel password. Sign in as admin; copy this value from the Crafty Controller service's Variables tab. |

## Configuration

- **Start command:** `/bin/sh -c 'printf "%s\n" ":${PORT} {" "  reverse_proxy https://${CRAFTY_HOST}:8443 {" "    header_up Host {http.request.host}" "    transport http {" "      tls_insecure_skip_verify" "    }" "  }" "}" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'set -eu; cd /; mv /crafty /image-crafty; root=/data/root2; hold=/data/.crafty-state; mkdir -p "$hold"; if [ -d "$root/app/config" ] && [ ! -e "$hold/config" ]; then mv "$root/app/config" "$hold/config"; fi; for d in backups logs servers import; do if [ -d "$root/$d" ] && [ ! -e "$hold/$d" ]; then mv "$root/$d" "$hold/$d"; fi; done; rm -rf "$root"; mkdir "$root"; cp -aL /image-crafty/. "$root/"; seeded=0; rm -rf "$root/app/config"; if [ -d "$hold/config" ]; then mv "$hold/config" "$root/app/config"; else cp -a "$root/app/config_original" "$root/app/config"; rm -f "$root/app/config/default.json"; umask 077; printf '"'"'{"username":"admin","password":"%s"}\n'"'"' "$CRAFTY_ADMIN_PASSWORD" > "$root/app/config/default.json"; chown crafty:root "$root/app/config/default.json"; seeded=1; fi; for d in backups logs servers import; do rm -rf "$root/$d"; if [ -d "$hold/$d" ]; then mv "$hold/$d" "$root/$d"; else mkdir "$root/$d"; chown crafty:root "$root/$d"; chmod g+rwx "$root/$d"; fi; done; image_hash=$(sha256sum /image-crafty/main.py | cut -d " " -f1); runtime_hash=$(sha256sum "$root/main.py" | cut -d " " -f1); [ "$image_hash" = "$runtime_hash" ]; printf "Image refresh verified: main.py sha256=%s\n" "$runtime_hash"; if [ "$seeded" = 1 ]; then (while [ ! -s "$root/app/config/default-creds.txt" ]; do sleep 1; done; rm -f "$root/app/config/default.json" "$root/app/config/default-creds.txt"; [ ! -e "$root/app/config/default.json" ]; printf "Credential seed removed after admin creation\n") & else [ ! -e "$root/app/config/default.json" ]; printf "Credential seed absent: persisted admin state reused\n"; fi; ln -s "$root" /crafty; cd /crafty; exec ./docker_launcher.sh -d -i'`
- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/minecraft-server-1)
