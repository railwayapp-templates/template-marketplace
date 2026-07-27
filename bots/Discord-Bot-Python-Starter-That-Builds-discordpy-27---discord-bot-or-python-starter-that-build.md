# Deploy Discord Bot | Python Starter That Builds, discord.py 2.7 on Railway

Discord bot starter that builds: current discord.py, pinned Python.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-bot-or-python-starter-that-build)

## About

A minimal Discord bot written with [discord.py](https://discordpy.readthedocs.io) — a working starting point you extend, rather than a demo that has to be repaired first.

A Discord bot is a long-running process that holds a websocket to Discord's gateway. It has no HTTP endpoint and no public URL, so hosting it means keeping a worker alive, restarting it when it dies, and giving it a token through the environment rather than the source tree. That is the whole job, and it is where a starter earns its keep: the dependency set has to still install, and the failure messages have to tell you which of the three usual mistakes you made.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discordpy-railway-starter | [ak40u/discordpy-railway-starter](https://github.com/ak40u/discordpy-railway-starter) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DISCORD_TOKEN` | (secret) |

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/deploy/discord-bot-or-python-starter-that-build)
