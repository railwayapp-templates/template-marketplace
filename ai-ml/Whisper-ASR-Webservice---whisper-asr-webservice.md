# Deploy Whisper ASR Webservice on Railway

Self-hosted Whisper speech-to-text API with subtitles, behind a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whisper-asr-webservice)

## About

Whisper ASR Webservice turns recorded speech into text. Send it an audio or video file over HTTP and
it returns a transcript, subtitles in SRT or WebVTT, or just the language it detected. It runs
OpenAI's Whisper models on your own instance, so nothing is sent to a third-party transcription API
and there is no per-minute bill. This is a community-maintained template; it is not affiliated with
the upstream project.

Hosting it is simple in shape and has one sharp edge. The shape is a single Python service with no
database, no cache and no queue: one container, one volume holding the downloaded model. The sharp
edge is that the application has no authentication at all. It defines three routes and none of them
checks a credential, because the project is designed to sit on a private network behind something
else. On a platform that hands every service a public address, that assumption stops being true the
moment the deploy finishes, and an open transcription endpoint is a bill waiting to happen.

This template puts a password in front of the application and binds the application itself to
loopback, so the only way in is through the front door. The password is generated for you. One
route stays open, the health route, and it returns a single status word so the platform can tell
whether the model has finished loading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whisper | `ghcr.io/youssefsiam38/whisper-asr-railway:1.0.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used for timestamps. |
| `PORT` | 8000 | Port the front door listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `ASR_MODEL` | base | Whisper model. tiny, base and small are the practical choices on a CPU plan; the large family is slow without a GPU. |
| `WHISPER_AUTH_PASSWORD` | (secret) | Password for that prompt. Whisper ASR Webservice has no login of its own, so this is what stops strangers transcribing on your instance. |
| `WHISPER_AUTH_USERNAME` | (secret) | Username for the password prompt that protects this instance. |
| `WHISPER_MAX_UPLOAD_MB` | 512 | Largest accepted upload, in megabytes. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.cache`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/whisper-asr-webservice)
