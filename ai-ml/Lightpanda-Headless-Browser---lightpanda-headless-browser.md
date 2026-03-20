# Deploy Lightpanda Headless Browser on Railway

Ultra-lightweight headless browser for AI agents and web automation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightpanda-headless-browser)

## About

Lightpanda is a headless browser built from scratch in Zig, designed specifically for AI agents and web automation. Unlike Chromium-based solutions, it uses 9x less memory and runs 11x faster while supporting JavaScript execution, Web APIs, and the Chrome DevTools Protocol (CDP) for Puppeteer and Playwright compatibility.

Deploying Lightpanda on Railway gives you a persistent, cloud-hosted CDP server that any application can connect to over WebSocket. The Docker-based build compiles Lightpanda from source using Zig, Rust, and a prebuilt v8 engine, producing a minimal Debian-based container with just the binary and tini for signal handling. Railway automatically injects the PORT environment variable and routes traffic through HTTPS/WSS. Once deployed, your backend services connect via Puppeteer or Playwright using the Railway-provided domain, enabling headless browsing without running Chrome on your application servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| browser | [lifeofjer/browser](https://github.com/lifeofjer/browser) | Web service |

## Configuration

- **Start command:** `/usr/bin/tini -- /bin/lightpanda serve --host 0.0.0.0 --port ${PORT:-9222} --log_level info`
- **Healthcheck:** `/json/version`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Zig, HTML, Rust, JavaScript, Makefile, Dockerfile, Nix, Go

[View on Railway →](https://railway.com/deploy/lightpanda-headless-browser)
