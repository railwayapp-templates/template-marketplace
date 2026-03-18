# Deploy SilverBullet on Railway

An open source personal productivity platform built on Markdown and Lua.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/silverbullet)

## About

SilverBullet is a programmable, self-hosted personal knowledge management platform built around Markdown. It runs entirely in the browser, stores your notes as plain files, and can be extended with Lua scripting to support tasks, queries, dynamic pages, and custom workflows, while remaining private and fully under your control.

Hosting SilverBullet involves running its Go-based backend alongside a compiled browser client, backed by a persistent filesystem that stores your Markdown space. The server handles indexing, sync, and execution of Lua scripts, while the frontend provides a fast, offline-capable editing experience. On Railway, this typically means deploying the SilverBullet binary or Docker image, attaching a persistent volume for your space directory, and exposing the HTTP service. Railway abstracts away server provisioning, networking, and restarts, allowing you to focus on configuration, backups, and scaling rather than infrastructure plumbing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SilverBullet | `ghcr.io/silverbulletmd/silverbullet:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Application port. |
| `USER` | - | Username to authenticate edits. |
| `SB_USER` | (secret) | The user:password that is needed to authenticate the application. |
| `PASSWORD` | (secret) | Password to authenticate edits. |

## Configuration

- **Healthcheck:** `/.ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/space`

**Category:** Other

[View on Railway →](https://railway.com/template/silverbullet)
