# Deploy herdr on Railway

herdr: persistent terminal workspace server for AI coding agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/herdr)

## About

herdr is the runtime your coding agents live on: a terminal workspace manager that keeps agent sessions running on a server after you detach. Panes are marked working, blocked, or idle, layouts and agent sessions survive restarts, and agents can drive herdr through its CLI and socket API.

This template runs the pinned upstream herdr binary in headless server mode with `HOME` on a persistent volume at `/data` — the API socket, saved layouts, session state, and logs all survive redeploys. There is no web UI and no HTTP port: you attach from your own machine with the herdr client through `railway ssh`, and your terminal becomes the window onto the server's panes. The image ships git, curl, ripgrep, jq, tmux, and an SSH client so coding agents (Claude Code, Codex, OpenCode, …) have a sane environment; install anything else from inside a pane.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| herdr | `wotonews/herdr:v0.9.3-1` | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/herdr)
