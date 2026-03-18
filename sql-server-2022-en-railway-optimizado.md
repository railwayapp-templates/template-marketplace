# Deploy SQL Server 2022 en Railway (Optimizado) on Railway

Configuración Docker lista para producción para desplegar SQL Server 2022

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sql-server-2022-en-railway-optimizado)

## About

Este proyecto está diseñado para ser alojado rápida y fácilmente en plataformas en la nube que soporten Docker, con un enfoque especial y optimizado para **Railway.app**. La configuración garantiza que el motor de base de datos se ejecute de forma estable, segura y con almacenamiento persistente.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SqlServer2022Docker | [Kennethguerra3/SqlServer2022Docker](https://github.com/Kennethguerra3/SqlServer2022Docker) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MSSQL_SA_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Storage · **Languages:** Dockerfile, Shell, TSQL

[View on Railway →](https://railway.com/template/sql-server-2022-en-railway-optimizado)
