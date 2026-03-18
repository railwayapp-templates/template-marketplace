# Deploy Registry on Railway

Self Hosted Docker Registry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FCYzGQ)

## About

Hosting your own Docker Registry can be rewarding. With this template, you get to do just that, running your own private registry on Railway.

To use the registry once deployed, run the following commands

```sh
$ docker pull 
$ docker tag  /
$ docker push /
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Docker Registry | `registry` | Web service |
| Registry UI | `joxit/docker-registry-ui:main` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Docker Registry | 5000 | - |
| `REGISTRY_STORAGE_DELETE_ENABLED` | Docker Registry | true | - |
| `REGISTRY_HTTP_HEADERS_Access-Control-Allow-Headers` | Docker Registry | [Authorization,Accept,Cache-Control] | - |
| `REGISTRY_HTTP_HEADERS_Access-Control-Allow-Methods` | Docker Registry | [HEAD,GET,OPTIONS,DELETE] | - |
| `REGISTRY_HTTP_HEADERS_Access-Control-Allow-Credentials` | Docker Registry | (secret) | - |
| `PORT` | Registry UI | 80 | Port the UI listens on |
| `DELETE_IMAGES` | Registry UI | true | - |
| `REGISTRY_TITLE` | Registry UI | - | Name your Registry |
| `SINGLE_REGISTRY` | Registry UI | true | - |
| `REGISTRY_SECURED` | Registry UI | false | - |
| `TAGLIST_PAGE_SIZE` | Registry UI | 100 | - |
| `SHOW_CONTENT_DIGEST` | Registry UI | true | - |
| `CATALOG_MAX_BRANCHES` | Registry UI | 1 | - |
| `CATALOG_MIN_BRANCHES` | Registry UI | 1 | - |
| `SHOW_CATALOG_NB_TAGS` | Registry UI | true | - |
| `CATALOG_ELEMENTS_LIMIT` | Registry UI | 1000 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/registry`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/FCYzGQ)
