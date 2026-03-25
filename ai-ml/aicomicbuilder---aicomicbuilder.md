# Deploy aicomicbuilder on Railway

AI Comic Builder is an open-source, AI-powered comic videos pipeline

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aicomicbuilder)

## About

[AI Comic Builder](https://github.com/twwch/AIComicBuilder) is an AI-driven comic animation platform that converts scripts into full video output through character extraction, storyboard generation, frame generation, and clip synthesis. It is built with Next.js, React, SQLite, and FFmpeg.

This Railway template deploys AI Comic Builder as a **single container service** using the upstream Docker image `twwch/aicomicbuilder:0.1.0` and exposes it on port `3000`. It uses one mounted volume at `/app/data` for persistence, and `UPLOAD_DIR` is set to `/app/data/uploads` so generated assets are persisted in the same volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aicomicbuilder | `twwch/aicomicbuilder:0.1.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `UPLOAD_DIR` | /app/data/uploads |
| `DATABASE_URL` | file:/app/data/aicomic.db |
| `OPENAI_MODEL` | gpt-4o |
| `GEMINI_API_KEY` | (secret) |
| `OPENAI_API_KEY` | (secret) |
| `SEEDANCE_MODEL` | doubao-seedance-1-5-pro-250528 |
| `KLING_SECRET_KEY` | (secret) |
| `SEEDANCE_API_KEY` | (secret) |
| `SEEDANCE_BASE_URL` | https://ark.cn-beijing.volces.com/api/v3 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/aicomicbuilder)
