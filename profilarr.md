# Deploy Profilarr on Railway

Configuration management tool for Radarr/Sonarr

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/profilarr)

## About

Profilarr is a self-hosted companion service for Radarr and Sonarr that centralizes and automates quality profiles, custom formats, and media configuration. It enables users to define, version, and synchronize consistent media profiles across multiple *arr instances from a single interface.

Hosting Profilarr involves running a lightweight web application that communicates with existing Radarr and Sonarr instances via their APIs. Profilarr does not handle downloads or file management; instead, it functions as a configuration orchestration layer. Deployment typically consists of a single container, persistent storage for its internal configuration and database, and a small set of environment variables. On Railway, this maps cleanly to one service with a single attached volume, resulting in low operational overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Profilarr | `santiagosayshey/profilarr:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Observability

[View on Railway →](https://railway.com/template/profilarr)
