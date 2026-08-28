# Deploy SQL Server on Railway

Reliable relational database for APIs, backend services, and business apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sql-server)

## About

SQL Server is Microsoft's enterprise-grade relational database platform for transactional applications, APIs, business systems, analytics workloads, and data-driven services. It provides SQL, ACID transactions, indexing, stored procedures, security controls, JSON support, and broad compatibility with Microsoft, Java, Python, Node.js, and other application ecosystems.

Hosting SQL Server on Railway gives you a persistent relational database without manually managing a virtual machine, operating system, database installation, or server lifecycle.

This template runs the official Microsoft SQL Server Linux container and stores database data on a persistent Railway volume.

Applications inside the same Railway project can connect through Railway private networking on port `1433`, while external tools and applications can connect through Railway TCP Proxy.

The deployment uses SQL Server Developer edition by default, making it suitable for development, testing, integration, and non-production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mssql-server | `mcr.microsoft.com/mssql/server:2022-latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_HOST` | - | Private Railway hostname for internal SQL Server connections |
| `DB_PORT` | 1433 | Internal SQL Server TCP port |
| `DB_USER` | (secret) | Default SQL Server administrator username |
| `MSSQL_PID` | Developer | SQL Server edition used by this deployment |
| `ACCEPT_EULA` | Y | Accept the Microsoft SQL Server license agreement |
| `DB_PASSWORD` | (secret) | Password used by SQL Server clients |
| `DATABASE_URL` | - | Private SQL Server connection URL |
| `MSSQL_DATA_DIR` | /var/opt/mssql | - |
| `MSSQL_TCP_PORT` | 1433 | Internal SQL Server TCP port |
| `MSSQL_SA_PASSWORD` | (secret) | SQL Server system administrator password |
| `DATABASE_PUBLIC_URL` | - | Public SQL Server connection URL via Railway TCP Proxy |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/sql-server)
