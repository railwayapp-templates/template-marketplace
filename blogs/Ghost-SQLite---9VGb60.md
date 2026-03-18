# Deploy Ghost + SQLite on Railway

Self-hosted Ghost with SQLite and persistent volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9VGb60)

## About

###Overview
[Ghost](https://ghost.org/) is a full-featured blogging platform and an open-source alternative to Medium, Substack, WordPress etc. It offers a comprehensive set of features to publish content, send newsletters, and offer paid subscriptions to members. It also offers detailed engagement analytics for your audience and content.

###Template
This template deploys the community-maintained [Docker](https://hub.docker.com/_/ghost) image, along with an attached volume and a local SQLite database, so that configuration and content can persist across deployments.

Note: Once deployed, launch https://[RAILWAY_URL]/ghost to access the admin page and set up Ghost for the first time.

###Mail Configuration
If you want to send transactional emails, please configure the following optional variables with valid details:
* `mail__from`: 
* `mail__transport`: SMTP
* `mail__options__host`: 
* `mail__options__port`:
* `mail__options__auth__user`:
* `mail__options__auth__pass`: 

For bulk email newsletter delivery, you'll also need to configure the Mailgun service from Ghost Settings.

Note: This template should ideally be used for non-critical or lightweight blogs. For a production-ready Ghost deployment with MySQL, see [this template](https://railway.app/template/tcsVLc?referralCode=alphasec) instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ghost | `ghost:alpine` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 2368 |
| `database__debug` | false |
| `mail__transport` | SMTP |
| `database__client` | sqlite3 |
| `mail__options__auth__user` | (secret) |
| `database__useNullAsDefault` | true |
| `database__connection__filename` | /var/lib/ghost/content/data/ghost.db |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/9VGb60)
