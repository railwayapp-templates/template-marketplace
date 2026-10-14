# Deploy CloudCLI (Claude Code UI) – Web UI for Claude Code & Codex on Railway

Claude Code, Codex and OpenCode in your browser with automatic updates.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudcli-claude-code-ui)

## About

CloudCLI is a web interface for Claude Code and Codex. You get chat, a file browser, a code editor, git and a terminal in the browser, so you can run a coding agent from any device, including your phone.

This template runs CloudCLI on a Railway service with Claude Code, OpenAI Codex and OpenCode already installed. A volume at `/data` keeps your projects, chat history and agent logins across redeploys.

Out of the box, CloudCLI lets the first visitor to a new install create the only account. That's fine on localhost, but on a public URL a stranger could get there first. This template creates your account from the `CLOUDCLI_USERNAME` and `CLOUDCLI_PASSWORD` variables before the site goes live.

After deploying:

1. Open the generated URL and sign in as `admin`. Your password is in the service's Variables tab.
2. Click Login next to Claude Code and follow the link. A Pro or Max subscription works, or set `ANTHROPIC_API_KEY` instead.
3. Clone a repo into `~/projects` and start working.

It updates automatically. New CloudCLI releases are tested and ready within a day, and new Claude Code, Codex and OpenCode versions are added weekly. Railway shows you an update notice when one is ready. Applying it is up to you, and your data stays on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudCLI | [aimranov27/cloudcli-railway](https://github.com/aimranov27/cloudcli-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Optional. An OpenAI API key for Codex. Leave empty to log in to Codex from the app instead. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. An Anthropic API key (sk-ant-…) for Claude Code. Leave empty to log in with your Claude Pro/Max subscription from the app instead. |
| `CLOUDCLI_PASSWORD` | (secret) | Password for signing in to CloudCLI. A random one is generated for you. Changing it later has no effect. Change your password in CloudCLI's settings instead. |
| `CLOUDCLI_USERNAME` | (secret) | Username for signing in to CloudCLI. The account is created automatically on first boot. |
| `OPENROUTER_API_KEY` | (secret) | Optional. An OpenRouter API key for OpenCode. One key gives you access to many models. Leave empty to log in from the app instead. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. A long-lived Claude subscription token, created by running `claude setup-token` on your own computer. Lets Claude Code use your subscription without logging in inside the app. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cloudcli-claude-code-ui)
