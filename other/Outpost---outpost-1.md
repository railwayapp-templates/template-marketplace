# Deploy Outpost on Railway

Private, browser-based FreeCAD with your work auto-saved to your own GitHub

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outpost-1)

## About

Outpost is a private, browser-based FreeCAD workstation — no local installation
required. Sign in with your own GitHub account and design inside a full CAD
session streamed straight to your browser tab. Your work saves directly to a
git repository you own, so your files stay usable outside the browser too.

Hosting Outpost means running one Railway service: a small Go authentication
shim (the gatekeeper) sitting in front of a containerized FreeCAD desktop,
streamed over WebSocket. The gatekeeper handles GitHub device-flow sign-in,
pins access to a single GitHub account you specify, and hands your session's
token straight to the CAD environment's git integration — one login doubles as
your git credential. The first deploy takes a few minutes, since Railway is
building and setting up a full FreeCAD environment from scratch; every deploy
after that is fast. Because your files live in a git repo, not on the server,
the running instance itself is fully disposable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Outpost | [nerd-sniped/Outpost](https://github.com/nerd-sniped/Outpost) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_MODE` | gatekeeper | - |
| `SESSION_SECRET` | (secret) | - |
| `ALLOWED_GITHUB_USER` | (secret) | Your GitHub Username (This grants that account access)  |

**Category:** Other · **Languages:** Go, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/outpost-1)
