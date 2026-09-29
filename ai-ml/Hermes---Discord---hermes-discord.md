# Deploy Hermes - Discord on Railway

Nous Research's Ai Agent Runtime Discord Supervised Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-discord)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-discord)

### Deploy and Host Hermes Discord Agent on Railway

**Hermes** (Hermes Discord Bot) is an AI agent framework designed to connect large language models to Discord, leveraging OpenRouter for inference and supporting agent caching, memory persistence, and granular user permission controls. This Railway template deploys `hermes-discord` from the `OpenSource-Templates/Hermes` repository, paired with a daily-backed persistent storage volume at `/data`.

---

#### About Hosting Hermes Discord

Hosting Hermes on Railway deploys a single container service that runs the Hermes Discord agent background daemon. It connects to Discord via WebSocket/Gateway using `DISCORD_BOT_TOKEN` and delegates model inference to OpenRouter using `OPENROUTER_API_KEY`. Persistent agent memory, context cache, and state are saved to a dedicated storage volume mounted at `/data` with daily automated backup scheduling enabled.

---

#### Common Use Cases

* **Autonomous Discord AI assistant**: Interact with Hermes LLMs and custom agent workflows directly inside Discord channels or direct messages.
* **OpenRouter model integration**: Access top-tier open-source and proprietary language models (Claude, Llama, Mistral, GPT-4o) via OpenRouter API.
* **Persistent agent memory**: Retain conversation context, agent cache, and user memory across deployments in the `/data` volume.
* **Granular access control**: Restrict bot usage to specific Discord user IDs (`DISCORD_ALLOWED_USERS`) to prevent unauthorized API credit consumption.

---

#### Dependencies for Hermes Discord Hosting

* **Hermes Source:** Repository `OpenSource-Templates/Hermes` (`main` branch)
* **OpenRouter API Key:** API key from [OpenRouter](https://openrouter.ai/keys) (`OPENROUTER_API_KEY`)
* **Discord Bot Token:** Bot token from the [Discord Developer Portal](https://discord.com/developers/applications) (`DISCORD_BOT_TOKEN`)
* **Authorized Discord User ID(s):** Comma-separated Discord User Snowflake IDs (`DISCORD_ALLOWED_USERS`)
* **One persistent volume** mounted at `/data` with daily automated backups

**Upstream:** [GitHub (OpenSource-Templates/Hermes)](https://github.com/OpenSource-Templates/Hermes)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Source Repo** | `OpenSource-Templates/Hermes` (`main`) |
| **Container Image Tag** | Controlled via `HERMES_IMAGE_VERSION` (default `latest`) |
| **Type** | Background Discord Bot / Agent Daemon |
| **Storage / Volume** | `/data` (Daily automated backup schedule) |
| **Primary Auth** | Discord Bot Token + OpenRouter API Key |
| **Access Control** | Discord User ID Whitelist (`DISCORD_ALLOWED_USERS`) |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **hermes-discord** | Discord AI Bot & Agent Daemon | `/data` | No (Outbound Gateway) | Connects to Discord Gateway & OpenRouter API |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **hermes-discord** | `/data` | Agent conversation memory, local vector cache, state files, and workspace context |

> **Warning:** Do **not** remove or detach the `/data` volume — deleting this volume will permanently wipe all stored agent memory, conversation cache, and workspace context during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account).
3. Obtain your **Discord Bot Token**:
   * Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   * Create a **New Application** → Navigate to **Bot**.
   * Click **Reset Token** and copy your token.
   * Enable required **Privileged Gateway Intents** (specifically **Message Content Intent**) under the Bot tab.
   * Under **OAuth2** → **URL Generator**, select `bot` scope and required permissions (Send Messages, Read Message History, Embed Links), then use the generated URL to invite the bot to your Discord server.
4. Obtain your **OpenRouter API Key**:
   * Sign in to [OpenRouter Keys](https://openrouter.ai/keys) and create a new API key.
5. Retrieve your **Discord User ID**:
   * Enable Developer Mode in Discord settings, right-click your profile avatar, and select **Copy User ID**.
6. Fill in the required variables during Railway template deployment:
   * `OPENROUTER_API_KEY`: Your OpenRouter API key.
   * `DISCORD_BOT_TOKEN`: Your Discord bot token.
   * `DISCORD_ALLOWED_USERS`: Your Discord user ID (comma-separated for multiple users).
7. Click **Deploy**.
8. Monitor the deployment logs in Railway to confirm successful connection to Discord and OpenRouter.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `OPENROUTER_API_KEY` | *(Required)* | OpenRouter API key used for LLM inference |
| `DISCORD_BOT_TOKEN` | *(Required)* | Discord bot token from Discord Developer Portal |
| `DISCORD_ALLOWED_USERS` | *(Required)* | Comma-separated Discord User IDs allowed to interact with the bot |
| `HERMES_IMAGE_VERSION` | `latest` | Docker image tag version |
| `AGENT_CACHE_MEMORY_HIGH_MB` | `750` | Optional agent cache memory threshold limit in MB |
| `DISCORD_ALLOW_ALL_USERS` | `""` | Set to `true` to allow any Discord user to query the bot (Not recommended) |
| `DISCORD_HOME_CHANNEL` | `""` | Optional Discord Channel ID for default bot announcements/context |
| `DISCORD_REQUIRE_MENTION` | `""` | Set to `true` to require `@mention` in server channels before responding |

##### Security & Memory Tuning

* **Access Control (`DISCORD_ALLOWED_USERS` vs `DISCORD_ALLOW_ALL_USERS`)**: By default, `DISCORD_ALLOW_ALL_USERS` is left empty. Keep access restricted via `DISCORD_ALLOWED_USERS` to prevent unauthorized users from draining your OpenRouter API credits.
* **Server `@mention` Requirement (`DISCORD_REQUIRE_MENTION`)**: Setting `DISCORD_REQUIRE_MENTION=true` prevents the bot from responding to every message in public Discord channels, ensuring it only triggers when explicitly tagged.
* **Agent Cache Tuning (`AGENT_CACHE_MEMORY_HIGH_MB`)**: Adjust `AGENT_CACHE_MEMORY_HIGH_MB` (default `750`) based on your Railway service plan RAM allocation to prevent memory pressure or out-of-memory container restarts.

---

#### Updating Hermes Discord

1. Open the **hermes-discord** service → **Settings** → **Source**.
2. Trigger a rebuild or update `HERMES_IMAGE_VERSION` variable to a specific release tag.
3. Click **Redeploy**.

All agent state and memory files inside `/data` will remain safe across updates and container restarts.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing Message Content Intent in Discord Portal** — Discord requires the **Message Content Intent** to be explicitly enabled under the **Bot** tab in the Discord Developer Portal. If disabled, the bot will join channels but fail to read incoming messages or prompt triggers.
* **Empty `DISCORD_ALLOWED_USERS` Whitelist** — If `DISCORD_ALLOWED_USERS` is omitted or left blank while `DISCORD_ALLOW_ALL_USERS` is also empty, the bot will reject all incoming commands or ignore user messages.
* **OpenRouter API Credit Exhaustion** — If your OpenRouter key runs out of credits or has rate limits imposed, Hermes will fail to generate responses and log API HTTP errors in Railway deployment logs.
* **Missing `/data` Volume Mount** — If the persistent `/data` volume is detached, agent context, short-term memory, and conversation cache will reset every time Railway redeploys the container.

---

#### Why Deploy Hermes Discord on Railway?

Railway provides automated background worker execution with persistent storage backups and zero local server management. Hosting Hermes on Railway gives your Discord community or personal workspace an always-on, responsive AI agent with automatic daily volume backups and instant deployment controls.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [OpenSource-Templates/Hermes](https://github.com/OpenSource-Templates/Hermes) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot token used to connect the application to your Discord bot. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key used to authenticate requests to AI models through OpenRouter. |
| `DISCORD_HOME_CHANNEL` | - | Discord channel ID used as the bot's home or default channel. |
| `HERMES_IMAGE_VERSION` | latest | Version tag of the Hermes container image to use. "latest" uses the most recent available image. |
| `DISCORD_ALLOWED_USERS` | - | Comma-separated list of Discord user IDs allowed to interact with the bot. |
| `DISCORD_ALLOW_ALL_USERS` | - | Controls whether all Discord users are allowed to interact with the bot. Set to true or false. |
| `DISCORD_REQUIRE_MENTION` | - | Controls whether users must mention the bot before it responds. Set to true or false. |
| `AGENT_CACHE_MEMORY_HIGH_MB` | 750 | Memory threshold in MB at which the agent cache considers memory usage high. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/hermes-discord)
