# Deploy Browser Use on Railway

AI browser automation runtime with Chromium. Deploy in 1-click 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/browser-use-railway-template)

## About

Browser Use is an AI-powered browser automation runtime that lets agents interact with websites using Chromium. It combines browser control, LLM-driven decision making, and persistent browser data for tasks such as research, testing, scraping, navigation, and autonomous web workflows.

Hosting Browser Use on Railway gives you a ready-to-run Browser Use environment with Chromium and persistent storage.

This template uses the official Browser Use container image and is designed as an interactive browser automation runtime rather than a public REST API or Web UI.

After deployment, Browser Use is accessed from inside the Railway container using Railway Shell, SSH, or CLI-based container access.

A Railway volume is attached to `/data` so browser profiles and runtime data can persist across container restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `browseruse/browseruse:main` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Optional OpenAI API key (you can add again manual for claude, etc) |
| `BROWSER_USE_HEADLESS` | true | Run Chromium in headless mode |
| `BROWSER_USE_USER_DATA_DIR` | /data/profiles/default | Persistent browser profile directory |
| `BROWSER_USE_VERSION_CHECK` | true | Check for newer Browser Use versions |

## Configuration

- **Start command:** `/bin/bash -c 'while true; do sleep 3600; done'`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/browser-use-railway-template)
