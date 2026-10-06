# Deploy imagor on Railway

Fast, secure image processing server in Go — drop-in Thumbor replacement.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imagor)

## About

imagor is a fast, secure image processing server and Go library built on libvips. Resize, crop, smart-crop, rotate, watermark, filter and convert images on the fly through a URL-based API — typically 4–8x faster than ImageMagick, with libvips streaming for parallel pipelines and high network throughput.

It adopts the Thumbor URL syntax, so it works as a **drop-in replacement**: existing image URLs and integrations keep working.

This template deploys imagor as a single stateless HTTP service from the official `shumc/imagor` image. Railway builds nothing — the container starts and binds to the platform-provided `PORT`. A public HTTPS domain is created automatically, and the deployment is health-checked at `/healthcheck`.

A signing secret is generated at deploy time and URL signing is **required**. Unsigned mode is deliberately not enabled: on a public deployment it lets any request make imagor fetch an arbitrary URL, which is an SSRF vector.

Because signing is on, a plain request returns `403`. The signature is an HMAC of the URL path, prefixed to the path — recipes for Python, Go, PHP, Node and others are in the [security docs](https://docs.imagor.net/security). SHA-256 and SHA-512 are supported via `IMAGOR_SIGNER_TYPE`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imagor | `shumc/imagor:1.9.6` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IMAGOR_SECRET` | (secret) | Signs image URLs (HMAC). Generated at deploy time; rotating it invalidates existing signed URLs. |
| `HTTP_LOADER_ACCEPT` | image/* | image/* — sets the Accept header and validates the response Content-Type, so only images are fetched. |
| `HTTP_LOADER_BLOCK_PRIVATE_NETWORKS` | 1 | Rejects connections to private network addresses (RFC 1918 and IPv6 unique-local). |
| `HTTP_LOADER_BLOCK_LOOPBACK_NETWORKS` | 1 | Rejects connections to loopback addresses. Default off. |
| `HTTP_LOADER_BLOCK_LINK_LOCAL_NETWORKS` | 1 | Rejects connections to link-local addresses (169.254.0.0/16). Default off. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/imagor)
