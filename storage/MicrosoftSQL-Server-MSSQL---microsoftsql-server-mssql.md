# Deploy MicrosoftSQL Server (MSSQL) on Railway

Deploy a MicrosoftSQL Server (MSSQL) on Railway!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/microsoftsql-server-mssql)

## About

Microsoft SQL Server (MSSQL) is Microsoft's relational database for transactional workloads, internal tools, reporting, and enterprise applications. It supports T-SQL, backups, authentication, and multiple editions for development or production. This template runs SQL Server on Railway with configurable version and license settings.

Hosting Microsoft SQL Server on Railway gives you a simple way to run a full SQL Server instance without managing virtual machines or manual server setup. This template is built for teams that want SQL Server compatibility with a straightforward Railway deployment flow.

Key features include:

- Select the SQL Server license that fits your use case
- Choose the SQL Server edition/version at deploy time
- Connect with standard SQL Server drivers and tools like Azure Data Studio, `sqlcmd`, and SQL Server Management Studio

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MicrosoftSQL Server | [ThallesP/microsoft-sql-server](https://github.com/ThallesP/microsoft-sql-server) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MSSQL_PID` | - | SQL Server license to use. Must be one of: 'Evaluation' (180-day trial), 'Developer' (testing/staging only), 'Express' (free, limited), 'Web' (paid web hosting), 'Standard' (paid production), 'Enterprise' (paid legacy Server+CAL), 'EnterpriseCore' (paid enterprise), or a 25-character product key. |
| `ACCEPT_EULA` | - | Required by the Microsoft SQL Server container. Must be 'Y' to accept the SQL Server license terms. |
| `SA_PASSWORD` | (secret) | Deprecated alias for MSSQL_SA_PASSWORD. Keep this set to the same value for compatibility with older SQL Server container behavior. |
| `MSSQL_VERSION` | 2025 | SQL Server major version to build (for example: '2025', '2022', or '2019'). |
| `MSSQL_SA_PASSWORD` | (secret) | Password for the SQL Server 'sa' administrator account. Must be at least 8 characters and include characters from at least 3 of these groups: uppercase letters, lowercase letters, numbers, and symbols. |

## Configuration

- **Volume:** `/var/opt/mssql`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/microsoftsql-server-mssql)
