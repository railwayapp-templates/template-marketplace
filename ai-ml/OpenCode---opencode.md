# Deploy OpenCode on Railway

always-on autonomous AI coding agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode)

## About

[OpenCode](https://opencode.ai) is an open-source autonomous AI coding agent that can read, write, and edit code with full project awareness. Think of it as an always-available AI developer that works directly in your codebase, handling everything from bug fixes to feature development through natural conversation.

Hosting OpenCode on Railway gives you a persistent, always-on AI coding assistant accessible from anywhere via a web browser or terminal. The deployment runs OpenCode's built-in web server, which handles authentication, serves the UI, and proxies requests to OpenCode's backend. With a persistent volume mounted at `/data`, your workspace, sessions, and state survive deployments and restarts—giving you a true long-running AI agent that remembers context across sessions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencodeRailwayTemplate | [LaceLetho/opencodeRailwayTemplate](https://github.com/LaceLetho/opencodeRailwayTemplate) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | INFO | - |
| `GITHUB_TOKEN` | (secret) | - |
| `ENABLE_MONITOR` | true | - |
| `CONTEXT7_API_KEY` | (secret) | - |
| `OPENCLAW_API_KEY` | (secret) | for openclaw hooks |
| `OPENCODE_VERSION` | 1.3.2 | - |
| `PLANETSCALE_API_TOKEN` | (secret) | - |
| `OPENCODE_SERVER_PASSWORD` | (secret) | default username: openwork |
| `OPENCODE_SERVER_USERNAME` | (secret) | don't change this value |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode)
