# Deploy Filebrowser on Railway

A Web File Browser using volumes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Nan7Bs)

## About

FileBrowser is a web-based file management interface that provides access to files and directories through a browser. It allows users to upload, delete, preview, rename, and edit files within a specified storage location.

Hosting FileBrowser involves running a web server that provides file system access through an HTTP interface. The server requires persistent storage volume management and handles file operations like uploads, downloads, and modifications. You'll need to maintain storage space, monitor disk usage growth, and manage user access permissions. The server maintains active connections for file transfers and handles concurrent file operations from multiple users. Regular maintenance includes monitoring storage capacity, managing file permissions, and ensuring backup procedures for important data stored in the managed directories.

[![FileBrowser Logo](https://raw.githubusercontent.com/filebrowser/logo/master/banner.png)](https://github.com/filebrowser/filebrowser)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Filebrowser | `ghcr.io/brody192/filebrowser-template:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEB_PASSWORD` | (secret) | Super secret password |
| `WEB_USERNAME` | (secret) | Your own username for the login credentials |
| `USE_VOLUME_ROOT` | 0 | By default, the storage location is set to the `storage` subdirectory in the root of the volume, but by setting this variable `1` you can opt to use the root of the volume as the storage location instead |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/Nan7Bs)
