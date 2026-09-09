# Deploy Drawnix on Railway

Whiteboard app for mind maps, flowcharts and freehand drawing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drawnix)

## About

Drawnix is an open-source, all-in-one whiteboard combining mind maps, flowcharts, freehand sketching and text on one infinite canvas. Built on the [Plait](https://github.com/worktile/plait) framework and MIT-licensed at [plait-board/drawnix](https://github.com/plait-board/drawnix), it suits developers, product teams and writers who want an Excalidraw-style scratchpad that also does structured diagrams — turning a Mermaid snippet into editable shapes, or a Markdown outline into a mind map, in one click.

Self-host Drawnix when you would rather not send half-finished architecture sketches to someone else's SaaS. Everything it does runs in the browser: boards are stored in the visitor's own IndexedDB, Mermaid and Markdown are parsed in the page, and PNG, JPG and SVG export happen client-side. Deploy Drawnix on Railway and there is exactly one service, named **Drawnix**, serving the compiled app over HTTPS with gzip-compressed assets, a strict Content-Security-Policy and an optional password gate — no database, no object storage, no volume and no worker.

![Diagram of the single Drawnix service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788840026/drawnix-architecture.png)

Drawnix is a compiled single-page application, so hosting it means serving static files well rather than running an application server. nginx does that here: JavaScript and CSS are pre-compressed at build time and served with `gzip_static`, taking the main bundle from 1.09 MB to roughly 342 KB, content-hashed assets are marked immutable while the HTML revalidates, and `/healthz` answers a real health check.

Key features:

- Mind maps, flowcharts, arrows, shapes, images and rich text on one infinite canvas
- **Mermaid to Drawnix** — flowcharts, sequence and class diagrams as editable elements
- **Markdown to Drawnix** — a headed outline becomes a laid-out mind map
- Freehand pen with a laser-pointer mode, plus six canvas themes including dark
- Export to PNG, JPG and SVG; save and reopen boards as `.drawnix` JSON
- Automatic local save, undo/redo, copy/paste, a mobile layout, five languages

Because the whole product is client-side, the architecture is a single web service: nothing for a database or queue to do, and interchangeable containers, so the replica count can be raised freely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Drawnix | [gridalpha/drawnix-railway](https://github.com/gridalpha/drawnix-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port nginx listens on |
| `ROBOTS_POLICY` | noindex | Disallow crawlers, or "allow" |
| `CSP_CONNECT_SRC` | 'self' blob: data: | Allowed outbound connection sources |
| `DRAWNIX_PASSWORD` | (secret) | Optional basic-auth password |
| `DRAWNIX_USERNAME` | (secret) | Optional basic-auth username |
| `CSP_FRAME_ANCESTORS` | 'none' | Sites allowed to embed the board |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/drawnix)
