# Deploy openmaic on Railway

Multi-agent AI classroom — one-click lessons from any topic. Self-hosted.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openmaic-1)

## About

Deploy OpenMAIC on Railway with one click. OpenMAIC (from Tsinghua's MAIC team)
is an open-source multi-agent learning platform: describe a topic or upload
your materials, and an AI teacher together with a classroom of agent students
builds a full lesson — slides, quizzes, interactive HTML simulations, and
project-based learning — in minutes.

This template deploys a fork of OpenMAIC tuned for Railway, with a Dockerfile
fixed for Railway's builder (upstream cache-mount directives removed) so the
image builds cleanly from source.

Hosting OpenMAIC on Railway gives you a private, always-on AI classroom with
zero infrastructure work. Railway builds the Docker image from your connected
GitHub repository, provides HTTPS automatically, and keeps a public URL live.
Self-hosting means your lesson content, uploaded materials, and API keys stay
under your control instead of a third-party SaaS. Because the service builds
from a fork you own, you can add features or pull upstream changes and every
push redeploys automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openmaic | [derekcheungsa/OpenMAIC](https://github.com/derekcheungsa/OpenMAIC) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, MDX, CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openmaic-1)
