# Deploy Speaches Audio API + Model Cache on Railway

OpenAI-compatible speech to text and text to speech with a model cache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speaches-audio-api-model-cache)

## About

Speaches is a self-hosted, OpenAI-compatible speech server. One endpoint handles speech to text with faster-whisper or Parakeet, text to speech with Kokoro or Piper, voice activity detection, speaker embeddings and the OpenAI Realtime API over WebSocket and WebRTC. It runs on CPU, ships a browser playground, and drops straight into any OpenAI SDK by changing the base URL.

Hosting Speaches is a single container plus one volume. This template uses the official CPU image `ghcr.io/speaches-ai/speaches:0.9.0-rc.3-cpu` and gives the Hugging Face model cache a Railway volume at `/home/ubuntu/.cache/huggingface/hub`, so models are downloaded once rather than on every deploy. Speaches never downloads a model implicitly, so the template preloads a Whisper model and a Kokoro voice model at startup and the API answers real requests as soon as the healthcheck goes green. `API_KEY` is generated at deploy time and guards every `/v1` route, while `/health` stays public so Railway can probe it. `PORT` and `UVICORN_PORT` are both pinned to 8000, the bind address is `0.0.0.0` because uvicorn treats an explicit IPv6 bind as IPv6 only, and the healthcheck window is 900 seconds because the first boot downloads about 800 MB of models before the port opens. Inference runs on CPU and wants roughly 2 GB of RAM, so use the Hobby plan or higher.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Speaches | `ghcr.io/speaches-ai/speaches:0.9.0-rc.3-cpu` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port Railway's healthcheck and edge proxy probe. Speaches itself reads UVICORN_PORT, so keep the two equal (8000, the upstream default and the domain target port). |
| `API_KEY` | (secret) | Bearer token required on every /v1 route (Authorization: Bearer <key>). Missing or wrong keys get HTTP 403. /health, /docs and /openapi.json stay public so the Railway healthcheck works. Leave it set; deleting the variable makes the whole speech API open to anyone with the URL. |
| `HF_HOME` | /home/ubuntu/.cache/huggingface | Hugging Face home directory. Model files land in $HF_HOME/hub, which is exactly the volume mount path, so downloaded Whisper, Kokoro and Piper models survive redeploys. Change it only if you also move the volume mount. |
| `HF_TOKEN` | (secret) | Optional. Hugging Face access token, only needed for gated or private model repositories. The default Whisper, Kokoro and Piper models are public and need no token. |
| `ENABLE_UI` | true | Optional. Serve the Gradio playground at / (speech to text, text to speech, voice chat tabs). The playground page itself is public; it only reaches the API after you paste the API_KEY into its API Key box. Set false for an API-only endpoint and a slightly faster boot. |
| `LOG_LEVEL` | info | Application log level: debug, info, warning, error or critical. Upstream defaults to debug, which logs every audio chunk and makes Railway logs unreadable. |
| `UVICORN_HOST` | 0.0.0.0 | Bind address. Keep 0.0.0.0: uvicorn binds '::' as IPv6-only (asyncio sets IPV6_V6ONLY) and Railway's healthcheck then never connects. Side effect: other Railway services cannot reach this one over private networking, which is IPv6 only. Call the public domain instead. |
| `UVICORN_PORT` | 8000 | Port uvicorn binds. The image CMD is 'uvicorn --factory speaches.main:create_app' with no flags, and uvicorn's CLI reads UVICORN_* environment variables. Keep equal to PORT. |
| `ALLOW_ORIGINS` | - | Optional. JSON list of CORS origins, for example ["https://app.example.com"]. Left unset no CORS middleware is added at all, so browsers cannot call the API cross-origin. Never ship an empty string: the value must be valid JSON. |
| `STT_MODEL_TTL` | 300 | Optional. Seconds a speech-to-text model stays in memory after its last use. -1 keeps it loaded forever (fastest, most RAM), 0 unloads immediately (least RAM, slow first request). |
| `TTS_MODEL_TTL` | 300 | Optional. Seconds a text-to-speech model stays in memory after its last use. Same semantics as STT_MODEL_TTL. |
| `VAD_MODEL_TTL` | -1 | Optional. Seconds the Silero voice-activity-detection model stays loaded. It is small, ships inside the image and runs on every transcription, so -1 (never unload) is the sensible default. |
| `PRELOAD_MODELS` | ["Systran/faster-whisper-small","speaches-ai/Kokoro-82M-v1.0-ONNX"] | JSON list of model IDs downloaded during startup, so the API works on first request. Speaches never downloads models implicitly: any /v1 request naming a model that is not in the cache returns 404. About 800 MB on first boot, then served from the volume. The process exits if a download fails, so keep the list short. Set to [] to skip and download on demand with POST /v1/models/{model_id}. |
| `LOOPBACK_HOST_URL` | http://localhost:8000 | URL the bundled playground and the voice-chat feature use to call this same server. Required behind a reverse proxy such as Railway's edge, otherwise Gradio guesses the scheme from forwarded headers and can end up on a redirect. Must match UVICORN_PORT. |
| `WHISPER__CPU_THREADS` | 4 | Optional. CTranslate2 worker threads. Upstream default 0 means 'all cores', and containers see the host's core count rather than the plan's vCPU limit, which oversubscribes and slows transcription. Raise it if you raise the service's vCPU limit. |
| `WHISPER__COMPUTE_TYPE` | int8 | CTranslate2 quantization for Whisper. int8 is roughly 4x smaller and 2 to 3x faster than the float32 fallback CPUs use for 'default', at a small accuracy cost. Use float32 for best quality on a larger plan. |
| `CHAT_COMPLETION_API_KEY` | (secret) | Optional. API key for CHAT_COMPLETION_BASE_URL. Only used by the playground's voice-chat tab. |
| `CHAT_COMPLETION_BASE_URL` | - | Optional. OpenAI-compatible chat completions endpoint used by the playground's voice-chat tab, for example https://your-litellm.up.railway.app/v1. Upstream defaults to a local Ollama at http://localhost:11434/v1, which does not exist here, so the voice-chat tab stays broken until you set this. |
| `HF_HUB_ENABLE_HF_TRANSFER` | 1 | Use the Rust-based hf_transfer downloader for model downloads (shipped in the image via huggingface-hub[hf-transfer]). Cuts first-boot download time. Set to 0 if a download ever fails and you want the plain Python downloader's error messages. |
| `WHISPER__INFERENCE_DEVICE` | cpu | Device for faster-whisper transcription. Railway has no GPUs, so pin cpu. Note the double underscore: it maps to the nested whisper.inference_device setting. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/ubuntu/.cache/huggingface/hub`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/speaches-audio-api-model-cache)
