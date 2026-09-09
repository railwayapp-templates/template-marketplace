# Deploy QloApps on Railway

Hotel management software with a built-in booking website

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qloapps)

## About

QloApps is a free, open-source hotel management suite bundling three products a property
normally buys separately: a Property Management System for the front desk, a
commission-free booking engine, and a public hotel website with a room-search widget on
the homepage. Built by Webkul on the PrestaShop 1.6 core, it suits independent hotels,
guest houses, hostels and small chains that want direct bookings without paying an OTA
15–20% per reservation. Arrivals, departures, room allocation, rates, refunds and
invoices live in the same back office as the storefront that took the booking.

Deploy QloApps on Railway and you get a working hotel out of the box. The template runs
three services: `qloapps`, the Apache/PHP application serving the public site and the back
office; `MySQL`, the managed database holding rooms, rates, guests and orders; and
`mailpit`, a private SMTP server capturing booking confirmations and password resets so
you can watch mail working before choosing a relay. The app reaches both over the private
network; only the storefront and the inbox get public URLs. A volume at `/data` holds room
photography, uploads, invoices, module code and the shop's settings file, so everything
survives a redeploy.

![Diagram of the QloApps, MySQL and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788845371/qloapps-architecture.png)

QloApps replaces the usual three-vendor stack — website builder, booking widget and PMS —
with one application and one database, inheriting PrestaShop's catalogue, tax, currency
and invoice engine, applied to rooms and nights.

- Room-type catalogue with occupancy rules, bed types, amenities and galleries
- Availability calendar and front-desk booking screen for walk-in guests
- Advance payment, cancellation and refund rules; invoices and credit slips
- Multi-property, multi-currency, multi-language and per-country tax rules
- PrestaShop's modules and themes, plus a channel manager for OTAs

The architecture is deliberately small. `qloapps` serves the storefront, the back office
and the API from one origin, because the session cookie has to be same-origin. `MySQL`
stores everything transactional, and the app never connects as its superuser: each boot
creates a dedicated `qloapps` database and a role granted only on it, then runs as that
role, so a third-party module cannot reach anything else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| qloapps | [gridalpha/qloapps-railway](https://github.com/gridalpha/qloapps-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

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
| `PORT` | qloapps | 8080 | Port Apache listens on |
| `MYSQL_URL` | qloapps | - | Admin connection used once per boot |
| `QLO_DB_NAME` | qloapps | qloapps | Database created for the shop |
| `QLO_DB_USER` | qloapps | (secret) | Scoped role the app runs as |
| `QLO_ADMIN_DIR` | qloapps | backoffice | Back office path; cannot be admin |
| `QLO_DB_PREFIX` | qloapps | qlo_ | Table prefix |
| `QLO_SHOP_NAME` | qloapps | QloApps Hotel | Shop name on the site and invoices |
| `QLO_SMTP_HOST` | qloapps | - | SMTP server for outgoing mail |
| `QLO_SMTP_PORT` | qloapps | 1025 | SMTP port |
| `QLO_ADMIN_EMAIL` | qloapps | admin@example.com | Hotel manager login |
| `QLO_DB_PASSWORD` | qloapps | (secret) | Password for that scoped role |
| `PHP_MEMORY_LIMIT` | qloapps | 512M | PHP memory limit |
| `QLO_SHOP_COUNTRY` | qloapps | us | ISO country seeding tax and currency |
| `PHP_POST_MAX_SIZE` | qloapps | 64M | POST body ceiling |
| `QLO_SHOP_LANGUAGE` | qloapps | en | Installation language |
| `QLO_SHOP_TIMEZONE` | qloapps | UTC | PHP and booking calendar timezone |
| `QLO_ADMIN_LASTNAME` | qloapps | Manager | Hotel manager last name |
| `QLO_ADMIN_PASSWORD` | qloapps | (secret) | Hotel manager password |
| `QLO_ADMIN_FIRSTNAME` | qloapps | Hotel | Hotel manager first name |
| `QLO_SMTP_ENCRYPTION` | qloapps | off | SMTP encryption mode |
| `QLO_INSTALL_FIXTURES` | qloapps | 1 | Install the demo hotel property |
| `PHP_MAX_EXECUTION_TIME` | qloapps | 300 | PHP execution ceiling |
| `PHP_UPLOAD_MAX_FILESIZE` | qloapps | 64M | Upload ceiling for room photos |
| `TZ` | mailpit | UTC | Timestamps shown in the inbox |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for private SMTP |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile, Smarty

[View on Railway →](https://railway.com/deploy/qloapps)
