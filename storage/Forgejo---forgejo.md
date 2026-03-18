# Deploy Forgejo on Railway

A self-hosted lightweight software forge

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/forgejo)

## About

Forgejo is a self-hosted lightweight software forge. Easy to install and low maintenance, it just does the job.

This template allows you to host Forgejo out-of-the-box using their (unofficial mirror of the) official image.

I had to use a [mirror image on docker hub](https://hub.docker.com/r/forgejoclone/forgejo) because Railway doesn't support codeberg which is where the [original official image](https://codeberg.org/forgejo/-/packages) is hosted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Forgejo | `forgejoclone/forgejo:14` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `FORGEJO____APP_NAME` | Forgejo | The name of your Forgejo instance |
| `FORGEJO__database__DB_TYPE` | sqlite3 | - |
| `FORGEJO__server__DISABLE_SSH` | true | Railway doesn't support Custom Domain for TCP just yet. |
| `FORGEJO__server__APP_DATA_PATH` | /data/gitea | - |
| `FORGEJO__server__LFS_START_SERVER` | false | Whether to enable LFS or not. |
| `FORGEJO__database__SQLITE_JOURNAL_MODE` | WAL | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/gitea/`

**Category:** Storage

[View on Railway →](https://railway.com/template/forgejo)
