# Deploy Homar on Railway

Custom dashboard with 40+ integrations, auth, 20K+ icons, no YAML

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homar)

## About

![1](https://raw.githubusercontent.com/homarr-labs/homarr/dev/docs/img/logo/2340450-2-title.png)

Homarr is an open-source, self-hosted dashboard that brings all your applications, services, and infrastructure into a single customizable homepage. With a drag-and-drop interface, powerful integrations, user management, authentication support, and real-time widgets, Homarr helps individuals and teams organize, monitor, and quickly access their self-hosted services from one central dashboard.

Hosting Homarr on Railway provides a managed environment for running your personal dashboard without maintaining servers or container infrastructure yourself. Railway automatically deploys the application, provisions networking, manages HTTPS, and makes scaling straightforward as your dashboard grows. Homarr stores dashboard layouts, user accounts, permissions, and application settings, making persistent storage important for production deployments. It can also integrate with external authentication providers such as OIDC and LDAP, along with dozens of self-hosted services including media servers, monitoring platforms, and home automation tools. Railway's private networking allows Homarr to securely communicate with internal services while exposing only the dashboard through a public HTTPS endpoint.

![0](https://github.com/homarr-labs/homarr/raw/dev/docs/img/screenshot.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Homarr | `ghcr.io/homarr-labs/homarr:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port |
| `HOSTNAME` | 0.0.0.0 | - |
| `SECRET_ENCRYPTION_KEY` | (secret) | Secret Key |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homar)
