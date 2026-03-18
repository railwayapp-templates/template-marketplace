# Deploy BentoPDF + Auth on Railway

Deploy and Host BentoPDF + Auth with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bentopdf-auth)

## About

BentoPDF is a powerful, privacy-first PDF toolkit that runs entirely in your browser. It offers 50+ tools for merging, splitting, compressing, editing, and converting PDFs without uploading files to external servers. This template adds Caddy-based password authentication to protect your instance.

This template deploys two services: BentoPDF as the core PDF processing application and Caddy as a reverse proxy with HTTP Basic Authentication. BentoPDF runs client-side, meaning all PDF operations happen in users' browsers—no documents are uploaded or stored on the server. The Caddy proxy intercepts all incoming requests and requires valid credentials before granting access, making it ideal for teams or organizations that need a shared, protected PDF toolkit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bentopdf | `bentopdf/bentopdf:latest` | Worker |
| caddy-password-auth | [iliab1/caddy-password-auth](https://github.com/iliab1/caddy-password-auth) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bentopdf-auth)
