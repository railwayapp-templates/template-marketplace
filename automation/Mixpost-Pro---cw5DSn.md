# Deploy Mixpost Pro on Railway

Self-hosted social media management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cw5DSn)

## About

<p align="center">
    <a href="https://mixpost.app/">
                <img alt="Mixpost Logo" src="https://raw.githubusercontent.com/inovector/MixpostApp/main/art/logo.svg" style="height: 150px;">
    </a>
</p>

<p align="center">Easily create, schedule, publish, and manage social media content in one place, with no limits or monthly subscription fees</p>

**Notes:**

- Communication to **MariaDB** is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (3306) the TCP proxy can be again removed at any point to close off external access.

- Communication to **KeyDB** is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (6379) the TCP proxy can be again removed at any point to close off external access.

## Overview

Mixpost is a robust and versatile social media management platform, designed to streamline social media operations and enhance content marketing strategies. Our platform empowers brands and businesses to effectively manage their online presence, leading them to success in the dynamic digital landscape. Mixpost's mission is to offer a comprehensive and powerful solution, enabling users to elevate their social media management and achieve tangible results.

The platform allows users to craft, organize, and schedule their content for times when their audience is most engaged and active. Mixpost's user-friendly scheduling system ensures that content publishing is seamless and efficient. It also facilitates team collaboration by allowing users to assign tasks, manage permissions, and monitor team performance, optimizing team interactions and workflow. Additionally, Mixpost automates post scheduling to ensure maximum audience reach and engagement, significantly boosting interaction and customer engagement.

Trusted by a wide range of users, Mixpost stands out as a proficient and influential tool for social media management and content marketing. It is perfectly suited for enterprises, small to medium businesses, marketing agencies, solopreneurs, and e-commerce stores.

<img src="https://raw.githubusercontent.com/inovector/mixpost/main/art/cover.png" style="border-radius: 5px;">

## Supported social platforms

- **Facebook**
- **Instagram**
- **Mastodon**
- **LinkedIn**
- **Pinterest**
- **YouTube**
- **TikTok**
- **X (Previously Twitter)**

## Features

**Mixpost** offers a multitude of features, making **social media management** more effective and simpler:

**Streamlined Social Account Management:**
Bring all your social media accounts together in one place for smarter and more efficient management.

**Advanced Analytics:**
Gain insights into your audience's behavior and preferences. Mixpost provides detailed analytics, allowing you to choose from preset reports or create custom ones based on the data that matters most to you.

**Post Versions and Conditions:**
Tailor your content for each social network and automate follow-up comments on high-performing posts, enhancing engagement and reach.

**Efficient Media Library:**
Quickly access and reuse media files like images, GIFs, and videos, and integrate with stock image sources for a diverse range of content.

**Team Collaboration and Workspaces:**
Foster team collaboration with dedicated workspaces. Discuss ideas, manage tasks, and monitor performance, all from a centralized platform.

**Queue and Calendar Management:**
Build a natural content posting schedule and visualize your strategy with an easy-to-use calendar.

**Customizable Post Templates:**
Boost efficiency with reusable post templates, perfect for maintaining consistency across your social media channels.

**Dynamic Variables and Hashtag Groups:**
Insert dynamic text and organize your hashtags strategically for increased post effectiveness.
And many more features that make Mixpost a standout choice for managing social media and content marketing. Discover all the features in detail at Mixpost Features.

It is the ideal social media management software for bloggers, artisans, entrepreneurs, and marketing teams looking to optimize internal costs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KeyDB | `eqalpha/keydb:latest` | Database |
| MySQL | `mysql:9.4` | Database |
| Mixpost | `inovector/mixpost-pro-team:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYDB_URL` | KeyDB | - | URL to connect to KeyDB over the private network |
| `KEYDB_HOST` | KeyDB | - | Railway private domain name |
| `KEYDB_PORT` | KeyDB | 6379 | Port to connect to KeyDB over the private network |
| `KEYDB_USER` | KeyDB | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | KeyDB | (secret) | Password to connect to KeyDB |
| `KEYDB_PUBLIC_URL` | KeyDB | - | URL to connect to KeyDB Publically |
| `KEYDB_PUBLIC_HOST` | KeyDB | - | Railway public TCP domain name |
| `KEYDB_PUBLIC_PORT` | KeyDB | - | Port to connect to KeyDB Publically |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Mixpost | 80 | Port that Mixpost listens on |
| `APP_KEY` | Mixpost | - | Secret app key |
| `APP_URL` | Mixpost | - | Public app URL |
| `DB_HOST` | Mixpost | - | Private database host |
| `DB_PORT` | Mixpost | 3306 | Private database port |
| `APP_NAME` | Mixpost | Mixpost | App name |
| `REDIS_HOST` | Mixpost | - | Private KeyDB host |
| `REDIS_PORT` | Mixpost | - | Private KeyDB port |
| `DB_DATABASE` | Mixpost | - | Database name |
| `DB_PASSWORD` | Mixpost | (secret) | Database password |
| `DB_USERNAME` | Mixpost | (secret) | Database username |
| `LICENSE_KEY` | Mixpost | - | Mixpost license key |
| `REDIS_PASSWORD` | Mixpost | (secret) | KeyDB password |

## Configuration

- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "exec /bin/bash /usr/local/bin/start.sh 2>&1"`
- **Healthcheck:** `manifest.json`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`

**Category:** Automation

[View on Railway →](https://railway.com/template/cw5DSn)
