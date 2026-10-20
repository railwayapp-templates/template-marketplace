# Deploy FreshRSS | (Just Updated) RSS Reader with API, Agent-Ready, Passwords Generated on Railway

Easy for LLM agents: RSS reader with API, passwords generated, persistent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freshrss-or-just-updated-rss-reader-with)

## About

FreshRSS is a self-hosted RSS and Atom feed aggregator with a web reader plus the Google Reader and Fever APIs. This template is easy for an LLM agent to use: it deploys with no manual step, the admin and API passwords are generated for you, the contract below is machine-readable, and one working `curl` sequence takes an agent from zero to a subscribed feed.

This template runs the official `freshrss/freshrss` image (Apache + PHP, SQLite storage), pinned by digest. On first boot it installs FreshRSS, enables the API, and creates the `admin` user from variables Railway generates at deploy time. Every later boot detects the existing install and changes nothing, except that it re-applies the two passwords from the variables, so rotating a variable and redeploying is enough to change a credential.

All state lives on one volume mounted at `/var/www/FreshRSS/data` (users, feeds, articles, SQLite databases, configuration, and third-party extensions, which are linked to `data/extensions`). Apache is bound to Railway's `$PORT`. A background job refreshes every feed twice an hour (minutes 7 and 37), so subscriptions stay current without anyone opening the page.

Agent contract:

- Base URL variable: `FRESHRSS_URL` (`https://`)
- Web login: user `admin`, password variable `FRESHRSS_ADMIN_PASSWORD`
- API user: `admin`, API password variable `FRESHRSS_API_PASSWORD` (separate from the web password, enabled at boot)
- Google Reader API: `$FRESHRSS_URL/api/greader.php` (ClientLogin, then `Authorization: GoogleLogin auth=`)
- Fever API: `$FRESHRSS_URL/api/fever.php` (api_key = md5 of `admin:` followed by the API password)
- Health path: `/i/` (open, returns 200)
- Secrets are generated per deploy and stable across redeploys; a wrong API password returns 401

One working sequence (login, subscribe to a feed, list subscriptions, count unread):

```bash
AUTH=$(curl -s --data-urlencode "Email=admin" --data-urlencode "Passwd=$FRESHRSS_API_PASSWORD" \
  "$FRESHRSS_URL/api/greader.php/accounts/ClientLogin" | sed -n 's/^Auth=//p')
TOK=$(curl -s -H "Authorization: GoogleLogin auth=$AUTH" "$FRESHRSS_URL/api/greader.php/reader/api/0/token")
curl -s -H "Authorization: GoogleLogin auth=$AUTH" -d "quickadd=https://hnrss.org/frontpage&amp;T=$TOK" \
  "$FRESHRSS_URL/api/greader.php/reader/api/0/subscription/quickadd"
curl -s -H "Authorization: GoogleLogin auth=$AUTH" \
  "$FRESHRSS_URL/api/greader.php/reader/api/0/subscription/list?output=json"
curl -s -H "Authorization: GoogleLogin auth=$AUTH" \
  "$FRESHRSS_URL/api/greader.php/reader/api/0/unread-count?output=json"
```

A fresh install starts with no subscriptions. The first boot logs `actualize-user.php failed!` once because there are zero feeds to refresh; that line is an upstream quirk, not an error.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freshrss | `freshrss/freshrss@sha256:48b63b9bc3d042a1301c32971b01af8841c7f059b452589c5bf77f475ba44c61` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FRESHRSS_API_PASSWORD` | (secret) |
| `FRESHRSS_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export TRUSTED_PROXY="10.0.0.0/8 100.64.0.0/10 172.16.0.0/12 192.168.0.0/16" LISTEN="$PORT" CRON_MIN="7,37"; export FRESHRSS_INSTALL="--api-enabled --base-url $FRESHRSS_URL --default-user admin --language en --title FreshRSS"; export FRESHRSS_USER="--user admin --password $FRESHRSS_ADMIN_PASSWORD --api-password $FRESHRSS_API_PASSWORD --language en --no-default-feeds"; cd /var/www/FreshRSS || exit 1; mkdir -p data/extensions; if [ ! -L extensions ]; then cp -an extensions/. data/extensions/; rm -rf extensions; ln -s data/extensions extensions; fi; chgrp -R www-data data; chmod -R g+rwX data; echo "[railway] freshrss uid=$(id -u) data_owner=$(stat -c %u:%g data) extensions=$(readlink extensions) listen=$LISTEN"; exec ./Docker/entrypoint.sh /bin/bash -o pipefail -c "runuser -u www-data -- php -f ./cli/update-user.php -- --user admin --password $FRESHRSS_ADMIN_PASSWORD --api-password $FRESHRSS_API_PASSWORD >/dev/null 2>&1 && echo credentials-synced || echo credential-sync-skipped; cron && . /etc/apache2/envvars && exec apache2 -D FOREGROUND"'`
- **Healthcheck:** `/i/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/FreshRSS/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/freshrss-or-just-updated-rss-reader-with)
