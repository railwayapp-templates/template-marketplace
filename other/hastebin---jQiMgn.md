# Deploy hastebin on Railway

Open Source Pastebin Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jQiMgn)

## About

# Haste

Haste is an open-source pastebin software written in node.js, which is easily
installable in any network.  It can be backed by either redis or filesystem,
and has a very easy adapter interface for other stores.  A publicly available
version can be found at [hastebin.com](http://hastebin.com)

Major design objectives:

* Be really pretty
* Be really simple
* Be easy to set up and use

## Deployment Details

This Railway template uses file storage. File storage currently does not support paste expiration, you can follow [#191](https://github.com/seejohnrun/haste-server/issues/191) for status updates.

To use an alternative storage option, please refer to the [README](https://github.com/toptal/haste-server/tree/master?tab=readme-ov-file#configuration)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| haste-server | [toptal/haste-server](https://github.com/toptal/haste-server) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `STORAGE_TYPE` | file |
| `STORAGE_FILEPATH` | /data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, CSS, HTML, Dockerfile, Shell, Procfile

[View on Railway →](https://railway.com/template/jQiMgn)
