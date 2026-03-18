# Deploy UrPodder on Railway

The urPodder deployment template for Podcast Syncing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/y__BwA)

## About

This template provides a nice easy way to quickly set up a UrPodder instance which is a drop in replacement for gPodder.net (Which seems to have closed signup a while ago.)

Get more info and code at the [UrPodder Readme](https://codeberg.org/meadowhawk/urPodder)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| UrPodder | `meadowhawk/urpodder:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8443 |

## Configuration

- **Healthcheck:** `/actuator`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/y__BwA)
