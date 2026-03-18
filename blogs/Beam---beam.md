# Deploy Beam on Railway

A simple message board for your organization or project

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beam)

## About

## Overview

Beam is an simple tool from the folks at PlanetScale to write posts to share across an organization. Think of it like a lightweight internal blog. 

## Highlights

- Markdown-based editor with preview
- Image drag and drop
- Comments and likes
- Search
- Responsive layout with dark mode support
- Admin role for hiding posts

## Learn More

- [Introducing Beam](https://planetscale.com/blog/introducing-beam)
- [GitHub](https://github.com/planetscale/beam)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beam | [planetscale/beam](https://github.com/planetscale/beam) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GITHUB_ID` | beam | - | Client ID for the GitHub OAuth app. |
| `AUTH_PROVIDER` | beam | github | - |
| `GITHUB_SECRET` | beam | (secret) | Client secret for the GitHub OAuth app. |
| `NEXTAUTH_SECRET` | beam | (secret) | Used to encrypt the JWTs. |
| `GITHUB_ALLOWED_ORG` | beam | - |  The GitHub organization the Beam members must belong to. |
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
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Blogs · **Languages:** TypeScript, Shell, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/beam)
