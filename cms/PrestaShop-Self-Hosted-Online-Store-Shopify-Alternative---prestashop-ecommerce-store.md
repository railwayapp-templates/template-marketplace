# Deploy PrestaShop — Self-Hosted Online Store & Shopify Alternative on Railway

Self-host PrestaShop — full online store, no transaction fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prestashop-ecommerce-store)

## About

PrestaShop is a powerful open-source e-commerce platform — a self-hosted alternative to Shopify for running a full online store with products, categories, carts, checkout, payments, shipping, taxes, and a complete back office. Own your store with no monthly platform fee and no per-sale commission. This template deploys PrestaShop with a Railway-managed MySQL database, an auto-installer, and the platform's Railway-specific quirks already solved — so you land on a working store, not a broken install.

---

PrestaShop is a mature platform, and it has a few Railway-specific sharp edges that break naive deploys — all handled here.

**Set your domain before first deploy — it's baked in at install.** This is the critical one: PrestaShop writes `PS_DOMAIN` into the database during installation, so if it's wrong at first boot, your storefront links, images, and assets point at the wrong host and the site breaks. Set your final Railway (or custom) domain before the first deploy. This template configures it correctly and handles dynamic-domain detection so your store loads right the first time.

**Your admin URL is normalized for you.** For security, PrestaShop's installer renames the `admin/` folder to a random name — which means on a plain deploy you can't find your own admin panel. This template's entrypoint restores it to a known `PS_FOLDER_ADMIN` value, so you always know your admin URL after install, without hunting through the filesystem.

**Railway volume and SSL quirks are handled, and it auto-installs.** With `PS_INSTALL_AUTO=1`, PrestaShop installs automatically against MySQL on first boot (1–2 minutes) and creates your admin from `ADMIN_MAIL`/`ADMIN_PASSWD`. The template also cleans the `lost+found` directory Railway's ext4 volumes create at the mount root, and trusts Railway's `X-Forwarded-Proto` header so PrestaShop detects HTTPS behind the reverse proxy — so secure checkout and mixed-content issues just work.

**Everything persists on the volume.** Product images, installed modules, themes, and cache live on the `/var/www/html` volume, and all store data lives in MySQL — both survive redeploys, so modules and uploads behave like classic hosting. Upgrade PrestaShop through its built-in upgrade module rather than swapping image tags, and back up MySQL, which holds your entire store.

**Add payments and shipping in the back office.** PrestaShop supports all major payment gateways (Stripe, PayPal, and more) and shipping carriers through modules — install them from the Module Manager, including premium ZIPs from the marketplace, which persist across deployments.

Typical cost: **~$10–15/month** on Railway for the store and MySQL, scaling with catalog size and traffic. PrestaShop is OSL-3.0 and free — no license fees and no transaction commissions, unlike Shopify.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Prestashop | `prestashop/prestashop:8-apache` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Prestashop | 8080 | - |
| `DB_USER` | Prestashop | (secret) | - |
| `DB_PREFIX` | Prestashop | ps_ | - |
| `ADMIN_MAIL` | Prestashop | - | Admin login email |
| `PS_COUNTRY` | Prestashop | US | - |
| `PS_DEV_MODE` | Prestashop | 0 | - |
| `PS_LANGUAGE` | Prestashop | en | - |
| `ADMIN_PASSWD` | Prestashop | - | Admin password (first boot only) |
| `PS_DEMO_MODE` | Prestashop | 0 | - |
| `PS_ENABLE_SSL` | Prestashop | 1 | - |
| `PS_FOLDER_ADMIN` | Prestashop | admin-railway | - |
| `PS_INSTALL_AUTO` | Prestashop | 1 | - |
| `PS_HANDLE_DYNAMIC_DOMAIN` | Prestashop | 1 | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/prestashop-ecommerce-store)
