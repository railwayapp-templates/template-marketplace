# Deploy Kavita on Railway

Lightning-fast digital library for books, docs & research papers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kavita)

## About

Kavita is a fast, feature-rich self-hosted digital library server that supports manga, comics, books, and webtoons. With responsive web readers, metadata management, user accounts, and progress tracking, it provides a complete solution for organizing and reading your digital collection across any device.

Lightning-fast digital library for programming books, technical docs, and research papers. Supports PDF, EPUB, CBZ/CBR and more with automatic metadata extraction and progress sync across devices.

WARNING: right now railway does not yet support a good way to manage files on volumes. Only CLI access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kavita | [railtools/kavita](https://github.com/railtools/kavita) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PGID` | 1000 |
| `PUID` | 1000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/kavita)
