# Deploy Logseq on Railway

Open-source platform for knowledge management and collaboration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logseq)

## About

Logseq is a privacy-first, open-source knowledge base and outliner. It operates on top of local plain-text Markdown and Org-mode files, ensuring you own your data. Featuring bidirectional links, task management, and flashcards, Logseq helps you organize thoughts and build a personal, interconnected wiki.

Hosting the Logseq web application allows you to access your workspace from any browser without installing a dedicated desktop or mobile client. Deploying this template sets up the official Logseq web app container (`ghcr.io/logseq/logseq-webapp:latest`) as a single, stateless service. 

Because Logseq is a local-first application that uses the browser's File System Access API to read your local files, the hosted web app doesn't require a backend database or complex server-side storage volumes. You are simply serving the frontend application. Your actual notes remain safely stored on your local device or synced via your preferred cloud provider, ensuring complete data privacy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Logseq | `ghcr.io/logseq/logseq-webapp:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Default port for Logseq |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/logseq)
