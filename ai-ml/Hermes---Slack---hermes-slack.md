# Deploy Hermes - Slack on Railway

Nous Research's Ai Agent Runtime Slack Supervised Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-slack)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-slack)

### Deploy and Host Hermes Slack Agent on Railway

**Hermes** (Hermes Slack Bot) is an AI agent framework designed to connect large language models to Slack via Socket Mode, leveraging OpenRouter for model inference while offering agent caching, memory persistence, and granular user authorization controls. This Railway template deploys `hermes-slack` from the `OpenSource-Templates/Hermes` repository, paired with a daily-backed persistent storage volume at `/data`.

---

#### About Hosting Hermes Slack

Hosting Hermes Slack on Railway deploys a single container background worker that runs the Hermes agent. It connects to Slack using Socket Mode via `SLACK_APP_TOKEN` and `SLACK_BOT_TOKEN`, requiring no public inbound webhooks or port exposure. AI model inference is delegated to OpenRouter via `OPENROUTER_API_KEY`. Persistent agent memory, context cache, and state files are safely saved to a dedicated volume mounted at `/data` with automated daily backups enabled.

---

#### Common Use Cases

* **Autonomous Slack AI assistant**: Interact with LLMs and custom agent workflows directly inside Slack channels, user threads, or direct messages.
* **OpenRouter model access**: Route prompts to a wide range of state-of-the-art open and proprietary models (Claude 3.5, Llama 3, GPT-4o, Mistral) using OpenRouter API keys.
* **Persistent agent memory**: Maintain conversation context, long-term memory, and local vector workspace state across container updates inside `/data`.
* **Private Socket Mode deployment**: Connect securely to Slack using Socket Mode without needing inbound open firewall ports or external webhooks.
* **Granular team permissions**: Restrict AI bot usage to specific Slack user IDs (`SLACK_ALLOWED_USERS`) to manage access and control API budget usage.

---

#### Dependencies for Hermes Slack Hosting

* **Hermes Source:** Repository `OpenSource-Templates/Hermes` (`main` branch)
* **OpenRouter API Key:** API token from [OpenRouter](https://openrouter.ai/keys) (`OPENROUTER_API_KEY`)
* **Slack Bot User OAuth Token:** Token starting with `xoxb-` from the [Slack App Directory](https://api.slack.com/apps) (`SLACK_BOT_TOKEN`)
* **Slack App-Level Token:** Socket Mode token starting with `xapp-` with `connections:write` scope (`SLACK_APP_TOKEN`)
* **Authorized Slack User ID(s):** Comma-separated Slack member IDs (`SLACK_ALLOWED_USERS`)
* **One persistent volume** mounted at `/data` with daily automated backups

**Upstream:** [GitHub (OpenSource-Templates/Hermes)](https://github.com/OpenSource-Templates/Hermes)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Source Repo** | `OpenSource-Templates/Hermes` (`main`) |
| **Container Image Tag** | Controlled via `HERMES_IMAGE_VERSION` (default `latest`) |
| **Type** | Background Slack Bot / Socket Mode Worker |
| **Storage / Volume** | `/data` (Daily automated backup schedule) |
| **Primary Auth** | Slack Bot Token (`xoxb-`), App Token (`xapp-`), OpenRouter API Key |
| **Access Control** | Slack Member ID Whitelist (`SLACK_ALLOWED_USERS`) |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **hermes-slack** | Slack AI Bot & Agent Worker | `/data` | No (Socket Mode) | Outbound Socket Mode to Slack & OpenRouter API |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **hermes-slack** | `/data` | Agent conversation memory, local vector cache, state files, and workspace context |

> **Warning:** Do **not** remove or detach the `/data` volume — deleting this volume will permanently wipe all stored agent memory, conversation cache, and workspace context during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account).
3. Create and configure your **Slack App**:
   * Go to [api.slack.com/apps](https://api.slack.com/apps) and click **Create New App** → **From scratch**.
   * Enable **Socket Mode** under *Settings* → *Socket Mode*. Generate an **App-Level Token** named `hermes-socket` with the `connections:write` scope, and copy the `xapp-...` token string (`SLACK_APP_TOKEN`).
   * Navigate to *Features* → *OAuth & Permissions* and add the following **Bot Token Scopes**:
     * `app_mentions:read`
     * `chat:write`
     * `channels:history`, `groups:history`, `im:history`, `mpim:history`
     * `im:read`, `im:write`
   * Under *Features* → *Event Subscriptions*, toggle **Enable Events** ON, and subscribe to bot events: `app_mention`, `message.im`, `message.channels`.
   * Click **Install to Workspace** at the top of *OAuth & Permissions* and copy the generated **Bot User OAuth Token** starting with `xoxb-...` (`SLACK_BOT_TOKEN`).
4. Obtain your **OpenRouter API Key**:
   * Sign in to [OpenRouter Keys](https://openrouter.ai/keys) and create a new API key.
5. Retrieve your **Slack Member ID**:
   * In Slack, click your profile picture → **View profile** → Click **More (...)** → **Copy member ID** (e.g., `U12345678`).
6. Fill in the required variables during Railway template deployment:
   * `OPENROUTER_API_KEY`: Your OpenRouter API key.
   * `SLACK_BOT_TOKEN`: Your Slack bot user OAuth token (`xoxb-...`).
   * `SLACK_APP_TOKEN`: Your Slack app-level Socket Mode token (`xapp-...`).
   * `SLACK_ALLOWED_USERS`: Your Slack member ID (comma-separated for multiple users).
7. Click **Deploy**.
8. Monitor the deployment logs in Railway to confirm successful connection to Slack Socket Mode and OpenRouter.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `OPENROUTER_API_KEY` | *(Required)* | OpenRouter API key used for LLM inference |
| `SLACK_BOT_TOKEN` | *(Required)* | Slack Bot User OAuth token (`xoxb-...`) |
| `SLACK_APP_TOKEN` | *(Required)* | Slack App-Level Socket Mode token (`xapp-...`) |
| `SLACK_ALLOWED_USERS` | *(Required)* | Comma-separated Slack member IDs allowed to interact with the bot |
| `HERMES_IMAGE_VERSION` | `latest` | Docker image tag version |
| `AGENT_CACHE_MEMORY_HIGH_MB` | `750` | Optional agent cache memory threshold limit in MB |
| `SLACK_ALLOW_ALL_USERS` | `""` | Set to `true` to allow any Slack user to query the bot (Not recommended) |
| `SLACK_HOME_CHANNEL` | `""` | Optional default Slack channel ID for bot context or status announcements |
| `SLACK_HOME_CHANNEL_NAME` | `""` | Optional default Slack channel name |

##### Security & Memory Tuning

* **Access Control (`SLACK_ALLOWED_USERS` vs `SLACK_ALLOW_ALL_USERS`)**: By default, `SLACK_ALLOW_ALL_USERS` is left empty. Keep access restricted via `SLACK_ALLOWED_USERS` to prevent unauthorized workspace members from exhausting your OpenRouter API credits.
* **Socket Mode Privacy**: Because Hermes uses Socket Mode (`SLACK_APP_TOKEN`), the bot establishes an outbound WebSocket connection to Slack. No public URL, domain routing, or open HTTP ports are required on Railway.
* **Agent Memory Threshold (`AGENT_CACHE_MEMORY_HIGH_MB`)**: Tune `AGENT_CACHE_MEMORY_HIGH_MB` (default `750`) according to your Railway service container RAM tier to ensure smooth context caching without hitting OOM limits.

---

#### Updating Hermes Slack

1. Open the **hermes-slack** service → **Settings** → **Source**.
2. Trigger a rebuild or update `HERMES_IMAGE_VERSION` variable to a specific release tag.
3. Click **Redeploy**.

All agent state, workspace context, and memory files inside `/data` remain safe across container restarts and updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Socket Mode Disabled or Missing `connections:write` Scope** — If Socket Mode is not enabled in your Slack App settings or the `xapp-...` token lacks `connections:write`, Hermes will fail to establish a WebSocket connection and crash on boot.
* **Missing Bot OAuth Scopes** — If mandatory scopes like `chat:write` or `app_mentions:read` are missing from your Slack app configuration, the bot won't receive message events or won't be able to send chat replies back into channels.
* **Empty `SLACK_ALLOWED_USERS` Whitelist** — If `SLACK_ALLOWED_USERS` is left empty while `SLACK_ALLOW_ALL_USERS` is also unconfigured, the bot will silently ignore or reject incoming messages.
* **Uninvited Bot in Channels** — For public/private channels (other than Direct Messages), remember to invite the bot to the channel (`/invite @Hermes`) before it can read messages or respond to mentions.
* **Missing `/data` Volume Mount** — If the persistent `/data` volume is detached, agent state, short-term memory, and conversation cache will reset every time Railway redeploys the container.

---

#### Why Deploy Hermes Slack on Railway?

Railway provides seamless background worker execution with persistent volume backups and zero server management overhead. Hosting Hermes Slack on Railway gives your team or community an always-on, responsive AI assistant with automatic daily data backups and secure Socket Mode integration.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [OpenSource-Templates/Hermes](https://github.com/OpenSource-Templates/Hermes) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SLACK_APP_TOKEN` | (secret) | Slack app-level token used to connect the application to Slack's Socket Mode. |
| `SLACK_BOT_TOKEN` | (secret) | Slack bot token used to authenticate the application and allow it to interact with Slack. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key used to authenticate requests to AI models through OpenRouter. |
| `SLACK_HOME_CHANNEL` | - | Slack channel ID used as the bot's home or default channel. |
| `SLACK_ALLOWED_USERS` | - | Comma-separated list of Slack user IDs allowed to interact with the bot. |
| `HERMES_IMAGE_VERSION` | latest | Version tag of the Hermes container image to use. "latest" uses the most recent available image. |
| `SLACK_ALLOW_ALL_USERS` | - | Controls whether all Slack users are allowed to interact with the bot. Set to true or false. |
| `SLACK_HOME_CHANNEL_NAME` | - | Name of the Slack channel used as the bot's home or default channel. |
| `AGENT_CACHE_MEMORY_HIGH_MB` | 750 | Memory threshold in MB at which the agent cache considers memory usage high. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/hermes-slack)
