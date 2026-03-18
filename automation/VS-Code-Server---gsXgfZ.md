# Deploy VS Code Server on Railway

Your own personal remote development environment, on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gsXgfZ)

## About

# VS Code Server for Railway

A customized code-server deployment template for [Railway](https://railway.app), featuring a rapid build time with an extensible and programmable set of parameters to fine-tune your environment exactly how you want it (e.g. specify applications, runtimes, vscode extensions).

## Features

- **VS Code Anywhere**: Spin up a remote code environment and access from anywhere
- **Application Installation**: Easily install common development tools
- **VS Code Extension Support**: Pre-install your favorite extensions
- **Git Repository Integration**: Clone your project automatically on startup

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [mazshakibaii/railway-code-server](https://github.com/mazshakibaii/railway-code-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_NAME` | - | The name of your code server, will be displayed as PWA name and on login page. |
| `GIT_REPO` | - | A link to the git repo you will be working on. Or leave as blank to start a clean instance. |
| `PASSWORD` | (secret) | Your password, used for logging into the code server. |
| `INSTALL_APPS` | - | A comma-separated list of apps/runtimes to install. Supported values: bun, node, go, rust, zig, java, and python. (e.g. "bun,node") |
| `VS_CODE_EXTENSIONS` | - | A comma-separated list of extension names from the Open VSX Registry: https://open-vsx.org/ (e.g. "esbenp.prettier-vscode,bradlc.vscode-tailwindcss") |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** HTML, Shell, Go, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/gsXgfZ)
