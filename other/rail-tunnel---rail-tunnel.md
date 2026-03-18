# Deploy rail-tunnel on Railway

Self-hosted tunneling server for Railway - expose localhost to internet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rail-tunnel)

## About

Rail Tunnel is a professional tunneling server that exposes your local development servers to the internet via WebSocket connections. Built with Go, it enables developers to securely share localhost applications for testing, demos, and collaboration. Use `npx rail-tunnel tunnel --port  --remote https://your-app.railway.app` to instantly tunnel any local port.

Deploying rail-tunnel on Railway requires zero configuration - Railway automatically detects the Go application and builds it using the included Dockerfile. The server exposes WebSocket endpoints for tunnel clients and proxies HTTP requests to connected local development servers. After deployment, developers install the CLI (`npm install -g rail-tunnel`) and connect their local apps using the simple command format. Railway automatically handles environment variables like PORT and provides HTTPS endpoints for secure tunneling connections.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rail-tunnel | [isaui/rail-tunnel](https://github.com/isaui/rail-tunnel) | Worker |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/rail-tunnel)
