# Deploy Memos + SQLite on Railway

An open-source, self-hosted note-taking service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/memos-sqlite)

## About

Memos is an open-source, self-hosted note-taking and knowledge management service built with Go and React. It offers full Markdown support, tagging, media attachments, and REST/gRPC APIs—all with zero telemetry, no ads, and no subscription fees. Your thoughts, your data, your control.

Memos is designed for effortless self-hosting. The entire application is a single Go binary that serves both the API backend and the React frontend, with SQLite as the default database. This means there are no external dependencies to configure—just run the container and start writing. Data is persisted to a single directory at `/var/opt/memos` which contains the SQLite database file and any uploaded assets. The first user to sign up becomes the administrator. Memos requires minimal resources (512 MB RAM, 1 GB storage) and runs on any x86_64 or ARM64 platform.

> **Note:** This template uses SQLite, which is perfect for personal use and small teams. For larger multi-user deployments, Memos also supports PostgreSQL and MySQL by setting the `MEMOS_DRIVER` and `MEMOS_DSN` environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memos | `neosmemo/memos:stable` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `MEMOS_INSTANCE_URL` | Memos Instance URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Other

[View on Railway →](https://railway.com/template/memos-sqlite)
