# Deploy Hermes Web Dashboard on Railway

The Latest Hermes Web Dashboard Autonomous, Self-Improving, Tools & More

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-web-dashboard)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-web-dashboard)

### Deploy and Host Hermes Agent on Railway (with Web Dashboard)

**Hermes Agent** (by Nous Research) is an autonomous AI agent framework that connects large language models to various messaging channels (Telegram, Discord, Slack, WhatsApp, ntfy, and more). This Railway template deploys Hermes Agent from the upstream source (`NousResearch/hermes-agent`) alongside an integrated, password-protected web admin dashboard (`/setup`) and a supervisor process manager, backed by persistent volume storage at `/data`.

---

#### About Hosting Hermes Agent

Hosting Hermes Agent on Railway deploys a unified container architecture designed for continuous, autonomous execution:

* **Admin Dashboard & Gateway Supervisor (`server.py`)**: A dark-themed Starlette web application listening on port `8080`. It serves an intuitive setup wizard at `/setup` for configuring LLM providers, messaging channels, and agent tools. It supervises the background Hermes gateway daemon with automatic crash recovery and live log streaming.
* **Native Hermes Web Dashboard**: The full native Hermes web UI (Chat, Keys, Skills, Kanban, Analytics, Console) is proxied seamlessly at `/` behind cookie-based authentication.
* **Persistent Storage (`/data`)**: Mounts a persistent storage volume at `/data` where application configurations (`.hermes`), session states, user pairing approvals, vector memories, and custom skills survive redeployments.
* **Upstream Synchronization (`HERMES_REF`)**: Defaults to building from `HERMES_REF=main` so every deployment rebuild automatically tracks the latest upstream features and improvements.

---

#### Common Use Cases

* **Multi-channel autonomous AI agent**: Deploy a single persistent AI assistant accessible across Telegram, Discord, Slack, WhatsApp, and ntfy.
* **Browser-based configuration management**: Configure LLM provider API keys (OpenRouter, OpenAI, Anthropic, xAI), channels, and tools via a single-page web UI without editing manual configuration files.
* **User pairing & access control**: Review, approve, or reject user pairing requests from messaging channels in real time via the web admin dashboard.
* **Full deployment snapshot cloning**: Export complete zip snapshots (configuration, pairing states, memories, skills, chat history) to backup or clone deployments across projects.
* **Self-hosted workspace supervisor**: Monitor live gateway execution logs, container metrics, and gateway status with automatic crash restarts.

---

#### Dependencies for Hermes Agent Hosting

* **Hermes Source:** Repository [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (branch/tag controlled via `HERMES_REF`, default `main`)
* **LLM Provider API Key:** Key from [OpenRouter](https://openrouter.ai/) (recommended), OpenAI, Anthropic, xAI, or local provider
* **One persistent volume** mounted at `/data` (stores `.hermes` configuration and session state)
* **Railway public domain** mapped to port `8080`
* **Password protection:** Admin credentials configured via `ADMIN_USERNAME` and `ADMIN_PASSWORD`

**Upstream:** [Nous Research](https://nousresearch.com/) · [GitHub (NousResearch/hermes-agent)](https://github.com/NousResearch/hermes-agent)

##### Implementation Details

| Service | Source / Image | Role | Web Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **hermes-agent** | `NousResearch/hermes-agent` (`HERMES_REF`) | Web Dashboard, Gateway Supervisor & AI Agent | `8080` | `/data` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **hermes-agent** | Admin Dashboard, Gateway & Agent | `/data` | Yes (Port `8080`) | Runs Starlette supervisor + proxies Hermes web UI |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **hermes-agent** | `/data` | Hermes home directory (`.hermes`), config files, active sessions, pairing records, memories, skills, and workspace state |

> **Warning:** Do **not** remove or detach the `/data` volume — deleting this volume will permanently wipe your agent configurations, pairing approvals, custom skills, and conversation history during redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account).
3. Obtain an **LLM Provider Key**:
   * Register at [OpenRouter](https://openrouter.ai/) (recommended) or your preferred provider (OpenAI, Anthropic, xAI) and copy an API key.
4. Deploy the template on Railway:
   * Ensure a **volume** is attached at `/data`.
   * Set `ADMIN_PASSWORD` (optional but strongly recommended; if omitted, a random password will be printed in the deployment logs).
5. Access the Web Dashboard:
   * Open the Railway public domain URL (`https://your-app.up.railway.app`).
   * Log in using your `ADMIN_USERNAME` (default `admin`) and `ADMIN_PASSWORD`.
   * Complete the setup wizard at `/setup` by selecting your LLM provider and model.
6. Connect a Messaging Channel:
   * **Telegram**: Talk to [@BotFather](https://t.me/BotFather), send `/newbot`, copy the HTTP API token, enable Telegram in `/setup`, and paste the token.
   * Send a message to your bot on Telegram, then navigate to the **Users** tab in the admin dashboard to approve the pending pairing request.
   * Additional channels (Discord, Slack, WhatsApp, ntfy) can be enabled similarly through the web UI.

---

#### Configuration

##### Core Environment Variables

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `8080` | Web server port (configured automatically by Railway) |
| `ADMIN_USERNAME` | `admin` | Username for dashboard HTTP authentication |
| `ADMIN_PASSWORD` | *(Auto-generated)* | Password for dashboard login; auto-generated and logged if left blank |
| `HERMES_REF` | `main` | Git branch or tag of [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) to install (e.g. `main` or release tag `v2026.9.24`) |

##### Optional Provider & Channel Variables

You can pre-configure provider keys or bot tokens as Railway environment variables (or configure them later via the `/setup` UI):

```env
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
TELEGRAM_BOT_TOKEN=your_telegram_token
DISCORD_BOT_TOKEN=your_discord_token
```

---

#### Architecture

| Component | Role | Description |
| ------ | ------ | ------ |
| `server.py` | Starlette Web App | Handles login auth, `/setup` wizard UI, reverse proxies to native Hermes UI, and supervises gateway process |
| `start.sh` | Bootstrap Script | Seeds `/data/.hermes`, stamps installation method, and launches `server.py` |
| **Hermes Agent** | Core AI Engine | Installed from git source into `/opt/hermes-agent` with dashboard and TUI pre-compiled |
| **Volume `/data`** | Persistent Store | Holds `.hermes` configuration, sessions, user pairing lists, vector memories, and skills |

---

#### Backup & Restore

* **Backup Snapshot**: Download a complete, unencrypted `.zip` archive containing configuration, credentials, chat logs, pairing records, memories, and skills directly from the admin dashboard.
* **Restore Snapshot**: Upload a saved snapshot into a fresh or existing project to clone or recover a denial. An automated safety snapshot is generated prior to applying any restore.

---

#### Updating Hermes Agent

This template defaults to `HERMES_REF=main` to track upstream releases:

* **Tracking Latest:** Trigger a redeploy or image rebuild in Railway. The build step will pull the latest commits from the `main` branch.
* **Pinning a Specific Release:** Set `HERMES_REF=v2026.9.24` (or any valid release tag) in Railway environment variables and redeploy.
* **In-App Update Button:** The "Update Hermes" button inside the native Hermes UI is a no-op in containerized environments. Always change `HERMES_REF` and redeploy through Railway to update.

---

#### Local Testing with Docker

To build and run the container locally:

```bash
docker build -t hermes-agent-dashboard .
docker run --rm -it -p 8080:8080 \
  -e PORT=8080 \
  -e ADMIN_PASSWORD=changeme \
  -v hermes-data:/data \
  hermes-agent-dashboard
```

Navigate to `http://localhost:8080` and log in with `admin` / `changeme`.

To build with a pinned upstream tag:

```bash
docker build --build-arg HERMES_REF=v2026.9.24 -t hermes-agent-dashboard .
```

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/data` Volume Mount** — If the persistent `/data` volume is detached, all configuration, sessions, and pairing approvals will reset on container restart.
* **Auto-generated Password Retrieval** — If `ADMIN_PASSWORD` is omitted during deployment, inspect the deployment logs in Railway to retrieve the generated password string.
* **Gateway Unstarted State** — If the gateway fails to start, log in to `/setup`, verify that an LLM API key and at least one channel are saved, and click **Start Gateway**.
* **Broken Upstream Builds** — If deploying `HERMES_REF=main` fails due to an upstream commit error, temporarily set `HERMES_REF` to a known release tag.
* **In-App Update Inefficacy** — Attempting to update Hermes via the native web interface will not alter container binaries. Use `HERMES_REF` and Railway redeploys instead.

---

#### Why Deploy Hermes Agent on Railway?

Railway provides high-availability container execution and persistent storage mounts without infrastructure overhead. Hosting Hermes Agent on Railway with this template gives you an all-in-one autonomous AI assistant complete with a password-protected web configuration portal, live supervisor monitoring, automated user pairing management, and one-click snapshot backups.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes-Web-Dashboard | [OpenSource-Templates/Hermes-Web-Dashboard](https://github.com/OpenSource-Templates/Hermes-Web-Dashboard) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8642 | Port the Hermes Agent server listens on. |
| `ADMIN_PASSWORD` | (secret) | Password used to authenticate the Hermes Agent administrator account. |
| `ADMIN_USERNAME` | (secret) | Username used to authenticate the Hermes Agent administrator account. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-web-dashboard)
