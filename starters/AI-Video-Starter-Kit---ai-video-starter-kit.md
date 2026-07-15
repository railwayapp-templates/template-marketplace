# Deploy AI Video Starter Kit on Railway

Build and deploy AI video apps with multiple AI models in minutes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-video-starter-kit)

## About

AI Video Starter Kit is a production-ready template for building AI-powered video applications with Next.js, Remotion, and fal.ai. It provides browser-native video processing, AI video generation, media composition, voiceover support, and reusable UI components, making it an excellent foundation for developers building modern AI video creation tools.

![Video Starter](https://github.com/fal-ai-community/video-starter-kit/raw/main/src/app/opengraph-image.png?raw=true)

Hosting AI Video Starter Kit on Railway allows you to deploy the included Next.js application without managing servers or infrastructure. Railway automatically builds the application from the repository's Dockerfile (when present) or standard Node.js build process and provides managed networking with HTTPS-enabled public domains. The application primarily performs AI-powered video generation through the fal.ai API while storing browser-side project data in IndexedDB, eliminating the need for a traditional database. Optional integrations such as UploadThing for file uploads and Upstash Redis for shareable links can be configured through Railway Variables. Railway also makes it easy to scale the application, manage environment variables, and connect additional services as your workload grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| video-starter-kit | [iqbalexperience/video-starter-kit](https://github.com/iqbalexperience/video-starter-kit) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KV_URL` | x.y.x | https://upstash.com required if you want to the share button |
| `FAL_KEY` | x.y.x | # https://fal.ai/dashboard/keys |
| `KV_REST_API_URL` | x.y.x | - |
| `KV_REST_API_TOKEN` | (secret) | - |
| `UPLOADTHING_TOKEN` | (secret) | https://uploadthing.com required if you want to use file upload |
| `KV_REST_API_READ_ONLY_TOKEN` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/ai-video-starter-kit)
