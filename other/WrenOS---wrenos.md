# Deploy WrenOS on Railway

Deploy and Host WrenOS OpenClaw on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wrenos)

## About

WrenOS is an open-source control plane for operator-managed crypto agents. It provides a
 paper-first workflow for discovery, scoring, validation, and execution with explicit safety gates
 and inspectable artifacts. This template gives you a fast hosted path to run WrenOS with your own
 keys, profile, and operator controls.

   ## About Hosting WrenOS

   Hosting WrenOS on Railway gives you a managed runtime for continuous agent operations without
 self-managing infrastructure. You configure environment variables, choose a profile, and run
 health/bootstrap checks to validate readiness. WrenOS is designed to start in paper-first mode
 and fail closed when required signals are missing, so operators can verify behavior before
 enabling execution-capable flows. This template supports Telegram-based operator UX, optional
 data-provider enrichment (Helius, Birdeye, LunarCrush, Jupiter), and clean post-deploy validation
 using built-in preflight and health scripts. The result is a reproducible hosted setup that is
 safer and easier to operate than ad hoc local-only workflows.

   ## Common Use Cases

   - Run paper-first crypto research and decision workflows with operator visibility and safety
 defaults.
   - Host an always-on control plane for Telegram alerts, commands, and monitoring loops.
   - Stand up a reproducible environment for testing profile configurations and release-readiness
 checks.

   ## Dependencies for WrenOS Hosting

   - A Railway account and a deployed template/service from this repository.
   - Required runtime credentials (profile + provider/API keys) configured as environment
 variables.

   ### Deployment Dependencies

   - WrenOS repository: https://github.com/wrensignal/wrenOS
   - Quick Start docs: https://github.com/wrensignal/wrenOS/blob/main/docs/quickstart.md
   - Railway first-run playbook:
 https://github.com/wrensignal/wrenOS/blob/main/docs/railway-first-run-playbook.md
   - Release-readiness checklist:
 https://github.com/wrensignal/wrenOS/blob/main/docs/release-readiness/v1-checklist.md

   ## Why Deploy WrenOS on Railway?

   Railway is a singular platform to deploy your infrastructure stack. Railway will host your
 infrastructure so you don't have to deal with configuration, while allowing you to vertically and
 horizontally scale it.

   By deploying WrenOS on Railway, you are one step closer to supporting a complete full-stack
 application with minimal burden. Host your servers, databases, AI agents, and more on Railway.


Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying WrenOS on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wrenOS | [wrensignal/wrenOS](https://github.com/wrensignal/wrenOS) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PROFILE` | research-agent | WrenOS runtime profile to initialize on first run (recommended: research-agent). |
| `AI_API_KEY` | (secret) | Your API key from openai, anthropic, gemini. |
| `AI_PROVIDER` | - | The name of your AI_PROVIDER: openai, anthropic, gemini (all lowercase). |
| `WORKSPACE_DIR` | /app | Filesystem workspace path inside container (default: /app). |
| `HELIUS_API_KEY` | (secret) | Optional Helius API key for enhanced Solana data/RPC capabilities. |
| `BIRDEYE_API_KEY` | (secret) | Optional Birdeye API key for market/token analytics enrichment. |
| `JUPITER_API_KEY` | (secret) | Optional Jupiter API key for advanced routing/data features (if used by your  flow). |
| `LUNARCRUSH_API_KEY` | (secret) | Optional LunarCrush API key for social/sentiment signal enrichment. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token used for operator alerts and command handling. |
| `TELEGRAM_CHAT_ALLOWLIST` | - | Optional comma-separated Telegram chat IDs allowed to interact with  the bot. |
| `WRENOS_ENABLE_EXECUTION` | false | Enables execution-capable flows; keep false for paper-first mode. |
| `AGENT_WALLET_PRIVATE_KEY` | - | Wallet private key for execution-enabled flows only (leave empty for  paper mode). |
| `WRENOS_BOOTSTRAP_ON_START` | true | Whether to run bootstrap/init checks automatically on startup  (true/false). |

## Configuration

- **Start command:** `npm run railway:first-run`

**Category:** Other · **Languages:** JavaScript, HTML, Shell

[View on Railway →](https://railway.com/deploy/wrenos)
