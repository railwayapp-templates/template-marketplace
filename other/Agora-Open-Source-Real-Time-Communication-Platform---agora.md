# Deploy Agora (Open-Source Real-Time Communication Platform) on Railway

Agora [May ’26] (Enable Voice, Video & Chat in Apps) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agora)

## About

Agora is a leading real-time engagement (RTE) platform that enables developers to integrate live audio, video, and interactive streaming capabilities into any application. It powers millions of real-time connections every day - from virtual classrooms and live events to telehealth and social networking apps. With its robust SDKs and APIs, Agora lets developers build immersive experiences that connect people across the world with low latency and high reliability.

You can self-host Agora services on Railway to gain full control over your deployment environment. Hosting on Railway means you can deploy your own backend services, authentication layer, and media routing logic while leveraging Agora’s SDKs for seamless real-time communication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agora-token-service | [AgoraIO-Community/agora-token-service](https://github.com/AgoraIO-Community/agora-token-service) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_ID` | - | Login to the Agora Dashboard, and navigate to the "Projects" to copy APP_ID |
| `APP_CERTIFICATE` | - | Login to the Agora Dashboard, and navigate to the "Projects" to copy APP_CERTIFICATE |
| `CORS_ALLOW_ORIGIN` | * | - |

**Category:** Other · **Languages:** Go, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/agora)
