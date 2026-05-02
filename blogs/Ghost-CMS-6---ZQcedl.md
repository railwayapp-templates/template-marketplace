# Deploy Ghost CMS 6 on Railway

Ready to use right after launch! No setup required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZQcedl)

## About

## Ready to use
This template doesn't require any customization. You can launch it and start publishing articles right away. Add MailGun credetials to enable automated email sending. This is useful if you want to allow members to signup, and send news letters.

### Customization friendly
This template is launched from a git repository, making it easy to customize should you want to. Simple eject, and clone your local version to make customizations - the source code is unpacked unlike all the docker versions of ghost.

**Instructions:** [https://funkyton.com/ghost-on-railway-deploy-your-blog-with-1-click/](https://funkyton.com/ghost-on-railway-deploy-your-blog-with-1-click/)

**Optional config**
- Cloudinary URL to sotre youre media in cloudinary
- MailGun credentials for email sending.

**About ghost:** Ghost is a powerful app for professional publishers to create, share, and grow a business around their content. It comes with modern tools to build a website, publish content, send newsletters & offer paid subscriptions to members.

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
