# Deploy orca on Railway

Remote Orca server: an agent development environment you pair devices to

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orca)

## About

[Orca](https://github.com/stablyai/orca) is an agent development environment: worktrees, terminals
and long-running coding-agent sessions in one workspace. This template deploys a **Remote Orca
Server** — Orca 1.4.203 running headless on Railway — so that workspace lives on a machine that
stays awake, and you pair your desktop, browser or phone to it.

Orca is an Electron desktop application, and upstream ships desktop packages rather than a container
image. This template installs the published Debian package, verified against a pinned digest, and
runs its documented `orca serve` mode. Running Electron headless on a platform container takes four
things that are easy to get wrong: a virtual display, one shared library the package does not
declare, a non-root user, and a disabled Chromium sandbox — all of them are handled in the image.

There is nothing to fill in before deploying. Orca mints a pairing identity on first boot and prints
the pairing URL to the deploy log, and a volume keeps that identity — along with your repositories,
agent accounts and configuration — across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| orca | [RockinPaul/orca_railway_template](https://github.com/RockinPaul/orca_railway_template) | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/orca)
