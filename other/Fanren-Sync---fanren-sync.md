# Deploy Fanren Sync on Railway

self-hosted JSON data synchronization service built on FastAPI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fanren-sync)

## About

Fanren Sync is a lightweight, self-hosted JSON synchronization service built with FastAPI. Originally designed to power the cloud save functionality for the **"A Record of a Mortal's Journey to Immortality"** SillyTavern character card, it provides a simple password-protected API for storing, loading, listing, and deleting JSON archives. Its minimal resource usage, asynchronous file operations, and persistent storage make it ideal for personal cloud save deployments.

Hosting Fanren Sync on Railway provides an easy way to run your own secure synchronization server without managing a VPS or complex infrastructure. Railway handles deployment, networking, persistent storage, and automatic restarts while allowing the application to run from the official Docker image. Since Fanren Sync stores archives as JSON files on disk, attaching a Railway Volume ensures that save data persists across deployments and restarts. Once deployed, you simply configure a synchronization password, use the generated Railway public domain as your server address, and your client can immediately begin syncing archives through the REST API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fanren Sync | `foamcold/fanren-sync:amd` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `SYNC_PASSWORD` | (secret) | passward to use api |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fanren-sync)
