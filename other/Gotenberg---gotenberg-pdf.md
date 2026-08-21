# Deploy Gotenberg on Railway

API for converting HTML, Markdown, URLs and Office documents to PDF

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotenberg-pdf)

## About

Gotenberg is an open-source HTTP API that turns HTML, Markdown, URLs and Office documents into PDFs. You POST a file or a URL as `multipart/form-data` and get a PDF back — no Chromium to babysit, no LibreOffice to install, no fonts to chase. Teams reach for it whenever an application must produce a real document: invoices, contracts, statements, reports. It is written in Go, MIT-licensed, and used in production by projects such as paperless-ngx.

Self-host Gotenberg on Railway and you get one stateless service running the official `gotenberg/gotenberg` image, on its own HTTPS domain and protected by HTTP Basic authentication out of the box. There is no database, queue or volume, because Gotenberg holds nothing between requests: each job is written to a temp directory, rendered by Chromium or LibreOffice, returned in the response body, and deleted. Traffic hits Railway's edge, terminates TLS there, and reaches the container, which dispatches each job to the engine that handles that format.

![Diagram of the single Gotenberg API service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787187594/gotenberg-architecture.png)

Generating PDFs inside an application looks like a small problem and is not. Running headless Chromium yourself means shipping a browser, its shared-memory quirks and a font stack alongside your app; a hosted PDF SaaS means paying per document and sending customer data elsewhere. Gotenberg packages the engines behind a stable HTTP contract, so your app only speaks multipart posts and documents stay on your own infrastructure.

The API is organised by engine. `/forms/chromium/` renders HTML, Markdown and live URLs, and can return PNG or JPEG screenshots instead of a PDF. `/forms/libreoffice/` accepts over a hundred Office formats. `/forms/pdfengines/` operates on PDFs you already have, backed by qpdf, pdfcpu, PDFtk and ExifTool.

Key features:

- HTML, Markdown and URL to PDF via Chromium, with page size, margins and headers set per request
- Office documents to PDF via LibreOffice — Word, Excel, PowerPoint, OpenDocument and RTF families
- Merge, split, rotate and flatten PDFs; watermark, stamp and encrypt output
- PDF/A and PDF/UA output for archival and accessibility
- Screenshots of a URL, an HTML file, or one CSS-selected element; metadata and bookmark editing

Because the service is stateless, the Railway architecture is deliberately flat: one container, one public domain, nothing persisted. Scaling means raising the replica count — no scheduler, no leader election, no shared state, so replicas are interchangeable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotenberg | `gotenberg/gotenberg:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for rendered document timestamps |
| `PORT` | 3000 | HTTP port the API listens on |
| `TINI_KILL_PROCESS_GROUP` | 1 | Signal Chromium and LibreOffice children |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | (secret) | Basic auth password |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | (secret) | Basic auth username, all routes but /health |

## Configuration

- **Start command:** `/usr/bin/tini -s -- gotenberg --api-port-from-env=PORT --api-start-timeout=60s --api-timeout=120s --api-enable-basic-auth=true --chromium-auto-start=true --libreoffice-auto-start=true --chromium-deny-private-ips=true --libreoffice-deny-private-ips=true --webhook-deny-private-ips=true --api-download-from-deny-private-ips=true`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gotenberg-pdf)
