# Deploy imagor on Railway

Fast, secure image processing server in Go — drop-in Thumbor replacement.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imagor)

## About

imagor is a fast, secure image processing server and Go library built on libvips. Resize, crop, smart-crop, rotate, watermark, filter and convert images on the fly through a URL-based API — typically 4–8x faster than ImageMagick, with libvips streaming for parallel processing pipelines and high network throughput.

It adopts the Thumbor URL syntax, so it works as a **drop-in replacement**: existing image URLs and integrations keep working.

This template deploys imagor as a single stateless HTTP service from the official `shumc/imagor` image. Railway builds nothing — the container starts and binds to the platform-provided `PORT`. A public HTTPS domain is created automatically and routed to the service, and the deployment is health-checked at `/healthcheck`.

A signing secret is generated automatically at deploy time. URL signing is **required** by default; unsigned mode is deliberately not enabled, because on a public deployment it would let any request make imagor fetch an arbitrary URL — an SSRF vector.

Because signing is on, a plain request returns `403`. Generate a signed URL like this:

```python
import hmac, hashlib, base64

def sign(path: str, secret: str) -&gt; str:
    h = hmac.new(secret.encode(), path.encode(), hashlib.sha1)
    return base64.urlsafe_b64encode(h.digest()).decode() + '/' + path

print(sign('500x500/top/raw.githubusercontent.com/cshum/imagor/master/testdata/gopher.png', ''))
```

Then request `https:///`. SHA-256 and SHA-512 are also supported via `IMAGOR_SIGNER_TYPE`. Recipes for Go, PHP, Node and others are in the [security docs](https://docs.imagor.net/security).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imagor | `shumc/imagor:1.9.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `IMAGOR_SECRET` | (secret) |
| `HTTP_LOADER_ACCEPT` | image/* |
| `HTTP_LOADER_BLOCK_PRIVATE_NETWORKS` | 1 |
| `HTTP_LOADER_BLOCK_LOOPBACK_NETWORKS` | 1 |
| `HTTP_LOADER_BLOCK_LINK_LOCAL_NETWORKS` | 1 |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/imagor)
