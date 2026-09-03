# Deploy ONLYOFFICE Docs on Railway

MS Office Alternative. Edit Word, Excel and PowerPoint files in the browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onlyoffice-docs)

## About

ONLYOFFICE Docs is an open-source online office suite that opens Word, Excel and PowerPoint files in the browser, with real-time co-editing, comments, track changes and near-perfect Office Open XML fidelity. It is a document editing *server*, not an app with its own login: a host application — Nextcloud, Seafile, ownCloud, or your own product on the Document Server API — stores the files and hands them to ONLYOFFICE Docs to edit.

Deploy ONLYOFFICE Docs on Railway and the Community Edition comes up as a single service with everything wired: an HTTPS domain, the document cache and signing keys on a persistent volume, JWT request signing on with a generated secret, and a health check on `/healthcheck`. To self-host ONLYOFFICE Docs otherwise you would run `onlyoffice/documentserver` and manage its two state directories, nginx worker sizing and proxy headers yourself. The source repository, [gridalpha/onlyoffice-docs-railway](https://github.com/gridalpha/onlyoffice-docs-railway), does those on every boot.

![Diagram of the ONLYOFFICE Docs service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788354324/onlyoffice-docs-architecture.png)

ONLYOFFICE Docs solves a specific problem: users want to edit Office documents without downloading them, and you do not want those files on someone else's servers. It renders DOCX, XLSX and PPTX in a canvas editor that keeps formatting intact.

- Document, spreadsheet, presentation and PDF form editors, Office Open XML native
- Real-time co-editing in fast (live keystrokes) or strict (paragraph lock) mode
- Comments, mentions, track changes and review modes
- A conversion service: DOCX to PDF, ODT to DOCX, XLSX to CSV and more
- Plugins and macros, including translation and mail merge

The Railway architecture is deliberately small. **onlyoffice-docs** is the only service, and the only one needed: the Community build compiles in-memory connectors, so there is no PostgreSQL, RabbitMQ or Redis alongside it. Inside the container nginx fronts the document service, the converter and the editor bundle, and the volume at `/mnt/onlyoffice` holds the cache plus the signing keystore.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| onlyoffice-docs | [gridalpha/onlyoffice-docs-railway](https://github.com/gridalpha/onlyoffice-docs-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port Railway probes and routes |
| `JWT_HEADER` | Authorization | Header carrying the token |
| `JWT_SECRET` | (secret) | Signs host application requests |
| `JWT_ENABLED` | true | Reject unsigned requests |
| `JWT_IN_BODY` | false | Token in request body instead |
| `WOPI_ENABLED` | false | WOPI discovery for WOPI hosts |
| `GENERATE_FONTS` | true | Rebuild font list at boot |
| `EXAMPLE_ENABLED` | false | Bundled test manager, unauthenticated |
| `METRICS_ENABLED` | false | StatsD metrics output |
| `PLUGINS_ENABLED` | true | Editor plugins and macros |
| `NGINX_ACCESS_LOG` | false | Keep access log off the log stream |
| `SECURE_LINK_SECRET` | (secret) | Signs cached-file download URLs |
| `ALLOW_META_IP_ADDRESS` | false | Block cloud metadata endpoints |
| `NGINX_WORKER_PROCESSES` | 2 | nginx worker processes |
| `ALLOW_PRIVATE_IP_ADDRESS` | true | Fetch documents over private network |
| `NGINX_WORKER_CONNECTIONS` | 4096 | Connections per nginx worker |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/onlyoffice`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/onlyoffice-docs)
