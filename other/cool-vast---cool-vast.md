# Deploy cool-vast on Railway

Deploy and Host cool-vast with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cool-vast)

## About

**Lunr Bot Deobfuscator** is a Discord bot that fetches obfuscated Lua scripts from Roblox asset IDs or URLs and runs them through a multi-engine deobfuscation pipeline. It supports Luraph, MoonSec, IronBrew, Prometheus, and PSU using VM devirtualization (Java), static analysis (TypeScript/De4Lua), hex decoding, and loadstring chain resolution.

Hosting this bot requires setting up a Python 3.10 environment with Discord.py, aiohttp, and lupa. The bot orchestrates external tools: LuraphDevirtualizer.jar (VM devirtualization), unluac.jar (bytecode decompilation), and the De4Lua TypeScript framework. Railway handles always-on deployment, automatically rebuilds on GitHub pushes, and manages environment variables like `DISCORD_TOKEN`. The bot processes scripts in temporary files and cleans up automatically after each request. No database is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deobfuscator | [zenos-source/deobfuscator](https://github.com/zenos-source/deobfuscator) (branch: main) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DISCORD_TOKEN` | (secret) |

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/cool-vast)
