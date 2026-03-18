# Deploy Claude Code on mobile on Railway

Use Claude Code on mobile via SSH

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-code-on-mobile)

## About

Deploy a fully-configured Ubuntu 22.04 development environment with SSH access on Railway. This template provides a complete containerized workspace with development tools, CLI utilities, and remote SSH connectivity for cloud-based development.

This template creates a Docker container running Ubuntu 22.04 with SSH server enabled, allowing you to connect remotely to your Railway deployment. Unlike traditional VPS hosting, this runs as a containerized environment on Railway's infrastructure, providing instant deployment and automatic scaling capabilities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claude-code-mobile | [MehdiG44/claude-code-railway](https://github.com/MehdiG44/claude-code-railway) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GH_TOKEN` | (secret) | For Github CLI |
| `GITHUB_NAME` | - | GITHUB_NAME |
| `GITHUB_EMAIL` | - | GITHUB_EMAIL |
| `SSH_PASSWORD` | (secret) | SSH_PASSWORD |
| `SSH_USERNAME` | (secret) | SSH_USERNAME |

## Configuration

- **TCP Proxies:** 22

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/claude-code-on-mobile)
