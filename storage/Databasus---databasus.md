# Deploy Databasus on Railway

Tool to backup PostgreSQL, MySQL, MariaDB and MongoDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/databasus)

## About

**Databasus** is a free, open-source, and self-hosted backup system for PostgreSQL, MySQL, MariaDB, and MongoDB. It automates scheduled backups, supports multiple storage options (S3, R2, Google Drive, FTP, etc.), and provides real-time notifications via Slack, Discord, Telegram, and more. Databasus ensures data security with AES-256-GCM encryption and is designed for both individual users and enterprise teams.

---

Hosting Databasus on Railway simplifies the deployment of a robust, self-hosted database backup solution. The template includes a single Docker image, making it easy to deploy with minimal setup. Railway’s infrastructure ensures high availability, automatic scaling, and seamless integration with your existing workflows. Databasus is designed for privacy and security, with all data and backups remaining under your control.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Databasus | `databasus/databasus:v3.38.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/databasus-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/databasus)
