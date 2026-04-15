# Deploy Termix SSH on Railway

Web-based server manager with SSH terminal, tunneling, and file editing​

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/termix-ssh)

## About

Termix is an open-source, forever-free, self-hosted all-in-one server management platform. It provides a multi-platform solution for managing your servers and infrastructure through a single, intuitive interface. Termix offers SSH terminal access, remote desktop control (RDP, VNC, Telnet), SSH tunneling capabilities, remote SSH file management, and many other tools.

Termix is super easy to setup. Upon loading the web-app, you will be prompted to make an admin user, from there you can manage your servers and connect to them freely.

Desktop and mobile app files are avaliable to install on GitHub. They are easy to connect to your Termix SSH server, requiring only the Railway URL and an authentication method.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lukegus/termix:latest | `ghcr.io/lukegus/termix:latest` | Web service |
| guacamole/guacd:latest | `guacamole/guacd:latest` | Worker |

## Configuration

- **Healthcheck:** `/heath`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/termix-ssh)
