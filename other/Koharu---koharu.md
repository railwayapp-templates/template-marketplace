# Deploy Koharu on Railway

ML-powered manga translator, written in Rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/koharu)

## About

Koharu is a local-first manga translation application written in Rust. It provides OCR, text detection, cleanup, inpainting, translation, review, export, Web UI, and automation support in one workflow. This template deploys Koharu in headless mode so it can be accessed through a Railway public domain.

Hosting Koharu on Railway runs the official Koharu Docker image as a headless web service. The container exposes Koharu on port 4000, which Railway can route to a public domain. A persistent volume is recommended because Koharu stores runtime files, downloaded model assets, project data, and local application state. This setup is suitable for users who want a browser-accessible Koharu instance without manually configuring a VPS, reverse proxy, container runtime, or deployment pipeline.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| koharu | `ghcr.io/mayocream/koharu:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/koharu)
