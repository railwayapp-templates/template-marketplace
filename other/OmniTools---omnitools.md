# Deploy OmniTools on Railway

126 browser-based tools for images, video, PDFs, text and data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omnitools)

## About

OmniTools is an open-source toolbox of 126 everyday utilities — resize images, trim video, split and merge PDFs, reformat JSON, transform CSV, generate passwords, do date arithmetic — in one searchable web app. None of it runs on a server: every conversion happens in the visitor's own browser tab, so files never leave their machine. That is why teams self-host OmniTools rather than paste a client contract into whichever free PDF site ranks first.

Deploy OmniTools on Railway and you get one service, `omnitools`, serving the built app behind Railway's TLS edge. There is no database, queue, worker or volume, because there is no server-side state. The service builds from a GitHub repository that wraps the official `iib0011/omni-tools` image in a hardened nginx configuration — compression, cache headers, a content security policy and optional password protection — and gets a public domain as soon as the deploy finishes.

![Diagram of the single OmniTools service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788980697/omnitools-architecture.png)

OmniTools replaces the drawer of single-purpose online utilities most people accumulate — one site for PDF merging, another for image compression, a third for JSON formatting — with one instance you control. Since processing is local to the browser, self-hosting here is about custody: your instance cannot log, retain or resell what passes through it.

Key features:

- **126 tools in twelve categories** — image, PDF, video, audio, text, list, number, date, JSON, CSV, XML and unit converters
- **Client-side processing** — WebAssembly builds of FFmpeg, Tesseract OCR, pdf.js and an ONNX runtime run in the tab
- **Full-text tool search** and quick links on the home page
- **Image and PDF editors** with annotation, cropping, rotation and page extraction
- **Eleven interface languages** and a light or dark theme

The Railway architecture is deliberately flat. The `omnitools` service is an nginx container serving a static build: it answers `/healthz` for the health check, caches content-hashed assets for a year, revalidates the HTML so a new release is picked up immediately, and serves pre-compressed copies of the large WebAssembly bundles.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omnitools | [gridalpha/omnitools-railway](https://github.com/gridalpha/omnitools-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port nginx listens on |
| `CSP_CDN_HOSTS` | https://cdn.jsdelivr.net https://unpkg.com | Script origins; none allows none |
| `ROBOTS_POLICY` | noindex | noindex or allow, written to robots.txt |
| `CSP_DATA_HOSTS` | https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com https://staticimgly.com https://tessdata.projectnaptha.com | Fetch origins; none allows none |
| `OMNITOOLS_PASSWORD` | (secret) | Optional basic-auth password, hashed at boot |
| `OMNITOOLS_USERNAME` | (secret) | Optional basic-auth user; set with the password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/omnitools)
