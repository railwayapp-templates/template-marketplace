# Deploy SQL Server 2022 en Railway (Optimizado) on Railway

Configuración Docker lista para producción para desplegar SQL Server 2022

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sql-server-2022-en-railway-optimizado)

## About

Este proyecto está diseñado para ser alojado rápida y fácilmente en plataformas en la nube que soporten Docker, con un enfoque especial y optimizado para **Railway.app**. La configuración garantiza que el motor de base de datos se ejecute de forma estable, segura y con almacenamiento persistente.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SqlServer2022Docker | [Kennethguerra3/SqlServer2022Docker](https://github.com/Kennethguerra3/SqlServer2022Docker) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | America/Lima |
| `MSSQL_PID` | Developer |
| `MSSQL_LCID` | 3082 |
| `ACCEPT_EULA` | Y |
| `MSSQL_LOG_DIR` | /var/opt/mssql/log |
| `MSSQL_SUSPEND` | false |
| `MSSQL_DATA_DIR` | /var/opt/mssql/data |
| `MSSQL_COLLATION` | 82)mZWo#4hk.KWVDi(Yy |
| `MSSQL_BACKUP_DIR` | /var/opt/mssql/backup |
| `MSSQL_SA_PASSWORD` | (secret) |
| `MSSQL_SECRETS_DIR` | (secret) |
| `MSSQL_AGENT_ENABLED` | true |
| `MSSQL_DUMP_ON_ERROR` | 0 |
| `MSSQL_TCP_KEEPALIVE` | 30000 |
| `MSSQL_ENABLE_COREDUMP` | 0 |
| `MSSQL_MEMORY_LIMIT_MB` | 4000 |
| `MSSQL_TCP_KEEPALIVE_INTERVAL` | 1000 |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Storage · **Languages:** Shell, Dockerfile, TSQL

[View on Railway →](https://railway.com/deploy/sql-server-2022-en-railway-optimizado)
