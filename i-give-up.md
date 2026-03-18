# Deploy I Give Up on Railway

AI video generator for Reels/TikTok/Shorts using Google Gemini & Veo

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/i-give-up)

## About

I Give Up is an AI-powered marketing content generator. Upload a product image, and AI creates professional ad visuals, brand strategies, and multi-platform content in seconds. No design skills needed—just breathe and let the AI handle the grind.

Hosting I Give Up on Railway provides a fully managed Next.js deployment with automatic scaling. The application connects to Google Gemini API for AI-powered text analysis and image generation. Simply configure your Gemini API key as an environment variable, and Railway handles the rest—SSL certificates, domain management, and container orchestration. The server version supports rate limiting and optional Cloudflare Zero Trust integration for enterprise use cases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| main | `supra126/igiveup` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CF_ACCESS_AUD` | - | Cloudflare Access application AUD tag (optional) |
| `GEMINI_API_KEY` | (secret) | Gemini API Key (optional - if set, users get free access) |
| `GEMINI_TEXT_MODEL` | gemini-2.5-flash | Text analysis model (default: gemini-2.5-flash) |
| `GEMINI_IMAGE_MODEL` | gemini-3-pro-image-preview | Image generation model (default: gemini-3-pro-image-preview) |
| `RATE_LIMIT_ENABLED` | true | Enable rate limiting (default: true) |
| `CF_ACCESS_TEAM_NAME` | - | Cloudflare Zero Trust team name (optional) |
| `NEXT_PUBLIC_SITE_URL` | - | Site URL for SEO (default: https://igiveup.simoko.com) |
| `RATE_LIMIT_WINDOW_MS` | 60000 | Rate limit time window in ms (default: 60000) |
| `GEMINI_THINKING_BUDGET` | 2048 | Model thinking depth 0-24000 (default: 2048) |
| `RATE_LIMIT_MAX_REQUESTS` | 2 | Max requests per time window (default: 2, Gemini free tier limit) |
| `GEMINI_MAX_OUTPUT_TOKENS` | (secret) | Max output tokens 1024-65536 (default: 16384) |
| `SERVER_ACTIONS_BODY_SIZE_LIMIT` | 20mb | Server Actions body size limit (default: 20mb) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/i-give-up)
