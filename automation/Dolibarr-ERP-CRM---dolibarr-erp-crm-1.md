# Deploy Dolibarr ERP-CRM on Railway

Open Source ERP & CRM for Business

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dolibarr-erp-crm-1)

## About

Dolibarr ERP-CRM is an open-source business management platform that combines ERP and CRM features in a single web application. It helps organizations manage customers, invoices, products, projects, inventory, and accounting. Modular and easy to deploy, Dolibarr is widely used by small and medium-sized businesses to centralize operations and streamline workflows.

Deploy Dolibarr ERP-CRM in seconds with this ready-to-use Railway template. This setup provides a fully configured environment with PHP, a web server, and a database so you can quickly launch a self-hosted ERP and CRM platform. Dolibarr helps businesses manage invoices, customers, products, projects, accounting, and more in a single open-source system. The template handles the core infrastructure so you can focus on configuring your business modules, users, and workflows. Ideal for startups, small businesses, and developers who want a simple way to deploy Dolibarr in the cloud using Railway. 🚀

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| dolibarr/dolibarr | `dolibarr/dolibarr` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `DOLI_CRON` | dolibarr/dolibarr | 0 | Enable cron service |
| `WWW_USER_ID` | dolibarr/dolibarr | 1000 | 	ID of user www-data. ID will not changed if leave empty. During a development, it is very practical to put the same ID as the host user. |
| `DOLI_DB_HOST` | dolibarr/dolibarr | - | Host name of the MariaDB/MySQL server |
| `DOLI_DB_NAME` | dolibarr/dolibarr | - | Database name |
| `DOLI_DB_USER` | dolibarr/dolibarr | (secret) | Database user |
| `WWW_GROUP_ID` | dolibarr/dolibarr | 1000 | 	ID of group www-data. ID will not changed if leave empty. |
| `DOLI_CRON_KEY` | dolibarr/dolibarr | mycronsecurekey | Security key to launch cron jobs |
| `DOLI_URL_ROOT` | dolibarr/dolibarr | - | Url root of the Dolibarr installation |
| `DOLI_INIT_DEMO` | dolibarr/dolibarr | 0 | The installation will also load demo data during docker first boot |
| `DOLI_ADMIN_LOGIN` | dolibarr/dolibarr | (secret) | Admin's login created on the first boot |
| `DOLI_DB_PASSWORD` | dolibarr/dolibarr | (secret) | Database user's password |
| `DOLI_COMPANY_NAME` | dolibarr/dolibarr | MyBigCompany | 	Set the company name of Dolibarr at container init |
| `DOLI_ADMIN_PASSWORD` | dolibarr/dolibarr | (secret) | Admin's initial password created on the first boot |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `bash -c "mkdir -p /var/www/documents; chown -R www-data:www-data /var/www/documents; chmod -R 775 /var/www/documents; chown -R www-data:www-data /var/www/html/conf; chmod -R 775 /var/www/html/conf; a2dismod mpm_event mpm_worker; a2enmod mpm_prefork; apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/documents`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/dolibarr-erp-crm-1)
