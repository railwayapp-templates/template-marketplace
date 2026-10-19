# Deploy Agency Bookmark Library with Linkding on Railway

Tag client references and research links in a private bookmark library.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agency-bookmark-library-with-linkding)

## About

Tag client references and research links in a private bookmark library.

Design studios and agencies collecting references for multiple clients.

Sign in as operator with LD_SUPERUSER_PASSWORD from Railway variables. Create tags for clients, projects and content types, import an HTML bookmark file, then connect the browser extension to your HTTPS domain.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /etc/linkding/data | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `sissbruecker/linkding@sha256:e35cb50e0581178f245125ffaa909c565416c94c9f22ace305a7d234a4345522` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 9090 |
| `LD_SUPERUSER_NAME` | operator |
| `LD_SUPERUSER_PASSWORD` | (secret) |
| `LD_DISABLE_BACKGROUND_TASKS` | True |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/linkding/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/agency-bookmark-library-with-linkding)
