# Deploy Browser Use on Railway

AI browser automation runtime with Chromium. Deploy in 1-click 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/browser-use)

## About

[Browser Use](https://github.com/browser-use/browser-use) is an open-source Python framework that lets AI agents control a real web browser: it reads pages, clicks, types, navigates, and extracts data like a human would. This template self-hosts it as a ready-to-use REST API + web dashboard running headless Chromium, so your agents can automate any website from a single HTTP call.

This template deploys one Docker service that packages the official `browser-use` library (v0.13.x) behind a lightweight FastAPI server. The container ships with headless Chromium and all required fonts pre-installed, so no browser setup is needed. Each submitted task runs asynchronously in its own browser session; results are queryable via REST or watched live from the built-in dashboard at `/`. A persistent Railway volume stores agent configuration and downloaded files across redeploys. The only thing you must provide is one LLM API key (Google Gemini's free tier works), set as an environment variable right after deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Browser Use | [BURNI80/browser-use-railway-template](https://github.com/BURNI80/browser-use-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/browser-use)
