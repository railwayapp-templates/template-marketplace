# Deploy CloudBeaver on Railway

Web-based client & management tool for databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cloudbeaver)

## About

CloudBeaver is a lightweight, web-based database management tool built by the creators of DBeaver. It allows you to manage SQL and NoSQL databases directly from your browser. CloudBeaver is open-source, easy to deploy, and designed for teams or individuals who need secure database access without installing heavy desktop tools.

Hosting CloudBeaver on Railway provides a fast and scalable way to run a web-based database management interface in the cloud. With Railway, you can deploy the official CloudBeaver Docker image, connect it to your databases, and access a secure browser-based UI. This removes the need for local installations, simplifies collaboration, and ensures your team can manage databases from anywhere. Railway handles the container lifecycle, scaling, and uptime so you can focus on database management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudBeaver | `dbeaver/cloudbeaver` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8978 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cloudbeaver/workspace`

**Category:** Analytics

[View on Railway →](https://railway.com/template/cloudbeaver)
