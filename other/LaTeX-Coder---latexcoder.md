# Deploy LaTeX Coder on Railway

Open-source alternative of Overleaf

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/latexcoder)

## About

Hosting is very simple. See the following instructions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| latexcoder | [EvoEvolver/latexcoder](https://github.com/EvoEvolver/latexcoder) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LATEXCODER_PORT` | 8080 | - |
| `LATEXCODER_ADMIN_PASSWORD` | (secret) | Password for the user `admin` |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 2222
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/latexcoder)
