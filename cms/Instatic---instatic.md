# Deploy Instatic on Railway

Self-hosted visual CMS with AI page builder for static sites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic)

## About

Instatic is a modern self-hosted visual CMS and AI-powered website builder for creating, editing, and publishing clean static websites.

This template uses the `corebunch/instatic` image and is designed for a lightweight Railway deployment with persistent storage support.

![Instatic](https://opengraph.githubassets.com/4a3fa291732195ae8467266dd5a49902a29d66a2efa92dcdd854c9c7a7e035f3/corebunch/instatic)

Instatic is a modern self-hosted visual CMS that combines a powerful canvas editor, AI page builder, content management, and static site publisher in a single Bun server. It outputs clean semantic HTML and compact CSS with zero framework runtime.

This template is perfect for users who want full ownership of their website builder without expensive monthly fees or vendor lock-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| instatic | `ghcr.io/corebunch/instatic` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `STATIC_DIR` | /app/dist |
| `UPLOADS_DIR` | /app/storage/uploads |
| `DATABASE_URL` | sqlite:/app/storage/data/cms.db |
| `INSTATIC_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic)
