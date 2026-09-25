# Deploy Zot on Railway

Zot 2.1 OCI container registry with login, web UI and search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zot)

## About

Zot is a vendor-neutral, OCI-native container image registry from the CNCF. It stores Docker and OCI images, Helm charts and other OCI artifacts, and works with `docker`, `podman`, `oras`, `helm` and Kubernetes. A single binary provides the registry, a web UI, search, deduplication and garbage collection.

This template deploys Zot v2.1.21 from a small public wrapper image that builds on the official binary, pinned by digest. On every start it generates the login file from environment variables, so the admin password is set at deploy time and rotating it is a redeploy. Images are stored on a Railway volume with deduplication and garbage collection on. Anonymous pulls are off by default; set `ZOT_ANONYMOUS_READ=true` to make images public. Push and pull go through the Railway domain over HTTPS. Plan storage for your images: the Hobby volume limit is 5 GB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zot | [aalfath/zot-railway-template](https://github.com/aalfath/zot-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `ZOT_ADMIN_USER` | (secret) |
| `ZOT_ADMIN_PASSWORD` | (secret) |
| `ZOT_ANONYMOUS_READ` | false |

## Configuration

- **Healthcheck:** `/v2/_zot/ext/mgmt`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/registry`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/zot)
