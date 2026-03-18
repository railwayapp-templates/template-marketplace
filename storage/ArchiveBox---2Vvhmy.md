# Deploy ArchiveBox on Railway

A powerful solution to collect, save, and view websites offline.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/2Vvhmy)

## About

Without active preservation effort, everything on the internet eventually dissapears or degrades. Archive.org does a great job as a centralized service, but saved URLs have to be public, and they can’t save every type of content.

ArchiveBox is an open source tool that lets organizations & individuals archive both public & private web content while retaining control over their data. It can be used to save copies of bookmarks, preserve evidence for legal cases, backup photos from FB/Insta/Flickr or media from YT/Soundcloud/etc., save research papers, and more.

## Railway

If you set a username, you must also set a password. You should remove both of these values after the first deploy completes.

It may take a few minutes for ArchiveBox to boot up for the first time. Do not be alarmed if you see messages like "Nothing here... yet" or "Application failed to respond" within the first 5 minutes.

ArchiveBox is lightweight. It should use ~80mb of RAM idle.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ArchiveBox | `archivebox/archivebox` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `ADMIN_PASSWORD` | (secret) | Delete this after your first deployment |
| `ADMIN_USERNAME` | (secret) | Delete this after your first deployment |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/2Vvhmy)
