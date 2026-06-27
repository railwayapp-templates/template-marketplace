# Deploy Ghost CMS 6 on Railway

Ready to use right after launch! No setup required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZQcedl)

## About

Ghost CMS 6 is a modern open source publishing platform for blogs, newsletters, memberships, and paid subscriptions. It gives you a clean writing experience, full content ownership, built-in SEO foundations, and tools to grow an audience without relying on a closed publishing platform.

[Full setup guide and walkthrough](https://funkyton.com/ghost-on-railway-deploy-your-blog-with-1-click/)

This template lets you deploy the full open source version of Ghost CMS 6 on Railway in just a few minutes. It includes Ghost, MySQL, and a Railway-ready setup so you can launch a working blog without manually setting up servers, databases, Docker, or Linux hosting.

The template is designed to be ready to use after deployment. Open your Railway URL, add `/ghost`, create the first admin user, and start publishing.

It also uses unpacked source code from GitHub instead of a sealed Docker image, making it easier to inspect, fork, customize, and extend if you ever need to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| Ghost | [rpuls/ghost-boilerplate](https://github.com/rpuls/ghost-boilerplate) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `DB_USER` | Ghost | (secret) | - |
| `NODE_ENV` | Ghost | production | - |
| `DB_PASSWORD` | Ghost | (secret) | - |
| `CLOUDINARY_URL` | Ghost | - | Add to enable Cloudinary (ex: cloudinary://<id>:<secret>@<cloud-name>) |
| `MAILGUN_SMTP_LOGIN` | Ghost | (secret) | Add to enable Mailgun (Ex: your@mail.com) |
| `MAILGUN_SMTP_PASSWORD` | Ghost | (secret) | Add to enable Mailgun |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `npm run postinstall && npm run start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/content/images`

**Category:** Blogs · **Languages:** JavaScript, Handlebars, CSS, HTML, TypeScript, Shell, XSLT

[View on Railway →](https://railway.com/deploy/ZQcedl)
