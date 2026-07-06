# Deploy AlmaLinux 10 - Web Terminal on Railway

[Jul'26] Deploy AlmaLinux 10 and access it through your browser! 🚀🌐

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/almalinux-10-web-terminal)

## About

AlmaLinux 10 - Web Terminal is a browser-accessible AlmaLinux 10 workspace hosted on Railway. Instead of connecting through SSH, users open a web terminal, log in with only a `USERNAME` and `PASSWORD`, and get an enterprise Linux compatible command-line environment for testing, development, diagnostics, package installation, and lightweight Linux workflows.

![Imgur](https://imgur.com/7PzWOiL.png)

Hosting AlmaLinux 10 - Web Terminal on Railway involves deploying a containerized AlmaLinux 10 environment with a browser-based terminal interface. Railway handles the deployment, runtime, networking, environment variables, and infrastructure, while the template exposes a secure web terminal protected by user-defined login credentials. Users only need to set `USERNAME` and `PASSWORD` during deployment, then open the generated Railway service URL to access the terminal from a browser. This makes it useful for quick Linux access, RPM-based package testing, command-line learning, diagnostics, and lightweight cloud-hosted development workflows without manually managing a VPS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| almalinux | [codestorm-official/almalinux-web-terminal](https://github.com/codestorm-official/almalinux-web-terminal) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Jakarta |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `SHOW_WELCOME` | true |
| `TTYD_VERSION` | 1.7.7 |
| `TTYD_WRITABLE` | true |
| `WORKSPACE_DIR` | /root/workspace |
| `WELCOME_COMMAND` | almalinux-welcome |
| `ALMALINUX_VERSION` | 10 |
| `TERMINAL_PASSWORD` | (secret) |
| `TERMINAL_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/workspace`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/almalinux-10-web-terminal)
