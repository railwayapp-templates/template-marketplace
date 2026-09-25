# Deploy cloudreve on Railway

Cloudreve 4.19: self-hosted cloud drive with sharing, WebDAV and previews.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudreve-3)

## About

Cloudreve is a self-hosted cloud drive. It gives users a web file manager with uploads, sharing links, WebDAV, previews for images, video, audio, documents and code, offline downloads through aria2, and storage policies that can keep files locally or in S3, OneDrive and other backends.

This template runs the official `cloudreve/cloudreve:4.19.1` image with a Railway Postgres database. On first boot a small script registers the admin account from `CLOUDREVE_ADMIN_EMAIL` and a generated `CLOUDREVE_ADMIN_PASSWORD`, then turns public sign-up off, so nobody else can claim the instance. Files use the local storage policy on a Railway volume at `/cloudreve/data`, which also holds the config. Thumbnails use the bundled ffmpeg, vips and LibreOffice. It fits the Hobby plan for light use; size the volume for your files. Cloudreve logs its database settings at start, including the password, so keep deploy logs private.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudreve | `cloudreve/cloudreve:4.19.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | cloudreve | UTC |
| `PORT` | cloudreve | 5212 |
| `CLOUDREVE_SEED` | cloudreve | # First boot only: register the admin from env vars, then close public sign-up.
import json, os, time, urllib.request

API = 'http://127.0.0.1:5212/api/v4'


def call(method, path, body=None, token=None):
    headers = {'content-type': 'application/json'}
    if token:
        headers['authorization'] = 'Bearer ' + token
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(API + path, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.load(r)


for _ in range(180):
    try:
        call('GET', '/site/ping')
        break
    except Exception:
        time.sleep(1)

email = os.environ['CLOUDREVE_ADMIN_EMAIL']
password = os.environ['CLOUDREVE_ADMIN_PASSWORD']
r = call('POST', '/user', {'email': email, 'password': password, 'language': 'en-US'})
if r.get('code') != 0:
    print('seed: admin not created (' + str(r.get('msg')) + '), nothing to do', flush=True)
else:
    login = call('POST', '/session/token', {'email': email, 'password': password})['data']
    if login['user']['group']['name'] != 'Admin':
        print('seed: ' + email + ' is not the first user, leaving settings alone', flush=True)
    else:
        settings = {'register_enabled': '0', 'siteURL': os.environ.get('CLOUDREVE_URL', '')}
        call('PATCH', '/admin/settings', {'settings': settings}, login['token']['access_token'])
        print('seed: admin ' + email + ' created, public sign-up closed', flush=True) |
| `CLOUDREVE_ADMIN_EMAIL` | cloudreve | admin@example.com |
| `CR_CONF_Database__Type` | cloudreve | postgres |
| `CR_CONF_Database__User` | cloudreve | (secret) |
| `CLOUDREVE_ADMIN_PASSWORD` | cloudreve | (secret) |
| `CR_CONF_Database__Password` | cloudreve | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CLOUDREVE_SEED" > /tmp/seed.py; supervisord -c /cloudreve/aria2.supervisor.conf; ./cloudreve & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; python3 /tmp/seed.py & wait $pid'`
- **Healthcheck:** `/api/v4/site/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cloudreve/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cloudreve-3)
