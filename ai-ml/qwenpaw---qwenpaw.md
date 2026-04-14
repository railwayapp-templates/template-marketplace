# Deploy qwenpaw on Railway

Personal AI assistant with memory, skills, and multi-channel support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwenpaw)

## About

QwenPaw is a personal AI assistant platform. Railway runs it as a managed Docker deployment with automatic networking, logs, and simple scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qwenpaw | `agentscope/qwenpaw:v1.1.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `QWENPAW_PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/working`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qwenpaw)
