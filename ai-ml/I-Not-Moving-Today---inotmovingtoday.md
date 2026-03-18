# Deploy I Not Moving Today on Railway

AI video generator for Reels, TikTok,  Shorts & YouTube

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/inotmovingtoday)

## About

I Not Moving Today is an AI-powered video script generator for Reels, TikTok, Shorts, and YouTube. Upload images, describe your idea, and AI creates viral-worthy video scripts and generates videos with Google Veo 3.1. No video editing skills needed—just breathe and let the AI handle the creative work.

Hosting I Not Moving Today on Railway provides a fully managed Next.js deployment with automatic scaling. The application connects to Google Gemini API for AI-powered text analysis and Google Veo 3.1 for video generation. Simply configure your Gemini API key as an environment variable, and Railway handles the rest—SSL certificates, domain management, and container orchestration. The server version supports rate limiting for controlled API usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| main | `supra126/inotmovingtoday` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GEMINI_API_KEY` | (secret) | Gemini API Key (optional - if set, users get free access) |
| `VIDEO_PROVIDER` | veo | Video provider: mock (testing), veo (Google Veo 3.1) |
| `VEO_USE_STANDARD` | false | Veo quality mode: false = Fast (default), true = Standard (higher quality) |
| `RATE_LIMIT_ENABLED` | true | Enable rate limiting (default: true) |
| `NEXT_PUBLIC_SITE_URL` | - | Site URL for SEO (default: https://inotmoving.simoko.com) |
| `RATE_LIMIT_WINDOW_MS` | 60000 | Rate limit time window in ms (default: 60000) |
| `GEMINI_THINKING_BUDGET` | 2048 | Model thinking depth 0-24000 (default: 2048) |
| `RATE_LIMIT_MAX_REQUESTS` | 10 | Max requests per time window (default: 10) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/inotmovingtoday)
