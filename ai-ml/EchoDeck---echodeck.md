# Deploy EchoDeck on Railway

Generate a mp4 from powerpoint with TTS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/echodeck)

## About

EchoDeck is an MCP server that converts PowerPoint presentations into narrated MP4 videos. Connect it to Claude, drop in a .pptx file, choose a voice, and receive a fully assembled video with per-slide narration generated from your speaker notes.

EchoDeck runs as a single containerized service built on .NET 10 and ASP.NET Core. It exposes an MCP endpoint that Claude connects to as a Custom Connector, plus a set of REST endpoints for file upload and job management. When a video is requested, EchoDeck extracts slides from the PowerPoint, generates audio for each slide's speaker notes via ElevenLabs or Google Gemini TTS, and assembles the final MP4 using FFmpeg. Jobs are stored on a mounted Railway Volume and automatically cleaned up after a configurable retention period.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EchoDeck | [FixedScope/EchoDeck](https://github.com/FixedScope/EchoDeck) (branch: beta-0.1) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | - |
| `TEST_MODE` | false | true | false | Enables public facing website to manually upload PPTX |
| `MCP_AUTH_KEY` | (secret) | - |
| `GEMINI_API_KEY` | (secret) | - |
| `SLIDE_RENDERER` | officeOnline | - |
| `ELEVENLABS_VOICES` | Bella:hpp4J3VqNfWAUOO0d1Us,Harry:SOYHLrjzK2X1ezoPC6cr | Format: Name:voiceid;Name2:voiceid2;Name3:voiceid3 |
| `DEFAULT_RESOLUTION` | 1920x1080 | - |
| `DEFAULT_TRANSITION` | crossfade | - |
| `ELEVENLABS_API_KEY` | (secret) | Sign up here https://elevenlabs.io/app/developers/api-keys |
| `MAX_CONCURRENT_TTS` | 3 | - |
| `JOB_RETENTION_HOURS` | 24 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** C#, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/echodeck)
