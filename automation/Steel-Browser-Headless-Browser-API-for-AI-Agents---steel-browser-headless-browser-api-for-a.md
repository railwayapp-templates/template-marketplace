# Deploy Steel Browser (Headless Browser API for AI Agents) on Railway

Open-source headless browser API for AI agents: CDP, Puppeteer, Playwright

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steel-browser-headless-browser-api-for-a)

## About

Steel Browser is an open-source headless browser API purpose-built for AI agents and automation. It runs managed Chromium sessions with a REST API and a Chrome DevTools Protocol (CDP) endpoint, so Puppeteer, Playwright, Selenium, browser-use, Stagehand and LangChain agents can drive a real browser without you managing Chrome yourself. It adds session management, a live session viewer, proxy support, cookie/context persistence, PDF and screenshot capture, and anti-bot-friendly defaults.

This template deploys the official `ghcr.io/steel-dev/steel-browser` image as one service on port 3000 with a public domain and a `/v1/health` check. `DOMAIN` is wired to your Railway public domain and `USE_SSL=true`, so the API returns correct `wss://` CDP URLs and the built-in session viewer works over HTTPS. `CDP_REDIRECT_PORT` keeps DevTools connections working behind Railway's proxy. Steel is stateless (sessions live in memory), so no volume is needed. Give it 1–2 GB of RAM for a handful of concurrent sessions; Railway's usage-based billing means idle time is nearly free.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Steel Browser | `ghcr.io/steel-dev/steel-browser:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind address |
| `PORT` | 3000 | Port the Steel API listens on |
| `DOMAIN` | - | Public hostname used to build session and CDP URLs |
| `USE_SSL` | true | Return https/wss URLs (Railway terminates TLS) |
| `CDP_REDIRECT_PORT` | 9223 | Internal port used to redirect CDP connections |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Tags:** steel, headless-browser, puppeteer, playwright, ai-agent, browser-automation, scraping, cdp

[View on Railway →](https://railway.com/deploy/steel-browser-headless-browser-api-for-a)
