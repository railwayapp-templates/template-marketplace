# Deploy code-server on Railway

VS Code in the browser with persistent projects and secure access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-2)

## About

code-server runs VS Code in a web browser, giving you a consistent remote development environment from laptops, tablets, and other devices. It supports terminal access, Git workflows, extensions from Open VSX, persistent editor settings, and server-side builds while keeping project files on infrastructure you control.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-2)

**Published on the Railway marketplace:** https://railway.com/deploy/code-server-2 (`code-server-2`). See [TEMPLATE.md](./TEMPLATE.md) for the publication record and authoritative variable package.

Hosting code-server requires one public application container, HTTPS, mandatory password authentication, and persistent storage for projects, settings, extensions, and configuration. This template pins the official `codercom/code-server:4.130.0` image, exposes port `8080`, and mounts one Railway volume at `/home/coder`. A startup command briefly runs with Railway's documented root volume access to assign ownership, then launches code-server as the unprivileged `coder` user. Railway terminates TLS, generates a fresh password during template deployment, and checks the unauthenticated `/healthz` liveness endpoint. No external database or proxy-specific public URL variable is required for the generated Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | `codercom/code-server:4.130.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "chown coder:coder /home/coder && install -d -o coder -g coder /home/coder/project /home/coder/.config/code-server /home/coder/.local/share/code-server && exec sudo -E -H -u coder -- /usr/bin/code-server --bind-addr 0.0.0.0:8080 /home/coder/project"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other

[View on Railway →](https://railway.com/deploy/code-server-2)
