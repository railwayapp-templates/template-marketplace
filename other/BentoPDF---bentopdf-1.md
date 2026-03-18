# Deploy BentoPDF on Railway

A Privacy First PDF Toolkit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bentopdf-1)

## About

BentoPDF is a privacy-first, fully client-side PDF toolkit that runs entirely in the browser. It provides a comprehensive set of tools for editing, converting, securing, and organizing PDFs without uploading files to a server, making it suitable for privacy-sensitive and self-hosted deployments.

Hosting BentoPDF involves deploying a static, client-side web application backed by modern build tooling. All PDF processing occurs in the user’s browser via WebAssembly and JavaScript, so the server’s role is limited to serving static assets efficiently. On Railway, BentoPDF can be deployed either via a prebuilt Docker image or as a static build served behind Nginx. Optional configuration includes enabling CDN-backed WASM delivery, subdirectory hosting, and compression modes (gzip, Brotli, or both) to optimize performance and bandwidth usage. No database or persistent backend services are required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| BentoPDF | `ghcr.io/alam00000/bentopdf:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port. |

## Configuration

- **Healthcheck:** `/index.html`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/bentopdf-1)
