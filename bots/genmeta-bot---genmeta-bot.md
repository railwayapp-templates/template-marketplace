# Deploy genmeta-bot on Railway

Discord bot that detects NovelAI/A1111/Forge metadata in PNGs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/genmeta-bot)

## About

genmeta-bot is a Discord bot that reveals AI image generation metadata in uploaded PNGs. It reads both plain PNG
  text chunks and stealth PNGInfo hidden in pixel LSBs, then replies with an embed showing the prompt, negative
  prompt, model, sampler, steps, CFG, seed, and size. It supports NovelAI, A1111 (Stable Diffusion WebUI), and Forge.

  ## About Hosting genmeta-bot

  genmeta-bot runs as a lightweight Bun worker that connects to the Discord Gateway — no inbound HTTP, domain, or port
  configuration needed. Hosting takes three steps: create a bot on the Discord Developer Portal and enable the
  Message Content Intent, set the `DISCORD_BOT_TOKEN` and `DISCORD_APPLICATION_ID` variables, and register the slash
  commands once with `bun run deploy-commands --global`. Pause state and reply links persist to Turso when
  `TURSO_DATABASE_URL` is set, with a local SQLite fallback otherwise. The template ships with a production-ready
  multi-stage Dockerfile running as a non-root user, and Railway restarts the bot automatically on failure.

  ## Common Use Cases

  - AI art communities where members share images and want prompts and settings visible without asking the poster
  - Moderation and provenance checks — verify whether an uploaded image carries generation metadata, including stealth
  PNGInfo
  - Recovering your own generation settings (seed, model, sampler) from images you posted earlier

  ## Dependencies for genmeta-bot Hosting

  - A Discord application and bot token with **Message Content Intent** enabled
  - Optional: a [Turso](https://turso.tech/) database (`TURSO_DATABASE_URL`) to keep state across redeploys

  ### Deployment Dependencies

  - [genmeta-bot repository](https://github.com/caru-ini/genmeta-bot)
  - [Discord Developer Portal](https://discord.com/developers/applications)
  - [discord.js documentation](https://discord.js.org/)

  ### Implementation Details

  Metadata extraction first parses PNG `tEXt` / `zTXt` / `iTXt` chunks, then falls back to scanning alpha/RGB
  least-significant bits for `stealth_pnginfo` / `stealth_pngcomp` payloads. After the first deploy, register the
  slash commands once:

  ```bash
  bun run deploy-commands --global
  ```

  ## Why Deploy genmeta-bot on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you
  don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying genmeta-bot on Railway, you are one step closer to supporting a complete full-stack application with
  minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| genmeta-bot | [caru-ini/genmeta-bot](https://github.com/caru-ini/genmeta-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | info | Optional: Log level (debug, info, warn, error) |
| `DISCORD_GUILD_ID` | your_guild_id_here | - |
| `TURSO_AUTH_TOKEN` | (secret) | - |
| `DISCORD_BOT_TOKEN` | (secret) | - |
| `TURSO_DATABASE_URL` | libsql://your-db-name.turso.io | Turso database (falls back to file:data/bot.db when unset) |
| `DISCORD_APPLICATION_ID` | your_application_id_here | - |

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/genmeta-bot)
