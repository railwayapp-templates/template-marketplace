# Deploy Floci UI on Railway

A visual console for managing Floci AWS, Azure, and GCP emulators.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/floci-ui)

## About

Floci UI is a visual multi-cloud console for browsing, inspecting, and managing resources across Floci cloud emulators.

It provides a web interface for Floci AWS, Azure, and GCP environments, making it easier to explore emulated cloud resources without relying entirely on CLI commands, SDK calls, or raw APIs.

This template deploys Floci UI on Railway using the official `floci/floci-ui:latest` Docker image.

Floci UI runs as a standalone web application on port `4500` and connects to existing Floci emulator deployments through their configured endpoints.

The UI does not include or automatically deploy AWS, Azure, or GCP emulators. At least one supported Floci emulator should already be running and reachable from this service.

Floci UI does not require persistent storage because cloud resources and emulator state remain stored in the connected Floci emulator services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| floci | `floci/floci-ui` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4500 | Railway HTTP target port |
| `AWS_REGION` | us-east-1 | Default AWS region |
| `FLOCI_ENDPOINT` | - | Required Floci AWS emulator endpoint |
| `AWS_ACCESS_KEY_ID` | test | Dummy AWS access key for Floci emulator |
| `FLOCI_GCP_PROJECT` | floci-local | Default GCP project ID |
| `FLOCI_GCP_ENDPOINT` | - | Optional Floci GCP emulator endpoint |
| `FLOCI_AZURE_ENDPOINT` | - | Optional Floci Azure emulator endpoint |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Dummy AWS secret key for Floci emulator |
| `FLOCI_AZURE_ACCOUNT_NAME` | devstoreaccount1 | Default Azure Storage account |
| `FLOCI_AZURE_RESOURCE_GROUP` | floci-local | Default Azure resource group |
| `FLOCI_AZURE_SUBSCRIPTION_ID` | 00000000-0000-0000-0000-000000000000 | Default Azure subscription |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/floci-ui)
