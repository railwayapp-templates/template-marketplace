# Deploy OpenClaw on Railway

[Homebrew & TUI support] The AI that actually does things

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw)

## About

OpenClaw is the AI that actually does things. It clears your inbox, sends emails, manages your calendar, and checks you in for flights—all from WhatsApp, Telegram, or any chat app you already use. Self-host your own AI personal assistant with full control over your data.

Hosting OpenClaw requires building from source, configuring authentication with your preferred LLM provider, and managing persistent state for configurations and workspaces. This Railway template simplifies the entire process with a one-click deployment that includes a web-based setup wizard at `/setup`. The wizard handles onboarding, API key configuration, and optional messaging channel setup—no command-line experience required. All state is persisted to a Railway Volume, ensuring your configuration survives redeploys. The template also provides automatic reverse proxying with authentication injection and one-click backup exports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [arjunkomath/openclaw-railway-template](https://github.com/arjunkomath/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Default port |
| `ENABLE_WEB_TUI` | false | Enable / Disable web based TUI |
| `SETUP_PASSWORD` | (secret) | Auto generated password |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | State directory |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Gateway host |
| `INTERNAL_GATEWAY_PORT` | 18789 | Gateway port |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Auto generated gateway token |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Workspace directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/openclaw)
