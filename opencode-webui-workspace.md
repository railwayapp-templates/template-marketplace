# Deploy OpenCode WebUI Workspace on Railway

Free OpenCode LLM Agent for Python, NodeJS, Bun, Go, Rust safely YOLO!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/opencode-webui-workspace)

## About

Deploying OpenCode WebUI Workspace involves running a Docker container that bundles OpenCode WebUI v1.1.25 with a full development stack. The container exposes a web interface on port 4096 and requires environment variable configuration for security (password protection). The container runs as a non-root `opencode` user with passwordless sudo access, providing security while allowing necessary system operations. Railway handles the container orchestration, networking, and scaling automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | `ghcr.io/bon5co/opencode-webui-workspace:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4096 |
| `OPENCODE_SERVER_PASSWORD` | (secret) |
| `OPENCODE_SERVER_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/opencode/workspace`

**Category:** Automation

[View on Railway →](https://railway.com/template/opencode-webui-workspace)
