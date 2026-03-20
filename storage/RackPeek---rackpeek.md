# Deploy RackPeek on Railway

CLI tool to discover, manage, and document your home lab.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rackpeek)

## About

RackPeek is a web UI and CLI tool for documenting and managing home lab and small-scale IT infrastructure. It helps you track hardware, services, networks, and their relationships in a clear, scriptable, and reusable way — without enterprise bloat or proprietary lock-in.

RackPeek runs as a single Docker container serving a web interface on port 8080. All state is stored in YAML files on a persistent volume at `/app/config`, making it lightweight and easy to back up. There are no external database dependencies — just deploy the container, attach a volume, and you're ready to document your infrastructure. The official Docker image supports both amd64 and arm64 architectures and is actively maintained.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rackpeek | `aptacode/rackpeek:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port for the web UI |
| `RPK_YAML_DIR` | /app/config | Directory where RackPeek stores its YAML configuration |
| `ASPNETCORE_URLS` | http://+:8080 | ASP.NET Core URL binding |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rackpeek)
