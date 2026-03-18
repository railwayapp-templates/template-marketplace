# Deploy Podly on Railway

Podly creates ad-free podcast RSS feeds

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/podly)

## About

Podly creates ad-free podcast RSS feeds. Here's how it works:

1. Download podcast
2. Transcribe podcast
3. Use LLM to identify ads in the transcript
4. Remove ads
5. Serve the ad-free version of the podcast

Use the configuration UI to connect Podly to an LLM and transcription services. The recommended setup is to use groq which provides both.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jdrbc/podly-pure-podcasts:main-lite | `ghcr.io/podly-pure-podcasts/podly-pure-podcasts:main-lite` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GROQ_API_KEY` | (secret) | Groq API key - can be configured later |

## Configuration

- **Healthcheck:** `http://127.0.0.1:5001/`
- **Volume:** `/app/src/instance`

**Category:** Other

[View on Railway →](https://railway.com/template/podly)
