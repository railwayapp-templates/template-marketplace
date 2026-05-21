# Deploy Ubuntu 24.04 - Web Terminal on Railway

Ubuntu 24.04 LTS terminal accessible via your web browser! 🌐✨

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2404-web-terminal)

## About

![Ubuntu Logo](https://assets.ubuntu.com/v1/ff6a9a38-ubuntu-logo-2022.svg)

Ubuntu 24.04 LTS (Noble Numbat) is a robust, open-source Linux distribution known for its stability, security, and long-term support. It serves as a reliable foundation for developers to build, test, and run applications, offering a vast ecosystem of packages and a modern Linux environment suitable for cloud workloads.

Hosting this Ubuntu 24.04 template involves deploying a containerized Linux environment that is accessible through a high-performance web terminal. By leveraging Docker and `ttyd`, the deployment transforms a standard Ubuntu command-line environment into an interactive HTTP-based terminal session.

This setup removes the need for local virtual machines or complex SSH configuration. Once deployed on Railway, the platform handles networking, HTTPS, and resource allocation, giving you a browser-accessible Linux sandbox that can be used from almost any device.

Depending on your Railway Volume configuration, the environment can be used either as an ephemeral sandbox or as a persistent workspace across deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | [codestorm-official/ubuntu-on-browser](https://github.com/codestorm-official/ubuntu-on-browser) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `LICENSE` | MIT |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `MAINTAINER` | ASEP SAPUTRA |
| `PROJECT_NAME` | ubuntu-on-browser |
| `INSTALLED_VER` | 24.04 |
| `UBUNTU_VERSION` | 24.04 |
| `DEBIAN_FRONTEND` | noninteractive |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/workspace`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-2404-web-terminal)
