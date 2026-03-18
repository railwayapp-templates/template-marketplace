# Deploy dokuwiki on Railway

Deploy and Host dokuwiki with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dokuwiki)

## About

**What is Dokuwiki?**
Dokuwiki is a PHP-based, file-only wiki engine prized for its simplicity and clean, readable syntax. It stores all pages as plain text files—no database required—making backups and maintenance trivial. With built-in ACLs and a vibrant plugin ecosystem, it’s ideal for both personal note-taking and enterprise knowledge bases.

1. Configure relevant environment variables, e.g. `DOKUWIKI_URL`, `DOKUWIKI_TITLE`, and optional `AUTH_METHOD` for LDAP or OAuth integration, and mount a persistent volume at `/dokuwiki/data` to retain page files and uploaded media.
2. Once the service is live, navigate to `https://.railway.app/install.php` to complete the web-based setup wizard. Here you’ll define your admin account, configure ACLs, and finalize your wiki’s basic settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dokuwiki | `dokuwiki/dokuwiki:stable` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/dokuwiki)
