# Deploy PenX sync server on Railway

Sync server of PenX  for cross device sync data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/L-0Ee-)

## About

PenX is a structured note-taking app designed for personal use. In PenX, Privacy is first important thing. our mission is building a elegant tool to manage personal digital assets, like notes, tasks, ideas, password, documents.

Local-First - You own your data, in spite of the cloud
Privacy-First - Use End-To-End Encryption to sync data
Open Source - Trust our code, not our words
Version control - GitHub-Based Version control Out-of-box

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 0xzion/penx-sync-server | `0xzion/penx-sync-server` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKEN` | (secret) | PenX sync server token |
| `REDIS_URL` | - | Redis URL |
| `DATABASE_URL` | - | PostgreSQL database URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/L-0Ee-)
