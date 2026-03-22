# Deploy Next.js + AI SDK on Railway

Next.js AI Chat Template using Vercel AI SDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-ai-sdk)

## About

Next.js + AI SDK combines Next.js 16's App Router with Vercel's AI SDK to create AI-powered applications with streaming text generation. This template provides a single-page interface for streaming completions using OpenAI's GPT-5 mini model, with real-time visual indicators and a Docker-optimized deployment.

This template deploys a production-ready Next.js application with integrated AI streaming capabilities. The setup uses Docker multi-stage builds with Next.js standalone output for minimal image sizes and fast cold starts. The application includes built-in health checks for Railway's monitoring, streams responses directly from OpenAI using the AI SDK's `streamText` and `useCompletion` hooks, and requires only an OpenAI API key to function. No database or persistent storage is needed, making it ideal for lightweight AI interaction demos and prototypes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-next-ai-sdk | [LouisPetrik/railway-next-ai-sdk](https://github.com/LouisPetrik/railway-next-ai-sdk) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nextjs-ai-sdk)
