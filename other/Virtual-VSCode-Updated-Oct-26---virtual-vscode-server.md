# Deploy Virtual VSCode [Updated Oct '26] on Railway

VS Code: latest code-server, real healthcheck, persistence verified

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/virtual-vscode-server)

## About

[code-server](https://github.com/coder/code-server) runs full VS Code in a container and serves it over HTTP — open it from a tablet, a Chromebook, or any machine with a browser, and you're in a real development environment, not a toy. This template deploys a fixed fork of the `deploy-code-server` project that Railway's own official `virtual-vscode` template is built on, and fixes three real issues found by actually reading its Dockerfile, entrypoint script, and running it live.

This template builds from `shruti060701/virtual-vscode`, a fork of `coder/deploy-code-server` (MIT), which wraps the official `coder/code-server` (MIT) image with a Railway-friendly entrypoint: password auth from an environment variable, and an optional `GIT_REPO` to auto-clone into your workspace on first boot. The fork changes two things from upstream: the pinned code-server version, and how the workspace directory is initialized so it actually survives a redeploy on Railway's volumes.

The version pin matters more than it sounds. Railway's reference template builds from a Dockerfile that still reads `FROM codercom/code-server:4.9.0` — a release from 2022/2023 — despite the template's own listing being labeled "[Updated Oct '26]". That's roughly 130 releases of bug fixes, security patches, and features sitting unapplied. This fork pins `4.141.0`, the latest stable release as of this writing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [shruti060701/virtual-vscode](https://github.com/shruti060701/virtual-vscode) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIT_REPO` | - | A public git repo URL to auto-clone into the workspace on first boot. Leave empty to start with a blank workspace. |
| `PASSWORD` | (secret) | Password to log into code-server. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder/project`

**Category:** Other · **Languages:** Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/virtual-vscode-server)
