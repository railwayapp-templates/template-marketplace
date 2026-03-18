# Deploy phpMyAdmin on Railway

phpMyAdmin is a free database management tool written in PHP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HHegL4)

## About

phpMyAdmin is a free software tool written in PHP, intended to handle the administration of MySQL over the Web. phpMyAdmin supports a wide range of operations on MySQL and MariaDB. Frequently used operations (managing databases, tables, columns, relations, indexes, users, permissions, etc) can be performed via the user interface, while you still have the ability to directly execute any SQL statement.

You can find some more info about configuring env variables here: https://docs.phpmyadmin.net/en/latest/setup.html?highlight=docker#docker-environment-variables

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| phpMyAdmin | `linuxserver/phpmyadmin` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PMA_HOST` | - | Sets the MySQL server phpMyAdmin should connect to. Example: sqlserver.com. You should set PMA_ARBITRARY to 0 if you want to use this! |
| `PMA_PORT` | - | Sets the port of the MySQL server phpMyAdmin should connect to. For example: 3306. You should set PMA_ARBITRARY to 0 if you want to use this! |
| `PMA_ARBITRARY` | 1 | Setting this to 1 enables entering any server on login. Setting this to 0 will require connecting to PMA_HOST & PORT! |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /config/nginx && echo 'resolver 8.8.8.8 8.8.4.4 valid=300s;' > /config/nginx/resolver.conf && /init"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/HHegL4)
