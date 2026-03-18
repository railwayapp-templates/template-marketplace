# Deploy WordPress + MySQL on Railway

Zero Config | One click | WordPress | Docker | MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yG1Jw8)

## About

# One Click WordPress + MySQL

## ✨ Features
- **Zero Configuration:** No config setup needed, simply deploy and start using in 1 Click!
- **WordPress & MySQL Integration:** Seamless integration of WordPress and MySQL.

## 💁‍♀️ How to use

1. **Deploy this template**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/yG1Jw8?referralCode=yavAI)

2. **Follow the prompts to set up your project.** All environment variables are pre-configured.

## After deployment
- Access your WordPress site through the provided Railway URL.
- Finish WordPress Setup.
- Your WordPress site is ready!
- Manage your MySQL database through the Railway dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Docker Image | `wordpress` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Docker Image | 80 | - |
| `WORDPRESS_DB_USER` | Docker Image | (secret) | - |
| `WORDPRESS_AUTH_KEY` | Docker Image | (secret) | - |
| `WORDPRESS_DB_PASSWORD` | Docker Image | (secret) | - |
| `WORDPRESS_SECURE_AUTH_KEY` | Docker Image | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `bash -c "grep -q 'ServerName localhost' /etc/apache2/apache2.conf || echo 'ServerName localhost' >> /etc/apache2/apache2.conf; a2dismod mpm_event || true; a2dismod mpm_worker || true; a2enmod mpm_prefork; exec docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Blogs

[View on Railway →](https://railway.com/template/yG1Jw8)
