# Deploy Floci — OCI Emulator on Railway

A fast Oracle Cloud emulator for development, testing, and CI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/floci-oci)

## About

Floci OCI is a fast, free, and open-source Oracle Cloud Infrastructure emulator for development, testing, automation, and CI/CD workflows.

It provides OCI-compatible APIs for services such as Identity and IAM, Object Storage, Queue, Streaming, Vault, KMS, Secrets, and Functions without requiring a real Oracle Cloud account or production OCI infrastructure.

This template deploys Floci OCI on Railway using the official `floci/floci-oci:latest` Docker image.

Floci OCI exposes its supported Oracle Cloud Infrastructure APIs through a unified HTTP endpoint on port `4599`. Applications, OCI SDKs, OCI CLI, Terraform, OpenTofu, and automated test suites can connect to the Railway public domain instead of real OCI endpoints.

Persistent emulator state is stored in a Railway volume mounted at `/app/data`, allowing supported resources to survive container restarts and redeployments.

OCI Functions can normally execute through a Docker-backed `fnproject/fnserver` sidecar. Railway does not expose the host Docker socket, so this template enables Functions mock mode instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| floci | `floci/floci-oci:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4599 | Railway HTTP target port |
| `FLOCI_OCI_PORT` | 4599 | Floci OCI unified API port |
| `FLOCI_OCI_BASE_URL` | - | Public endpoint returned in service URLs |
| `FLOCI_OCI_STORAGE_MODE` | persistent | Persist emulator state across restarts |
| `FLOCI_OCI_DEFAULT_REALM` | oc1 | Default OCI realm |
| `FLOCI_OCI_DEFAULT_REGION` | us-ashburn-1 | Default emulated OCI region |
| `FLOCI_OCI_DEFAULT_NAMESPACE` | floci-local | Default Object Storage namespace |
| `FLOCI_OCI_SERVICES_FUNCTIONS_MOCK` | true | Mock OCI Functions because Railway does not expose the Docker socket |
| `FLOCI_OCI_STORAGE_PERSISTENT_PATH` | /app/data | Railway persistent volume directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/floci-oci)
