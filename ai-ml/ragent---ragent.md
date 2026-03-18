# Deploy ragent on Railway

Claude Code in a Docker container. Access from any browser, anywhere.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragent)

## About

Ragent gives you a full Claude Code CLI experience in your browser — no local setup needed. It runs Claude Code inside a Docker container with a web terminal (xterm.js) accessible from any device, including mobile. Authenticate via API key or OAuth login directly in the terminal.

Hosting Ragent on Railway spins up a Docker container running a Node.js backend that creates a pseudo-terminal (PTY) connected to Claude Code CLI. The terminal is streamed to your browser via WebSocket. Railway handles the container lifecycle, persistent storage via a `/workspace` volume, and HTTPS automatically. You can optionally set HTTP Basic Auth credentials to protect your instance. The service starts in seconds and stays alive with Railway's restart-on-failure policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ragent | [Chris-bzst/ragent](https://github.com/Chris-bzst/ragent) | Worker |

**Category:** AI/ML · **Languages:** JavaScript, HTML, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ragent)
