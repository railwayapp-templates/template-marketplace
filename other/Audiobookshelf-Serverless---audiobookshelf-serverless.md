# Deploy Audiobookshelf Serverless on Railway

Serverless Audiobookshelf with persistent volume template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/audiobookshelf-serverless)

## About

This template is a fast configuration to setup Audiobookshelf with a persistant volume and preconfigured Variables so that Audiobookshelf uses this volume for config and metadata.

When creating a new Library make sure to use "/persistant/[...]" as path or it will get deleted when the container zeroes down.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| audiobookshelf | `ghcr.io/advplyr/audiobookshelf:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CONFIG_PATH` | /persistent/config |
| `METADATA_PATH` | /persistent/metadata |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/persistent`

**Category:** Other

[View on Railway →](https://railway.com/template/audiobookshelf-serverless)
