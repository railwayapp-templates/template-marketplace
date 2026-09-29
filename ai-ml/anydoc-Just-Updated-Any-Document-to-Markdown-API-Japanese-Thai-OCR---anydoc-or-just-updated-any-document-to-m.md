# Deploy anydoc | (Just Updated) Any Document to Markdown API, Japanese & Thai OCR on Railway

Word, PowerPoint, Excel, PDF and scans to Markdown; Japanese/Thai OCR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anydoc-or-just-updated-any-document-to-m)

## About

anydoc-serve turns Word, PowerPoint, Excel, OpenDocument, PDF, EPUB, RTF and CSV files into clean Markdown over HTTP and MCP. It wraps [firecrawl/anydoc](https://github.com/firecrawl/anydoc), Firecrawl's fast Rust document converter, in one small container and adds local OCR for scans and images in English, Japanese and Thai.

This template runs one service from `ghcr.io/bon5co/anydoc-serve:latest` (amd64 and arm64). There is no database and no volume: every request is converted in memory and nothing is stored. Born-digital documents go through anydoc unchanged; scanned or image-only pages, and images (`.png`, `.jpg`, `.tiff`, `.webp`), are OCR'd on CPU with Tesseract 5, reading Japanese, Thai and English in one pass, so nothing leaves your deployment. On a mixed PDF only the scanned pages are OCR'd. Every endpoint except `/health` requires `Authorization: Bearer $API_KEY`, and the key is generated for you at deploy, so no deployment is ever open. A `/health` healthcheck keeps traffic off the service until it is ready. Measured on a Railway deploy of this template: 246-263 MiB of RAM idle and 272 MiB after converting a DOCX and OCR'ing two images, under the Free plan's 0.5 GB cap.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| anydoc | `ghcr.io/bon5co/anydoc-serve:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Bearer key every endpoint except /health requires. Generated per deploy. |
| `OCR_LANGS` | eng,jpn,tha | OCR languages, comma-separated: eng, jpn, tha. All are read in one pass. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anydoc-or-just-updated-any-document-to-m)
