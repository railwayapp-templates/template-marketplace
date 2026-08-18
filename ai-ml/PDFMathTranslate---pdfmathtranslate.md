# Deploy PDFMathTranslate on Railway

Translate academic PDFs while preserving layout — bundled Ollama engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pdfmathtranslate)

## About

Host your own PDF math translator in minutes with a single click. The template provisions the **PDFMathTranslate** Web UI (from the official prebuilt `awwaawwa/pdfmathtranslate-next` image) and a companion **Ollama** service (from `ollama/ollama`) with a persistent volume at `/root/.ollama` for model storage. The app's Ollama host is auto-linked to the sibling over the internal Railway network, and the Web UI listens on Railway's public port out of the box.

The app runs **inside the official prebuilt `awwaawwa/pdfmathtranslate-next:v2.9.0-babeldoc-v0.6.4` Docker image** (the same image the upstream project publishes), so the full translation stack — PDF parser, layout engine, BabelDOC rendering pipeline, and Gradio Web UI — is exactly what the release ships. Configuration lives under `/root/.config/pdf2zh` inside the container; because that path is **not** on a volume, engine settings you save in the UI re-seed from defaults on each redeploy. To make your setup reproducible, keep the settings as env vars (`PDF2ZH_*`, see [Environment Variables](#environment-variables)) or re-save them in the Web UI — settings also persist for the life of the running instance.

**Updating the app:** the image tag is pinned. To upgrade, change the `FROM` tag in `Dockerfile` to a newer published tag (e.g. `v2.9.0-babeldoc-v0.6.4` → next release) and redeploy.

**Model persistence:** Ollama models live on the `ollama-models` volume at `/root/.ollama`, so `ollama pull`ed models survive redeploys and restarts — pull once, keep forever.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama/ollama:latest | `ollama/ollama:latest` | Database |
| pdfmathtranslate | [INAPP-Mobile/pdfmathtranslate](https://github.com/INAPP-Mobile/pdfmathtranslate) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | ollama/ollama:latest | - | Ollama API base URL. Auto-configured to the internal Railway private domain over HTTPS. Exposed to the app as PDF2ZH_OLLAMA_HOST. |
| `PORT` | pdfmathtranslate | 8080 | Public HTTP port. Railway routes the public domain to this port. Keep it equal to PDF2ZH_SERVER_PORT. |
| `PDF2ZH_OLLAMA` | pdfmathtranslate | false | Use the bundled Ollama sibling service as the translation engine. Set to false to pick another provider in the Web UI. |
| `PDF2ZH_OLLAMA_HOST` | pdfmathtranslate | - | Ollama API base URL. Auto-linked to the sibling Ollama service's private domain over :11434. |
| `PDF2ZH_SERVER_PORT` | pdfmathtranslate | 8080 | Port the Web UI binds inside the container. Must match PORT (the public domain target). Defaults to 8080. |
| `PDF2ZH_OLLAMA_MODEL` | pdfmathtranslate | - | Ollama model to translate with (e.g. qwen3:8b, gemma2, llama3.2). No model is pre-pulled — pull one first (ollama pull <model>), then set it here or in the Web UI Settings. |

## Configuration

- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/pdfmathtranslate)
