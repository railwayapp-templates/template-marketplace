# Deploy Photoprism on Railway

Self-hosted photo management that auto-organizes your photos using AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/4FjVW0)

## About

# PhotoPrism Railway Template

Self-hosted photo management powered by AI that automatically organizes and tags your photo collection. The software uses advanced machine learning to detect faces, objects, locations, and scenes in your photos. Features include facial recognition to group photos by people, location detection to map your photos, powerful search capabilities through both visual elements and metadata, customizable albums and sharing options, and a responsive interface that works on all devices. Built with privacy in mind, all processing happens locally on your server.

Key features:
- Face recognition and people organization
- Object and scene detection with AI tagging
- Location mapping and geolocation support
- Advanced search by visual content or metadata
- Customizable albums and sharing options
- Mobile-friendly responsive interface
- RAW photo processing support
- Automatic image classification
- Privacy-focused with local processing

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Photoprism | `photoprism/photoprism` | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PHOTOPRISM_STORAGE_PATH` | Photoprism | /data/images | - |
| `PHOTOPRISM_DATABASE_USER` | Photoprism | (secret) | - |
| `PHOTOPRISM_ADMIN_PASSWORD` | Photoprism | (secret) | - |
| `PHOTOPRISM_ORIGINALS_PATH` | Photoprism | /data/originals | - |
| `PHOTOPRISM_DATABASE_DRIVER` | Photoprism | mysql | - |
| `PHOTOPRISM_DATABASE_PASSWORD` | Photoprism | (secret) | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/4FjVW0)
