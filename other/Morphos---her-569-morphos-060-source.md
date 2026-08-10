# Deploy Morphos on Railway

Private self-hosted image and document converter for developer workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/her-569-morphos-060-source)

## About

Morphos is a self-hosted file conversion server for private image and document workflows. It provides a simple web interface and an API for converting supported files without sending them to a third-party conversion service. This template uses the upstream Morphos 0.6.0 container image pinned by digest.

This template runs Morphos as a single public HTTP service on port 8080. Railway provides the deployment, networking, restart policy, and TLS-backed service domain. Morphos stores intermediate conversion files under `/tmp`; those files are temporary by design, so this template does not attach a persistent volume or require a database. The application exposes `/healthz` for readiness checks and `/api/v1/formats` for supported-format discovery. The image includes the conversion dependencies used by the upstream release, including LibreOffice, FFmpeg, and Calibre.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HER-569-Morphos-0.6.0-Source | `ghcr.io/danvergara/morphos-server@sha256:3d6f64ef386cbb6a7c5d55526e1a69da2d3661a1996d757897e92bf4369088f5` | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/her-569-morphos-060-source)
