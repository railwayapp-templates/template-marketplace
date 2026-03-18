# Deploy Ubuntu 24.04 LTS Web Terminal on Railway

Access a full Ubuntu 24.04 LTS terminal from your browser, anywhere.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ubuntu-2404-lts-web-terminal)

## About

Ubuntu 24.04 LTS Web Terminal is a browser-accessible Linux shell powered by ttyd. It provides instant access to a full Ubuntu environment without SSH configuration. Perfect for remote development, cloud administration, or learning Linux - all through your web browser with password-protected authentication.

Hosting a web terminal requires a containerized Ubuntu environment with ttyd serving the shell over HTTP. This template packages Ubuntu 24.04 LTS (Noble Numbat) with ttyd 1.7.7, pre-installs common development tools, and configures authentication via environment variables. Railway handles the container orchestration, SSL termination, and public URL generation. The included volume mount at `/root` ensures your files, configurations, and installed packages persist across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-terminal | [judetelan/Ubuntu-24.04-LTS-Railway](https://github.com/judetelan/Ubuntu-24.04-LTS-Railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for exposing it to the network. Default is 8080. |
| `PASSWORD` | (secret) | Secure password of your choice. |
| `USERNAME` | (secret) | Username of your choice. |

## Configuration

- **Start command:** `ttyd -p 8080 -W bash`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/ubuntu-2404-lts-web-terminal)
