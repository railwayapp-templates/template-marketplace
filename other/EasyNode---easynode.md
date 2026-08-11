# Deploy EasyNode on Railway

A multi-functional Linux & Windows web terminal with SSH and SFTP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easynode)

## About

EasyNode is a multi-functional web terminal panel for managing Linux and Windows servers through WebSSH and WebSFTP. It includes SSH and SFTP access, jump server functionality, AI-assisted terminal conversations, batch command execution, script management, credential hosting, instance grouping, notifications, and customizable terminal themes.

Hosting EasyNode on Railway involves deploying the `chaoszhu/easynode:latest` Docker image as a Railway service. The application exposes its web panel on HTTP port `8082`, which can be connected to a Railway public domain for browser access. EasyNode stores its application database under `/easynode/app/db`, so a persistent Railway Volume is required at that path. The supplied configuration also defines a `DEBUG` environment variable with a default value of `0`. EasyNode uses the deployed server as a relay for WebSSH and monitoring traffic, making the location and network characteristics of the Railway service relevant to remote-server connectivity. Because the panel manages server credentials and SSH access, appropriate access controls such as MFA and IP whitelisting are recommended.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| easynode | `chaoszhu/easynode:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8082 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/easynode/app/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/easynode)
