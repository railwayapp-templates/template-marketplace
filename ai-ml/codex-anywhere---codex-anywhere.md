# Deploy codex-anywhere on Railway

Run OpenAI Codex on Railway and connect from anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-anywhere)

## About

codex-anywhere is a Railway template that gives you a persistent remote Linux environment for OpenAI Codex. It installs Codex, GitHub CLI, Railway CLI, Node.js, Python, Git, and common developer tools, then exposes the machine through Railway SSH so your desktop or mobile Codex sessions can reconnect to the same workspace.

Hosting codex-anywhere on Railway involves deploying a single Docker-based service with persistent storage mounted at `/data`. The image prepares an Ubuntu development environment, installs Codex and useful CLI tooling, configures Railway's agent setup, and keeps the container running for SSH access. 

After deployment, users add an SSH key to Railway, create a local SSH config entry, and connect from the Codex desktop app or ChatGPT mobile app. 

Project files, Codex config, Railway auth, SSH settings, and cloned repositories persist across restarts, so the environment behaves like a small always-available development machine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codex-anywhere | [m-abdelwahab/codex-anywhere](https://github.com/m-abdelwahab/codex-anywhere) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/codex-anywhere)
