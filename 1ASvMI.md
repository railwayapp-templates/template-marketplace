# Deploy Wiki.js on Railway

Powerful and Extensible Open Source Wiki Software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1ASvMI)

## About

![](https://link.storjshare.io/s/juzhdfwx2fwotsguxtqeydvgqyta/readme-photos/wikijs/wikijs-logo.svg?view=1)

## Overview

_The most powerful and extensible open source Wiki software. Make documentation a joy to write using Wiki.js's beautiful and intuitive interface!_

![Wiki.js Sample Page](https://link.storjshare.io/jxzdzihyeem5c5bm3wh5sge46lwq/readme-photos%2Fwikijs%2Fwikijs_samplepage.png?view=1)

## Highlights

- **Beginner and Advanced Users Welcome:** Use your choice of editor including AsciiDoc, HTML, Markdown and a Visual Editor based on [CKEditor](https://ckeditor.com/)
- **Administration:** Manage all aspects of your wiki using the extensive and intuitive admin area.
- **Version Tracking:** All content modifications are tracked. You can revert to a previous state or recover a deleted page at any time.&nbsp;
- **Asset Manager:** Upload and manage your media assets from the Assets Manager. Easily categorize your assets in folders and see where they are used.

## Learn More

- [Wiki.js website](https://js.wiki/)
- [Wiki.js docs](https://docs.requarks.io/)
- [LICENSE](https://github.com/requarks/wiki/blob/main/LICENSE)

---

<a href="https://www.buymeacoffee.com/bamtech"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;"></a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| wiki | `requarks/wiki:2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | wiki | 3000 | Port that the app uses internally |
| `DB_TYPE` | wiki | postgres | Database Type |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/template/1ASvMI)
