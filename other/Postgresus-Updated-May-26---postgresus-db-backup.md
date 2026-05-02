# Deploy Postgresus [Updated May '26] on Railway

Postgresus [May '26] (Database Backup & Monitoring Tool) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresus-db-backup)

## About

Postgresus is an open-source, self-hosted database backup, monitoring, and alerting tool with a primary focus on PostgreSQL. Built on the Databasus engine, it automates scheduled backups, enforces retention policies, encrypts backup files with AES-256-GCM, and sends real-time alerts through Slack, Discord, Telegram, email, and webhooks. It is a popular self-hosted alternative to managed backup services like AWS Backup or pgBackups.

Postgresus supports PostgreSQL (v12–18), MySQL (v5.7–9), MariaDB (v10–12), and MongoDB (v4–8).

Self hosting Postgresus traditionally means:
* Provisioning a dedicated server
* Installing Docker and pulling the Postgresus image
* Configuring persistent storage for backup files
* Setting up networking to reach your databases
* Managing service restarts, updates, and uptime

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rostislavdugin/postgresus:latest | `rostislavdugin/postgresus:latest` | Database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/postgresus-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgresus-db-backup)
