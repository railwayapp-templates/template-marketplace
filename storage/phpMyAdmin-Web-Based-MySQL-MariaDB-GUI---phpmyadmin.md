# Deploy phpMyAdmin | Web-Based MySQL & MariaDB GUI on Railway

Self Host phpMyAdmin: manage any MySQL/MariaDB db, run SQL on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phpmyadmin)

## About

phpMyAdmin is a free, open-source web-based administration tool for MySQL and MariaDB databases. Written in PHP, it gives developers a browser-based GUI to manage tables, run SQL queries, handle users and permissions, import/export data — without touching the command line. 

Self-host phpMyAdmin on Railway in one click using the `linuxserver/phpmyadmin` image pre-configured with `PMA_ARBITRARY=1` so you can connect it to any MySQL or MariaDB server at login time — no hardcoded host required.

![phpMyAdmin Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1774712478/phpmyadmin_railway_architecture_jvjqn5.png)

phpMyAdmin has been the go-to web-based MySQL admin interface since 1998. It handles the full range of MySQL and MariaDB administration tasks through a browser, making it practical for teams who need a shared GUI without installing desktop clients.

Key features:
- Browse, create, alter, and drop databases, tables, columns, and indexes
- Run raw SQL queries with results displayed inline
- Import and export data in 16+ formats including SQL, CSV, JSON, and XML
- Manage user accounts and granular MySQL privileges
- Visual foreign key and relationship management
- Query history, bookmarks, and multi-server support via arbitrary mode

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| phpMyAdmin | `linuxserver/phpmyadmin` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | HTTP server listening port |
| `PMA_ARBITRARY` | 1 | Allow connection to arbitrary servers |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/phpmyadmin)
