# Deploy letta-discord-bot on Railway

An example Discord chatbot built on the Letta API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/C__ceE)

## About

An example Discord chatbot built on the Letta API, which uses a stateful agent (agent with memory) under the hood.

This Railway template deploys a Discord bot using the repo here: https://github.com/letta-ai/letta-discord-bot-example

You need a Discord bot application configured, and a Letta Cloud API key (or a self-hosted Letta server instance running somewhere).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| letta-discord-bot-example | [letta-ai/letta-discord-bot-example](https://github.com/letta-ai/letta-discord-bot-example) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | The port that the Discord bot will run on |
| `APP_ID` | - | Your Discord application ID |
| `PUBLIC_KEY` | - | Your Discord public key |
| `ENABLE_TIMER` | true | Enable or disable the timer feature (will randomly trigger an agent input/event at a certain interval, defaults to true) |
| `DISCORD_TOKEN` | (secret) | Your Discord bot token |
| `LETTA_API_KEY` | (secret) | Your Letta Cloud API key (https://app.letta.com/api-keys). If self-hosting, this is your Letta server password if using a self-hosted server (can use a dummy value if you did not set a server password). |
| `LETTA_AGENT_ID` | - | The ID of your Letta agent that will drive the Discord chatbot. You need to have created this agent already on your Letta server. |
| `LETTA_BASE_URL` | - | The IP address of your Letta server (if self-hosting). Use https://api.letta.com if using Letta Cloud. |
| `RESPOND_TO_DMS` | false | If true, the bot will respond to DMs. If false, the bot will ignore them. |
| `RESPOND_TO_BOTS` | false | Whether or not to respond to other bots |
| `DISCORD_CHANNEL_ID` | - | Set this if you want the bot to only respond to messages (listen) in a specific channel |
| `FIRING_PROBABILITY` | 0.1 | Probability of the timer firing (0.0 to 1.0), defaults to 0.1 (10%) |
| `RESPOND_TO_GENERIC` | false | Whether or not to respond to generic messages (messages that are not mentions) |
| `RESPOND_TO_MENTIONS` | true | Whether or not to respond to mentions |
| `TIMER_INTERVAL_MINUTES` | 15 | Maximum interval range in minutes for the random timer (defaults to every 15 minutes) |
| `LETTA_USE_SENDER_PREFIX` | true | - |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/C__ceE)
