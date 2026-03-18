# Deploy ChromaDB on Railway

Template for ChromaDB vector database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Vlo43b)

## About

# ChromaDB

_The AI-native embedding database_

This template is based on a other version : [Railway template](https://railway.app/template/kbvIRV). I have try to use it but the configuration didn't work so a update it and make my own template.

This is a public accessible Vector DB with Bearer Auth.

This template use the latest version of the docker container

Any question and remarks can be said in the forum

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ChromaDB | `chromadb/chroma:0.5.23` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ALLOW_RESET` | False |
| `IS_PERSISTENT` | True |
| `ANONYMIZED_TELEMETRY` | False |
| `CHROMA_SERVER_AUTHN_PROVIDER` | chromadb.auth.token_authn.TokenAuthenticationServerProvider |
| `CHROMA_SERVER_AUTHN_CREDENTIALS` | (secret) |
| `CHROMA_AUTH_TOKEN_TRANSPORT_HEADER` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "exec uvicorn chromadb.app:app --workers 1 --host 0.0.0.0 --port $PORT --proxy-headers --log-config chromadb/log_config.yml --timeout-keep-alive 30"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/chroma/chroma`

**Category:** Storage

[View on Railway →](https://railway.com/template/Vlo43b)
