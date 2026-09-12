# Deploy PrestaShop on Railway

Online store platform with a catalogue, checkout and back office

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prestashop-shop)

## About

PrestaShop is an open-source e-commerce platform that has powered independent online stores since 2007. It gives a merchant a storefront, a catalogue with attributes and combinations, a cart and checkout, tax and shipping rules, customer accounts, and a back office. Because the code is yours, the products, customers and orders stay in a database you control. Teams choose it to extend the checkout with their own module, or to trade a per-order fee for a fixed hosting bill.

Deploy PrestaShop on Railway and this template stands up the whole shop in one step. The **PrestaShop** service wraps the official PrestaShop 9 image and runs the installer unattended on its first boot, so the storefront, the demo catalogue and the back-office account all exist by the time the URL answers. **MySQL** holds every product, order and customer. **Mailpit** captures the mail the shop sends — order confirmations, password resets, contact-form replies — and gives you a web inbox to read it in. The shop reaches both over Railway's private network.

![Diagram of the PrestaShop, MySQL and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788997090/prestashop-architecture.png)

PrestaShop is a PHP application built on Symfony components, with MySQL behind it and a themeable front end. Self-hosting suits a shop that has outgrown a hosted plan's fees or extension limits, or an agency running several storefronts from one codebase.

- Catalogue with attributes, combinations, packs, virtual products and stock
- Cart, checkout, guest orders, invoices, credit slips and returns
- Multi-currency, multi-language and multi-store from one installation
- Discounts, cart rules and catalogue price rules
- A module and theme system with thousands of community and paid add-ons
- SEO-friendly URLs, sitemaps and per-product metadata

The Railway topology has three parts. PrestaShop serves the shop and keeps its application tree on a volume, because it writes there: product images, modules installed from the back office, generated themes, and the file holding its cookie and API keys. MySQL is Railway's managed database, so backups and the Data panel come with it. Mailpit is capture-only — mail is delivered and readable, but nothing reaches a customer by accident.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Mailpit | `axllent/mailpit:latest` | Web service |
| PrestaShop | [gridalpha/prestashop-railway](https://github.com/gridalpha/prestashop-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `TZ` | Mailpit | UTC | Timestamps shown in the inbox |
| `PORT` | Mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | Mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | Mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | Mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | Mailpit | [::]:8025 | Dual-stack web listener |
| `MP_SMTP_BIND_ADDR` | Mailpit | [::]:1025 | Dual-stack SMTP listener |
| `PRIVATE_SMTP_HOST` | Mailpit | mailpit.railway.internal | SMTP host for the shop |
| `PRIVATE_SMTP_PORT` | Mailpit | 1025 | SMTP port for the shop |
| `MP_SMTP_MAX_RECIPIENTS` | Mailpit | 100 | Recipient cap per message |
| `PORT` | PrestaShop | 80 | Apache listening port |
| `DB_NAME` | PrestaShop | - | Database the shop installs into |
| `DB_PORT` | PrestaShop | - | MySQL port |
| `DB_USER` | PrestaShop | (secret) | MySQL account |
| `DB_PASSWD` | PrestaShop | - | MySQL password |
| `DB_PREFIX` | PrestaShop | ps_ | Table name prefix |
| `DB_SERVER` | PrestaShop | - | Private MySQL hostname |
| `PS_DOMAIN` | PrestaShop | - | Shop domain, written at install |
| `SMTP_HOST` | PrestaShop | - | Outgoing mail host |
| `SMTP_PORT` | PrestaShop | - | Outgoing mail port |
| `SMTP_USER` | PrestaShop | (secret) | SMTP username, blank for Mailpit |
| `ADMIN_MAIL` | PrestaShop | admin@example.com | Back-office login email |
| `PS_COUNTRY` | PrestaShop | us | Default shop country |
| `PS_LANGUAGE` | PrestaShop | en | Default shop language |
| `PS_TIMEZONE` | PrestaShop | UTC | Shop and PHP timezone |
| `ADMIN_PASSWD` | PrestaShop | - | Back-office password |
| `PS_ADMIN_DIR` | PrestaShop | adminpanel | Back-office URL path segment |
| `PS_SHOP_NAME` | PrestaShop | My PrestaShop Store | Store name shown to shoppers |
| `PS_ACCESS_LOG` | PrestaShop | 0 | Apache access log to stdout |
| `SMTP_PASSWORD` | PrestaShop | (secret) | SMTP password, blank for Mailpit |
| `ADMIN_LASTNAME` | PrestaShop | Owner | Back-office account last name |
| `ADMIN_FIRSTNAME` | PrestaShop | Shop | Back-office account first name |
| `SMTP_ENCRYPTION` | PrestaShop | off | SMTP encryption mode |
| `PHP_MEMORY_LIMIT` | PrestaShop | 512M | PHP memory limit per request |
| `PS_INSTALL_FIXTURES` | PrestaShop | 1 | Install the demo catalogue |
| `PHP_MAX_EXECUTION_TIME` | PrestaShop | 300 | PHP script time limit |
| `PHP_UPLOAD_MAX_FILESIZE` | PrestaShop | 64M | Largest product image upload |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/var/www/html`

**Category:** CMS · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/prestashop-shop)
