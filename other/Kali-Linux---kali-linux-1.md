# Deploy Kali Linux on Railway

Deploy Kali Linux Rolling and access via high-performance web terminal 🐉🌐

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kali-linux-1)

## About

Kali Linux is a world-class, open-source Linux distribution geared toward advanced Penetration Testing and Security Auditing. Developed and maintained by Offensive Security, it contains hundreds of tools for various information security tasks, such as research, computer forensics, and reverse engineering, providing a solid foundation for security professionals.

Hosting this Kali Linux template involves deploying a containerized environment based on the official Kali Rolling image, accessible via a high-performance web terminal. By integrating Docker with `ttyd`, this setup transforms a specialized CLI into an interactive, browser-based session secured by Basic Authentication. Deployment on Railway automates the heavy lifting—handling networking, SSL encryption, and resource allocation—allowing you to run security audits or learn Linux internals from any device. With multi-arch support (x86_64 and ARM64) and optional volume mounting for persistent workspaces, you get a reliable, cloud-based "pocket" Kali instance without the need for local virtual machines.

![Kali Home Screen](https://raw.githubusercontent.com/codestorm-official/kali-on-browser/refs/heads/main/img/kali_homepage.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kali-on-browser | [codestorm-official/kali-on-browser](https://github.com/codestorm-official/kali-on-browser) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Jakarta |
| `PORT` | 7681 |
| `LICENSE` | MIT |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `MAINTAINER` | ASEP SAPUTRA |
| `KALI_VERSION` | rolling |
| `PROJECT_NAME` | kali-on-browser |
| `DEBIAN_FRONTEND` | noninteractive |
| `KALI_METAPACKAGE` | core |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kali-linux-1)
