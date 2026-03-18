# Deploy Wordpress on Railway

Deploy and Host Wordpress with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wordpress-1)

## About

**WordPress** é um CMS open source para criar sites, blogs e lojas com WooCommerce. Ele oferece um ecossistema enorme de temas e plugins e roda sobre PHP com banco MySQL ou MariaDB, além de exigir um servidor web (Apache ou Nginx) e HTTPS para produção. ([WordPress.org][1])

Hospedar WordPress no Railway é direto: utilize a imagem oficial do WordPress (PHP + Apache) em um serviço, conecte um banco MySQL/MariaDB e anexe um Volume para persistir uploads e `wp-content`. Configure variáveis de ambiente, exponha o app via Public Networking e aponte um domínio com HTTPS automático. Esse arranjo segue os requisitos oficiais do WordPress e boas práticas do container oficial. ([Docker Hub][2], [Railway Docs][3])

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb` | Database |
| Primary | `wordpress` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | railway |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PRIVATE_PORT` | MariaDB | 3306 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | Primary | 80 |
| `WORDPRESS_DB_USER` | Primary | (secret) |
| `WORDPRESS_AUTH_KEY` | Primary | (secret) |
| `WORDPRESS_DB_PASSWORD` | Primary | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | Primary | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "echo 'ServerName 0.0.0.0' >> /etc/apache2/apache2.conf && echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf && echo 'upload_max_filesize = 50M' >> /usr/local/etc/php/php.ini && echo 'post_max_size = 50M' >> /usr/local/etc/php/php.ini && docker-entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/template/wordpress-1)
