# Deploy OpenList on Railway

A file list program that supports multiple storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openlist)

## About

**OpenList** is a resilient, community-driven fork of AList that supports multiple storage backends 🗂️ — built to defend open source against trust-based attacks 🛡️.

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying OpenList on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openlist-on-railway | [tianheg/openlist-on-railway](https://github.com/tianheg/openlist-on-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5244 | Service running on |
| `UMASK` | 022 | Limits the file permissions for newly created files |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/openlist/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openlist)
