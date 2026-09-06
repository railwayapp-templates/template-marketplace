# Deploy SQL Server 2022 en Railway (Optimizado) on Railway

Configuración Docker lista para producción para desplegar SQL Server 2022

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sql-server-2022-en-railway-optimizado)

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
| `BACKUP_HOUR` | 23 |
| `BACKUP_MINUTE` | 40 |
| `MSSQL_LOG_DIR` | /var/opt/mssql/log |
| `MSSQL_SUSPEND` | false |
| `MSSQL_DATA_DIR` | /var/opt/mssql/data |
| `MSSQL_COLLATION` | Modern_Spanish_CI_AS |
| `MSSQL_BACKUP_DIR` | /var/opt/mssql/backup |
| `MSSQL_SA_PASSWORD` | (secret) |
| `MSSQL_SECRETS_DIR` | (secret) |
| `MSSQL_AGENT_ENABLED` | true |
| `MSSQL_DUMP_ON_ERROR` | 0 |
| `MSSQL_TCP_KEEPALIVE` | 30000 |
| `BACKUP_RETENTION_DAYS` | 30 |
| `MSSQL_ENABLE_COREDUMP` | 0 |
| `MSSQL_MEMORY_LIMIT_MB` | 3500 |
| `RCLONE_CONFIG_R2_TYPE` | s3 |
| `MSSQL_SHUTDOWN_TIMEOUT` | 20 |
| `RCLONE_CONFIG_R2_REGION` | auto |
| `RCLONE_CONFIG_R2_PROVIDER` | Cloudflare |
| `MSSQL_TCP_KEEPALIVE_INTERVAL` | 1000 |
| `RCLONE_CONFIG_R2_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Storage · **Languages:** Shell, TSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/sql-server-2022-en-railway-optimizado)
