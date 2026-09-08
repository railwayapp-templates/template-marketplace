# Deploy Discord.js Bot on Railway

JavaScript Discord bot with slash commands. Discord bot token required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discordjs-bot)

## About

A JavaScript Discord gateway worker with discord.js 14.27.0, `/ping` and `/help`, locked dependencies, and separate readiness/liveness endpoints. This is not a website: no public domain, database, or volume is required.

The service uses Node 24 LTS and a digest-pinned Alpine image, runs as the non-root `node` user, and installs production dependencies from `package-lock.json`. Keep one replica and sleeping disabled for its persistent gateway connection.

### Required Discord setup

1. Create an application in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Set the required Railway `DISCORD_TOKEN` to that application's **Bot token**. A generated secret, application ID, client secret, or dummy token is not a substitute.
3. Invite the application to your guild with OAuth2 scopes `bot` and `applications.commands`, granting permission to send command replies.
4. Deploy and wait for command registration and gateway connection.
5. In Discord, invoke `/ping` and `/help`. Global command propagation can take time and is controlled by Discord.

**A real bot token is mandatory.** Missing/rejected credentials or failed command registration prevent readiness. Real provider login, command propagation, permissions, and chat replies require validation with your own token; no live Discord E2E verification is claimed.

### Variables and readiness

- `DISCORD_TOKEN`: required, user supplied, with no default. Keep it out of source control and logs.
- `PORT`: internal health listener, default `3000`. `HOST` defaults to `0.0.0.0` inside the container. No public HTTP interactions endpoint is implemented.
- `/health`, `/healthz`, `/ready`, and `/` report readiness only when both command registration and the gateway are ready; otherwise they return 503.
- `/live` is process liveness, not bot readiness. Railway uses `/health` with a 60-second startup allowance and an on-failure restart policy.
- Gateway disconnect/reconnect events affect readiness. A deployment healthcheck is not continuous provider-outage monitoring. Missing credentials, startup failures, and timeouts exit rather than leaving a healthy HTTP-only worker.

### Commands and maintenance

`/ping` reports gateway latency; `/help` lists loaded commands. Add modules under `src/commands/` exporting a `SlashCommandBuilder` as `data` and an asynchronous `execute(interaction)` function. Registration replaces the application's global command list with these definitions: use a dedicated application and review removals before redeploying. Only the Guilds intent is enabled; these slash commands do not require privileged intents.

The worker has no persistent application storage. Add a database deliberately if your custom commands need durable state. Local provider-mock tests do not establish real Discord delivery or a built container's behavior.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | [leoisadev1/railway-template-discord-js-bot](https://github.com/leoisadev1/railway-template-discord-js-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal readiness/liveness HTTP port; no public domain is required. |
| `DISCORD_TOKEN` | (secret) | Required user-provided Discord Bot token. No generated or dummy default; invalid credentials fail readiness. |

## Configuration

- **Healthcheck:** `/health`

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/discordjs-bot)
