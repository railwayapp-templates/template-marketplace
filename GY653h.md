# Deploy Microsoft SQL Server 2022 on Railway

Deploy MSSQL Server 2022 with persistent storage and TCP connectivity

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GY653h)

## About

This template is designed to deploy and configure a **Microsoft SQL Server 2022** instance in a development or production environment. It provides efficient and secure access by implementing a persistent volume for data storage and enabling connectivity via the TCP protocol, facilitating interaction with external applications. Below, its features are outlined:
### Main Features:
1. **SQL Server 2022 Database**:
    - Full support for the latest stable version of Microsoft SQL Server, taking advantage of improved performance, security, and support for high data volumes.

2. **Persistent Volume**:
    - Includes a dedicated volume for data storage, ensuring that database data persists beyond the lifecycle of containers or temporary setups.
    - Ideal for maintaining critical data and preventing information loss.

3. **TCP Connection**:
    - The template enables connectivity via **TCP (Transmission Control Protocol)** by default. This protocol is essential for allowing client applications to interact with the database, whether locally or remotely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Microsoft SQL Server | [dangos-dev/mssql-server-dockerfile](https://github.com/dangos-dev/mssql-server-dockerfile) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MSSQL_PID` | Developer |
| `ACCEPT_EULA` | Y |
| `MSSQL_TCP_PORT` | 1433 |
| `MSSQL_USERNAME` | (secret) |
| `MSSQL_SA_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/opt/mssql`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/GY653h)
