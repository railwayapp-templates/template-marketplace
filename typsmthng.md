# Deploy typsmthng on Railway

A browser-native Typst editor with live preview

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/typsmthng)

## About

typsmthng is a browser-native Typst editor with live preview, built entirely on WebAssembly. It compiles Typst markup to SVG directly in the browser with no server-side processing. Features include multi-file project management, IndexedDB persistence, PDF export, zip import/export, Vim mode, and PWA installability.

typsmthng is a static single-page application built with React 19, TypeScript, and Vite 7. Deploying it involves running `bun install` and `bun run build` to produce a production bundle, then serving the output from the `dist` directory as static files. The build includes large `.wasm` artifacts (the Typst compiler) which are expected and necessary for in-browser compilation. Railway can serve this as a static site or via a lightweight HTTP server like Caddy. No database, backend API, or external services are required — all compilation and storage happen client-side via WebAssembly and IndexedDB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typsmthng | [chinpeerapat/typsmthng](https://github.com/chinpeerapat/typsmthng) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/template/typsmthng)
