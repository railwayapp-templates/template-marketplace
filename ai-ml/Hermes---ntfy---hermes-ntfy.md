# Deploy Hermes - ntfy on Railway

Nous Research's AI Agent Runtime ntfy Supervised Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-ntfy)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-ntfy)

### Deploy and Host Hermes ntfy Agent on Railway

**Hermes** (Hermes ntfy Agent) is an AI agent framework designed to connect large language models to ntfy notification streams, leveraging OpenRouter for model inference while providing persistent agent memory, local caching, and flexible pub/sub topic management. This Railway template deploys `hermes-ntfy` from the `OpenSource-Templates/Hermes` repository, paired with a daily-backed persistent storage volume at `/data`.

---

#### About Hosting Hermes ntfy

Hosting Hermes ntfy on Railway deploys a single container service that runs the Hermes agent background subscriber daemon. It connects via SSE / HTTP streams to an ntfy server (`NTFY_SERVER_URL`, defaulting to `https://ntfy.sh`) on a specified topic (`NTFY_TOPIC`). AI model inference is delegated to OpenRouter via `OPENROUTER_API_KEY`. Persistent agent memory, context cache, and conversation state are safely retained inside a dedicated storage volume mounted at `/data` with daily automated backup scheduling.

---

#### Common Use Cases

* **Push-based AI agent assistant**: Send messages to a dedicated ntfy topic from any device, mobile app, or curl script, and receive intelligent responses directly back through ntfy push notifications.
* **OpenRouter model access**: Access top-tier open and proprietary language models (Claude, Llama, GPT-4o, Mistral) via OpenRouter API.
* **Persistent agent memory**: Retain conversation context, agent cache, and workspace memory across deployments in the `/data` volume.
* **Self-hosted or public ntfy integration**: Works seamlessly with public `https://ntfy.sh` or self-hosted ntfy server instances (`NTFY_SERVER_URL`), with optional authentication tokens (`NTFY_TOKEN`).
* **Topic-based security**: Protect access by subscribing to hard-to-guess topics and filtering authorized users (`NTFY_ALLOWED_USERS`).

---

#### Dependencies for Hermes ntfy Hosting

* **Hermes Source:** Repository `OpenSource-Templates/Hermes` (`main` branch)
* **OpenRouter API Key:** API token from [OpenRouter](https://openrouter.ai/keys) (`OPENROUTER_API_KEY`)
* **ntfy Topic Name:** A unique, hard-to-guess topic string (e.g. `hermes-yourname-x7k9`) (`NTFY_TOPIC`)
* **Authorized ntfy Users/Topics:** Comma-separated user or topic IDs (`NTFY_ALLOWED_USERS`)
* **One persistent volume** mounted at `/data` with daily automated backups

**Upstream:** [GitHub (OpenSource-Templates/Hermes)](https://github.com/OpenSource-Templates/Hermes) · [ntfy Documentation](https://docs.ntfy.sh/)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Source Repo** | `OpenSource-Templates/Hermes` (`main`) |
| **Container Image Tag** | Controlled via `HERMES_IMAGE_VERSION` (default `latest`) |
| **Type** | Background Subscriber / Agent Daemon |
| **Storage / Volume** | `/data` (Daily automated backup schedule) |
| **Primary Auth** | OpenRouter API Key (`OPENROUTER_API_KEY`) & Optional ntfy Token (`NTFY_TOKEN`) |
| **Access Control** | Topic / User Whitelist (`NTFY_ALLOWED_USERS`) |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **hermes-ntfy** | ntfy Subscriber & AI Agent Daemon | `/data` | No (Outbound Stream) | Subscribes to ntfy topic & delegates to OpenRouter API |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **hermes-ntfy** | `/data` | Agent conversation memory, local vector cache, state files, and workspace context |

> **Warning:** Do **not** remove or detach the `/data` volume — deleting this volume will permanently wipe all stored agent memory, conversation cache, and workspace context during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account).
3. Choose or configure an **ntfy Topic**:
   * Pick a unique, hard-to-guess topic name (e.g., `hermes-alex-9k2x`). On public `ntfy.sh`, anyone who knows the topic name can view messages unless a private/self-hosted ntfy instance or access token is used.
   * Optionally subscribe to this topic on your phone or browser using the [ntfy web app](https://ntfy.sh) or mobile apps.
4. Obtain your **OpenRouter API Key**:
   * Sign in to [OpenRouter Keys](https://openrouter.ai/keys) and create a new API key.
5. Fill in the required variables during Railway template deployment:
   * `OPENROUTER_API_KEY`: Your OpenRouter API key.
   * `NTFY_TOPIC`: Your chosen ntfy topic name.
   * `NTFY_ALLOWED_USERS`: Usually set to the same string as `NTFY_TOPIC` (or a comma-separated list of allowed user/topic identifiers).
6. Click **Deploy**.
7. Monitor the deployment logs in Railway to confirm successful subscription to the ntfy server and connection to OpenRouter.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `OPENROUTER_API_KEY` | *(Required)* | OpenRouter API key used for LLM inference |
| `NTFY_TOPIC` | *(Required)* | ntfy topic name (e.g., `hermes-yourname-x7k9`) |
| `NTFY_ALLOWED_USERS` | *(Required)* | Usually same as `NTFY_TOPIC` (comma-separated if multiple) |
| `NTFY_HOME_CHANNEL` | `""` | Optional home channel topic (defaults to `NTFY_TOPIC` if unset) |
| `NTFY_SERVER_URL` | `https://ntfy.sh` | ntfy server address (use custom URL for self-hosted ntfy) |
| `NTFY_TOKEN` | `""` | Optional Bearer token or `user:pass` for private/protected ntfy topics |
| `NTFY_MARKDOWN` | `true` | Set to `true` to send markdown-formatted notification replies |
| `HERMES_IMAGE_VERSION` | `latest` | Docker image tag version |
| `AGENT_CACHE_MEMORY_HIGH_MB` | `750` | Optional agent cache memory threshold limit in MB |

##### Security & Topic Management

* **Topic Uniqueness (`NTFY_TOPIC`)**: Because public `ntfy.sh` topics are open by default, choose a long, cryptographically random topic name (e.g., `hermes-user-8f3a1b2c`) to prevent unauthorized users from discovering your interaction stream.
* **Private ntfy Servers (`NTFY_SERVER_URL` & `NTFY_TOKEN`)**: For sensitive environments, point `NTFY_SERVER_URL` to a self-hosted ntfy instance and pass authentication tokens via `NTFY_TOKEN`.
* **Agent Cache Tuning (`AGENT_CACHE_MEMORY_HIGH_MB`)**: Adjust `AGENT_CACHE_MEMORY_HIGH_MB` (default `750`) based on your Railway service plan RAM allocation to prevent out-of-memory container restarts.

---

#### Updating Hermes ntfy

1. Open the **hermes-ntfy** service → **Settings** → **Source**.
2. Trigger a rebuild or update `HERMES_IMAGE_VERSION` variable to a specific release tag.
3. Click **Redeploy**.

All agent state and memory files inside `/data` remain safe across updates and container restarts.

---

#### Traps

**Common pitfalls and failure modes:**

* **Public/Predictable `NTFY_TOPIC` Names** — Using common topic names like `hermes`, `test`, or `ai` on public `ntfy.sh` will allow strangers to eavesdrop on conversations or publish prompts to your agent. Always use an unguessable topic string.
* **Empty `NTFY_ALLOWED_USERS` Whitelist** — If `NTFY_ALLOWED_USERS` does not match the incoming sender or topic identifier, the agent will filter out or ignore incoming messages.
* **Self-Hosted ntfy Connection Failures** — If using a custom `NTFY_SERVER_URL`, ensure the URL includes the protocol (e.g., `https://ntfy.example.com`) and that your server permits persistent SSE/WebSocket stream connections.
* **Missing `/data` Volume Mount** — If the persistent `/data` volume is detached, agent context, short-term memory, and conversation cache will reset every time Railway redeploys the container.

---

#### Why Deploy Hermes ntfy on Railway?

Railway provides automated background process execution with persistent volume backups and zero local infrastructure management. Hosting Hermes ntfy on Railway gives you an always-on, mobile-friendly AI assistant accessible via simple push notifications with automatic daily data backups.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [OpenSource-Templates/Hermes](https://github.com/OpenSource-Templates/Hermes) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NTFY_TOKEN` | (secret) | Authentication token used to access the configured NTFY server or topic. |
| `NTFY_TOPIC` | - | NTFY topic used by the application to publish and receive notifications. |
| `NTFY_MARKDOWN` | true | Enables Markdown formatting in NTFY messages. |
| `NTFY_SERVER_URL` | https://ntfy.sh | NTFY server URL used to connect to the notification service. |
| `NTFY_HOME_CHANNEL` | - | NTFY topic or channel used as the bot's home or default communication channel. |
| `NTFY_ALLOWED_USERS` | - | Comma-separated list of users allowed to interact with the NTFY integration. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key used to authenticate requests to AI models through OpenRouter. |
| `HERMES_IMAGE_VERSION` | latest | Version tag of the Hermes container image to use. "latest" uses the most recent available image. |
| `AGENT_CACHE_MEMORY_HIGH_MB` | 750 | Memory threshold in MB at which the agent cache considers memory usage high. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/hermes-ntfy)
