# Deploy Coshell on Railway

Multiplayer AI coding workspace where your team and AI agents work together

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coshell)

## About

Coshell is a multiplayer cloud terminal for engineering teams working with AI coding agents. Several people can prompt the same live agent session inside one shared environment, with a filesystem, a command execution environment, and an integrated localhost browser. Claude Code and Codex made one person faster. Coshell makes the whole team work with the agent together, across 70+ models.

This template runs a Coshell **drive**: the persistent workspace a team's code, environment and agent sessions live in. It is one container with one volume, and no public endpoint. The drive listens only on localhost and reaches Coshell over an outbound WebSocket tunnel, so nothing about it is exposed to the internet and there is no ingress to configure.

You bring one enrollment token from your Coshell dashboard. The container exchanges it for a registered drive on first boot and connects itself, which takes a few minutes on the first build and seconds after that. Redeploying re-attaches to the same drive rather than creating another, so sessions and files survive updates. Coshell never meters a self-hosted drive; you pay Railway for the compute and nothing else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coshell-deploy | [shelltabhq/coshell-deploy](https://github.com/shelltabhq/coshell-deploy) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `COSHELL_DRIVE_NAME` | - | optional, display name only |
| `COSHELL_ENROLL_TOKEN` | (secret) | Paste the enrollment token from your Coshell dashboard |

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/coshell)
