# Deploy PDF Editor - 100+ Tools on Railway

Edit, split, merge,convert, OCR and secure PDFs easily with BentoPDF

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bento-pdf)

## About

PDF Editor (BentoPDF) is a privacy-first, self-hostable PDF toolkit that lets users edit, merge, split, convert, compress, sign, and organize PDF files directly in the browser. Since all processing happens client-side using WebAssembly, documents never leave the user's device, making it ideal for organizations and individuals who require secure PDF processing.

![Benzo Editor](https://github.com/alam00000/bentopdf/raw/main/public/images/bentopdf-tools.png)

Railway makes it easy to deploy and host PDF Editor - 100+ Tools as a production-ready web application without managing infrastructure manually. The application is primarily a static web application served through an Nginx container while PDF processing occurs entirely inside the user's browser using WebAssembly libraries. Because documents are processed client-side, no application database is required for normal operation and user files are never uploaded to your server.

Railway automatically builds the application from the included Dockerfile or deploys directly from the published container image. Railway also provides HTTPS, custom domains, automatic networking, health checks, and effortless vertical or horizontal scaling. Persistent storage is generally unnecessary because the application is stateless, although optional configuration files can be mounted using Railway Volumes if desired.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PDF Editor | `ghcr.io/alam00000/bentopdf-simple:sha-8dcd936` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/bento-pdf)
