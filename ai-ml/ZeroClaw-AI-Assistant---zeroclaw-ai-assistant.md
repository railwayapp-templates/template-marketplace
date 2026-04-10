# Deploy ZeroClaw AI Assistant on Railway

Personal AI assistant with dashboard, persistent storage, and healthchecks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zeroclaw-ai-assistant)

## About

ZeroClaw is a personal AI assistant and gateway built in Rust, with a web dashboard, multi-channel integrations, and persistent workspace state. This Railway template deploys a thin wrapper around the official ZeroClaw Debian image, adds a persistent volume, and exposes the public gateway so users can get to a working dashboard quickly and then configure providers, channels, and workflows.

This template runs ZeroClaw as a single Railway service using a local Dockerfile built from the official `ghcr.io/zeroclaw-labs/zeroclaw:debian` image. The small wrapper ensures the `/zeroclaw-data` volume is initialized correctly on first boot, then ZeroClaw starts with a Railway-friendly public gateway config. The service stores its config and workspace under `/zeroclaw-data`, which is backed by a Railway volume so restarts and redeploys do not wipe the assistant state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zeroclaw | [leoisadev1/zeroclaw-deploy](https://github.com/leoisadev1/zeroclaw-deploy) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zeroclaw-data`

**Category:** AI/ML · **Languages:** Rust, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/zeroclaw-ai-assistant)
