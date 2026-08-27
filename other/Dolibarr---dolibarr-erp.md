# Deploy Dolibarr on Railway

Business software for invoices, customers, stock and accounts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dolibarr-erp)

## About

Dolibarr is an open-source ERP and CRM suite that small and mid-sized businesses use to run the whole commercial cycle in one place: contacts and leads, quotes, sales and purchase orders, invoices and payments, products and stock, projects and double-entry accounting. Developed by an independent association since 2003 and released under the GPL, it is deliberately modular: you switch on only the modules you need, so a two-person consultancy sees an invoicing tool while a distributor sees a warehouse system. Teams reach for it when spreadsheets and scattered SaaS stop holding together but an Odoo or SAP rollout is far too much.

Self-host Dolibarr on Railway with two services and no manual installation step. The **Dolibarr** service runs Apache and PHP from the official `dolibarr/dolibarr` image, serves the interface on its public domain, and keeps uploads and generated PDFs on a volume at `/var/www/documents`. The **MySQL** service is a Railway-managed database reachable only over the private network. On first boot the app creates its own database and a role scoped to that one schema, imports the Dolibarr tables, and creates the administrator account from the login and password you supply. It also runs Dolibarr's job scheduler in the same container, so recurring invoices, reminders and cleanup jobs work as soon as the deploy goes green.

![Diagram of the Dolibarr and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787709427/dolibarr-architecture.png)

Dolibarr is a single PHP application backed by one relational database, which is what makes it realistic to self-host. There is no broker, no search cluster and no build step: everything mutable lives in MySQL or in the documents directory on the volume.

Key features:

- Customers, prospects and suppliers with contacts, categories and an activity log
- Quotes, orders, delivery notes, customer and supplier invoices, recurring billing
- Products and services with price lists, multi-warehouse stock, batch tracking
- Projects, tasks, time recording, expense reports, leave requests and a shared agenda
- Bank reconciliation, tax handling and double-entry accounting with ledger exports
- A REST API, LDAP authentication and ~2,000 community add-on modules

Every file — attachments, generated invoice and quote PDFs, ECM documents, add-on modules installed from the admin UI — lives under `/var/www/documents` on the volume, so both halves of the state survive redeploys. The scheduler runs alongside Apache rather than as a separate worker, because its jobs write into the same document tree the interface serves.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Dolibarr | [gridalpha/dolibarr-railway](https://github.com/gridalpha/dolibarr-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, always the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the entrypoint |
| `PORT` | Dolibarr | 8080 | Apache listening port |
| `DOLI_CRON` | Dolibarr | 1 | Run the job scheduler in this container |
| `DOLI_PROD` | Dolibarr | 1 | Hide PHP errors from visitors |
| `WWW_USER_ID` | Dolibarr | 33 | UID Apache runs as |
| `DOLI_DB_HOST` | Dolibarr | - | Private database hostname |
| `DOLI_DB_NAME` | Dolibarr | dolibarr | Schema created at first boot |
| `DOLI_DB_TYPE` | Dolibarr | mysqli | Database driver |
| `DOLI_DB_USER` | Dolibarr | (secret) | Scoped role created at first boot |
| `WWW_GROUP_ID` | Dolibarr | 33 | GID Apache runs as |
| `DOLI_CRON_KEY` | Dolibarr | - | Security key for scheduled job runs |
| `DOLI_URL_ROOT` | Dolibarr | - | Public base URL |
| `DOLI_CRON_USER` | Dolibarr | (secret) | Login the scheduler runs jobs as |
| `DOLI_INIT_DEMO` | Dolibarr | 0 | Skip the upstream demo dataset |
| `DOLI_ADMIN_LOGIN` | Dolibarr | (secret) | First superadmin login |
| `DOLI_DB_PASSWORD` | Dolibarr | (secret) | Password for that scoped role |
| `DOLI_DB_ADMIN_URL` | Dolibarr | - | Admin URL, used once per boot to provision |
| `DOLI_DB_HOST_PORT` | Dolibarr | - | Database port |
| `DOLI_INSTALL_AUTO` | Dolibarr | 1 | Run unattended install and upgrades |
| `DOLI_ADMIN_PASSWORD` | Dolibarr | (secret) | First superadmin password, change after login |
| `PHP_INI_MEMORY_LIMIT` | Dolibarr | 512M | PHP memory ceiling |
| `PHP_INI_DATE_TIMEZONE` | Dolibarr | UTC | PHP timezone |
| `PHP_INI_POST_MAX_SIZE` | Dolibarr | 66M | Largest POST body accepted |
| `DOLI_INSTANCE_UNIQUE_ID` | Dolibarr | - | Salt for API keys and tokens |
| `PHP_INI_ALLOW_URL_FOPEN` | Dolibarr | 0 | Block remote file opens |
| `PHP_INI_UPLOAD_MAX_FILESIZE` | Dolibarr | 64M | Largest upload accepted |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/documents`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dolibarr-erp)
