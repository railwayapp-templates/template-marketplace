# Deploy Podly Preview on Railway

(Preview) Podly creates ad-free podcast RSS feeds

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/podly-preview)

## About

Podly creates ad-free podcast RSS feeds. Here's how it works:

Download podcast
Transcribe podcast
Use LLM to identify ads in the transcript
Remove ads
Serve the ad-free version of the podcast

Use the configuration UI to connect Podly to an LLM and transcription services. The recommended setup is to use groq which provides both.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jdrbc/podly-pure-podcasts:preview-lite | `ghcr.io/podly-pure-podcasts/podly-pure-podcasts:preview-lite` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GROQ_API_KEY` | (secret) | You can set this later in config |
| `REQUIRE_AUTH` | true | Set for true for public railway deployments |
| `PODLY_ADMIN_PASSWORD` | (secret) | administrator password |

## Configuration

- **Volume:** `/app/src/instance`

**Category:** Other

[View on Railway →](https://railway.com/deploy/podly-preview)
