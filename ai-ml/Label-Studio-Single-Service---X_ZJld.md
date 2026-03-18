# Deploy Label Studio (Single Service) on Railway

Deploys Label Studio via a single docker image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/X_ZJld)

## About

## Overview

Deploys [Label Studio](https://github.com/HumanSignal/label-studio) to a public endpoint.

## Highlights

 - Uses a single service/docker container to host the service.
 - Tasks/Annotations are persisted through the data volume.
 - Not suitable for large/production workloads, as it uses the built-in SQLite3 engine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Label Studio | `heartexlabs/label-studio:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/label-studio/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/X_ZJld)
