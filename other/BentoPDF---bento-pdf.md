# Deploy BentoPDF on Railway

PDF toolkit that merges, splits, signs and converts files in your browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bento-pdf)

## About

BentoPDF is a privacy-first PDF toolkit that does all of its work inside the visitor's browser. Merging, splitting, compressing, redacting, signing, OCR and Office conversion are compiled to WebAssembly and run on the client, so a document is never uploaded and never leaves the machine that opened it. That suits legal, finance, healthcare and internal IT teams who need everyday PDF editing but cannot send contracts or patient records to a third-party service. It is open source under AGPL-3.0 and ships more than fifty tools in one interface.

Because the processing is client-side, the deployment is small: a single Railway service named **bentopdf** runs the official self-hosted image behind nginx, serving static HTML, JavaScript and WebAssembly. There is no database, queue, worker, object storage or volume — nothing to back up, nothing to keep in sync. Traffic arrives at Railway's edge, hits the service on port 8080, and every byte of a user's PDF stays in their tab. Self-host BentoPDF on Railway and the server does nothing more demanding than deliver files.

![Diagram of the single BentoPDF web service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788832006/bentopdf-architecture.png)

Most self-hosted PDF suites are servers: you upload a file, the backend shells out to Ghostscript or LibreOffice, and you download the result. BentoPDF inverts that. Its tools are compiled to WebAssembly — pdf-lib, pdf.js, PyMuPDF, Ghostscript, cpdf, Tesseract, LibreOffice — and shipped to the browser, so the host only serves static assets. Teams self-host it when "we promise we delete them" is not good enough.

Key features:

- 50+ tools: merge, split, organize, rotate, crop, compress, extract
- Editing: annotate, highlight, redact, fill and create forms, edit text inline
- Conversion between PDF and images, Word, Excel, PowerPoint, Markdown and EPUB
- Security: encrypt, decrypt, digitally sign, validate signatures, flatten
- OCR, table extraction, PDF comparison, and a visual workflow builder
- 20+ interface languages

The Railway architecture is a single service. `bentopdf` runs `ghcr.io/alam00000/bentopdf-simple:latest`, an nginx-unprivileged image serving the compiled app on port 8080 with gzip pre-compression, long cache headers and the cross-origin isolation headers the WebAssembly engines require.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bentopdf | `ghcr.io/alam00000/bentopdf-simple:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | nginx listen port, health-checked by Railway |
| `DISABLE_IPV6` | false | Keep nginx's IPv6 listener enabled |
| `ROBOTS_NOINDEX` | false | Set true to inject noindex into every page |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/bento-pdf)
