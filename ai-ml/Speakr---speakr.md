# Deploy Speakr on Railway

Self-hosted AI audio transcription & notes with your own AI providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speakr)

## About

Speakr is an open-source, privacy-focused AI audio-notes app: upload or record audio and get transcripts, AI
summaries and titles, speaker labels, and a searchable, shareable note library — all on your own infrastructure,
using your own transcription and LLM providers. This template deploys the self-hosted Speakr server with your admin
account set from the template's variables and registration closed. It is a community-maintained template based on
Speakr; it is not affiliated with, endorsed by, or an official offering of the Speakr project, and it does not use
the Speakr logo.

Speakr runs as a single self-hosted server that serves its web app and REST API, storing recordings' metadata in
SQLite and the audio files on disk. Transcription (speech-to-text) and text generation (summaries, titles, chat) are
handled by external, OpenAI-compatible providers that you configure — the app itself keeps your recordings and notes
private on your own volume. It requires a login and its admin account is configured from environment variables, so a
weak or unset password would let anyone who finds the URL sign in.

This template runs Speakr on Railway with a generated admin password and registration turned off (so the instance is
admin-only from first boot), its data persisted on a volume, a secure session cookie, and the port and health check
wired. It runs the official image unmodified, pinned by digest, and asks you for your transcription and LLM API keys
at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `learnedmachine/speakr:0.10.5-alpha-lite@sha256:a0f28aa2a562596447290c632e4c0c11fa2a7d3f751c9b759f7eee4316a50664` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8899 | Port Railway routes traffic and health checks to (keep it 8899). |
| `SECRET_KEY` | (secret) | Secret key for signing sessions and CSRF tokens (generated; keep it stable). |
| `ADMIN_EMAIL` | admin@example.com | Email for the admin account — this is what you sign in with. |
| `ADMIN_PASSWORD` | (secret) | The admin's password, generated. Copy it from here to sign in. |
| `ADMIN_USERNAME` | (secret) | Username for the admin account created on first boot. |
| `TEXT_MODEL_NAME` | gpt-4o-mini | Text/LLM model name (e.g. gpt-4o-mini). |
| `ALLOW_REGISTRATION` | false | Whether anyone can self-register. Left false so only the admin exists; invite users from the admin panel. |
| `TEXT_MODEL_API_KEY` | (secret) | API key for the text/LLM provider. With the OpenAI defaults you can paste the same OpenAI key here and below. |
| `TEXT_MODEL_BASE_URL` | https://api.openai.com/v1 | OpenAI-compatible base URL for the text model used for summaries, titles and chat. |
| `TRANSCRIPTION_MODEL` | whisper-1 | Transcription model (whisper-1, or gpt-4o-transcribe-diarize for speaker labels). |
| `SESSION_COOKIE_SECURE` | true | Send the session cookie only over HTTPS (keep it true on Railway). |
| `TRANSCRIPTION_API_KEY` | (secret) | API key for the transcription provider. Required — the app will not start without a transcription provider configured. |
| `TRANSCRIPTION_BASE_URL` | https://api.openai.com/v1 | OpenAI-compatible base URL for the transcription (speech-to-text) provider. |
| `SKIP_EMAIL_DOMAIN_CHECK` | true | Skip the DNS/MX deliverability lookup when creating the admin (keep it true). |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/speakr)
