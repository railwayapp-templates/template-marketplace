# Deploy SubtitlePro on Railway

A web service overlaying Korean YouTube subtitles via AssemblyAI & Claude.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/subtitlepro)

## About

Subtitle Pro is a Next.js web application designed to automatically generate and overlay Korean subtitles on YouTube videos. By leveraging yt-dlp for audio extraction, AssemblyAI for speech-to-text recognition, and Claude for high-quality translation, it provides a seamless viewing experience for foreign-language content directly in your browser.

Hosting Subtitle Pro requires an environment capable of running Node.js and system-level audio processing tools. Railway simplifies this deployment by automatically provisioning the Next.js frontend and backend APIs within a single service using Nixpacks. Because the application extracts and processes media files on the fly, it relies heavily on system dependencies like `ffmpeg` and `yt-dlp`. Railway handles this seamlessly via Nixpacks configuration.

Additionally, Subtitle Pro caches completed translations locally to minimize API costs and improve load times for previously processed videos. This requires a persistent Railway Volume mounted directly to the application container. With Railway's HTTP proxy and custom domains, the application is exposed securely over HTTPS, allowing users to simply append a YouTube video ID to the URL and instantly view translated subtitles.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| subtitle-pro | [bilalnawaz072/subtitle-pro](https://github.com/bilalnawaz072/subtitle-pro) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | - |
| `ANTHROPIC_API_KEY` | (secret) | "your_anthropic_key_here" |
| `ASSEMBLYAI_API_KEY` | (secret) | "your_assemblyai_key_here" |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.cache`

**Category:** Other · **Languages:** TypeScript, CSS, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/subtitlepro)
