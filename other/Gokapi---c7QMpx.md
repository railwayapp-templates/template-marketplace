# Deploy Gokapi on Railway

Lightweight, encrypted, and selfhosted Firefox Send alternative. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/c7QMpx)

## About

Gokapi is a lightweight server to share files, which expire after a set amount of downloads or days. It is similar to the discontinued Firefox Send, with the difference that only the admin is allowed to upload files.

This enables companies or individuals to share their files very easily and having them removed afterwards, therefore saving disk space and having control over who downloads the file from the server.

Identical files will be deduplicated. An API is available to interact with Gokapi. AWS S3 and Backblaze B2 can be used instead of local storage. Customization is very easy with HTML/CSS knowledge. Encryption including end-to-end encryption is available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gokapi | `f0rc3/gokapi:latest` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 53842 |

## Configuration

- **TCP Proxies:** 53842

**Category:** Other

[View on Railway →](https://railway.com/template/c7QMpx)
