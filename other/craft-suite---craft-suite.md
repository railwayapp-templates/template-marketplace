# Deploy craft-suite on Railway

Six open-source creative apps — Rust/WASM, in your browser, one deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/craft-suite)

## About

Deploy an entire open-source creative suite in one click. Six desktop-grade apps, rewritten from scratch in pure Rust and compiled to WebAssembly, running entirely in your browser:

| Path | App | An open alternative to |
|---|---|---|
| `/photocraft/` | PhotoCraft | Photoshop — layers, masks, PSD import, GPU compositing |
| `/lightcraft/` | LightCraft | Lightroom — photo library, RAW developer, batch edits |
| `/pdfcraft/` | PdfCraft | Acrobat — view, merge, split, annotate, fill, encrypt PDFs |
| `/vectorcraft/` | VectorCraft | Illustrator — vector graphics, typography, SVG/PDF export |
| `/filmcraft/` | FilmCraft | Premiere Pro — timeline video editing, grading, codecs |
| `/effectcraft/` | EffectCraft | After Effects — motion graphics, keyframes, render queue |

The root URL serves a portal page linking to all six apps.

Every app is 100% client-side — the service is just nginx handing over static WASM files. There is no server-side code, no database, no storage service, and no accounts. WASM payloads (the largest is ~65 MB raw) are precompressed with gzip at build time and served with immutable caching for hashed assets, so repeat loads are fast.

**Your data stays in your browser.** Documents and projects persist to browser storage (OPFS/IndexedDB) — nothing is sent to or stored on the server. Browser storage is tied to the exact domain: **configure your custom domain before importing important work**, and export anything you can't afford to lose. Chrome or Edge recommended (WebGPU); other browsers fall back to WebGL2/CPU paths.

A `/healthz` endpoint is available for healthchecks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| craft-relay | [derekcheungsa/craft-suite-railway](https://github.com/derekcheungsa/craft-suite-railway) (root: server) | Web service |
| craft-suite | [derekcheungsa/craft-suite-railway](https://github.com/derekcheungsa/craft-suite-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MCP_TOKEN` | (secret) |
| `BRIDGE_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, TypeScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/craft-suite)
