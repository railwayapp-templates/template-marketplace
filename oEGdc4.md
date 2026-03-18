# Deploy SearXNG - metasearch on Railway

metasearch engine - easily integrate with your AI apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/oEGdc4)

## About

SearxNG is an open-source metasearch engine that ensures user privacy by not tracking searches. Self-hosting offers complete data control, customization options, an ad-free experience, and no reliance on third-party servers. It allows integration with other services and benefits from community support, making it a strong choice for privacy-conscious users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | [Chinpeerapat/searxng](https://github.com/Chinpeerapat/searxng) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `UWSGI_THREADS` | 4 |
| `UWSGI_WORKERS` | 4 |
| `SEARXNG_SECRET` | (secret) |
| `UWSGI_SETTINGS_PATH` | /etc/searxng/uwsgi.ini |
| `SEARXNG_SETTINGS_PATH` | /etc/searxng/settings.yml |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/etc/searxng/`

**Category:** Other · **Languages:** Python, Shell, HTML, Less, JavaScript, CSS, Emacs Lisp, Dockerfile, Makefile, Lua

[View on Railway →](https://railway.com/template/oEGdc4)
