# Deploy BentoPDF on Railway

BentoPDF is a powerful, privacy-first, client-side PDF toolkit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bentopdf-2)

## About

BentoPDF is an open-source, privacy-focused PDF toolkit designed to handle common document tasks—like merging, splitting, and compressing—entirely within the user's browser. By utilizing WebAssembly (Wasm), it ensures that sensitive documents never leave the local machine, offering a secure, lightweight alternative to cloud-based PDF editors.

Hosting BentoPDF involves deploying a containerized web server (typically Nginx) that serves the application's static assets and WebAssembly binaries. Since the actual processing logic happens on the client side, the hosting requirements are remarkably low; the server acts primarily as a delivery mechanism rather than a processing engine. Deploying on a platform like Railway involves pulling the image from the GitHub Container Registry (GHCR) and mapping the internal container port to a public URL. Because there is no database or complex backend logic required, the deployment is highly stable, scales effortlessly, and costs very little in terms of compute resources.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| alam00000/bentopdf-simple:latest | `ghcr.io/alam00000/bentopdf-simple:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/bentopdf-2)
