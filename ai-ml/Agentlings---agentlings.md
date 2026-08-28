# Deploy Agentlings on Railway

Your own horde of agentlings, working real jobs you review

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentlings)

## About

Agentlings is a horde of small agentlings that march through a side-view 2D
world, pick up real coding and desk jobs, work them in per-job sandboxes, and
deliver results for you to review. Nothing they produce reaches the real world
until you promote it.

Deploying gives you an **install** of your own: one secrets file, one data
directory, one ledger, jobs running as you. There is no multi-tenancy — nobody
runs anything for you, and the maintainer cannot see your install.

One service, one volume at `/data`. Your secrets, ledger, levels, schedules and
job records live there and nowhere else, which is why a key you paste on Monday
still works after a rebuild on Tuesday. Lose the volume and you lose all of it.

`AGENTLINGS_PASSWORD` is the only variable the template asks for. Anyone with it
and your URL is you, so make it long — without it the server refuses to start
rather than put an ungated horde on a public address. To have your install do
real work you will also set a model credential, either `ANTHROPIC_API_KEY` or a
long-lived `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token`; a fresh `claude`
login does not exist in a container. Every other key — Telegram, GitHub, Brave
search, Google, any MCP server you add — is entered inside the app, checked with
one real call before it is stored, and lands in your secrets file on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Agentlings | [briant92/Agentlings](https://github.com/briant92/Agentlings) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AGENTLINGS_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, Python, PowerShell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/agentlings)
