# Deploy Homarr on Railway

A simple, yet powerful dashboard for your server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_c4Kr9)

## About

Simplify the management of your server with Homarr - a sleek, modern dashboard that puts all of your apps and services at your fingertips. With Homarr, you can access and control everything in one convenient location. Homarr seamlessly integrates with the apps you've added, providing you with valuable information and giving you complete control. Installation is a breeze, and Homarr supports a wide range of deployment methods.

[Homarr Demo](https://demo.homarr.dev/)

Features:
- 🖌️ Highly customizable with an extensive drag and drop grid system
- ✨ Integrates seamlessly with your favorite self-hosted applications
- 📌 Easy and fast app management - no YAML involved
- 🙊 Advanced secrets' management system for enhanced security
- 📄 Detailed documentation and active community
- 🔍 Search through the web or supported integrations in an instant
- 🏴󠁧󠁢󠁮󠁩󠁲󠁿 Monitor your application with a built-in status system
- 🦞 Comprehensive built-in icon picker with over 7000 icons
- 🐳 Easy deployment with Docker, unRAID, and Synology
- 🚀 Compatible with any major consumer hardware (x86, Raspberry Pi, old laptops, ...)

Documentation:
For more information, Visit [Homarr Docs](https://homarr.dev/docs/getting-started/)

https://homarr.dev/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homarr | `ghcr.io/homarr-labs/homarr:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HOSTNAME` | 0.0.0.0 |
| `SECRET_ENCRYPTION_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/_c4Kr9)
