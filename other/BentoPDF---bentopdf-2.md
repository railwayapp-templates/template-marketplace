# Deploy BentoPDF on Railway

BentoPDF 2.8 privacy-first PDF toolkit that runs entirely in the browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bentopdf-2)

## About

BentoPDF is a privacy-first PDF toolkit that runs entirely in the browser. It merges, splits, compresses, converts, signs, encrypts, redacts and edits PDFs with dozens of tools, and every file is processed on the visitor's device, so documents are never uploaded to the server that hosts it.

This template deploys BentoPDF v2.8.8 from the official self-hosted build, which contains every tool without the marketing pages of the public site. It is a small nginx service with no database, no volume and no accounts, because all processing happens in the visitor's browser. That makes it a good internal PDF tool for teams that cannot send contracts, invoices or scans to online converters. The service uses very little memory and fits easily on the Hobby plan. Bookmark the Railway domain and share it with your team. Updates are a matter of changing the image tag.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bentopdf | `bentopdfteam/bentopdf-simple:2.8.8` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/bentopdf-2)
