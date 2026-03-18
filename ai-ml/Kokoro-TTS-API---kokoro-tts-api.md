# Deploy Kokoro TTS API on Railway

FastAPI Wrapper for Kokoro Text to Speech

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kokoro-tts-api)

## About

Kokoro-FastAPI is a Dockerized FastAPI wrapper for the Kokoro-82M text-to-speech model. It provides OpenAI-compatible endpoints for multi-language speech synthesis with support for multiple audio formats, streaming, and voice combinations.

Deploying Kokoro-FastAPI on Railway gives you an OpenAI-compatible text-to-speech API. The service supports multiple output formats (MP3, WAV, Opus, FLAC, M4A, PCM), streaming audio with configurable chunk sizes, and multi-language synthesis including English, Japanese, and Chinese. Advanced features include weighted voice combinations, word-level timestamped captions, and natural boundary detection for automatic sentence-based splitting. A built-in web UI and API documentation are included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kokoro API | `ghcr.io/remsky/kokoro-fastapi-cpu:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8880 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kokoro-tts-api)
