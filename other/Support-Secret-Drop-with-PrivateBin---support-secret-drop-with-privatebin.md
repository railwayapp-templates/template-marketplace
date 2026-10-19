# Deploy Support Secret Drop with PrivateBin on Railway

Browser-encrypted support pastes with one-hour default expiry.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/support-secret-drop-with-privatebin)

## About

Browser-encrypted support pastes with one-hour default expiry.

Support engineers exchanging short snippets with an external customer.

Paste a small diagnostic snippet, optionally add a paste password, review the expiry and burn-after-reading choices, and send the full generated link through an approved channel. The URL fragment contains the decryption key.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /srv/data | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `privatebin/nginx-fpm-alpine@sha256:4d4e8d8c05e7556a5fbf481375fc2f8311402d780ac0b074314b197544288156` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 8080 |
| `PRIVATEBIN_CONFIG` | ;<?php http_response_code(403); /*
[main]
name = "Support Secret Drop"
discussion = false
fileupload = false
password = true
burnafterreadingselected = true
sizelimit = 1000000
[expire]
default = "1hour"
[traffic]
limit = 10
[model]
class = Filesystem
[model_options]
dir = "/srv/data"
 |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; chown 65534:82 /srv/data; printf "%s" "$PRIVATEBIN_CONFIG" > /srv/cfg/conf.php; chmod 644 /srv/cfg/conf.php; exec su -s /bin/sh nobody -c '"'"'exec /etc/init.d/rc.local'"'"''`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/support-secret-drop-with-privatebin)
