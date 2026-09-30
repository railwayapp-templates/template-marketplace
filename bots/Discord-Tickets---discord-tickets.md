# Deploy Discord Tickets on Railway

Discord Bot for Creating and Managing Support Ticket Channels.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-tickets)

## About

### Deploy and Host Discord Tickets on Railway

**Discord Tickets** (by eartharoid) is a highly customizable, open-source Discord bot for managing support tickets within your Discord server. This Railway template deploys a two-tier architecture featuring the **Discord Tickets Application** (`tickets-app`) paired with a dedicated **MySQL 8 Database** (`tickets-mysql`) for persistent data storage.

---

#### About Hosting Discord Tickets

Hosting Discord Tickets on Railway deploys a multi-container stack:

* **Discord Tickets App (`tickets-app`)**: The core application and Discord bot daemon powered by `eartharoid/discord-tickets:4.0.21`. It handles Discord slash commands, ticket creation UI, webhooks, dashboard requests, and ticket transcripts. It listens on port `8169`, connects to MySQL via Railway's private network, and mounts a persistent volume at `/home/container/user`.
* **MySQL Database (`tickets-mysql`)**: Dedicated database container using official `mysql:8`. It stores server configurations, ticket categories, transcripts, user permissions, and panel settings, mounting a persistent volume at `/var/lib/mysql`.

---

#### Common Use Cases

* **Discord Server Support Systems**: Allow community members to open private support tickets with staff via interactive Discord buttons and select menus.
* **HTML Ticket Transcripts**: Generate and host web-based HTML transcripts of closed support tickets for auditing and record-keeping.
* **Custom Staff Role Routing**: Automatically route support tickets to specific staff roles or departments based on category selection.
* **Multi-Guild & Custom Bot Management**: Host a fully self-hosted, unbranded support bot under your own custom Discord bot application.

---

#### Dependencies for Discord Tickets Hosting

* **Discord Tickets image:** `eartharoid/discord-tickets:4.0.21`
* **MySQL image:** `mysql:8`
* **Two persistent volumes**:
  * `/home/container/user` on `tickets-app` (custom plugins, assets, and local configuration)
  * `/var/lib/mysql` on `tickets-mysql` (MySQL database storage)
* **Discord Bot Credentials**: `DISCORD_TOKEN` and `DISCORD_SECRET` created in the Discord Developer Portal
* **Super Admin User ID**: `SUPER` set to your Discord User Snowflake ID
* **Auto-generated secrets**: Encryption key (`ENCRYPTION_KEY`) and MySQL passwords

**Upstream:** [Discord Tickets Documentation](https://tickets.eartharoid.me) · [GitHub (eartharoid/discord-tickets)](https://github.com/eartharoid/discord-tickets) · [Docker Hub](https://hub.docker.com/r/eartharoid/discord-tickets)

##### Implementation Details

| Service | Image | Role | Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **tickets-app** | `eartharoid/discord-tickets:4.0.21` | Support Bot & Web Dashboard | `8169` | `/home/container/user` |
| **tickets-mysql** | `mysql:8` | Relational Database Backend | `3306` | `/var/lib/mysql` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **tickets-app** | Discord Support Bot & Web UI | `/home/container/user` | Yes (Port `8169`) | Outbound Discord Gateway + Web UI/Transcripts |
| **tickets-mysql** | MySQL Database | `/var/lib/mysql` | TCP Proxy (Port `3306`) | Private connection via `${{tickets-mysql.RAILWAY_PRIVATE_DOMAIN}}` |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **tickets-app** | `/home/container/user` | Application settings, custom assets, uploads, and local plugin/data storage |
| **tickets-mysql** | `/var/lib/mysql` | MySQL database state, table indexes, tickets, and user permissions |

> **Warning:** Do **not** remove or detach the volume mounts on either service. Deleting `/var/lib/mysql` will permanently wipe all ticket records, while deleting `/home/container/user` resets application state.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account).
3. Create a Discord Application & Bot:
   * Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   * Click **New Application**, name it (e.g. `Support Tickets`), and copy the **Client Secret** (`DISCORD_SECRET`).
   * Navigate to the **Bot** tab, click **Reset Token**, and copy the Bot Token (`DISCORD_TOKEN`).
   * Enable required **Privileged Gateway Intents** (specifically **Server Members Intent** and **Message Content Intent**).
   * Under **OAuth2** → **URL Generator**, select `bot` and `applications.commands` scopes, select Administrator or required permissions, and invite the bot to your Discord server.
4. Retrieve your **Discord User ID**:
   * Enable Developer Mode in Discord settings, right-click your profile picture, and click **Copy User ID**.
5. Fill in the required variables during deployment:
   * `DISCORD_TOKEN`: Your Discord Bot Token.
   * `DISCORD_SECRET`: Your Discord OAuth2 Client Secret.
   * `SUPER`: Your Discord User ID.
6. Click **Deploy**.
7. Once deployed, click the public domain URL generated for `tickets-app` to access your Discord Tickets dashboard and transcript server.

---

#### Configuration

##### Discord Tickets Variables (`tickets-app`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `DISCORD_TOKEN` | *(Required)* | Discord Bot Token from Discord Developer Portal |
| `DISCORD_SECRET` | *(Required)* | Discord OAuth2 Application Client Secret |
| `SUPER` | `YOUR_DISCORD_USER_ID` | Discord User ID granted Super Admin rights over the bot |
| `DB_PROVIDER` | `mysql` | Database driver identifier |
| `DB_CONNECTION_URL` | Auto-configured MySQL URL | Private connection string to `tickets-mysql` |
| `ENCRYPTION_KEY` | Auto-generated (48 chars) | Key used for encrypting sensitive data |
| `HTTP_EXTERNAL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | External URL used for web dashboards and ticket transcript links |
| `HTTP_HOST` | `0.0.0.0` | Bind IP host inside the container |
| `HTTP_PORT` | `8169` | Port used for the internal HTTP web server |
| `HTTP_TRUST_PROXY` | `true` | Set to `true` to trust Railway reverse proxy headers |
| `PUBLIC_BOT` | `false` | Whether to allow other servers to invite/use the bot |
| `PUBLISH_COMMANDS` | `true` | Automatically registers global Discord slash commands on startup |
| `PORT` | `8169` | Railway HTTP routing target port |

##### MySQL Variables (`tickets-mysql`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MYSQL_DATABASE` | `tickets` | Name of default MySQL database |
| `MYSQL_USER` | `tickets` | Database application username |
| `MYSQL_PASSWORD` | Auto-generated secret (32 chars) | Application user password |
| `MYSQL_ROOT_PASSWORD` | Auto-generated secret (32 chars) | Root administrative database password |
| `DATABASE_URL` | MySQL connection string | Internal private network connection URL |

---

#### Custom Domain

1. Open the **tickets-app** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Update the `HTTP_EXTERNAL` environment variable to match your custom domain URL (e.g. `https://tickets.yourdomain.com`).
4. Railway provisions TLS automatically.

---

#### Updating Discord Tickets

1. Open the **tickets-app** service → **Settings** → **Source**.
2. Update the image tag (e.g., `eartharoid/discord-tickets:4.0.21` to a newer tag).
3. Click **Redeploy**.

All database records in `tickets-mysql` and user configuration files in `/home/container/user` remain secure across redeployments.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing Gateway Intents** — Discord Tickets requires **Server Members Intent** and **Message Content Intent** to be enabled under the Bot tab in the Discord Developer Portal. If disabled, slash commands or member lookups will fail.
* **Unchanged `SUPER` Variable** — Forgetting to replace `YOUR_DISCORD_USER_ID` with your actual numeric Discord User ID will prevent you from accessing administrative bot commands or web dashboard controls.
* **`HTTP_EXTERNAL` Domain Mismatch** — Ensure `HTTP_EXTERNAL` matches your Railway public domain or custom domain. Mismatched URLs will result in broken ticket transcript links or failed OAuth authentication.
* **Database Startup Delay** — On cold boots, `tickets-app` may attempt to connect before MySQL has completed initialization. Railway automatically restarts `tickets-app` until MySQL is healthy.
* **Missing Volume Mounts** — Detaching `/var/lib/mysql` or `/home/container/user` will result in permanent loss of support tickets, transcripts, and custom settings.

---

#### Why Deploy Discord Tickets on Railway?

Railway provides private inter-service networking, persistent volume mounts, automated HTTPS certificate management, and continuous uptime. Deploying Discord Tickets on Railway delivers an enterprise-grade support ticket infrastructure for your Discord server with zero local maintenance.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tickets-mysql | `mysql:8` | Database |
| tickets-app | `eartharoid/discord-tickets:4.0.21` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_HOST` | tickets-mysql | - | Private hostname used to connect to MySQL over Railway's private network. |
| `MYSQL_PORT` | tickets-mysql | 3306 | Default port MySQL listens on. |
| `MYSQL_USER` | tickets-mysql | (secret) | MySQL user account used by the application to access the database. |
| `DATABASE_URL` | tickets-mysql | - | Internal MySQL connection URL for services within Railway. |
| `MYSQL_DATABASE` | tickets-mysql | tickets | Name of the MySQL database used by the application. |
| `MYSQL_PASSWORD` | tickets-mysql | (secret) | Randomly generated 32-character password used to secure the MySQL application user. |
| `DATABASE_PUBLIC_URL` | tickets-mysql | - | Public MySQL connection URL using Railway's TCP proxy. |
| `MYSQL_ROOT_PASSWORD` | tickets-mysql | (secret) | Randomly generated 32-character password used to secure the MySQL root administrator account. |
| `PORT` | tickets-app | 8169 | Port the application server listens on. |
| `SUPER` | tickets-app | YOUR_DISCORD_USER_ID | Discord user ID granted super-administrator privileges. Replace with your Discord user ID. |
| `HTTP_HOST` | tickets-app | 0.0.0.0 | Binds the HTTP server to all network interfaces so it can accept incoming connections. |
| `HTTP_PORT` | tickets-app | 8169 | Port the application's HTTP server listens on. |
| `PUBLIC_BOT` | tickets-app | false | Controls whether the Discord bot is publicly accessible. Set to true to allow public access. |
| `DB_PROVIDER` | tickets-app | mysql | Specifies MySQL as the database provider. |
| `DISCORD_TOKEN` | tickets-app | (secret) | Discord bot token used to authenticate and connect the application to Discord. |
| `HTTP_EXTERNAL` | tickets-app | - | Public HTTPS URL used to access the application. |
| `DISCORD_SECRET` | tickets-app | (secret) | Secret used by the application for Discord authentication or integration. |
| `ENCRYPTION_KEY` | tickets-app | - | Randomly generated 48-character key used to encrypt sensitive application data. |
| `HTTP_TRUST_PROXY` | tickets-app | true | Enables trust for requests forwarded through a reverse proxy such as Railway. |
| `PUBLISH_COMMANDS` | tickets-app | true | Enables publishing or registering the bot's Discord commands. |
| `DB_CONNECTION_URL` | tickets-app | - | MySQL connection URL used by the application to connect to the tickets-mysql service over Railway's private network. |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/container/user`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/discord-tickets)
