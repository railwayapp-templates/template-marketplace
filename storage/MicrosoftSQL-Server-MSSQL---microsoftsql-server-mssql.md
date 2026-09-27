# Deploy MicrosoftSQL Server (MSSQL) on Railway

SQL Server 2025, 2022 or 2019 (MSSQL) on a volume, edition set at deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/microsoftsql-server-mssql)

## About

Microsoft SQL Server (MSSQL) is Microsoft's relational database, the one behind many .NET, ERP and reporting workloads, with T-SQL, SQL Server Management Studio and Azure Data Studio as its tooling. This template runs the official Linux container image on Railway with persistent storage, lets you choose the version and edition at deploy time, and generates a compliant `sa` password.

Railway cannot pull directly from Microsoft's container registry, so the template builds a one-line Dockerfile that wraps `mcr.microsoft.com/mssql/server`. `MSSQL_VERSION` (`2025`, `2022` or `2019`) selects the image tag, `MSSQL_PID` selects the edition or license, and `ACCEPT_EULA` records your acceptance of Microsoft's [SQL Server license terms](https://go.microsoft.com/fwlink/?linkid=857698); the container will not start without it. Data lives on a Railway volume at `/var/opt/mssql`, and the service runs as root so SQL Server can write to the volume.

`MSSQL_SA_PASSWORD` is generated with a mix of upper case, lower case, digits and a symbol to satisfy SQL Server's complexity rules; `SA_PASSWORD` mirrors it for tools that still read the old name.

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

- **Start command:** `/opt/mssql/bin/sqlservr -T1800`
- **Volume:** `/var/opt/mssql`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/microsoftsql-server-mssql)
