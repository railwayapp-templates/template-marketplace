# Deploy MinerU | Document Parsing API on Railway

Self-host MinerU PDF parser with an OpenAI-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mineru)

## About

MinerU is an open-source document parsing engine from Shanghai AI Lab's OpenDataLab that converts PDFs, images, and Office documents into LLM-ready Markdown and JSON. Self-host MinerU on Railway when you want a private, OCR-capable document parser for your RAG pipeline, knowledge base ingestion, or agentic workflow — no per-page cloud OCR fees and no third-party telemetry on your documents.

This Railway template deploys MinerU's `mineru-api` FastAPI server in pure CPU mode (`pipeline` backend) using a custom Python 3.12 Dockerfile, with a persistent volume for the Hugging Face model cache and a public HTTPS URL on port 8000. Pipeline models (~1–2 GB of layout, OCR, table, and formula recognizers) lazy-download on the first request and are cached on the volume for all subsequent boots.

MinerU emerged in 2024 as the best open-source all-rounder for PDF-to-Markdown conversion, beating Marker, Unstructured, and Docling on extraction accuracy across academic papers, reports, and scanned documents. It uses a multi-stage pipeline: PaddlePaddle layout detection → orientation classification → SLANet+ table structure → unimernet formula recognition → reading-order assembly → Markdown emission.

Key features:

- **OCR for 84+ languages** including English, Chinese, Japanese, Korean, Arabic, Cyrillic, Devanagari, Thai
- **Formula recognition** rendered as LaTeX inline in the Markdown
- **Table extraction** preserved as HTML inside the Markdown
- **Reading-order reconstruction** for multi-column layouts and footnotes
- **Multiple output formats:** raw Markdown, structured JSON, image attachments, ZIP bundle
- **Async task API** with `/tasks` endpoints for long-running batch jobs
- **Sliding-window memory optimization** for long documents

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinerU | [praveen-ks-2001/mineru-railway](https://github.com/praveen-ks-2001/mineru-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | FastAPI HTTP port |
| `HF_HOME` | /data/huggingface | HF cache on volume |
| `HF_TOKEN` | (secret) | optional — gated HF models only |
| `MINERU_MODEL_SOURCE` | huggingface | lazy-download from Hugging Face |
| `MINERU_DOWNLOAD_ON_BOOT` | 1 | entrypoint pre-downloads pipeline models |
| `MINERU_TOOLS_CONFIG_JSON` | /data/mineru.json | mineru auto-generated config |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mineru)
