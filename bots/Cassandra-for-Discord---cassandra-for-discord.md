# Deploy Cassandra for Discord on Railway

Organizational-memory AI agent for a single Discord server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cassandra-for-discord)

## About

Cassandra for Discord is a quiet organizational-memory agent for a single Discord server. It reads the channels you permit, stores them in SQLite, extracts durable memories such as decisions, risks, predictions, and commitments, and answers mentions with citations. Most of the time, it says nothing.

https://github.com/steel-experiments/cassandra-discord

Hosting Cassandra means running one always-on service with one persistent volume. The volume stores the SQLite database at `/app/data`, so data survives redeploys.

You bring your own Discord application with the Message Content Intent enabled, along with your own model-provider API key. The default model is OpenAI `gpt-5.6-terra`.

You choose which channels Cassandra may read using two environment-variable lists. Cassandra starts in **observe mode**: it ingests messages and answers mentions, but never posts on its own.

A $2/day spend control is enabled by default. Health is exposed at `/readyz`, and a 45-second drain period allows for graceful shutdown during redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cassandra | `ghcr.io/steel-experiments/cassandra-discord@sha256:87c5fc4ce070edcfad3ebc5008795cd5185b387e6e5363c9024b3c0b43e34309` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ORG_NAME` | - | Organization name used in answers and reports. Default: Your Company. |
| `FULL_HISTORY` | - | true imports all reachable history for the selected channels on first start. false starts from new messages. There is no default. |
| `ORG_TIMEZONE` | - | IANA time zone for day boundaries, for example UTC or Europe/Berlin. Default: UTC. |
| `DISCORD_TOKEN` | (secret) | Bot token from the Discord Developer Portal, Bot page. Secret: reset it there if it leaks. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key. For Anthropic or Google instead, set LLM_PROVIDER and use that provider's key. |
| `DISCORD_GUILD_ID` | - | Your server ID. Turn on Developer Mode in Discord, right-click the server name, Copy Server ID. |
| `LLM_DAILY_BUDGET_USD` | - | Daily model-spend admission control in USD. Default 2. Use unlimited to remove the cap. Not a provider billing limit. |
| `CHANNEL_POLICY_SOURCE` | - | basic builds the channel policy from the two ID lists. file uses a mounted policy file instead. Default: basic. |
| `DISCORD_APPLICATION_ID` | - | Application ID from the Developer Portal, General Information page. |
| `RESTRICTED_CHANNEL_IDS` | - | Comma-separated channel or category IDs whose content stays inside that channel. Leave unset if empty. |
| `ORG_VISIBLE_CHANNEL_IDS` | - | Comma-separated channel or category IDs Cassandra may read as org-visible. Right-click a channel, Copy Channel ID. |
| `CASSANDRA_ADMIN_ROLE_IDS` | - | Comma-separated Discord role IDs that may run /cassandra admin commands. |

## Configuration

- **Healthcheck:** `/readyz`
- **Volume:** `/app/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/cassandra-for-discord)
