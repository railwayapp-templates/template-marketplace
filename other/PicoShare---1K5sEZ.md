# Deploy PicoShare on Railway

A minimalist, easy-to-host service for sharing images and other files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/1K5sEZ)

## About

## Overview

PicoShare is a minimalist service that allows you to share files easily.

- [Live demo](https://demo.pico.rocks)

[![PicoShare demo](https://raw.githubusercontent.com/mtlynch/picoshare/master/docs/readme-assets/demo.gif)](https://raw.githubusercontent.com/mtlynch/picoshare/master/docs/readme-assets/demo-full.gif)

## Why PicoShare?

There are a million services for sharing files, but none of them are quite like PicoShare. Here are PicoShare's advantages:

- **Direct download links**: PicoShare gives you a direct download link you can share with anyone. They can view or download the file with no ads or signups.
- **No file restrictions**: Unlike sites like imgur, Vimeo, or SoundCloud that only allow you to share specific types of files, PicoShare lets you share any file of any size.
- **No resizing/re-encoding**: If you upload media like images, video, or audio, PicoShare never forces you to wait on re-encoding. You get a direct download link as soon as you upload the file, and PicoShare never resizes or re-encodes your file.

## Note

This template is **NOT** maintained by the team behind PicoShare.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| picoshare | `mtlynch/picoshare` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4001 | TCP port on which to listen for HTTP connections (defaults to 4001). |
| `PS_SHARED_SECRET` | (secret) | Specifies a passphrase for the admin user to log in to PicoShare. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/1K5sEZ)
