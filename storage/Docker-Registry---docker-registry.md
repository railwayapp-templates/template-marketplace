# Deploy Docker Registry on Railway

A simple self-hosted docker registry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docker-registry)

## About

Docker Registry is an open-source service from Docker that lets you host and manage your own container images privately. Instead of relying on Docker Hub or external registries, you can store, version, and distribute images directly from your own infrastructure.

Hosting a Docker Registry gives you full control over your image storage, access, and performance. It involves running a `registry:2` container image, configuring filesystem or cloud-backed storage (like Railway volumes or S3), and exposing it securely via TCP or HTTPS. Using Railway, you can easily deploy the registry with persistent storage, define environment variables, and access it through a custom domain or TCP proxy for Docker CLI operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Docker Registry | `registry:2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REGISTRY_HTTP_ADDR` | :8080 |
| `REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY` | /var/lib/registry |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/registry`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/docker-registry)
