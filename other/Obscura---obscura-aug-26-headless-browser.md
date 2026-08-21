# Deploy Obscura on Railway

Headless browser for AI agents and scraping. CDP on 9222.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/obscura-aug-26-headless-browser)

## About

Obscura is a headless browser built for AI agents and web scraping. You connect to it over the Chrome DevTools Protocol (CDP) on port 9222 and control a real browser from your code.

Single Dockerfile, single service. The browser runs inside the container and exposes CDP over HTTP. No GPU, no special hardware. Connect from any Puppeteer, Playwright, or CDP client.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| obscura | [h4ckf0r0day/obscura](https://github.com/h4ckf0r0day/obscura) | Worker |

**Category:** Other · **Languages:** Rust, Python, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/obscura-aug-26-headless-browser)
