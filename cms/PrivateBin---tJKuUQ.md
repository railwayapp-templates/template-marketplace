# Deploy PrivateBin on Railway

Minimalist, open source online pastebin

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tJKuUQ)

## About

# PrivateBin

PrivateBin is a minimalist, open source online pastebin where the server has zero knowledge of pasted data.

Data is encrypted and decrypted in the browser using 256bit AES in Galois Counter mode.

This is a fork of ZeroBin, originally developed by Sébastien Sauvage. PrivateBin was refactored to allow easier and cleaner extensions and has many additional features. It is, however, still fully compatible to the original ZeroBin 0.19 data storage scheme. Therefore, such installations can be upgraded to PrivateBin without losing any data.

## Installation 

Installation requires no configuration

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PrivateBin | `privatebin/unit-fs` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/tJKuUQ)
