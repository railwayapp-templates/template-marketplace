# Deploy Ubuntu 22.04 on Railway

Ubuntu 22.04 LTS terminal accessible via your web browser! 🌐✨

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2204)

## About

![Ubuntu Logo](https://assets.ubuntu.com/v1/ff6a9a38-ubuntu-logo-2022.svg)

Ubuntu 22.04 LTS (Jammy Jellyfish) is a robust, open-source Linux distribution known for its stability, security, and long-term support. It serves as a premier foundation for developers to build, test, and run applications, offering a vast ecosystem of packages and a modern kernel optimized for cloud workloads.

Hosting this Ubuntu 22.04 template involves deploying a containerized Linux environment that is accessible via a high-performance web terminal. By leveraging Docker and `ttyd`, the deployment transforms a standard CLI into an interactive HTTP-based session. This setup eliminates the need for local virtual machines or complex SSH configurations. Once deployed on Railway, the system automatically handles networking, SSL encryption, and resource allocation, providing you with a persistent or ephemeral sandbox (depending on volume configuration) that can be accessed from any device with a web browser.

![Ubuntu Home Screen](https://raw.githubusercontent.com/codestorm-official/ubuntu-2204-on-browser/refs/heads/main/img/ubuntu_home.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-2204-on-browser | [codestorm-official/ubuntu-2204-on-browser](https://github.com/codestorm-official/ubuntu-2204-on-browser) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |

## Configuration

- **Volume:** `/root/workspace`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-2204)
