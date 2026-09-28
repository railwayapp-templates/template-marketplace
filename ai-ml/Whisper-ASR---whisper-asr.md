# Deploy Whisper ASR on Railway

Whisper ASR 1.10: speech-to-text API with faster-whisper, private network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whisper-asr)

## About

Whisper ASR Webservice wraps OpenAI's Whisper speech recognition models in a simple HTTP API. You upload an audio or video file and get back a transcript or translation as text, JSON, SRT or VTT subtitles. It supports the faster-whisper engine, which runs well on ordinary CPUs, and language detection.

This template runs the CPU image `onerahmet/openai-whisper-asr-webservice:v1.10.0` with the faster-whisper engine and the `base` model in int8. The API has no authentication, so it stays on the private network. Your backend posts files to `http://whisper.railway.internal:9000/asr`. The model is downloaded from Hugging Face on first boot and cached on a Railway volume, so later deploys start faster. The image is about 1.7 GB, and the first start takes a few minutes. Larger models improve accuracy but need more memory and time per file, so pick one that suits your plan. CPU threads are capped at four.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whisper | `onerahmet/openai-whisper-asr-webservice:v1.10.0` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9000 |
| `ASR_MODEL` | base |
| `ASR_ENGINE` | faster_whisper |
| `ASR_MODEL_PATH` | /data/whisper |
| `OMP_NUM_THREADS` | 4 |
| `ASR_QUANTIZATION` | int8 |
| `MODEL_IDLE_TIMEOUT` | 0 |

## Configuration

- **Start command:** `whisper-asr-webservice --host "" --port 9000`
- **Healthcheck:** `/docs`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/whisper-asr)
