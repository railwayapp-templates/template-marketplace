# Deploy cvdw-cli on Railway

O CVDW-CLI é uma ferramenta criada para buscar dados nas APIs do CV CRM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gwXYQK)

## About

O CVDW Command-line Interface (cvdw-cli) é uma ferramenta projetada para facilitar a busca de informações nas APIs do CV CRM (https://www.cvcrm.com.br) e salvar em um banco de dados, seja local ou remoto. Isso torna a ferramenta extremamente útil para a criação de dashboards e análise de dados.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cvdw-cli | [manzano/cvdw-cli](https://github.com/manzano/cvdw-cli) | Worker |
| MySQL | `mysql:8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CV_URL` | cvdw-cli | - | Subdominio do ambiente CV |
| `CV_TOKEN` | cvdw-cli | (secret) | - |
| `DB_PASSWORD` | cvdw-cli | (secret) | - |
| `DB_USERNAME` | cvdw-cli | (secret) | - |
| `CVDW_AMBIENTE` | cvdw-cli | PRD | - |
| `DB_CONNECTION` | cvdw-cli | pdo_mysql | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | cvdw | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Automation · **Languages:** PHP, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/template/gwXYQK)
