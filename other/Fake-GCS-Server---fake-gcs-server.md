# Deploy Fake GCS Server on Railway

A lightweight Google Cloud Storage emulator for development and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fake-gcs-server)

## About

Fake GCS Server is a lightweight Google Cloud Storage emulator for development, integration testing, CI/CD, and local application testing without connecting to a real Google Cloud Storage account.

It provides GCS-compatible APIs that can be accessed using Google Cloud Storage clients, SDKs, REST requests, and test frameworks.

This deployment runs Fake GCS Server as a standalone API service with a filesystem-backed storage backend.

The service exposes a Google Cloud Storage-compatible HTTP API for bucket and object operations. It is intended to be accessed by applications, SDKs, REST clients, and automated tests.

Fake GCS Server is an API emulator, not a web application. It does not provide a built-in dashboard or graphical user interface.

When the `/data` directory is backed by persistent storage, buckets and objects can be retained across supported restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fake-gcs-server | `fsouza/fake-gcs-server:1.56.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4443 | Railway HTTP target port |
| `FAKE_GCS_PORT` | - | Fake GCS Server listening port |
| `FAKE_GCS_SCHEME` | http | Internal protocol behind Railway HTTPS |
| `FAKE_GCS_BACKEND` | filesystem | Persistent filesystem storage backend |
| `FAKE_GCS_EXTERNAL_URL` | - | Public emulator URL |
| `FAKE_GCS_FILESYSTEM_ROOT` | /data | Railway Volume path |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fake-gcs-server)
