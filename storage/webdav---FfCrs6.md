# Deploy webdav on Railway

A single user WebDAV server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FfCrs6)

## About

Deploys a WebDAV storage server on railway, persisted on railway volumes. 

To access the server, use the following configuration:

URI: `davs://yourprojectname.up.railway.app`
Username: root
Password: The PASSWORD environment variable you set


> Note: The first time booting up this server will result in a message of "failed to load data", which is completely normal and expected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webdav | [kelco-chan/webdav](https://github.com/kelco-chan/webdav) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Note that the username in webdav is `root` |
| `FILE_TREE_PATH` | /var/data/data.json | JSON file to write the directory to |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/data`

**Category:** Storage · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/FfCrs6)
