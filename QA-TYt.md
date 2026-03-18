# Deploy next-wp on Railway

Nextjs starter with Headless Wordpress 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QA-TYt)

## About

# Next.js Starter for WordPress Headless CMS

&gt; [Watch the Demo Video](https://www.youtube.com/watch?v=JZc1-BcOvYw)

![CleanShot 2025-01-07 at 23 18 41@2x](https://github.com/user-attachments/assets/8b268c36-eb0d-459f-b9f1-b5f129bd29bc)

This is a starter template for building a Next.js application that fetches data from a WordPress site using the WordPress REST API. The template includes functions for fetching posts, categories, tags, authors, and featured media from a WordPress site and rendering them in a Next.js application.


## Overview

### What's included?

✅ Type-safe data layer with the WordPress RestAPI<br>
✅ Granular access to revalidation and cache tags<br>
✅ Setup for all basic WordPress options: Posts, Pages, Authors, Categories, Tags<br>
✅ Easy integration with custom post types and ACF<br>
✅ Dynamic routes for Posts and Pages<br>
✅ Design system for layout and prose styling ([craft-ds.com](https://craft-ds.com))<br>
✅ Filter, Search, and Card components<br>
✅ Dynamically rendered sitemap<br>
✅ Dynamically generated metadata<br>
✅ Dynamically generated OG/Twitter Cards for Posts and pages<br>
✅ Responsive Nav and Footer components<br>
✅ Site configuration file<br>
✅ Menu configuration file<br>
✅ Lite and dark mode support<br>
✅ shadcn/ui components and theming<br>
✅ Vercel analytics<br>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Wordpress | `wordpress` | Web service |
| next-wp | [chinpeerapat/next-wp](https://github.com/chinpeerapat/next-wp) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | Wordpress | 80 |
| `WORDPRESS_DB_USER` | Wordpress | (secret) |
| `WORDPRESS_AUTH_KEY` | Wordpress | (secret) |
| `WORDPRESS_DB_PASSWORD` | Wordpress | (secret) |
| `WORDPRESS_WEBHOOK_SECRET` | Wordpress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | Wordpress | (secret) |
| `SITE_NAME` | next-wp | next-wp |
| `SITE_DESCRIPTION` | next-wp | Starter template for Headless WordPress with Next.js |
| `WORDPRESS_WEBHOOK_SECRET` | next-wp | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`
- **Start command:** `> bash -c "       if [ ! -d /var/www/html/wp-content/plugins/wp-graphql ]; then         curl -L https://github.com/wp-graphql/wp-graphql/releases/latest/download/wp-graphql.zip -o /tmp/wp-graphql.zip &&         unzip /tmp/wp-graphql.zip -d /var/www/html/wp-content/plugins &&         wp plugin activate wp-graphql --allow-root;       fi;       apache2-foreground;       "`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** Blogs · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/QA-TYt)
