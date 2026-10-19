# Deploy Operations PDF Station with Stirling on Railway

An authenticated PDF processing station with persistent app state.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/operations-pdf-station-with-stirling)

## About

An authenticated PDF processing station with persistent app state.

Operations teams processing routine document bundles on their own server.

Allocate at least 4 GB RAM before deploying. Sign in as operator with SECURITY_INITIALLOGIN_PASSWORD from Railway variables, process a sample PDF, then download and inspect the result. Enable your own integrations separately.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /data | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `stirlingtools/stirling-pdf@sha256:10164ffe04961b02ebc9fa4da12064eeacb8d3bc3e09ceb059f78ce7aaa83207` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 8080 |
| `SERVER_PORT` | 8080 |
| `SECURITY_ENABLELOGIN` | (secret) |
| `SYSTEM_DEFAULTLOCALE` | en-US |
| `SYSTEM_ENABLEANALYTICS` | false |
| `SYSTEM_FILEUPLOADLIMIT` | 50MB |
| `SYSTEM_GOOGLEVISIBILITY` | false |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; for d in configs storage; do mkdir -p "/data/$d"; if [ ! -L "/$d" ]; then if [ -d "/$d" ]; then cp -an "/$d/." "/data/$d/"; mv "/$d" "/$d.image"; fi; ln -s "/data/$d" "/$d"; fi; done; exec tini -- /scripts/init.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/operations-pdf-station-with-stirling)
