# Deploy ChromaDB 0.4.15 on Railway

ChromaDB from official docker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/w0D0Ei)

## About

Directly from the official docker image: https://hub.docker.com/r/chromadb/chroma

I just went to google, searched for "chroma docker image", saw the image, copied its name, asked perplexity how to create a template, copied some env variables from existing templates.

Here I was asked to write 250 characters or more. In case you're wondering what you have just read :)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chromadb/chroma | `chromadb/chroma:0.4.15` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `IS_PERSISTENT` | True |
| `ANONYMIZED_TELEMETRY` | False |
| `CHROMA_SERVER_AUTHN_PROVIDER` | chromadb.auth.token_authn.TokenAuthenticationServerProvider |
| `CHROMA_SERVER_AUTHN_CREDENTIALS` | (secret) |
| `CHROMA_SERVER_CORS_ALLOW_ORIGINS` | ["*"] |
| `CHROMA_AUTH_TOKEN_TRANSPORT_HEADER` | (secret) |

**Category:** Storage

[View on Railway →](https://railway.com/deploy/w0D0Ei)
