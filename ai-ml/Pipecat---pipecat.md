# Deploy Pipecat on Railway

Browser voice AI with OpenAI, Gemini, Grok, OpenRouter, or Ollama.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pipecat)

## About

Pipecat is an open-source Python framework for building voice and multimodal AI agents. This template packages Pipecat 1.8.1 as a password-protected voice app you can use in your browser, with a choice of OpenAI, Gemini, Grok, OpenRouter, or Ollama. It deploys one Railway service containing the bot, session API, and web client, with Daily handling the WebRTC audio connection.

Hosting this template on Railway means one Docker-based service and no database or persistent volume. Your browser joins a private Daily room using a short-lived token, and a dedicated bot process joins the same room to listen and respond. The browser interface includes microphone controls, connection status, a session timer, and a password prompt; provider API keys stay on the server.

OpenAI, Gemini, and Grok handle speech directly through their realtime voice APIs. OpenRouter and Ollama use a speech-recognition, language-model, and speech-synthesis pipeline. You select the provider, model, voice, and assistant instructions through deployment variables. The template includes an authenticated session server rather than exposing Pipecat's development runner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pipecat | [RockinPaul/pipecat-railway-template](https://github.com/RockinPaul/pipecat-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP and healthcheck port. Keep it aligned with the public domain target port. |
| `BOT_VOICE` | alloy | Voice for OpenAI Realtime or OpenAI text-to-speech only. |
| `BOT_PROMPT` | - | Optional assistant instructions. Empty uses a concise, helpful AI assistant. Never put credentials in the prompt. |
| `GROK_MODEL` | grok-voice-latest | xAI Voice Agent model for AI_PROVIDER=grok. |
| `GROK_VOICE` | eve | A supported xAI Voice Agent voice. |
| `AI_PROVIDER` | openai | Choose openai, gemini, grok, openrouter, or ollama. Supply only the keys required by your choice. |
| `XAI_API_KEY` | (secret) | Required for AI_PROVIDER=grok. Your xAI API key with Voice Agent access. |
| `GEMINI_MODEL` | gemini-2.5-flash-native-audio-preview-12-2025 | Gemini Live audio model for AI_PROVIDER=gemini. |
| `GEMINI_VOICE` | Charon | Gemini Live voice, independent of BOT_VOICE. |
| `OLLAMA_MODEL` | - | Required for ollama. Name of a model already installed on your Ollama server; the template does not download models. |
| `DAILY_API_KEY` | (secret) | Required in every mode. Your Daily WebRTC API key; no whitespace. |
| `GOOGLE_API_KEY` | (secret) | Required for AI_PROVIDER=gemini. Get a Gemini API key from Google AI Studio. |
| `OLLAMA_API_KEY` | (secret) | Optional API key for a protected Ollama endpoint. Do not embed it in OLLAMA_BASE_URL. |
| `OPENAI_API_KEY` | (secret) | Required for AI_PROVIDER=openai or when OpenAI handles speech. Leave empty otherwise. |
| `ACCESS_PASSWORD` | (secret) | Generated private access password. Copy it from service Variables to connect in the browser. |
| `OLLAMA_BASE_URL` | - | Required for ollama. A reachable HTTP(S) endpoint, such as http://ollama.railway.internal:11434/v1. Railway localhost is not your laptop. |
| `SPEECH_PROVIDER` | - | leave empty for automatic selection. For OpenRouter/Ollama only: openai or openrouter. Empty defaults to   OpenRouter speech for OpenRouter, and OpenAI speech for Ollama. |
| `OPENAI_STT_MODEL` | gpt-4o-mini-transcribe | Speech recognition model when using OpenAI speech. |
| `OPENAI_TTS_MODEL` | gpt-4o-mini-tts | Speech synthesis model when using OpenAI speech. |
| `OPENROUTER_MODEL` | google/gemini-2.5-flash-lite | OpenRouter text model in provider/model format. |
| `OPENROUTER_API_KEY` | (secret) | Required for AI_PROVIDER=openrouter or SPEECH_PROVIDER=openrouter. One key can cover text, recognition, and synthesis. |
| `MAX_SESSION_SECONDS` | 600 | Maximum conversation lifetime, from 30 to 1800 seconds. Providers bill separately. |
| `OPENROUTER_STT_MODEL` | openai/whisper-large-v3-turbo | OpenRouter transcription model; must support its audio/transcriptions endpoint. |
| `OPENROUTER_TTS_MODEL` | hexgrad/kokoro-82m | OpenRouter synthesis model that supports mono signed 16-bit PCM output. |
| `OPENROUTER_TTS_VOICE` | af_heart | Voice supported by the selected OpenRouter TTS model. |
| `OPENAI_REALTIME_MODEL` | gpt-realtime-2.1-mini | OpenAI Realtime model for AI_PROVIDER=openai. |
| `OPENROUTER_TTS_SAMPLE_RATE` | 24000 | Native sample rate of the returned PCM audio. Kokoro uses 24000. Must match the selected model. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, JavaScript, HTML, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pipecat)
