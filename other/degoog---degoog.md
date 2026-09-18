# Deploy degoog on Railway

Self-hosted, privacy-friendly metasearch engine with extensions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/degoog)

## About

degoog is an open-source, privacy-friendly metasearch engine: it aggregates results from many search engines behind
one interface, with a pluggable extension system for customizing engines, ranking and integrations. This template
deploys degoog with its settings and extension area protected by a generated password. It is a community-maintained
template and is not affiliated with the degoog project.

degoog is a single server that renders the search UI, runs the metasearch, and hosts a settings/extensions area.
Its extensions run code on the server — so an instance whose settings area is left unlocked on a public URL can be
made to execute arbitrary code by anyone who finds it. degoog stores its configuration, installed extensions and
data on disk.

This template runs degoog on Railway with a generated `DEGOOG_SETTINGS_PASSWORDS` (so the settings and extension
area is always password-protected), its data persisted on a volume, and the port and health check wired. It runs the
official image unmodified, pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| degoog | `ghcr.io/degoog-org/degoog:0.26.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4444 | Port Railway routes traffic and health checks to; keep it equal to DEGOOG_PORT (4444). |
| `DEGOOG_PORT` | 4444 | Port degoog listens on; keep it equal to PORT (4444). |
| `DEGOOG_SETTINGS_PASSWORDS` | (secret) | Password for the settings/extensions area, generated. Extensions run code on the server, so keep it secret. Enter it to manage settings. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/degoog)
