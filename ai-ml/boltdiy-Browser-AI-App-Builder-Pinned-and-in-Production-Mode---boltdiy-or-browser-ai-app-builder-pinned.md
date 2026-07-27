# Deploy bolt.diy | Browser AI App Builder, Pinned and in Production Mode on Railway

bolt.diy on Railway: pinned build, production mode, no keys demanded

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/boltdiy-or-browser-ai-app-builder-pinned)

## About

bolt.diy is an AI app builder that runs the whole project in your browser: you describe what you want, it writes the code, installs the packages and runs a dev server in a WebContainer, and you watch the preview update.

This template runs the official image pinned to a specific build, in production mode, and asks you for nothing before deploying.

Both of those are corrections. Upstream publishes only a moving `latest` tag and per-commit builds, so an unpinned template silently changes underneath you; this one pins the commit build. And the widely copied bolt.diy template on Railway sets NODE_ENV=development along with the Vite HMR variables from the local docker-compose profile - a dev server, with hot-reload pointed at localhost, behind a public proxy. That is not a configuration that works over the internet.

The other difference is what the deploy form asks for. The common template declares a dozen provider API keys with empty values, and Railway turns every empty value into a required field, so you have to supply keys for twelve different AI providers before the Deploy button will even light up. bolt.diy takes API keys in its own settings screen, per provider, whenever you actually want one. This template asks for nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bolt-diy | `ghcr.io/stackblitz-labs/bolt.diy:sha-2e254ac` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 5173 |
| `NODE_ENV` | production |
| `VITE_LOG_LEVEL` | info |
| `DEFAULT_NUM_CTX` | 32768 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/boltdiy-or-browser-ai-app-builder-pinned)
