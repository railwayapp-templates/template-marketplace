# Deploy tlbx on Railway

Browser terminal and coding-agent workstation with a persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tlbx)

## About

[tlbx](https://github.com/tlbx-ai/tlbx) is a self-hosted terminal multiplexer you reach from a
browser: persistent shells, a file and Git view, and dedicated sessions for coding agents like
Claude Code, Codex, Gemini CLI and OpenCode. This template runs it as a workstation you can open
from a laptop, a tablet or a phone.

tlbx expects to run on a machine you own, and it has no HTTP mode at all — it serves HTTPS with a
certificate it generates for itself. Railway's edge speaks plain HTTP to a container, so this
template puts a small gateway in front: the gateway is the only service reachable from the internet,
it answers the platform health check itself, and it forwards to tlbx over HTTPS on the private
network. Getting the forwarded headers wrong here produces a deployment that looks perfect and does
not work, so the gateway configuration is the substance of this template.

The login password is generated for you rather than typed into a deploy form, and a volume keeps
your home directory, your repositories and your installed toolchains across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | [RockinPaul/tlbx_railway_template](https://github.com/RockinPaul/tlbx_railway_template) (root: /caddy) | Web service |
| tlbx | [RockinPaul/tlbx_railway_template](https://github.com/RockinPaul/tlbx_railway_template) (root: /tlbx) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TLBX_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/tlbx)
