# Deploy Alist on Railway

File list program that supports multiple storage, powered by Gin and React

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alist)

## About

AList is an open-source file listing and management application that supports multiple cloud storage providers through a single web interface. Built with Gin and SolidJS, it enables users to browse, manage, and share files from various storage backends while providing a lightweight, modern, and easy-to-use administration experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| alist-railway | [bilalnawaz072/alist-railway](https://github.com/bilalnawaz072/alist-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Karachi | - |
| `PGID` | 0 | - |
| `PUID` | 0 | - |
| `UMASK` | 022 | - |
| `ADMIN_PASSWORD` | (secret) | Set passward to loggin first time |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/alist/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/alist)
