# Deploy MySQL en Railway on Railway

Deploy and Host MySQL en Railway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mysql-en-railway)

## About

Puedes desplegar este proyecto directamente en Railway usando el siguiente botón o siguiendo los pasos manuales.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/mysql-en-railway)

Este proyecto proporciona un contenedor Dockerizado para **MySQL 8.0**, preconfigurado para ejecutarse eficientemente en la infraestructura de Railway. Incluye ajustes específicos para permisos de volumen, zona horaria (Perú) y comprobaciones de estado (Healthchecks) para garantizar una alta disponibilidad.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mysql_railway | [Kennethguerra3/Mysql_railway](https://github.com/Kennethguerra3/Mysql_railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQL_USER` | (secret) | example: user2 |
| `MYSQL_DATABASE` | - | name db |
| `MYSQL_PASSWORD` | (secret) | - |
| `MYSQL_ROOT_PASSWORD` | (secret) | - |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/mysql-en-railway)
