# Deploy ClassicPress on Railway

Open Source Content Management System for Creators.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/classicpress)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/classicpress)

### Deploy and Host ClassicPress on Railway

**ClassicPress** is a business-focused, community-led fork of WordPress without the Gutenberg block editor, offering a lightweight, fast, and highly stable Content Management System (CMS). This Railway template deploys **ClassicPress** (`classicpress`) paired with a **MariaDB** database (`db`), configured with persistent storage volumes and automated secret wiring.

---

#### About Hosting ClassicPress

Hosting ClassicPress on Railway deploys a two-tier container architecture:

* **ClassicPress Web Application (`classicpress`)**: Container service running `classicpress/classicpress:php8.3-apache` on port `80`. It mounts a persistent volume at `/var/www/html` to safeguard uploaded media, plugins, themes, and configuration files across deployments.
* **MariaDB Database (`db`)**: Relational database service using `mariadb:10.6`. It mounts a persistent volume at `/var/lib/mysql` to ensure database state (posts, pages, options, and user accounts) remains safe across redeployments, and offers public TCP proxy access on port `3306`.

---

#### Common Use Cases

* **Lightweight CMS hosting**: Run a high-performance blog, news publication, or business site built on ClassicPress.
* **Block-editor-free publishing**: Enjoy a traditional, streamlined classic editing interface without Gutenberg bloat.
* **Custom PHP application hosting**: Extend ClassicPress with classic WordPress-compatible plugins and custom themes.
* **Self-hosted content platform**: Maintain complete data ownership over media assets and database records on Railway infrastructure.

---

#### Dependencies for ClassicPress Hosting

* **ClassicPress image:** `classicpress/classicpress:php8.3-apache`
* **MariaDB image:** `mariadb:10.6`
* **Two persistent volumes:**
  * `/var/www/html` on the `classicpress` service
  * `/var/lib/mysql` on the `db` service
* **Railway public domain** mapped to port `80` for `classicpress`
* **Auto-generated secret:** MySQL password (`MYSQL_PASSWORD`)

**Upstream:** [ClassicPress Site](https://www.classicpress.net/) · [GitHub](https://github.com/ClassicPress/ClassicPress) · [Docker Hub](https://hub.docker.com/r/classicpress/classicpress)

##### Implementation Details

| Service | Image | Role | Internal Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **classicpress** | `classicpress/classicpress:php8.3-apache` | PHP 8.3 + Apache Web Server & CMS | `80` | `/var/www/html` |
| **db** | `mariadb:10.6` | MariaDB Database Server | `3306` | `/var/lib/mysql` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **classicpress** | Apache Web Server + CMS Files | `/var/www/html` | Yes (Port `80`) | Connects to `db` using `${{db.RAILWAY_PRIVATE_DOMAIN}}` |
| **db** | MariaDB Database Engine | `/var/lib/mysql` | TCP Proxy (Port `3306`) | Private networking with optional public TCP proxy access |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **classicpress** | `/var/www/html` | ClassicPress core PHP files, `wp-content/` (themes, plugins, uploads), `.htaccess`, and configuration |
| **db** | `/var/lib/mysql` | MariaDB database tables, post contents, options, and user credentials |

> **Warning:** Do **not** remove or detach the persistent volumes (`/var/www/html` or `/var/lib/mysql`). Removing `/var/www/html` erases media uploads and custom plugins, while removing `/var/lib/mysql` permanently deletes your database state.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for both the `db` database and `classicpress` web application containers to provision.
4. Open the **classicpress** service → **Settings** → **Networking** and click the generated public domain URL.
5. Complete the ClassicPress web setup wizard (Language, Site Title, Admin Username, Password, and Email).

---

#### Configuration

##### Application Variables (`classicpress`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `WORDPRESS_DB_HOST` | `${{db.RAILWAY_PRIVATE_DOMAIN}}` | Internal MariaDB hostname provided by the `db` service |
| `WORDPRESS_DB_USER` | `wordpress` | Database username created for ClassicPress |
| `WORDPRESS_DB_PASSWORD` | `${{db.MYSQL_PASSWORD}}` | Database access password referencing the auto-generated `db` secret |
| `WORDPRESS_DB_NAME` | `wordpress` | Target MariaDB database name |
| `PORT` | `80` | Web server port listened on inside the container |

##### Database Variables (`db`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MYSQL_DATABASE` | `wordpress` | Default database created during MariaDB initialization |
| `MYSQL_USER` | `wordpress` | Database user created during initialization |
| `MYSQL_PASSWORD` | Auto-generated secret (16 chars) | Password for `MYSQL_USER` |
| `MYSQL_ROOT_PASSWORD` | `${{MYSQL_PASSWORD}}` | Administrative root database password |
| `MYSQLHOST` | `${{RAILWAY_PRIVATE_DOMAIN}}` | Internal private network domain |
| `MYSQLPORT` | `3306` | MariaDB server port |
| `DATABASE_URL` | `mysql://${{MYSQL_USER}}:${{MYSQL_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:3306/${{MYSQL_DATABASE}}` | Private MySQL connection string |
| `DATABASE_PUBLIC_URL` | Connection string via TCP Proxy | External connection URL for remote database clients (e.g., TablePlus, DBeaver) |

##### Custom Domain

1. Open the **classicpress** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Log in to ClassicPress Admin (**Settings** → **General**) and update **WordPress Address (URL)** and **Site Address (URL)** to match your new custom domain URL (`https://yourdomain.com`).

---

#### Updating ClassicPress

1. Open the **classicpress** service → **Settings** → **Source**.
2. Update the image tag (e.g., `classicpress/classicpress:php8.3-apache` to a newer version tag).
3. Click **Redeploy**.

All uploaded media, installed themes/plugins, and database records will remain safe inside `/var/www/html` and `/var/lib/mysql`.

---

#### Traps

**Common pitfalls and failure modes:**

* **Site URL Redirect Loops on Custom Domains** — ClassicPress records site URLs in its database options. Changing Railway domains or configuring custom domains without updating site settings or defining `WP_HOME` and `WP_SITEURL` in `wp-config.php` may cause infinite HTTP redirect loops.
* **Volume Detachment Data Loss** — Because both files (`/var/www/html`) and database state (`/var/lib/mysql`) are stored on persistent volumes, removing either volume during maintenance will delete user uploads or database records.
* **HTTPS Proxy Headers** — Railway routes web requests through HTTPS reverse proxies. If CSS/JS assets attempt to load over HTTP or trigger mixed-content warnings, ensure `HTTP_X_FORWARDED_PROTO` headers are processed correctly.
* **Database Connection Delay during First Boot** — If `classicpress` boots before MariaDB has finished initializing its database directory, initial connection attempts may time out. Wait for `db` to become healthy and redeploy `classicpress`.

---

#### Why Deploy ClassicPress on Railway?

Railway provides a complete platform for running web applications and databases together without server maintenance. Hosting ClassicPress on Railway gives you private service networking, isolated volume mounts, auto-generated security credentials, automatic HTTPS encryption, and reliable scaling.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| classicpress | `classicpress/classicpress:php8.3-apache` | Web service |
| db | `mariadb:10.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | classicpress | 8080 | Port the WordPress web server listens on. |
| `WORDPRESS_DB_HOST` | classicpress | - | Private hostname used by WordPress to connect to the MySQL database over Railway's private network. |
| `WORDPRESS_DB_NAME` | classicpress | wordpress | Name of the MySQL database WordPress uses to store its data. |
| `WORDPRESS_DB_USER` | classicpress | (secret) | MySQL username WordPress uses to access the database. |
| `WORDPRESS_DB_PASSWORD` | classicpress | (secret) | MySQL password retrieved from the connected database service. |
| `MYSQLHOST` | db | - | Private hostname used to connect to the MySQL service within Railway's private network. |
| `MYSQLPORT` | db | 3306 | Default port MySQL listens on. |
| `MYSQLUSER` | db | - | MySQL username, linked to the configured MYSQL_USER variable. |
| `MYSQL_URL` | db | - | Internal MySQL connection URL used by applications expecting a MYSQL_URL variable. |
| `MYSQL_USER` | db | (secret) | MySQL user account used by the application. |
| `DATABASE_URL` | db | - | Internal MySQL connection URL for services within Railway. |
| `MYSQLDATABASE` | db | - | MySQL database name, linked to the configured MYSQL_DATABASE variable. |
| `MYSQLPASSWORD` | db | (secret) | MySQL password, linked to the configured MYSQL_PASSWORD variable. |
| `MYSQL_DATABASE` | db | wordpress | Name of the MySQL database created for the application. |
| `MYSQL_PASSWORD` | db | (secret) | Randomly generated 16-character password used to secure the MySQL user account. |
| `DATABASE_PUBLIC_URL` | db | - | Public MySQL connection URL using Railway's TCP proxy. |
| `MYSQL_ROOT_PASSWORD` | db | (secret) | Root password for MySQL, using the same password as the configured MySQL user. |

## Configuration

- **Start command:** `bash -c 'a2dismod -f mpm_event mpm_worker >/dev/null 2>&1; a2enmod mpm_prefork >/dev/null 2>&1; sed -i "s/80/8080/g" /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf; docker-entrypoint.sh apache2-foreground & sleep 30; sed -i '\''/stop editing/i if (isset($_SERVER["HTTP_X_FORWARDED_PROTO"]) && $_SERVER["HTTP_X_FORWARDED_PROTO"] === "https") { $_SERVER["HTTPS"] = "on"; }'\'' /var/www/html/wp-config.php; wait'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/classicpress)
