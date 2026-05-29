# Deploy prism-agent-stack on Railway

a template for the prism stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prism-agent-stack)

## About

Prism Agent Stack is a deployable multi-service workspace for running Codex with shared memory, Discord chat,
  voice meeting capture, change request workflows, and repo-aware automation. It combines a lightweight admin site,
  Codex runtime, Prism Memory, Discord adapter, and background cron services into one Railway template.

  ## About Hosting Prism Agent Stack

  Hosting Prism Agent Stack on Railway creates a full operational workspace for an AI-assisted community or team.
  The stack deploys multiple connected services, persistent volumes, internal networking, and optional public
  endpoints for chat, memory artifacts, and admin access. After deploy, the main setup tasks are configuring
  environment variables, authenticating Codex in the runtime, optionally connecting Discord and voice
  transcription, and registering target repositories for change requests. Railway handles service orchestration,
  redeploys, and persistent storage, while Prism Memory keeps shared context and artifacts available across
  sessions.

  ## Common Use Cases

  - Run a Codex-powered change request board that can branch, edit, and push updates to target GitHub repositories.
  - Add a Discord bot that can answer questions, create threaded agent sessions, and capture voice meeting
  transcripts and summaries.
  - Maintain shared project memory and searchable knowledge so agents can retrieve context, artifacts, and handbook
  content across sessions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| comms-adapter | [superprismio/prism-railway-template](https://github.com/superprismio/prism-railway-template) (root: /services/source-adapter) | Web service |
| codex-runtime | [superprismio/prism-railway-template](https://github.com/superprismio/prism-railway-template) (root: /services/codex-runtime) | Database |
| task-runner | [superprismio/prism-railway-template](https://github.com/superprismio/prism-railway-template) (root: /services/task-runner) | Worker |
| prism-memory | [superprismio/prism-railway-template](https://github.com/superprismio/prism-railway-template) (root: /services/prism-memory) | Web service |
| site | [superprismio/prism-railway-template](https://github.com/superprismio/prism-railway-template) (root: /services/site) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | comms-adapter | 8789 | Port the Comms adapter listens on. |
| `NODE_ENV` | comms-adapter | production | Runtime environment for the Comms adapter. |
| `SOURCE_KIND` | comms-adapter | discord | Source provider handled by this adapter. |
| `SOURCE_SPACE` | comms-adapter | community | Prism Memory space this adapter writes into. Must match PRISM_API_SPACE. |
| `PRISM_API_KEY` | comms-adapter | (secret) | Prism Memory API key reference. |
| `PRISM_API_BASE` | comms-adapter | - | Private URL for Prism Memory ingest calls. |
| `APP_API_BASE_URL` | comms-adapter | - | Private URL for the API service using |
| `DISCORD_GUILD_ID` | comms-adapter | - | Discord guild ID to sync and serve. Required to enable Discord. |
| `SOURCE_SYNC_MODE` | comms-adapter | manual | Sync mode for Discord ingestion. |
| `DISCORD_BOT_TOKEN` | comms-adapter | (secret) | Discord bot token. Required to enable Discord sync/chat. |
| `PRISM_INGEST_PATH` | comms-adapter | /ingest/messages | Prism Memory ingest endpoint path. |
| `DISCORD_CHAT_ENABLED` | comms-adapter | true | Enables Discord mention/thread chat bridge. |
| `SOURCE_ADAPTER_TOKEN` | comms-adapter | (secret) | Token used to authorize calls to the adapter. |
| `VOICE_DAVE_ENCRYPTION` | comms-adapter | true | Enables Discord DAVE voice encryption support when available. |
| `CODEX_RUNTIME_BASE_URL` | comms-adapter | - | Private URL |
| `DISCORD_APPLICATION_ID` | comms-adapter | - | Optional Discord application ID. Recommended for slash command registration. |
| `INTERNAL_SERVICE_TOKEN` | comms-adapter | (secret) | Internal API service token reference. |
| `SOURCE_ADAPTER_DATA_ROOT` | comms-adapter | /data | Mounted data directory for checkpoints and recordings. |
| `DISCORD_REGISTER_COMMANDS` | comms-adapter | true | Automatically registers Discord slash commands on startup. |
| `DISCORD_SYNC_WINDOW_HOURS` | comms-adapter | 24 | Lookback window for Discord sync. |
| `VOICE_TRANSCRIPTION_MODEL` | comms-adapter | nvidia/parakeet-tdt-0.6b-v3 | Model sent to the transcription endpoint. |
| `DISCORD_EMBED_TEXT_ENABLED` | comms-adapter | true | Enables preservation of Discord embed text. |
| `DISCORD_IGNORE_BOT_MESSAGES` | comms-adapter | false | Whether bot messages are skipped during sync. |
| `VOICE_TRANSCRIPTION_API_KEY` | comms-adapter | (secret) | Optional API key for the configured voice transcription endpoint. |
| `VOICE_TRANSCRIPTION_BASE_URL` | comms-adapter | https://api.venice.ai/api/v1/audio/transcriptions | Optional Whisper-compatible |
| `VOICE_TRANSCRIPTION_LANGUAGE` | comms-adapter | en | Optional transcription language hint. |
| `PRISM_ARTIFACT_PUBLIC_BASE_URL` | comms-adapter | - | Public url for prism memory artifacts |
| `VOICE_CHAT_IGNORE_BOT_MESSAGES` | comms-adapter | true | Skips bot messages when stitching voice channel chat into transcripts. |
| `VOICE_TRANSCRIPTION_TIMESTAMPS` | comms-adapter | true | Requests timestamp segments from the transcription endpoint. |
| `DISCORD_ATTACHMENT_TEXT_ENABLED` | comms-adapter | true | Enables extraction of text-like Discord attachments. |
| `DISCORD_INCLUDE_ARCHIVED_THREADS` | comms-adapter | false | Whether archived threads are included during sync. |
| `DISCORD_MAX_MESSAGES_PER_CHANNEL` | comms-adapter | 200 | Maximum messages fetched per channel per sync. |
| `SOURCE_CHECKPOINT_OVERLAP_MINUTES` | comms-adapter | 5 | Minutes of overlap when resuming Discord sync checkpoints. |
| `VOICE_TRANSCRIPTION_RESPONSE_FORMAT` | comms-adapter | json | Response format sent to the transcription endpoint. |
| `CODEX_RUNTIME_REQUEST_TIMEOUT_SECONDS` | comms-adapter | 660 | Timeout for adapter calls to Codex Runtime. |
| `PORT` | codex-runtime | 3030 | Port the Codex Runtime service listens on. |
| `NODE_ENV` | codex-runtime | production | Runtime environment for Codex Runtime. |
| `CODEX_HOME` | codex-runtime | /data/codex | Mounted Codex home directory for auth and thread state. |
| `PRISM_API_KEY` | codex-runtime | (secret) | Prism Memory API key reference. |
| `PRISM_API_BASE` | codex-runtime | - | Private URL for Prism |
| `GIT_AUTHOR_NAME` | codex-runtime | Prism Codex | Git author name used for Codex-created commits. |
| `APP_API_BASE_URL` | codex-runtime | - | Private URL for the API service using |
| `GIT_AUTHOR_EMAIL` | codex-runtime | prism-codex@users.noreply.github.com | Git author email used for Codex-created commits. |
| `CODEX_WORKSPACE_ROOT` | codex-runtime | /app | Default workspace root for Codex execution. |
| `APP_API_SERVICE_TOKEN` | codex-runtime | (secret) | Internal API service token reference. |
| `CODEX_RUNTIME_TIMEOUT_MS` | codex-runtime | 600000 | Maximum Codex execution timeout in milliseconds. |
| `TARGET_REPO_GITHUB_TOKEN` | codex-runtime | (secret) | Optional GitHub token for cloning or pushing private target repositories. |
| `CODEX_TARGET_WORKSPACE_ROOT` | codex-runtime | /data/workspaces | Mounted directory for cloned target repositories. |
| `COMMUNICATION_ADAPTER_TOKEN` | codex-runtime | (secret) | direct source adapter token |
| `COMMUNICATION_ADAPTER_BASE_URL` | codex-runtime | - | direct source adapter |
| `PORT` | task-runner | 8790 | Task runner HTTP port |
| `PRISM_API_KEY` | task-runner | (secret) | Auth token for Prism Memory |
| `TASK_RUNNER_TOKEN` | task-runner | (secret) | Auth token for manual |
| `TASK_RUNNER_DISABLED` | task-runner | false | Keep scheduler enabled |
| `APP_API_SERVICE_TOKEN` | task-runner | (secret) | Auth token for site |
| `CODEX_RUNTIME_BASE_URL` | task-runner | - | codex runtime for codex-prompt tasks |
| `TASK_RUNNER_POLL_SECONDS` | task-runner | 60 | Poll DB schedules once per minute |
| `COMMUNICATION_ADAPTER_TOKEN` | task-runner | (secret) | Auth token |
| `PORT` | prism-memory | 8788 | Port the Prism Memory service listens on. |
| `PRISM_API_KEY` | prism-memory | (secret) | API key used to authorize Prism Memory API calls. |
| `PRISM_API_SPACE` | prism-memory | community | Runtime Prism Memory space slug. |
| `PRISM_GITHUB_TOKEN` | prism-memory | (secret) | github auth for private repos |
| `PRISM_API_DATA_ROOT` | prism-memory | /data | Mounted data directory for Prism Memory runtime state. |
| `PORT` | site | 3100 | Port the site service listens on. |
| `NODE_ENV` | site | production | Runtime environment for the site service. |
| `ADMIN_EMAIL` | site | admin@local.agent | Admin bootstrap email |
| `PRISM_API_KEY` | site | (secret) | Full Prism Memory key used |
| `ADMIN_PASSWORD` | site | (secret) | Temporary admin password; change after deploy |
| `SESSION_SECRET` | site | (secret) | Session signing secret for admin auth |
| `TASK_RUNNER_BASE_URL` | site | - | Private task-runner URL for admin Tasks tab and manual runs |
| `PRISM_AGENT_DATA_ROOT` | site | /data | App SQLite/data root mounted on site |
| `PRISM_MEMORY_BASE_URL` | site | - | Prism Memory base URL |
| `CODEX_RUNTIME_BASE_URL` | site | - | Internal Codex runtime base URL |
| `INTERNAL_SERVICE_TOKEN` | site | (secret) | Shared internal service token for |
| `SITE_USE_LOCAL_APP_API` | site | true | Makes site own the app API and SQLite-backed |
| `NEXT_PUBLIC_API_BASE_URL` | site | - | Browser- |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`

**Category:** Other · **Languages:** TypeScript, Python, Shell, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/prism-agent-stack)
