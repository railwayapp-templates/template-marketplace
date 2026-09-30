# Deploy ArchiveBox on Railway

Open source self-hosted web archiving

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archivebox-1)

## About

ArchiveBox is a self-hosted web application for archiving websites and preserving web content. It can save webpages, media, documents, and other online resources in multiple formats, giving you a searchable, locally controlled archive of internet content that you can access through a web interface.

Deploy ArchiveBox on Railway to run your own web-based internet archive without managing a server manually. The template includes persistent storage for your archived content, so data remains available across deployments. ArchiveBox is configured to listen on port **5797**. Once the service is deployed, Railway provides an automatically generated domain that you can use to access the ArchiveBox web interface. You can also add a custom domain through Railway if you want to use your own URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ArchiveBox | `archivebox/archivebox:dev` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/archivebox-1)
