# Deploy VERT [Updated Mar '26] on Railway

VERT [Mar ’26] (Free file Converter, No Limits, Privacy-First) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vertsh)

## About

Vert is a lightweight, developer-friendly tool that turns one file format into another. It is designed to handle common file conversions in a simple, fast, and predictable way - without bloated dependencies or complex configuration.

Vert is ideal for teams and developers who need reliable file format conversion as part of their product or workflow. Instead of writing custom scripts or stitching together multiple tools, Vert provides a clean, focused service that converts files programmatically and consistently.

By deploying Vert on Railway, you can run your own file conversion service in minutes using a one-click deploy, without managing servers, workers, or infrastructure by hand.

Self hosting Vert means your files never leave infrastructure you control. There is no third-party SaaS processing your data, no usage limits enforced by external services, and no risk of sensitive files being stored elsewhere.

Instead of manually setting up servers, installing conversion dependencies, handling file uploads, and managing background jobs, Railway provides a managed runtime environment where Vert runs smoothly out of the box.

When you deploy Vert on Railway:
*   The Vert service runs in secure, managed containers
*   Environment variables and configuration are handled safely
*   Logs, health checks, and automatic restarts work by default
*   Scaling is simple as file conversion demand increases
*   Deployments are fast and repeatable
    

This allows you to add file format conversion to your product without becoming a DevOps expert.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VERT | [VERT-sh/VERT](https://github.com/VERT-sh/VERT) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PUB_ENV` | development |
| `PUB_VERTD_URL` | https://vertd.vert.sh |
| `PUB_STRIPE_KEY` | pk_live_51RDVmAGSxPVad6bQwzVNnbc28nlmzA30krLWk1fefCMpUPiSRPkavMMbGqa8A3lUaOCMlsUEVy2CWDYg0ip3aPpL00ZJlsMkf2 |
| `PUB_DONATION_URL` | https://donations.vert.sh |
| `PUB_PLAUSIBLE_URL` | https://plausible.example.com |
| `PUB_DISABLE_ALL_EXTERNAL_REQUESTS` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Svelte, TypeScript, SCSS, JavaScript, HTML, Dockerfile, CSS, Nix

[View on Railway →](https://railway.com/deploy/vertsh)
