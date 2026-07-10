# Deploy VS Code Server - Virtual on Railway

Browser based VS Code on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/virtual-visual-studio-code-server)

## About

Virtual Visual Studio Code Server provides a browser-based Visual Studio Code environment that runs on a remote server. It enables developers to write, edit, debug, and manage projects from any device with a web browser while maintaining a consistent development workspace. It is ideal for cloud development, remote teams, and portable coding environments.

Hosting Virtual Visual Studio Code Server on Railway allows you to run a secure, browser-accessible development environment without managing your own infrastructure. Railway deploys the container, provides automatic HTTPS, public networking, and simplified environment variable management. A persistent Railway Volume is recommended to retain user settings, extensions, workspaces, SSH keys, and project files across deployments. The application listens on an HTTP endpoint that Railway exposes through its networking layer. Scaling and service management are handled through the Railway dashboard, making it easy to maintain a reliable remote development environment while focusing on your projects instead of server administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linuxserver/code-server:4.127.0 | `linuxserver/code-server:4.127.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/virtual-visual-studio-code-server)
