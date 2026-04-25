# Deploy Mautic (Open-Source Marketing Automation Platform) on Railway

Mautic [May ’26] (HubSpot & Mailchimp alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mautic)

## About

Mautic is a free, open-source marketing automation platform available on GitHub. It allows businesses to automate marketing workflows, manage customer journeys, send emails, and track campaign performance with full control over their data. Mautic is one of the most flexible open-source alternatives to enterprise-grade marketing tools, supported by a global community on the Mautic GitHub repository.

You can self host Mautic to manage all your marketing automation data and configurations entirely under your control, with zero third-party involvement. With Mautic hosting on Railway, you can easily deploy campaigns, track leads, and manage email templates for Mautic while preserving privacy and scalability. The deployment process is streamlined on Railway, making it easy to set up, scale, and maintain Mautic without the overhead of server administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mautic-railway | [Shinyduo/mautic-railway](https://github.com/Shinyduo/mautic-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | mautic-railway | 80 |
| `MAUTIC_DB_USER` | mautic-railway | (secret) |
| `MAUTIC_DB_PASSWORD` | mautic-railway | (secret) |
| `MAUTIC_ADMIN_PASSWORD` | mautic-railway | (secret) |
| `PHP_INI_DATE_TIMEZONE` | mautic-railway | UTC |
| `MAUTIC_TRUSTED_PROXIES` | mautic-railway | ["0.0.0.0/0"] |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/mautic)
