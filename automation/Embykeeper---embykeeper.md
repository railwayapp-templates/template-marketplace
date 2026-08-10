# Deploy Embykeeper on Railway

Automated tool for check-in and account retention.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/embykeeper)

## About

Embykeeper is an automation tool for Emby media-server accounts and related Telegram-based services. It supports scheduled check-ins, Emby account keep-alive tasks, site monitoring, messaging, and other automated workflows. It is distributed as a Python application and Docker image, with configuration stored through its configuration file and persistent application data.

Hosting Embykeeper on Railway requires a single application service running the project's Dockerfile and a persistent Railway Volume mounted at `/app`. The Docker image includes the Python runtime, application dependencies, and startup entrypoint. For deployments using the web console, Railway should expose port `1818`, while `EK_WEBPASS` enables the web interface. Persistent storage is important because Embykeeper uses files such as `config.toml` and `cache.json` under `/app`. Railway replaces the Docker Compose host-networking and port-mapping configuration with its own networking and public-domain configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| emby-keeper | [bilalnawaz072/emby-keeper](https://github.com/bilalnawaz072/emby-keeper) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1818 | - |
| `EK_WEBPASS` | - | Paasward to login |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Automation · **Languages:** Python, HTML, Makefile, JavaScript, PowerShell, Batchfile, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/embykeeper)
