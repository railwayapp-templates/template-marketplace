# Deploy Debian 13 On Browser on Railway

Deploy Debian 13 and access it through your browser! 🚀🌐✨

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-13-on-browser)

## About

Debian 13 On Browser is a lightweight, browser-accessible Debian terminal environment packaged for Railway. It runs the official Debian 13 container image, installs common CLI tools, and exposes an authenticated shell through `ttyd`, making it useful for learning Linux, testing scripts, and keeping a portable cloud terminal ready from any modern browser.

![](https://raw.githubusercontent.com/codestorm-official/debian-13-on-browser/refs/heads/main/img/debian_home.png)

Hosting Debian 13 On Browser on Railway involves deploying a containerized Debian 13 environment with a web terminal exposed over HTTP. The template uses Docker for the base operating system and `ttyd` to turn the Bash shell into an interactive browser session protected by Basic Authentication. Railway handles the service runtime, public networking, HTTPS, environment variables, and scaling options. By default, the container is ephemeral, but you can mount a Railway Volume to `/root/workspace` when you need files to persist across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Debian 13 | [codestorm-official/debian-13-on-browser](https://github.com/codestorm-official/debian-13-on-browser) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `LICENSE` | MIT |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `PROJECT_NAME` | debian-on-browser |
| `INSTALLED_VER` | 13 |
| `DEBIAN_VERSION` | 13 |
| `DEBIAN_FRONTEND` | noninteractive |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/workspace`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/debian-13-on-browser)
