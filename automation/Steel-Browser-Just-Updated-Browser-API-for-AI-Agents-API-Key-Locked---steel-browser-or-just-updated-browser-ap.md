# Deploy Steel Browser | (Just Updated) Browser API for AI Agents, API-Key Locked on Railway

Steel Browser API for AI agents, API-key locked on every route

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steel-browser-or-just-updated-browser-ap)

## About

Steel Browser is an open-source browser API for AI agents and automation: a headless
Chromium fronted by a REST API for sessions, scraping, screenshots and PDF capture, plus a
raw Chrome DevTools Protocol (CDP) WebSocket that Puppeteer and Playwright connect to
directly. It is the self-hosted engine behind agent frameworks that need a real browser to
click, read and navigate the live web.

This template runs Steel Browser as a single service with **an API key in front of every
route** — the one thing the upstream project and the other Railway templates leave off.

Steel Browser ships with no authentication of any kind: no API key, no bearer token, no
basic auth anywhere in its code. On a public URL that means anyone who finds the address can
open browser sessions, drive Chromium over CDP, scrape and proxy through your instance — on
your bill and from your IP — and reach the other private services inside your Railway project.
It also expects to be told its own public domain and whether it is behind TLS, or the
`websocketUrl` it hands back to clients points at an internal address they cannot reach.

This image fixes both. It puts an nginx gateway on the port Railway injects and requires your
`STEEL_API_KEY` on every route except the health check, accepting it as an
`Authorization: Bearer` header, an `x-api-key` header, or an `?apiKey=` query parameter (the
query form is there because a CDP WebSocket client cannot send request headers). It refuses
to start on an empty key, and it derives the public domain and TLS setting at boot so returned
`wss://` URLs are correct — leaving `STEEL_API_KEY` as the only thing the deploy form asks for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| steel-browser | `ghcr.io/bon5co/steel-browser-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `STEEL_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/steel-browser-or-just-updated-browser-ap)
