# Deploy memos on Railway

note-taking tool built for quick capture, lightweight, and fully yours.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memos-2)

## About

Memos is an open-source, self-hosted note-taking application built for fast capture, lightweight knowledge management, and personal or team documentation. Railway is a managed hosting platform that offers simple deployment, public networking, HTTPS, and persistent storage options while allowing users to retain control over their data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memos | `neosmemo/memos:0.26.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5230 |
| `MEMOS_PORT` | 5230 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Other

[View on Railway →](https://railway.com/deploy/memos-2)
