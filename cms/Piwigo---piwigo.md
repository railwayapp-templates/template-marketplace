# Deploy Piwigo on Railway

Photo gallery for publishing and organising picture collections

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/piwigo)

## About

Piwigo is an open-source photo gallery for the web, in development since 2002 and used by museums, universities, photographers and families to publish picture collections. It handles what a folder of JPEGs cannot: albums and sub-albums, tags, EXIF and IPTC metadata, search, per-album permissions, user accounts, generated display sizes, and a batch manager for thousands of photos at once. Self-host Piwigo and the originals stay on storage you control, with no per-seat pricing and no quota.

This template runs Piwigo as two Railway services. `piwigo` serves the gallery and the admin over nginx and PHP 8.4, with a volume at `/config` holding the photo library, plugins, themes and every generated thumbnail; `MySQL` is a Railway-managed database holding albums, tags, users and permissions. Visitors reach `piwigo` over its public domain, the database stays on the private network, and the gallery installs itself on first boot — the administrator account you name in the variables exists before the site answers its first request, so the installation wizard is never claimable from the internet.

![Diagram of the Piwigo and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789669128/piwigo-architecture.webp)

Piwigo is a publishing tool: you upload pictures, arrange them into albums, and decide who may see what. Teams self-host it when a collection outgrows shared drives, when clients need a branded gallery, or when the pictures cannot leave an organisation's control — it is GPL-licensed software you run yourself, so no vendor holds the archive.

Key features:

- Albums and unlimited sub-albums, plus tags, saved searches and a calendar view
- EXIF and IPTC extraction, with per-photo author, title, description and dates
- Derivative sizes (square, thumbnail, XS through XXL) generated on demand
- Users, groups and privacy levels applied per album or per photo
- Batch Manager for tagging, moving, resizing or deleting thousands of photos
- Over 300 plugins and themes installable from the admin, including LDAP, OAuth and video

The two services split cleanly: MySQL holds every row Piwigo queries, the volume holds the bytes. A web API serves the official mobile apps and desktop uploaders. Photos are delivered through Piwigo's own permission layer rather than straight off disk, so a private album is genuinely private.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| piwigo | [gridalpha/piwigo-railway](https://github.com/gridalpha/piwigo-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on image startup |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `TZ` | piwigo | Etc/UTC | Container timezone |
| `PGID` | piwigo | 911 | Runtime group id |
| `PORT` | piwigo | 80 | nginx listening port |
| `PUID` | piwigo | 911 | Runtime user id |
| `PIWIGO_DB_HOST` | piwigo | - | Private database host and port |
| `PIWIGO_DB_NAME` | piwigo | - | Database holding the gallery |
| `PIWIGO_DB_USER` | piwigo | (secret) | Database account |
| `PIWIGO_DB_PREFIX` | piwigo | piwigo_ | Table name prefix |
| `PIWIGO_ADMIN_USER` | piwigo | (secret) | Webmaster login created at first boot |
| `PIWIGO_ADMIN_EMAIL` | piwigo | admin@example.com | Webmaster email address |
| `PIWIGO_DB_PASSWORD` | piwigo | (secret) | Database password |
| `PIWIGO_GALLERY_TITLE` | piwigo | Piwigo on Railway | Gallery title on first boot |
| `PIWIGO_ADMIN_PASSWORD` | piwigo | (secret) | Webmaster password |
| `PIWIGO_DB_WAIT_SECONDS` | piwigo | 240 | Boot wait for the database |
| `PIWIGO_ALLOW_REGISTRATION` | piwigo | false | Public visitor registration |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** CMS · **Languages:** PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/piwigo)
