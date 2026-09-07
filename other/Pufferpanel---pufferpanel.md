# Deploy Pufferpanel on Railway

Game server panel for Minecraft, Steam games and 40+ community templates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pufferpanel)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/pufferpanel)

PufferPanel — open-source game server management panel. Manage Minecraft, CS2, Valheim, and 50+ other game servers from a clean web UI with per-server users, file manager, console, stats, and SFTP access.

This template deploys a single service running PufferPanel v3 (panel + daemon in one process) with SQLite at `/var/lib/pufferpanel/database.db` on a persistent Railway volume — no companion database needed. The admin account is created automatically on first boot; log in with the credentials from your Variables tab.

Because Railway doesn't grant `CAP_SYS_ADMIN`, game servers run as **direct host processes** under the panel (upstream `disableUnshare` mode) rather than in Docker sandboxes. The "docker" environment option is intentionally disabled; choose "host"-style server definitions when adding servers. Game servers also need their listen ports reachable from players. Railway exposes only HTTP/HTTPS domains and TCP proxies to the public internet — **inbound UDP is not supported** (enabling static outbound IPs does not change this; those addresses are egress-only). TCP-native games (e.g., Minecraft Java, Terraria) work via Railway TCP proxies; UDP-based games (7 Days to Die, Valheim, CS2) are only joinable from the private network, not by external players. This panel is therefore best suited for panel management, file/console/SFTP administration, and TCP-reachable game servers.

**Playing UDP games externally (optional playit.gg tunnel):** set the `PLAYIT_SECRET` variable to your agent secret from [playit.gg](https://playit.gg) and the container automatically starts the playit agent, which opens an *outbound* tunnel — no inbound ports needed. In the playit dashboard, create port mappings for your game servers (e.g., `127.0.0.1:2456` UDP for Valheim, `127.0.0.1:26900` UDP for 7DTD, `127.0.0.1:7777` UDP for ARK) and share the generated `*.playit.gg` address with players instead of the Railway domain. Leave `PLAYIT_SECRET` empty if you only host TCP games.

> **Note:** Railway's HTTP proxy handles SSL termination for the panel UI. The SFTP daemon (port 5657) requires a Railway TCP proxy if you want external SFTP access.

**First-run setup: none.** The entrypoint runs the database migration and creates the admin account automatically:

- **Username:** `admin` (default)
- **Password:** auto-generated via `${{secret(16)}}` — copy it from the service **Variables** tab after deploy

Change the admin password from the panel settings after your first login.

Key environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `ADMIN_USERNAME` | `admin` | Admin username (min 5 chars) |
| `ADMIN_PASSWORD` | `${{secret(16)}}` | Admin password — see Variables tab |
| `ADMIN_EMAIL` | `admin@example.com` | Placeholder email (no SMTP configured) |
| `PUFFER_PANEL_REGISTRATIONENABLED` | `false` | Public self-registration toggle |

Railway-injected (no action needed): `PORT` (panel web listen port), `RAILWAY_PUBLIC_DOMAIN` (used as the panel's master URL).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PufferPanel | [INAPP-Mobile/pufferpanel](https://github.com/INAPP-Mobile/pufferpanel) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PLAYIT_SECRET` | (secret) |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pufferpanel`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pufferpanel)
