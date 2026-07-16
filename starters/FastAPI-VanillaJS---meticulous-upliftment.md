# Deploy FastAPI + VanillaJS on Railway

A lightning-fast monorepo: FastAPI backend with VanillaJS frontend.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meticulous-upliftment)

## About

FastAPI + VanillaJS is a zero-bloat, lightning-fast fullstack template. It combines a high-performance Python backend with a clean, dependency-free JavaScript frontend, all managed seamlessly by the modern `uv` package manager. It’s designed for developers who want to ship rapidly without Node bundlers or heavy frameworks.

Hosting FastAPI + VanillaJS on Railway is a frictionless experience thanks to its unified, containerized monorepo architecture. The template includes a pre-configured Dockerfile that copies the `uv` binary, installs Python dependencies, and serves both the API and static frontend from a single process. Deployment is as simple as connecting your GitHub repository. Railway automatically detects the Dockerfile, injects the required `$PORT` environment variable, and utilizes the included `railway.toml` to monitor the `/health` endpoint, ensuring your app routes traffic correctly and remains highly available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FastAPI-VanillaJS-starter | [lNamelessl/FastAPI-VanillaJS-starter](https://github.com/lNamelessl/FastAPI-VanillaJS-starter) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, CSS, Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/meticulous-upliftment)
