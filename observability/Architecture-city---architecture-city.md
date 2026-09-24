# Deploy Architecture-city on Railway

Deploy and Host Architecture City with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/architecture-city)

## About

Architecture City is a browser-based 3D map of a software repository: systems become districts, files become towers, and evidence-labelled relationships become illuminated traces. This template deploys a static Caddy service that serves the viewer and a committed sample graph with **no environment variables and no API keys**.

Hosting this template means running a single Railway service from the GitHub repository root. Railway builds the included Dockerfile, starts Caddy on the injected `PORT`, health-checks `/health`, and serves `index.html` plus the architecture JSON over public HTTPS. WebGL rendering happens in the visitor's browser; Railway only delivers static assets (HTML, vendored Three.js, and graph JSON). There is no database, worker, or secret panel required for a working deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| asymmetry-city | [cheffer0723/asymmetry-city](https://github.com/cheffer0723/asymmetry-city) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/architecture-city)
