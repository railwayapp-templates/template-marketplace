# Deploy ZFile on Railway

Deploy and Host ZFile with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zfile)

## About

ZFile is an open-source cloud storage and file indexing platform built with Java and Spring Boot. It provides a modern web interface for managing and sharing files across local storage, Amazon S3, OneDrive, Google Drive, FTP/SFTP, WebDAV, and other storage providers through a single self-hosted application.

Hosting ZFile on Railway provides a simple way to deploy a production-ready file management platform without managing servers. Railway runs the official Docker image, automatically provisions HTTPS, public networking, and deployment management while allowing you to attach persistent volumes for long-term data storage.

ZFile stores its configuration, embedded SQLite database, application logs, and local storage files on disk, making Railway Volumes essential for production deployments. External storage providers such as Amazon S3, Google Drive, OneDrive, FTP, SFTP, and WebDAV are configured from the ZFile administration panel after deployment. Railway also supports custom domains, automatic redeployments, and scalable infrastructure, making it easy to host your own cloud storage gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zhaojun1998/zfile:latest | `zhaojun1998/zfile:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SPRING_PROFILES_ACTIVE` | prod |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.zfile-v4/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/zfile)
