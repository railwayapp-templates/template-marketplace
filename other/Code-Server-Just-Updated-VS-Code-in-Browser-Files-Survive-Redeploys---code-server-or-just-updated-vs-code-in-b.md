# Deploy Code Server | (Just Updated) VS Code in Browser, Files Survive Redeploys on Railway

Browser VS Code on a volume - files, settings, extensions survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-or-just-updated-vs-code-in-b)

## About

code-server runs Visual Studio Code as a web application, so a full IDE — editor, integrated terminal, extension marketplace, source control — is reachable from any browser. This template deploys code-server 4.134.0 with its home directory on a persistent volume, because a stock deploy keeps your files, settings and extensions on the container's disposable layer and loses all of them on every redeploy.

This template runs code-server as one service with a volume mounted at `/home/coder`, which is where the editor keeps everything durable: your project files, `settings.json`, keybindings, installed extensions, the SSH directory and the shell profile. Railway mounts volumes as root while code-server runs as an unprivileged user, so the container repairs ownership on the mount before the editor starts, and it restores the shell skeleton files the mount would otherwise hide. The server binds Railway's injected port rather than the port baked into the upstream image, and it is healthchecked on `/healthz`. The access password is generated per deployment and the container refuses to boot without one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | `ghcr.io/bon5co/code-server-railway:4.134.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other

[View on Railway →](https://railway.com/deploy/code-server-or-just-updated-vs-code-in-b)
