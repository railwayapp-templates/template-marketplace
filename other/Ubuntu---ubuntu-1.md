# Deploy Ubuntu on Railway

Deploy any Ubuntu version and access it through your browser! 🚀🌐✨

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-1)

## About

![Ubuntu Logo](https://assets.ubuntu.com/v1/ff6a9a38-ubuntu-logo-2022.svg)

Ubuntu is a robust, open-source Linux distribution known for its stability, security, and long-term support. This template provides a premier foundation for developers to build, test, and run applications, offering a vast ecosystem of packages and a modern kernel optimized for cloud workloads. **Supports multiple versions including 20.04, 22.04, 24.04, and more (defaults to `latest`).**

Hosting this Ubuntu template involves deploying a containerized Linux environment that is accessible via a high-performance web terminal. By leveraging Docker and `ttyd`, the deployment transforms a standard CLI into an interactive HTTP-based session. This setup eliminates the need for local virtual machines or complex SSH configurations. 

Once deployed on Railway, the system automatically handles networking, SSL encryption, and resource allocation, providing you with a persistent or ephemeral sandbox (depending on volume configuration) that can be accessed from any device with a web browser.

![Ubuntu Home Screen](https://raw.githubusercontent.com/codestorm-official/ubuntu-on-browser/refs/heads/master/img/ubuntu_home.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-on-browser | [codestorm-official/ubuntu-on-browser](https://github.com/codestorm-official/ubuntu-on-browser) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `LICENSE` | MIT | - |
| `PASSWORD` | (secret) | - |
| `USERNAME` | (secret) | - |
| `MAINTAINER` | ASEP SAPUTRA | - |
| `PROJECT_NAME` | ubuntu-on-browser | - |
| `INSTALLED_VER` | latest | - |
| `UBUNTU_VERSION` | - | Choose your preferred version (20.04, 22.04, 24.04, etc.). Defaults to latest if not specified. |
| `DEBIAN_FRONTEND` | noninteractive | - |

## Configuration

- **Volume:** `/root/workspace`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-1)
