# Deploy melodious-respect on Railway

A personal music streaming server built with Nim

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/melodious-respect)

## About

**melodious-respect** is a self-hosted personal music streaming server built in Nim. It streams audio files directly from private or public Git repositories, making it simple, secure, and portable. With a clean web interface, mobile support, and Git-powered music management, it’s a lightweight way to access your music anywhere.

Hosting **melodious-respect** on Railway allows you to run a private, on-demand music streaming service without worrying about server setup or storage. Instead of uploading music directly to the hosting platform, you connect a private GitHub or GitLab repository containing your music library. melodious-respect then streams files securely from Git, removing the need for persistent storage. Railway handles deployment, scaling, and uptime, while you retain full control of your music through Git. This setup ensures easy backups, version control, and the flexibility to access your collection globally on desktop or mobile.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nim-Music-Player | [xytrux/Nim-Music-Player](https://github.com/xytrux/Nim-Music-Player) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3478 |
| `GIT_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** JavaScript, Nim, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/melodious-respect)
