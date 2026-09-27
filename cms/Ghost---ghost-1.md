# Deploy Ghost on Railway

Ghost 6 with MySQL, your owner account created at deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-1)

## About

[Ghost](https://github.com/TryGhost/Ghost) (MIT) is a publishing platform for blogs and newsletters, with memberships and paid subscriptions built in.

This template runs the official Ghost 6 image (6.65.0) with MySQL 8.4 and the content folder (images, themes) on a volume.

A new Ghost site lets whoever opens `/ghost` first create the owner account. On a public URL that can be anyone, so this template creates the owner for you: the deploy form asks for your email, a password is generated into `GHOST_ADMIN_PASSWORD`, and a start step calls Ghost's own setup API as soon as the site answers. Ghost accepts that call once, so nobody can set the site up after you. Open `GHOST_ADMIN_URL` and sign in.

Ghost 6 emails staff a code when they sign in from a new device. Without mail configured you'd be locked out of your own admin, so the template turns that check off (`security__staffDeviceVerification=false`). Set up mail (`mail__*` variables, see Ghost's docs) and turn it back on; mail is also what sends newsletters and member sign-in links.

Before publishing I tested it end to end. After the deploy, Ghost reported the site as set up and a second setup request was refused with "Setup has already been completed". The owner signed in, published a post through the Admin API, and the post was on the public site. After a restart the post was still there.

Two details from testing: Ghost logs "Unable to send welcome email" on first start because no mail is set up, which is harmless; and the service has no healthcheck path, because Railway checks over plain HTTP and Ghost answers that with a redirect to the https URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ghost | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /ghost) | Web service |
| MySQL | `mysql:8.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `url` | Ghost | - | Public URL of the site. Change it when you add a custom domain |
| `PORT` | Ghost | 2368 | Port Railway routes to |
| `NODE_ENV` | Ghost | production | Production mode |
| `server__host` | Ghost | :: | Listen on all interfaces |
| `server__port` | Ghost | 2368 | Ghost port |
| `GHOST_ADMIN_URL` | Ghost | - | Admin panel |
| `GHOST_SITE_TITLE` | Ghost | My Ghost site | Site title set at first start (change it later in Settings) |
| `database__client` | Ghost | mysql | MySQL |
| `GHOST_ADMIN_EMAIL` | Ghost | - | Email of the owner account, created on first start. Sign in at /ghost with it and GHOST_ADMIN_PASSWORD |
| `GHOST_ADMIN_PASSWORD` | Ghost | (secret) | Password of the owner account (generated) |
| `database__connection__host` | Ghost | - | MySQL over the private network |
| `database__connection__port` | Ghost | 3306 | MySQL port |
| `database__connection__user` | Ghost | (secret) | MySQL user |
| `database__connection__database` | Ghost | - | Database name |
| `database__connection__password` | Ghost | (secret) | MySQL password |
| `security__staffDeviceVerification` | Ghost | false | Ghost emails a code for new staff devices; without mail set up that locks you out. Turn it on after configuring mail |
| `MYSQL_DATABASE` | MySQL | ghost | Database for Ghost |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | MySQL root password (generated) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Tags:** ghost, blog, newsletter, cms, mysql, publishing · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ghost-1)
