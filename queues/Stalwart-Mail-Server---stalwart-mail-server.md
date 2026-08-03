# Deploy Stalwart Mail Server on Railway

All-in-one Mail & Collaboration server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-mail-server)

## About

Stalwart Mail Server is a modern, open-source mail and collaboration server written in Rust. It provides a complete mail platform with support for JMAP, IMAP4, POP3, SMTP, CalDAV, CardDAV, and WebDAV. Designed for security, scalability, and performance, Stalwart also includes a powerful web administration interface, built-in spam filtering, authentication, monitoring, and collaboration features.
![Dashboard](https://stalw.art/images/webadmin/dashboard-delivery.png)

Railway makes deploying Stalwart Mail Server simple using the official Docker image. Railway automatically provisions the application, manages HTTPS, networking, deployments, and service availability while Stalwart handles mail delivery, collaboration services, and administration. By default, Stalwart uses its built-in RocksDB storage backend, eliminating the need for an external database for most deployments. After deployment, administrators can configure domains, mailboxes, authentication, spam protection, TLS certificates, and collaboration services directly from the web administration interface. Railway provides an ideal platform for hosting personal, business, or enterprise mail infrastructure with minimal operational overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stalwart latest | `stalwartlabs/stalwart:v0.15.5` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `STALWART_RECOVERY_ADMIN` | admin:<password> |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/stalwart-mail`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/stalwart-mail-server)
