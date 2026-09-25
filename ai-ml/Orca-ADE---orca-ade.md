# Deploy Orca ADE on Railway

Orca ADE server: run Claude Code, Codex and more in parallel worktrees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orca-ade)

## About

Orca is an open-source agent development environment (ADE) from Stably. It runs Claude Code, Codex, Gemini, OpenCode and other CLI coding agents in parallel, each in its own git worktree, with terminals, diff review and source control in one app. This template runs Orca's remote runtime (`orca serve`) on Railway, so your agents keep working when your laptop is closed and you can drive them from a browser, the Orca desktop app, or the Orca mobile app.

Orca ships as a desktop app, and its headless mode needs Electron's system libraries, a virtual X display and a non-root user. This template packages all of that into a prebuilt image, so a deploy is a pull and a roughly 20 second boot, with no source build.

The image includes:

- Orca 1.4.210, extracted from the official Linux AppImage
- Claude Code and OpenAI Codex CLIs, preinstalled
- Node.js 22, git, the GitHub CLI (`gh`), build-essential, Python 3 and ripgrep
- A persistent volume at `/data`: your projects, worktrees, agent logins and Orca settings survive redeploys

Access is protected by Orca's own pairing: a client needs the server's pairing credential (a device token plus an end-to-end encryption key). Anyone else who opens your URL only sees a "Connect to Orca" screen.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| orca | `ghcr.io/hmseeb/orca-railway:1.4.210` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6768 | Port orca serve listens on. Matches the public domain's target port. |
| `ORCA_PAIRING_ADDRESS` | - | Optional. Address clients dial. Leave empty to use this service's Railway domain; set it only when you attach a custom domain, e.g. https://orca.example.com |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/orca-ade)
