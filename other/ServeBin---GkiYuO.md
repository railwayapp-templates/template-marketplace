# Deploy ServeBin on Railway

Elevating HTTP Testing to Effortless Debugging.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/GkiYuO)

## About

ServeBin is a cutting-edge HTTP testing and debugging tool, built with the latest technologies in Go. This documentation provides comprehensive details about the endpoints, parameters, and responses offered by ServeBin, empowering developers to streamline their testing workflows and ensure the reliability of their applications. Explore the various features and capabilities of ServeBin to optimize your development process and elevate your HTTP testing experience.

**Live Demo:** https://servebin.dev

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ServeBin | [AyushAgnihotri2025/ServeBin](https://github.com/AyushAgnihotri2025/ServeBin) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV` | production | Deployment type can be production or development |
| `HOST` | 0.0.0.0 | Host where to start the server and listen to the requests |
| `PORT` | - | Port where to listen to the requests |
| `IS_SSL` | true | true if using 'https' else false |
| `GIN_MODE` | release | debug/release |
| `MAIN_SERVER` | https://servebin.dev | Only required when IS_BACKUP_SERVER is set to true |
| `IS_BACKUP_SERVER` | false | true if hosting the backup server else false |

## Configuration

- **Start command:** `chmod +x ./out && ./out`
- **Healthcheck:** `/heartbeat`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, HTML

[View on Railway →](https://railway.com/deploy/GkiYuO)
