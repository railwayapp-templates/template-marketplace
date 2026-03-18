# Deploy Code Server on Railway

VS Code in the browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server)

## About

## Overview

Coder is your self-hosted remote development platform. 

Coder shifts software development from local machines to on-prem and public cloud infrastructure. Onboard new developers in minutes, build code on powerful servers—all while keeping source code and data secure behind your firewall.

This template creates a dev environment that you can access from any device.

## Highlights

- Create a code-server deployment on Railway
- Add custom tools like NodeJS
- Redeploy automatically after each change

## Learn More

- [Coder](https://coder.com/)
- [code-server](https://github.com/coder/code-server)
- [Guide: Launching code-server on Railway](https://github.com/coder/deploy-code-server/blob/main/guides/railway.md)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [coder/deploy-code-server](https://github.com/coder/deploy-code-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIT_REPO` | - | A git repo to auto-clone and open in code-server (e.g https://github.com/coder/docs). |
| `PASSWORD` | (secret) | Your password to log in to code-server. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/code-server)
