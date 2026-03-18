# Deploy Storage Api on Railway

A simple file server using Express and Multer. Also includes an API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/iiWiUr)

## About

# StorageApi

This template wraps a NodeJs application that uses Express and Multer to expose an API for managing storage and backups, as well as a static file server. It's based on Docker Volumes, thats it's included in the template. 

## Features

 - List storage in tree structure, upload, rename, download and delete
 - PostgreSQL Backups (scheduled via cron or just once) and Restore triggered only by API request
 - Auth - Every request its authenticated by Auth middleware that check if request includes a token field that is the same token generated on deploy of this template.

## FrontEnd
When deploying this template it will auto generate a token thats could be used on [Storagex](https://storagex.vercel.app). This is a interface that could manage files, folder and backups (restore will be release soon). To acess your storage by interface you need expose your app on public network and that token, after that not even sky is limit

####  Alerts 

 - Because this template uses Docker Volumes, assume that default configuration it is important and that any 		  changes to the path can make the files accessible only in the running deployment.
 - Always start with the basics concepts of IIWDTI (IF IT'S WORKING, DON'T TOUCH IT)

##### Issues

Any error/bug, dont be silly and open an issue on https://github.com/nsx07/storage/issues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | [nsx07/storage](https://github.com/nsx07/storage) (root: /) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | storage | production | - |
| `TIME_ZONE` | storage | UTC | Timezone Configuration (for scheduled backups, UTC default) |
| `STORAGE_TOKEN` | storage | (secret) | A token used to access Storagex FrontEnd |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/wwwroot`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Storage · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/iiWiUr)
