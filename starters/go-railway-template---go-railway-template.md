# Deploy go-railway-template on Railway

Go REST API starter for Railway - static binary, healthcheck, one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-railway-template)

## About

Deploy with the one-click button above. Railway provisions a single service named `api`, builds it from the repo's root Dockerfile, injects `PORT`, waits for `/healthz` to return 200, and assigns a public domain — no configuration, no prompts. The first deploy typically goes green in under a minute; the image is ~10 MB.

You host one Go service serving a small JSON REST API. The API is stateless by design: state lives in an in-memory store that resets on restart, so the service can be redeployed or scaled freely. Swapping in a database is your one integration point — replace `store.go`, add the database service, and reference `DATABASE_URL` in your code. Nothing else in the template touches storage.

The service runs as a non-root user on a `scratch` (empty) runtime image. There is no shell, no package manager, and no base OS library surface — just your static binary and CA certificates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | [lNamelessl/go-railway-template](https://github.com/lNamelessl/go-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/go-railway-template)
