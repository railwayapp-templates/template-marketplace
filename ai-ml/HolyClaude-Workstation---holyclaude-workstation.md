# Deploy HolyClaude Workstation on Railway

AI coding workstation: Claude Code, web UI, headless browser, 8 AI CLIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/holyclaude-workstation)

## About

[HolyClaude](https://github.com/CoderLuii/HolyClaude) is an AI coding workstation in a single
container: Claude Code with a browser UI, a headless Chromium, eight AI CLIs — Codex, Gemini,
Cursor, Junie, OpenCode, Pi, TaskMaster — and around fifty development tools, supervised by
s6-overlay.

This template runs it on Railway with its state on a volume and its web UI behind a password
generated for your deployment. One service, one volume, a public domain. The deploy form asks for
nothing.

The container runs CloudCLI, the web UI, on port 3001 behind Railway's edge, with Claude Code and
the other CLIs installed alongside it and Chromium available for screenshots and browser testing.
Upstream is built for Docker Compose — bind mounts, a port published only on `127.0.0.1`, and a
person who creates the account in the browser — so this template adapts three things and changes
nothing else.

The volume mounts at `/home/claude/.claude`, the application's own state directory, because
upstream refuses to start when that path is a symlink and a mount over `/home/claude` would hide
the Claude Code binary the image installs. Your projects live at `/workspace`, which is symlinked
into that volume. The account database, and with it the signing secret for your session, sits on
the volume too — so a redeploy does not sign you out.

Registration is the part that needed the most care. CloudCLI is single-user: the first request to
create an account wins, and every later one is refused. That is safe on a laptop and unsafe on a
public URL, so the entrypoint creates the account itself — against a loopback-only instance of the
server, before the public one starts — and refuses to boot if that fails.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| holyclaude | [RockinPaul/holyclaude_railway_template](https://github.com/RockinPaul/holyclaude_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Port the web UI listens on; Railway's healthcheck and the public domain both use it. Leave it as it is. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Use an Anthropic API key instead of signing in to your Claude subscription from the web UI. |
| `CLOUDCLI_PASSWORD` | (secret) | Password for the web UI account 'admin', created on first boot. Generated for this deployment; read it from the service variables afterwards. Nothing to fill in. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Token from `claude setup-token` on your own machine, for Pro/Max plans. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/claude/.claude`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/holyclaude-workstation)
