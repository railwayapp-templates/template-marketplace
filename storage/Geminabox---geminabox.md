# Deploy Geminabox on Railway

Private Ruby Gem server (Geminabox)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/geminabox)

## About

[Geminabox](https://github.com/geminabox/geminabox) is a private Ruby Gems server, which allows you to easily maintain your own private Gem collection with ease.

This template sets up a volume, and optionally basic authentication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| geminabox-railway | [RDIL/geminabox-railway](https://github.com/RDIL/geminabox-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9292 | The port to run on (default: 9292). You don't need to change this unless you want to. |
| `RACK_ENV` | production | - |
| `BASIC_AUTH_PASSWORD` | (secret) | The basic auth password to use. Can be omitted for a public instance. |
| `BASIC_AUTH_USERNAME` | (secret) | The basic auth username. Can be omitted for a public instance. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/geminabox-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/geminabox)
