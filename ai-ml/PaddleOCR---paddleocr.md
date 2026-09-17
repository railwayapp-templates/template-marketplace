# Deploy PaddleOCR on Railway

OCR API for images and PDFs, 100+ languages, CPU-only

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paddleocr)

## About

[PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) turns images and PDFs into structured text in
more than 100 languages. This template runs it as an HTTP API on Railway, behind a password generated
for your deployment, with no GPU and no volume.

The deployed service is PaddleOCR's own OCR pipeline served over HTTP. You POST an image or PDF — as
a URL the server can fetch or as base64 — and get back the recognised text with per-line boxes and
confidence scores. It is a plain request-and-response API, so there is no database, no queue and no
state to keep.

Two things about starting up are worth knowing, because this template deals with both. The pipeline's
five models are downloaded when the *server* starts rather than on first use, so they are baked into
the image and no deployment ever waits for a download. And the first inference after that loads those
weights into memory, which costs far more than every later request, so the container runs one
throwaway inference before it reports itself healthy. The result is that the first request a real
client makes is as fast as the second.

The other thing this template supplies is authentication. PaddleX's serving layer has none at all,
and an OCR endpoint left open on a public domain is free compute for whoever finds it, so a password
is generated for your deployment and the inference server is kept on loopback where nothing but the
proxy can reach it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paddleocr | [RockinPaul/paddleocr_railway_template](https://github.com/RockinPaul/paddleocr_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port Railway's healthcheck probes and the public domain targets. Leave as is. |
| `PADDLEOCR_TIMEOUT` | 300s | Proxy read timeout. CPU inference is not instant — do not set this low. |
| `PADDLEOCR_MAX_BODY` | 32MB | Maximum request body. Raise it for large scans or long PDFs. |
| `PADDLEOCR_PASSWORD` | (secret) | The only credential protecting this deployment — PaddleX serving has no authentication of its own. Read it from this service's variables after deploying. |
| `PADDLEOCR_USERNAME` | (secret) | Username for the API. It is only an identifier; change it here if you prefer another. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/paddleocr)
