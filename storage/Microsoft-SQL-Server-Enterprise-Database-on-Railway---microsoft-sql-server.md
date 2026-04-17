# Deploy Microsoft SQL Server | Enterprise Database on Railway on Railway

Self-host Microsoft SQL Server. Persistent storage, TCP proxy, SSMS-ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/microsoft-sql-server)

## About

Deploy Microsoft SQL Server 2022 on Railway with persistent storage, TCP proxy access, and zero infrastructure management. Self-host SQL Server in minutes using the official Microsoft Docker image (`mcr.microsoft.com/mssql/server:2022-latest`) with a Railway volume mounted at `/var/opt/mssql` for durable database storage across restarts and redeployments.

This Railway template pre-configures the SQL Server Developer edition with persistent volumes, secure SA credentials, and external TCP proxy connectivity. Connect from SQL Server Management Studio (SSMS), Azure Data Studio, or any application backend over the public internet.

Microsoft SQL Server is a relational database management system built for enterprise workloads, business intelligence, and mission-critical applications. SQL Server 2022 on Linux brings the full T-SQL engine to Docker containers.

- **Full T-SQL support** — stored procedures, triggers, views, CTEs, window functions, and JSON/XML handling
- **Built-in security** — transparent data encryption (TDE), row-level security, dynamic data masking, and Always Encrypted
- **Advanced query processing** — intelligent query processing, columnstore indexes, in-memory OLTP
- **SQL Server Agent** — schedule and automate jobs, maintenance plans, and alerts
- **Full-text search** — built-in linguistic search across text columns
- **High availability** — Always On availability groups and log shipping support
- **.NET ecosystem integration** — native support for Entity Framework, ADO.NET, and ASP.NET applications

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MS Sql Server | `mcr.microsoft.com/mssql/server:2022-latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MSSQL_PID` | Developer | SQL Server edition to run |
| `ACCEPT_EULA` | Y | Accept Microsoft SQL Server EULA |
| `MSSQL_SA_PASSWORD` | (secret) | SA admin account password |

## Configuration

- **Volume:** `/var/opt/mssql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/microsoft-sql-server)
