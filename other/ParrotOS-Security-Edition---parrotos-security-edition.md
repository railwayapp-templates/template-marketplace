# Deploy ParrotOS Security Edition on Railway

Debian-based security Linux with privacy, forensics, and pentesting tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/parrotos-security-edition)

## About

ParrotOS Security Edition is a Debian-based Linux distribution focused on security, privacy, and digital forensics. It includes a huge collection of tools that can be used via command line via Railway CLI.

Deploying ParrotOS Security Edition on Railway uses the official Parrot Security Docker image in a lightweight, containerized environment. Railway handles orchestration, networking, and scaling, giving you instant access to a full ParrotOS security toolkit without managing servers or SSH keys manually.

A persistent volume is mounted at `/work` to retain tools, configurations, scripts, and collected artifacts across redeployments and restarts. This setup provides an on-demand, cloud-hosted ParrotOS environment ideal for penetration testing, security research, and isolated experimentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ParrotOS Security Edition | `parrotsec/security` | Database |

## Configuration

- **Start command:** `sleep infinity`
- **Volume:** `/work`

**Category:** Other

[View on Railway →](https://railway.com/template/parrotos-security-edition)
