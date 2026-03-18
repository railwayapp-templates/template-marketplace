# Deploy Lightpanda on Railway

The headless browser designed for AI and automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lightpanda)

## About

Lightpanda is the open-source browser made for headless usage:

- Javascript execution
- Support of Web APIs (partial, WIP)
- Compatible with Playwright, Puppeteer, chromedp through CDP

This template deploys the latest nightly build of Lightpanda Browser with the CDP server on port 9222. Use the included `CDP_ENDPOINT` for connecting your service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lightpanda | [arjunkomath/lightpanda-browser-railway](https://github.com/arjunkomath/lightpanda-browser-railway) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `CDP_ENDPOINT` | Lightpanda CDP server URL |

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/lightpanda)
