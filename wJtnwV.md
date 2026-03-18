# Deploy Bedrock | Modern WordPress Boilerplate on Railway

Bedrock | Modern WordPress Boilerplate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wJtnwV)

## About

The most popular choice for managing Wordpress with composer is now available on Railway. 

Bedrock is a modern template boilerplate for managing version controlled Wordpress instances. 

This repo follows the best practices for developing apps on Wordpress.

This template is for you if:

1. You are familiar with bedrock and composer
2. You want to manage your plugins and code changes with git.
3. You want to let Wordpress manage your content and uploads.

Create your own bedrock Wordpress site using the following steps:

1. Fork the repo: https://github.com/enterprise-wp/bedrock-singleapp
2. Deploy this template - use roots.io/salts.html for generating tokens.
3. Visit settings, disconnect my provided repo and point it to your forked repo. 

ALERT
`
This template is undergoing active development and currently awaiting a Volumes from Railway. Updates to come soon.
`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| bedrock-singleapp | [enterprise-wp/bedrock-singleapp](https://github.com/enterprise-wp/bedrock-singleapp) | Web service |

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
| `WP_ENV` | bedrock-singleapp | production | - |
| `AUTH_KEY` | bedrock-singleapp | (secret) | fill in https://roots.io/salts.html |
| `AUTH_SALT` | bedrock-singleapp | - | fill in https://roots.io/salts.html |
| `NONCE_KEY` | bedrock-singleapp | - | fill in https://roots.io/salts.html |
| `NONCE_SALT` | bedrock-singleapp | - | fill in https://roots.io/salts.html |
| `LOGGED_IN_KEY` | bedrock-singleapp | - | fill in https://roots.io/salts.html |
| `LOGGED_IN_SALT` | bedrock-singleapp | - | fill in https://roots.io/salts.html |
| `SECURE_AUTH_KEY` | bedrock-singleapp | (secret) | fill in https://roots.io/salts.html |
| `SECURE_AUTH_SALT` | bedrock-singleapp | - | fill in https://roots.io/salts.html |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** PHP

[View on Railway →](https://railway.com/template/wJtnwV)
