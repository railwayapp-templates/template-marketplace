# Deploy Dump Street Terminal on Railway

Deploy and Host Dump Street Terminal with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dump-street-terminal)

## About

Dump Street Terminal (DST) is an autonomous Uniswap V4 trading agent platform. Sign in with Google, get a self-custody wallet on Base, configure your strategy, and deploy an AI agent that executes trades on-chain autonomously.

Hosting DST means running the OpenClaw agent runtime on Railway. The agent connects to your DST MCP server, reads your trading strategy, and executes Uniswap V4 swaps on Base autonomously. Railway keeps the agent alive 24/7 and handles restarts. On first boot the agent self-configures with your AI provider, MCP connection, and wallet auth token, then begins executing your strategy on schedule.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dumb-street-terminal | [rajweb3/dumb-street-terminal](https://github.com/rajweb3/dumb-street-terminal) (root: /packages/dst-railway-template) | Worker |

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/template/dump-street-terminal)
