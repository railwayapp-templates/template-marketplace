# Deploy Floci — Azure Emulator on Railway

A fast, open-source Azure emulator for development and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/floci-az)

## About

Floci Azure is a fast, open-source Azure service emulator for development, testing, automation, and CI/CD workflows. It provides Azure-compatible APIs for multiple services without requiring applications to connect directly to production Azure infrastructure.

This template deploys Floci Azure on Railway using the official `floci/floci-az:latest` Docker image.

Floci Azure exposes its emulated Azure services through a unified HTTP endpoint on port `4577`. Applications, SDKs, automation tools, and development environments can connect to the Railway public domain instead of real Azure service endpoints.

Persistent emulator state is stored in a Railway volume mounted at `/app/data`, allowing supported resources to survive container restarts and redeployments.

Because Railway does not expose the host Docker socket to containers, Azure Functions emulation is disabled by default in this template. Other supported Floci Azure services that run directly inside the main emulator remain available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| floci | `floci/floci-az:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4577 | Railway HTTP target port |
| `FLOCI_AZ_PORT` | 4577 | Floci Azure unified API port |
| `FLOCI_AZ_BASE_URL` | - | Public endpoint returned in service URLs |
| `FLOCI_AZ_STORAGE_MODE` | persistent | Persist emulator state across restarts |
| `FLOCI_AZ_STORAGE_PERSISTENT_PATH` | /app/data | Railway persistent volume directory |
| `FLOCI_AZ_SERVICES_FUNCTIONS_ENABLED` | false | Disable Azure Functions because Railway does not expose the Docker socket |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/floci-az)
