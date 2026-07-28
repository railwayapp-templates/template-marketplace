# Deploy Opengist on Railway

A Git-powered pastebin for versioned code snippets and notes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opengist)

## About

Opengist is an open-source, self-hosted pastebin powered by Git. It stores each snippet as a Git repository and provides a web interface for creating, organizing, versioning, searching, and sharing code, Markdown, notes, and small file collections with public, unlisted, or private visibility.

This community template deploys Opengist 1.14.0 from the official digest-pinned container image. Railway exposes the web application and Git-over-HTTP endpoint on port `6157`, checks `/healthcheck`, and mounts persistent storage at `/opengist` for the SQLite database, Git repositories, search index, sessions, logs, and generated encryption keys. The public URL is derived from Railway automatically, so deployment requires no credentials or manual variable input. SSH Git access is not exposed; HTTPS clone, pull, and push use the generated Railway domain. This template is not affiliated with or endorsed by the Opengist project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Opengist | `ghcr.io/thomiceli/opengist:1.14.0@sha256:692639712c24510a223264bf2540e1370fe3c0f44c9eddc6a832936e02446343` | Web service |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opengist`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/opengist)
