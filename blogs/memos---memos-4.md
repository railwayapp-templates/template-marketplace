# Deploy memos on Railway

Lightweight, open-source, self-hosted memo hub. Your notes, your server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-4)

## About

Memos is a lightweight, open-source, privacy-first memo hub built with Go and React. Capture ideas, code snippets, bookmarks, and daily thoughts in a clean, Markdown-powered interface you fully control — no external database, no complex config, just deploy and start writing.

Memos runs as a single Go binary backed by SQLite, making it incredibly lightweight at ~20MB idle memory. This template pulls the official `ghcr.io/usememos/memos:latest` Docker image directly and mounts a persistent volume at `/var/opt/memos` so your notes survive every restart and redeploy. One click, and you have a fully self-hosted knowledge base.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memos | `ghcr.io/usememos/memos:latest` | Database |

## Configuration

- **TCP Proxies:** 5230
- **Volume:** `/var/opt/memos`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/memos-4)
