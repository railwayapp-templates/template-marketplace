# Deploy Microsoft SQL Server 2025 on Railway

Relational database server with persistent storage and TCP connectivity

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/microsoft-sql-server-2025)

## About

Microsoft SQL Server 2025 is the latest major release of Microsoft's enterprise-grade relational database management system and a leading choice for **SQL Server hosting** in the cloud. It introduces advanced AI integration, native vector search, and optimized performance for modern data estates. Designed for mission-critical workloads, SQL Server 2025 delivers industry-leading security, high availability, and hybrid cloud scalability, making it ideal for **Railway database deployments** and production-ready cloud hosting.
![](https://www.mssqltips.com/wp-content/images-tips-8/8290_sql-server-2025-new-features-1.webp)

Deploy Microsoft SQL Server 2025 on Railway in minutes with **instant SQL Server hosting** and zero manual infrastructure setup. This Railway database template uses the **official Microsoft SQL Server container image**, delivering a production-ready SQL Server hosting environment optimized for cloud-native applications, development, testing, and enterprise workloads.

A persistent **[Railway Volume](https://docs.railway.com/reference/volumes)** is mounted at `/var/opt/mssql`, ensuring that all databases, schemas, and transaction logs remain intact across restarts and redeployments.

Railway enables **[secure TCP Proxying for SQL Server hosting](https://docs.railway.com/guides/public-networking#tcp-proxying)** on port `1433`, allowing external connections from SQL Server Management Studio (SSMS), Azure Data Studio, and application backends running on Railway or external platforms.

To deploy this template, you must set the `ACCEPT_EULA` environment variable to `Y`, confirming acceptance of the [Microsoft SQL Server End-User License Agreement (EULA)](https://go.microsoft.com/fwlink/?LinkId=746388).

You must also ensure that your deployment complies with the licensing terms of the selected [SQL Server edition](https://learn.microsoft.com/en-us/sql/sql-server/editions-and-components-of-sql-server-2025?view=sql-server-ver17#sql-server-editions).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Microsoft SQL Server 2025 | `mcr.microsoft.com/mssql/server:2025-latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MSSQL_PID` | Developer | SQL Server edition or product key |
| `MSSQL_URL` | - | Private SQL server URL |
| `ACCEPT_EULA` | Y | By deploying this template you are confirming your acceptance of Microsoft's End-User Licensing Agreement. https://share.google/nM1o8QKSIs6z0HZq6 |
| `MSSQL_SERVER` | - | Private server domain |
| `MSSQL_TCP_PORT` | 1433 | Private database port |
| `MSSQL_USERNAME` | (secret) | Default administor username (Can not be changed) |
| `MSSQL_URL_PUBLIC` | - | Public SQL server URL |
| `MSSQL_SA_PASSWORD` | (secret) | Default password for user `sa` |
| `MSSQL_SERVER_PUBLIC` | - | Public server domain |
| `MSSQL_TCP_PORT_PUBLIC` | - | Public database port |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Storage

[View on Railway →](https://railway.com/template/microsoft-sql-server-2025)
