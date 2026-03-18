# Deploy Magento on Railway

Install Magento Version 2.4.7 + Elasticsearch

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magento-1)

## About

Magento 2 is an open-source e-commerce platform built on PHP. It powers online stores with catalog management, checkout, multi-store support, and a rich ecosystem of extensions. This template deploys Magento 2.4 with Nginx and PHP-FPM, using MySQL and OpenSearch/Elasticsearch as separate Railway services.

Hosting Magento 2 involves running a PHP application (Nginx + PHP-FPM), a MySQL-compatible database for catalog and orders, and a search engine (Elasticsearch/OpenSearch) for product search. This Railway setup uses a single Dockerfile that downloads the official Magento 2.4 release from GitHub, runs Composer install, and configures Nginx to listen on the port Railway provides. On first run, the entrypoint detects an empty database and runs `setup:install` automatically, then deploys static content and sets production mode. Optional sample data can be installed via an environment variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Magento 2.4.7 | [feliperosenek/mangeto2-railway](https://github.com/feliperosenek/mangeto2-railway) | Web service |
| Elasticsearch | [feliperosenek/elasticsearch-railway](https://github.com/feliperosenek/elasticsearch-railway) | Web service |
| MySQL 8 | [feliperosenek/mysql-any-version-railway](https://github.com/feliperosenek/mysql-any-version-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | Magento 2.4.7 | - | Shop base URL |
| `ADMIN_USER` | Magento 2.4.7 | (secret) | Admin User Magento |
| `MYSQL_HOST` | Magento 2.4.7 | - | MySQL host |
| `MYSQL_PORT` | Magento 2.4.7 | 3306 | MySQL port |
| `MYSQL_USER` | Magento 2.4.7 | (secret) | MySQL user |
| `ADMIN_EMAIL` | Magento 2.4.7 | - | Magento admin e-email |
| `ADMIN_LASTNAME` | Magento 2.4.7 | - | Magento admin lastname |
| `ADMIN_PASSWORD` | Magento 2.4.7 | (secret) | Magento admin password |
| `MYSQL_DATABASE` | Magento 2.4.7 | railway | MySQL database name |
| `MYSQL_PASSWORD` | Magento 2.4.7 | (secret) | MySQL password |
| `ADMIN_FIRSTNAME` | Magento 2.4.7 | - | Magento admin first name |
| `BACKEND_FRONTNAME` | Magento 2.4.7 | admin | Define your_url/{BACKEND_FRONTNAME} to access admin page |
| `ELASTICSEARCH_HOST` | Magento 2.4.7 | - | Elasticsearch host |
| `ELASTICSEARCH_PORT` | Magento 2.4.7 | - | Elasticsearch port |
| `INSTALL_SAMPLE_DATA` | Magento 2.4.7 | false | Set true to install Magento sample data |
| `ELASTICSEARCH_PASSWORD` | Magento 2.4.7 | (secret) | Elasticsearch password |
| `ELASTICSEARCH_USERNAME` | Magento 2.4.7 | (secret) | Elasticsearch username |
| `ELASTICSEARCH_ENABLE_AUTH` | Magento 2.4.7 | 1 | Elasticsearch auth to login |
| `PORT` | Elasticsearch | 9200 | Elasticsearch port |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms100m -Xmx300m | Elasticsearch RAM options (min - max) |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Elasticsearch password |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) | Elasticsearch username |
| `MYSQL_ROOT_PASSWORD` | MySQL 8 | (secret) | MySQL password root |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www`
- **Healthcheck:** `/_cluster/health`
- **Volume:** `/esdata`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/magento-1)
