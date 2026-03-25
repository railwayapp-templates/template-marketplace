# Deploy openmaic on Railway

OpenMAIC is an open-source AI multi-agent interactive classroom platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openmaic)

## About

[OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) (Open Multi-Agent Interactive Classroom) is an open-source AI learning platform that generates full classroom experiences from a prompt or document input. It combines multi-agent orchestration with scene generation (slides, quizzes, interactive HTML, and project-based activities), plus optional voice and whiteboard-style outputs.

This Railway template deploys OpenMAIC as a **single container service** using a pre-built Docker image (`xiaosong233/openmaic-railway:latest`) and exposes it on port `3000`. No external database is required by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openmaic | `xiaosong233/openmaic-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openmaic)
