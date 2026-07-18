# Deploy SenseVoice ASR Server on Railway

A lightweight, CPU-based ASR service using the SenseVoice model.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sensevoice-asr-server)

## About

SenseVoice ASR Server is a lightweight, high-performance Automatic Speech Recognition service built with FastAPI and llama.cpp. It delivers fast, multi-lingual audio transcription on CPUs using GGUF-quantized models, completely removing the need for costly GPU infrastructure while serving secure REST API endpoints with built-in Voice Activity Detection (VAD).

Hosting SenseVoice ASR Server involves running a Docker container pre-packaged with FastAPI, the `llama-funasr-sensevoice` binary runtime, and quantized GGUF models (SenseVoice-Small Q8 and FSMN-VAD).

Because the inference engine runs entirely on standard CPUs with no CUDA or GPU driver dependencies, deployment is straightforward and extremely lightweight. On Railway, hosting requires as little as 2 vCPU and 1 GB RAM. The server exposes endpoints for health checks and transcription (`POST /asr`), protected by customizable API key authentication and execution timeout environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SenseVoice ASR Server | `markgzhou/sensevoice-asr-server` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SENSEVOICE_API_KEY` | (secret) | API key to access ASR service |
| `SENSEVOICE_TIMEOUT` | 60 | Transcription timeout in seconds (must be > 10) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sensevoice-asr-server)
