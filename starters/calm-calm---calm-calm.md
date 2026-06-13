# Deploy calm-calm on Railway

Real-time WebSocket color grid -- Deno, Hono, React & SolidJS monorepo

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-calm)

## About

Real-time WebSocket app — a live color grid synced across all connected
clients. Built with Deno 2, Hono, React, and SolidJS in a monorepo.

Runs as a single stateless Deno process serving the WebSocket backend and
static frontend assets on `0.0.0.0:8000`. Railway builds it via the included
Dockerfile and exposes it through a generated domain. No database or external
services required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ws-random-color-grid | [n-shkutov/ws-random-color-grid](https://github.com/n-shkutov/ws-random-color-grid) | Worker |

**Category:** Starters · **Languages:** TypeScript, CSS, HTML, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/calm-calm)
