# Deploy ParrotOS Core Edition on Railway

Minimal Debian-based Linux for privacy-focused and custom workloads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/parrotos-core-edition)

## About

ParrotOS Core Edition is a minimal, Debian-based Linux distribution focused on performance, privacy, and flexibility. It provides a clean base system that can be fully customized and accessed via the command line using the Railway CLI.

Deploying ParrotOS Core Edition on Railway uses the official Parrot Core Docker image in a lightweight, containerized environment. Railway manages orchestration, networking, and scaling, giving you a fast and minimal ParrotOS environment without server management overhead.

A persistent volume is mounted at `/work` to retain system configurations, installed packages, scripts, and application data across redeployments and restarts. This setup provides an on-demand, cloud-hosted ParrotOS base ideal for custom tooling, development workflows, and privacy-conscious workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ParrotOS Core Edition | `parrotsec/core` | Database |

## Configuration

- **Start command:** `sleep infinity`
- **Volume:** `/work`

**Category:** Other

[View on Railway →](https://railway.com/template/parrotos-core-edition)
