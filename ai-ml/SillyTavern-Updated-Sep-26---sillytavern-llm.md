# Deploy SillyTavern [Updated Sep '26] on Railway

SillyTavern — LLM Frontend, Auto-Secured Admin Password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern-llm)

## About

SillyTavern is an open-source, locally-installed interface for text-generation LLMs, image-generation engines, and TTS voice models — built for AI hobbyists who want real control over their prompts, personas, and world info, not a stripped-down chat box. Beginning in February 2023 as a fork of TavernAI 1.2.8, it now has over 200 contributors and multiple years of independent development behind it. This template deploys SillyTavern's official image directly and fixes the one real gap every other SillyTavern-on-Railway template documents but doesn't solve: the default account ships with no password.

This template runs `ghcr.io/sillytavern/sillytavern:latest` — the project's own official Docker image — unmodified. What this template adds sits entirely in the start command: relocating SillyTavern's stateful directories onto a single Railway volume, and seeding a real password onto the app's default account before the server ever starts accepting connections. Nothing about how SillyTavern itself behaves is changed.

That last part matters more than it might sound. SillyTavern's multi-user account system creates a `default-user` account on first boot, and by design it has no password — the app has no way to know what you'd want it to be. Every reference template for SillyTavern on Railway documents this with some version of "change the password as soon as you're able to access ST." That's a real security gap for however long it takes you to notice the warning, log in, and act on it. This template closes that window entirely: a password is generated automatically and applied via SillyTavern's own recovery tooling before your instance is reachable by anyone.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SillyTavern-v2 | `ghcr.io/sillytavern/sillytavern:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SILLYTAVERN_PORT` | 8000 | The port SillyTavern's server listens on inside the container. Matches the image's default — don't change unless you also update the service's public networking to match. |
| `SILLYTAVERN_LISTEN` | true | Binds to all network interfaces. Required for Railway's proxy to reach the container at all — without it, SillyTavern only listens on localhost. |
| `SILLYTAVERN_WHITELISTMODE` | false | Disables SillyTavern's own IP whitelist. Railway's edge network isn't a fixed IP you can whitelist, so this must be off for the app to be reachable publicly. |
| `SILLYTAVERN_ADMIN_PASSWORD` | (secret) | Auto-generated on deploy. Applied to the default-user account on first boot via SillyTavern's own recover.js script — this is the fix for the "no password by default" gap present in the reference template. Log in with this value, then change it from inside the UI if you want. |
| `SILLYTAVERN_ENABLEUSERACCOUNTS` | true | Turns on SillyTavern's multi-user login system. Needed for the password fix above to mean anything — without it, there's no auth at all. |
| `SILLYTAVERN_ENABLEDISCREETLOGIN` | (secret) | When true, hides the account picker on the login screen (you type your username instead of selecting it from a list). Cosmetic/privacy toggle only. |

## Configuration

- **Start command:** `sh -c 'PERSIST_DIR="/home/node/app/persist"; mkdir -p "$PERSIST_DIR"; for d in config data plugins; do if [ ! -L "./$d" ]; then if [ -e "$PERSIST_DIR/$d" ]; then rm -rf "./$d"; else mv "./$d" "$PERSIST_DIR/$d"; fi; ln -s "$PERSIST_DIR/$d" "./$d"; fi; done; [ -e "config/config.yaml" ] || cp default/config.yaml config/config.yaml; npm run init; if [ -n "$SILLYTAVERN_ADMIN_PASSWORD" ]; then node recover.js default-user "$SILLYTAVERN_ADMIN_PASSWORD"; fi; exec ./docker-entrypoint.sh'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/app/persist`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sillytavern-llm)
