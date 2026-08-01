# Deploy Playlist Craft Self Host on Railway

A template for Playlist Craft Self Host Solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/playlist-craft-self-host)

## About

Playlist Craft Self Host is a full music-generation workspace you run on your own stack: singles and up to 20-track playlists, media/image/video backgrounds, custom renders, File Drive, personas, YouTube upload, and team tools. Bring your own API keys (Suno, OpenRouter, Fal). After deploy, activate with a one-time lifetime license from [playlistcraft.com](https://playlistcraft.com).

One-click deploy creates a Railway project with the web dashboard, main/s3/render/youtube servers, Postgres, and object storage. You add shared variables for your provider keys (and optional email/YouTube OAuth), finish `/setup` for the admin account, then unlock the UI with a license key. Creative data stays on your Railway stack—not a SaaS subscription inside the template. Full walkthrough: [Deploy guide](https://playlistcraft.com/docs/deploy-guide). Feature list: [Features](https://playlistcraft.com/features). License & pricing: [Pricing](https://playlistcraft.com/pricing) or [Get license](https://playlistcraft.com/get-license). You can deploy first and buy later, or buy first and paste the key after setup—activation is required either way.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| render-server | [juppfy/playlistcraft-self-host](https://github.com/juppfy/playlistcraft-self-host) (root: /render-api) | Web service |
| main-server | [juppfy/playlistcraft-self-host](https://github.com/juppfy/playlistcraft-self-host) (root: /server) | Web service |
| s3-server | [juppfy/playlistcraft-self-host](https://github.com/juppfy/playlistcraft-self-host) (root: /s3-server) | Web service |
| Frontend | [juppfy/playlistcraft-self-host](https://github.com/juppfy/playlistcraft-self-host) (root: /) | Web service |
| youtube-server | [juppfy/playlistcraft-self-host](https://github.com/juppfy/playlistcraft-self-host) (root: /youtube-upload-api) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | render-server | 8000 |
| `API_KEY` | render-server | (secret) |
| `SECRET_ACCESS_KEY` | render-server | (secret) |
| `OPENROUTER_API_KEY` | render-server | (secret) |
| `FAL_SCRIBE_MODEL_ID` | render-server | fal-ai/elevenlabs/speech-to-text/scribe-v2 |
| `OPENROUTER_SITE_URL` | render-server | https://playlistcraft.com |
| `OPENROUTER_SITE_NAME` | render-server | playlistcraft |
| `CAPTION_CHUNK_TARGET_MB` | render-server | 20 |
| `CAPTION_CHUNK_INITIAL_SECONDS` | render-server | 300 |
| `OPENROUTER_TRANSCRIPTION_MODEL` | render-server | openai/whisper-1 |
| `OPENROUTER_TRANSCRIPTION_TIMEOUT` | render-server | 600 |
| `PORT` | main-server | 4000 |
| `API_KEY` | main-server | (secret) |
| `SUNO_API_KEY` | main-server | (secret) |
| `RENDER_API_KEY` | main-server | (secret) |
| `RESEND_API_KEY` | main-server | (secret) |
| `ZEPTOMAIL_TOKEN` | main-server | (secret) |
| `S3_SERVER_API_KEY` | main-server | (secret) |
| `OPENROUTER_API_KEY` | main-server | (secret) |
| `YOUTUBE_UPLOAD_API_KEY` | main-server | (secret) |
| `PORT` | s3-server | 8080 |
| `PRESIGN_API_KEY` | s3-server | (secret) |
| `S3_SECRET_ACCESS_KEY` | s3-server | (secret) |
| `PRESIGN_EXPIRY_SECONDS` | s3-server | 604800 |
| `SUNO_API_KEY` | Frontend | (secret) |
| `AUTH_PROVIDER` | Frontend | better-auth |
| `BETTER_AUTH_SECRET` | Frontend | (secret) |
| `OPENROUTER_API_KEY` | Frontend | (secret) |
| `PLAYLIST_BACKEND_API_KEY` | Frontend | (secret) |
| `NEXT_PUBLIC_AUTH_PROVIDER` | Frontend | better-auth |
| `API_KEY` | youtube-server | (secret) |
| `YOUTUBE_STATE_SECRET` | youtube-server | (secret) |
| `YOUTUBE_CLIENT_SECRET` | youtube-server | (secret) |
| `YOUTUBE_TOKEN_ENC_KEY` | youtube-server | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Python, PLpgSQL, CSS, Procfile

[View on Railway →](https://railway.com/deploy/playlist-craft-self-host)
