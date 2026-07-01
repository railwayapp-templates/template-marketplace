# Deploy blinko on Railway

AI-powered card-based note-taking with RAG. Chat with your notes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blinko)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/blinko)

> **Canonical code:** `blinko` — deploy URL: https://railway.com/new/template/blinko

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-blinko/main/og-image.svg)

Blinko is an AI-powered, card-based note-taking app with RAG (Retrieval-Augmented Generation). Capture ideas, chat with your notes, and let AI help you connect thoughts — all self-hosted on Railway.

Blinko runs as a single container with a Railway-managed PostgreSQL database. Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures. All notes and AI embeddings are stored in PostgreSQL — no persistent volume required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blinko | `blinkospace/blinko:1.8.8` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/blinko)
