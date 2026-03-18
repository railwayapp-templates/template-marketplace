# Deploy Geo IP api on Railway

Geolocate IP/IP location api in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/LiUOsa)

## About

repo: https://github.com/TZGyn/geoip

Get your maxmind account id and license key here 
https://www.maxmind.com/en/accounts/current/license-key

Generate a domain and locate the geolocation of an ip using
https://{your_domain}/{ip}

or https://{your_domain}/me to get your public ip location

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| geoip | [TZGyn/geoip](https://github.com/TZGyn/geoip) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `ACCOUNT_ID` | maxmind account id |
| `LICENSE_KEY` | license key for geoip |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/LiUOsa)
