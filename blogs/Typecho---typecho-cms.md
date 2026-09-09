# Deploy Typecho on Railway

Lightweight blogging platform for Markdown posts and pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typecho-cms)

## About

Typecho is a blogging platform written in PHP, built around the idea that a blog engine should be small enough to read in an afternoon. It gives you Markdown posts, static pages, threaded comments, categories and tags, custom fields and a theme and plugin API, in a codebase a fraction of WordPress's size. Writers and small teams pick it when they want their own domain and a fast admin panel without the plugin sprawl of a larger CMS. It is GPL-2.0 and has been maintained since 2008.

This template lets you self-host Typecho on Railway in one click, already wired to a database. Two services are deployed: **typecho**, an Apache 2.4 container running PHP 8.3 that serves the blog and admin panel on your public URL, and **MySQL**, a managed database holding every post, page, comment, user and setting. The blog service also gets a persistent volume for uploaded media, themes and plugins, so attachments and theme edits survive redeploys. There is no setup wizard to race: the container installs Typecho before it accepts a request, creates your administrator account, and provisions a database role scoped to its own database instead of using the MySQL superuser.

![Diagram of the Typecho and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788887823/typecho-architecture.png)

Typecho is a self-hosted publishing engine, not a hosted service. You run it, you own the database, and nothing is sent anywhere else. It suits a personal blog, a project changelog or a small company news page — anywhere you want control over the content and URLs without running a heavyweight CMS.

Key features:

- Markdown editing with live preview, plus a plain-HTML mode
- Posts, static pages, categories, tags and custom fields
- Threaded comments with moderation and anti-spam
- Theme system with an in-browser template editor, and a plugin API
- XML-RPC and MetaWeblog support, so desktop editors can post to it
- RSS and Atom feeds, generated automatically
- Fourteen bundled interface languages, switchable in the admin

The Railway architecture is deliberately small. The **typecho** service is the whole application: Apache serves static assets and hands `.php` requests to mod_php, and the `/healthz` check opens the app's real database connection, so a broken database surfaces as a failed deployment rather than a white page. The **MySQL** service holds all content; the volume carries only files — `uploads/`, `themes/`, `plugins/` and `backups/`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typecho | [gridalpha/typecho-railway](https://github.com/gridalpha/typecho-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | typecho | 8080 | Apache listening port |
| `MYSQL_URL` | typecho | - | Managed MySQL root connection |
| `TYPECHO_LANG` | typecho | en_US | Admin interface language |
| `TYPECHO_SITE_URL` | typecho | - | Site address written at install |
| `TYPECHO_USER_MAIL` | typecho | admin@example.com | First administrator's email address |
| `TYPECHO_USER_NAME` | typecho | admin | First administrator's login name |
| `TYPECHO_DB_PASSWORD` | typecho | (secret) | Password for the app's scoped role |
| `TYPECHO_USER_PASSWORD` | typecho | (secret) | First administrator's password |
| `MYSQLHOST` | MySQL | - | Data panel alias for host |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias for port |
| `MYSQLUSER` | MySQL | root | Data panel alias for superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias for database name |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias for password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password read by entrypoint |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Blogs · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/typecho-cms)
