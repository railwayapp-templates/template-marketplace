# Deploy Open Source Point of Sale on Railway

Point of sale and inventory system for small retail shops

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensourcepos)

## About

Open Source Point of Sale (OSPOS) is a browser-based till and inventory system for small retail — a shop counter, a market stall, a café, a club bar. It runs the register, keeps the stock ledger, holds customers and suppliers, issues quotes and invoices, and reports on all of it. It is MIT-licensed PHP on CodeIgniter 4 with MySQL behind it, maintained in the open since 2013. Self-host Open Source Point of Sale when you want a till that belongs to you: no per-terminal subscription, no percentage of takings, and a sales history you can query.

Deploy Open Source Point of Sale on Railway and you get two services. `opensourcepos` is the application — Apache and mod_php serving the register over your generated public URL, with a volume at `/app/public/uploads` for product photos. `MySQL` is Railway's managed MySQL 9.4, private to the project, holding every table the app owns: items, sales, people, sessions and settings. On first boot the container waits for MySQL, runs the migrations, and sets the admin password you supplied before Apache accepts a single request.

![Diagram of the OpenSourcePOS and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789592017/opensourcepos-architecture.webp)

Commercial point-of-sale software is usually rented: a monthly fee per register, sometimes a slice of card volume, and an export button that hands you a CSV rather than your data. OSPOS is the opposite trade — you own the database in exchange for doing the hosting.

What it gives you:

- A touch-friendly register with barcode scanning, line discounts, split payments and suspended sales
- Stock management for items and kits, with attributes, reorder levels, receivings and suppliers
- Quotes, invoices and receipts, printable or emailed
- Customer records with per-customer discounts, taxable status and spending history
- Gift cards, reward points, expenses and end-of-shift cash-ups
- Multi-user accounts with per-module permissions, and per-location stock
- Reporting across sales, items, customers, employees, payments, taxes and inventory

The architecture is deliberately small: `opensourcepos` is the whole application, with no worker, queue or cache tier to keep in sync. `MySQL` stores everything including sessions, which is why a redeploy does not sign anyone out. The volume holds only product images.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| opensourcepos | [gridalpha/opensourcepos-railway](https://github.com/gridalpha/opensourcepos-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `PORT` | opensourcepos | 8080 | Apache listening port |
| `PHP_TIMEZONE` | opensourcepos | UTC | Timezone for receipts and reports |
| `MYSQL_DB_NAME` | opensourcepos | - | Database name |
| `CI_ENVIRONMENT` | opensourcepos | production | CodeIgniter environment |
| `ENCRYPTION_KEY` | opensourcepos | - | At-rest encryption key, must stay stable |
| `MYSQL_PASSWORD` | opensourcepos | (secret) | Database password |
| `MYSQL_USERNAME` | opensourcepos | (secret) | Database user |
| `MYSQL_HOST_NAME` | opensourcepos | - | Database host, private network |
| `OSPOS_LOG_THRESHOLD` | opensourcepos | 4 | CodeIgniter log level, 9 logs everything |
| `OSPOS_ADMIN_PASSWORD` | opensourcepos | (secret) | Password for the admin account |
| `OSPOS_ADMIN_USERNAME` | opensourcepos | (secret) | Account the entrypoint re-passwords |
| `ALLOWED_HOSTNAMES_EXTRA` | opensourcepos | - | Extra hostnames for a custom domain |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/uploads`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/opensourcepos)
