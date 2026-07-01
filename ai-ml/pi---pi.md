# Deploy pi on Railway

Run the Pi AI coding agent on Railway — browser terminal or SSH

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pi)

## About

[Pi](https://pi.dev) is **an open-source AI coding agent** — a terminal-native assistant (think
Claude Code, but open and provider-agnostic) that reads your repo, writes and edits code, runs
commands, and opens pull requests. This template gives it a **persistent home in the cloud** you can
reach two ways: open the **Railway public URL** to use Pi in a browser terminal, or `railway ssh`
in and run `pi` from a shell. Your auth, sessions, settings, and cloned repos live on a Railway
volume, so they survive redeploys.

This template builds a small Node 24 image with the **Pi CLI** (`@earendil-works/pi-coding-agent`),
`ripgrep` (which Pi's search tools require), `git`, the **GitHub CLI**, and **ttyd** — a tiny server
that exposes the Pi TUI over HTTP. The container's main process is ttyd, listening on `$PORT`, so
opening the service's public URL drops you straight into Pi in your browser. Because that terminal
runs as root with your provider keys, it is always protected by HTTP basic auth (`WEB_USERNAME` /
`WEB_PASSWORD`) over Railway's HTTPS; you can also `railway ssh` in independently. A `/workspace`
volume holds your repositories and Pi's entire `~/.pi/agent` directory (auth, sessions, settings,
installed packages), and your provider API keys come from Railway variables. Railway handles the
build, restarts on failure, and persists the volume across deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pi | [yuting1214/pi-railway](https://github.com/yuting1214/pi-railway) (root: pi) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WEB_PASSWORD` | (secret) |
| `WEB_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pi)
