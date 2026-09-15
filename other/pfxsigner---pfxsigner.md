# Deploy pfxsigner on Railway

HTTP PDF signing server using PFX certificates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pfxsigner)

## About

[pfxsigner](https://github.com/knadh/pfxsigner) is an HTTP server (and CLI) for digitally signing PDFs with signatures loaded from PFX (PKCS #12) certificates.

This template packages the `v0.4.0` Linux release. On start it generates a demo PFX (legacy PBE for Go pkcs12 compatibility) and default `props.json` on a volume at `/data`, then serves `POST /document` on port 8000. Replace the demo certificate with your own PFX for production signing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pfxsigner | `kailashnadh/pfxsigner:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PFX_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pfxsigner)
