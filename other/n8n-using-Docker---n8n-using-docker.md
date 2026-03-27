# Deploy n8n using Docker  on Railway

Containerized n8n for powerful, self-hosted workflow automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-using-docker)

## About

n8n is a powerful, source-available workflow automation tool that lets you interconnect different apps and APIs. Deploying n8n using Docker provides a lightweight, containerized environment, ensuring consistent performance and giving you full control over your data and integrations.

Hosting n8n using Docker involves running the official n8n container image within a managed cloud environment. Because n8n stores workflow data, credentials, and execution history locally by default, setting up a persistent storage volume is critical to prevent data loss between deployments or container restarts. 

Additionally, you will need to configure essential environment variables, such as the webhook URL and port settings, to ensure external services can securely communicate with your automated workflows. Containerized hosting makes it incredibly straightforward to scale your automation infrastructure or update n8n to newer versions simply by pulling the latest Docker image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/n8n-using-docker)
