# Deploy Syncthing on Railway

Open source continuous file synchronization

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HfZZpH)

## About

## Security

By default, Syncthing is set up to allow connections to its interface from anywhere using a public address (0.0.0.0:8384). This means anyone could potentially access it unless you protect it. To keep your Syncthing instance secure, you should set up a username and password for the web interface. To do this, open Syncthing, go to `Actions` → `Settings` → `GUI`, and set a username and password under `Authentication User` and `Authentication Password`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Syncthing | `syncthing/syncthing` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8384 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/syncthing`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/HfZZpH)
