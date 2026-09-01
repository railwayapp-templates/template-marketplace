# Deploy mssql2019 on Railway

Microsoft SQL Server 2019 with persistent storage and TCP access

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mssql2019)

## About

SQL Server 2019 on Railway — a one-click template that runs Microsoft SQL Server 2019 (Linux, the official `mcr.microsoft.com/mssql/server:2019-latest` image) as a Railway service listening on TCP 1433, hardened for Railway's runtime so it actually starts and stays up instead of crash-looping like a vanilla deployment. Verified end-to-end on Railway: the server initializes cleanly, accepts queries from `sqlcmd` over TCP, and reports `Microsoft SQL Server 2019 (RTM-CU32-GDR) - 15.0.4480.2 (X64)`.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.app/new?github_url=https://github.com/lNamelessl/mssql2019)

You are hosting one service:

- **mssql** — SQL Server 2019 (Developer edition by default) from the official Microsoft Docker image, listening on TCP 1433, with its data on the container filesystem.

Configured environment variables: `ACCEPT_EULA=Y` (EULA acceptance), `MSSQL_PID=Developer` (free for development/testing; switch to `Express`, `Standard`, `Enterprise`, or a product key), and optionally `MSSQL_SA_PASSWORD` (SA password, applied on first initialization) and `MSSQL_COLLATION` (server collation).

After deploying: copy the SA password from the deploy logs (or set `MSSQL_SA_PASSWORD` yourself before the first deploy), add a TCP Proxy under Settings → Networking to get a public endpoint like `.proxy.rlwy.net:`, and connect with any MSSQL client — SSMS, Azure Data Studio, `sqlcmd`, ODBC/JDBC, pyodbc, Entity Framework, Prisma, or the `mssql` npm package. Give the service at least 2 GB of RAM; SQL Server will not run comfortably below that.

**Storage note:** SQL Server on Railway uses the container filesystem, which is ephemeral — databases live until the service is redeployed. Railway runs containers under gVisor, and SQL Server crashes mid-initialization when its state is placed on a Railway volume, so persistent storage is not possible for SQL Server on this platform today. Ideal for development, staging/preview, CI, and learning workloads; not for primary production data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mssql-2019 | [lNamelessl/mssql2019](https://github.com/lNamelessl/mssql2019) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MSSQL_PID` | - | ms sql pid |
| `ACCEPT_EULA` | - | accept eula |
| `MSSQL_SA_PASSWORD` | (secret) | password |

## Configuration

- **TCP Proxies:** 1433

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mssql2019)
