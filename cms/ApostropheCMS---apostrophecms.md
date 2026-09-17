# Deploy ApostropheCMS on Railway

Node.js CMS where editors change pages on the page itself

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apostrophecms)

## About

ApostropheCMS is an open-source content management framework on Node.js, Express and MongoDB, known for in-context editing: an editor opens the live page, clicks the area they want to change, and edits it where it appears rather than in a separate admin form. Developers get a module system where a page type, widget or content type is one directory, and every content type gets a REST API automatically — so one project can serve server-rendered pages and act as a headless backend.

This template lets you deploy ApostropheCMS on Railway without assembling the pieces yourself. The `apostrophe` service builds an ApostropheCMS 4 project from a GitHub repository — the official Essentials starter kit plus a production Dockerfile — and reaches a managed `MongoDB` over the private network for pages, media records and sessions. A volume at `/app/data` holds uploads and their resized variants, the administrator is created on first boot, and the asset bundle is compiled into the image. To self-host ApostropheCMS beyond the defaults, fork `github.com/gridalpha/apostrophe-railway` and build your site there.

![Diagram of the Apostrophe and MongoDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789536359/apostrophe-architecture.webp)

ApostropheCMS sits between a page builder marketers like and a framework developers can live in. Editors manipulate the real page; developers get plain JavaScript modules, Nunjucks or JSX templates, and a schema that generates the editing interface and the API from one field definition. Teams self-host it to own the content database, run the CMS beside their other infrastructure, or embed a CMS in a product they ship.

- In-context visual editing, with a draft and a published version of every document
- A page tree with nesting, reordering and per-document publish state
- A media library that resizes and crops images on upload
- Custom page types, piece types and widgets as project modules
- An automatic REST API over every content type
- Localization, and roles for admins, editors and contributors

`apostrophe` runs the Node application in cluster mode, serving the site and the admin interface on one public domain. `MongoDB` stores every document — pages, images, users and sessions — and is reachable only over the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| apostrophe | [gridalpha/apostrophe-railway](https://github.com/gridalpha/apostrophe-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the server |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user, read by the server on init |
| `PORT` | apostrophe | 3000 | HTTP port Railway probes |
| `APOS_DB_URI` | apostrophe | - | MongoDB connection for all content |
| `APOS_BASE_URL` | apostrophe | - | Public base URL for absolute links |
| `ADMIN_PASSWORD` | apostrophe | (secret) | First administrator's password |
| `ADMIN_USERNAME` | apostrophe | (secret) | First administrator's login name |
| `APOS_SESSION_SECRET` | apostrophe | (secret) | Signs session cookies |
| `APOS_CLUSTER_PROCESSES` | apostrophe | 2 | Node worker processes per container |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** CMS · **Languages:** JavaScript, Shell, SCSS, Dockerfile

[View on Railway →](https://railway.com/deploy/apostrophecms)
