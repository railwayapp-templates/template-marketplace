# Deploy modmail-logviewer on Railway

This is a simple viewer for Modmail logs, hosted optionally.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/modmail-logviewer)

## About

This is a simple viewer for Modmail logs. It is designed to be self-hosted alongside your Modmail bot instance, allowing you to view your logs in a web interface.

Includes one docker container hosted from the official modmail github image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| modmail-dev/logviewer:master | `ghcr.io/modmail-dev/logviewer:master` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `CONNECTION_URI` | The URI the bot will use to connect to your MongoDB instance. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/modmail-logviewer)
