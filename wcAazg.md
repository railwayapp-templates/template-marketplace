# Deploy Microsoft SQL Server on Railway

A relational model database server produced by Microsoft

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wcAazg)

## About

## Overview

MicrosoftSQL database service. Microsoft SQL Server is a proprietary relational database management system developed by Microsoft.

- A [Volume](https://docs.railway.app/reference/volumes) is mounted to the service to persist data between deploys.

- [TCP proxying](https://docs.railway.app/deploy/exposing-your-app#tcp-proxying) is configured to allow accessing the database from anywhere.

## How to use

Reference the `MSSQL_URL` variable from your service to connect to the database in your tool of choice (e.g. `${{MicrosoftSQL.MSSQL_URL}}`)

## Connecting

Connect to the database using the proxied domain and port found in the service Variables page. The password can also be found on the Variables page.

## License

- Legal Notice: [Container License Information](https://aka.ms/mcr/osslegalnotice)

By passing the value "Y" to the environment variable "ACCEPT_EULA", you are expressing that you have a valid and existing license for the edition and version of SQL Server that you intend to use. You also agree that your use of SQL Server software running in a Docker container image will be governed by the terms of your SQL Server license.

To specify the edition, use the `MSSQL_PID` environment variable. Details can be found in the [Environment Variables](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-configure-environment-variables?view=sql-server-ver16#environment-variables) section of the configuration documentation.

SQL Server Developer edition lets developers build any kind of application on top of SQL Server. It includes all the functionality of Enterprise edition, but is licensed for use as a development and test system, not as a production server. SQL Server Developer Edition cannot be used in a production environment. The SQL Server 2017 Developer Edition license terms are located [here](https://go.microsoft.com/fwlink/?linkid=857698).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MicrosoftSQL | [railwayapp-templates/microsoft-sql-server](https://github.com/railwayapp-templates/microsoft-sql-server) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MSSQL_PID` | Developer | Sets the SQL Server edition or product key |
| `MSSQL_URL` | - | Private SQL server URL |
| `ACCEPT_EULA` | Y | By deploying this template you are confirming your acceptance of [Microsoft's End-User Licensing Agreement](https://go.microsoft.com/fwlink/?LinkId=746388) |
| `MSSQL_SERVER` | - | Private server domain |
| `MSSQL_TCP_PORT` | 1433 | Private database port |
| `MSSQL_USERNAME` | (secret) | Default system administor username - **Can not be changed** |
| `MSSQL_URL_PUBLIC` | - | Public SQL server URL |
| `MSSQL_SA_PASSWORD` | (secret) | Default password for user `sa` |
| `MSSQL_SERVER_PUBLIC` | - | Public server domain |
| `MSSQL_TCP_PORT_PUBLIC` | - | Public database port |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/wcAazg)
