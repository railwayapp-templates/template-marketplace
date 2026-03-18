# Deploy Docling - OCR anything on Railway

Get any document AI / LLM Ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/docling-ocr-anything)

## About

Docling is a powerful document processing tool that parses diverse formats including PDF, DOCX, PPTX, images, and audio files. It features advanced PDF understanding with layout analysis, table extraction, and formula recognition, while offering seamless integrations with popular AI frameworks and local execution for sensitive data.

Hosting Docling provides a comprehensive document processing service capable of handling multiple file formats through advanced parsing techniques. The deployment includes OCR capabilities for scanned documents, Visual Language Model support, and ASR for audio transcription. With its unified DoclingDocument format and various export options (Markdown, HTML, JSON), Docling serves as a versatile document intelligence solution. The service can run locally for air-gapped environments or be deployed as a scalable API, making it ideal for enterprise document processing workflows and AI-powered applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | [bon5co/docling-railway-template](https://github.com/bon5co/docling-railway-template) | Web service |
| docling | `quay.io/docling-project/docling-serve-cpu:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | caddy | 8080 | - |
| `CADDY_AUTHORIZATION` | caddy | - | Bearer Authorization |
| `DOCLING_SERVE_ENABLE_UI` | docling | 0 | Enables UI |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docling-serve run --host "::"`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/docling-ocr-anything)
