# Deploy Cron Rust on Railway

Cron Rust Runner — ultra-light HTTP schedule second precision - light cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cron-rust)

## About

# Cron Runner (Rust)

Lightweight HTTP scheduler built in Rust with **per-second cron precision**.  
Runs as a persistent process—no external cron needed.  
Each request includes an `X-Cron-Secret` header, with optional custom headers and body support.

## Why use it

* Schedule HTTP jobs with second-level precision.  
* Replace heavy schedulers with a single tiny binary.  
* Centralize recurring API calls

## How to Deploy

1. Click **Deploy on Railway**.  
2. Set environment variables:
   * `SECRET`: shared secret sent as `X-Cron-Secret`.
   * `CRON_JOBS`: your job list (see below).  
3. Deploy as a **persistent service** (not a Railway cron).

## Environment Variables

**`SECRET`** – required  
Shared secret included as `X-Cron-Secret`.

**`CRON_JOBS`** – required  
Jobs separated by `;` or new lines.  
Format: `METHOD|URL|CRON_EXPR|HEADERS|BODY`

* `METHOD`: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
* `URL`: full HTTP(S) endpoint  
* `CRON_EXPR`: **6-field cron** (supports seconds)  
* `HEADERS`: comma-separated `Name:Value` pairs, separated by commas *(optional)*  
* `BODY`: raw string *(optional)*  

**Example**
```
GET|https://httpbingo.org/status/204|0 * * * * *||
POST|https://httpbin.org/post|*/30 * * * * *|Content-Type:application/json,Authorization:Bearer XYZ|{"ping":true}
```

## Logs

Each run outputs one line:
```
YYYY-MM-DDTHH:MM:SSZ | OK | METHOD URL | STATUS
YYYY-MM-DDTHH:MM:SSZ | FAIL | METHOD URL | transport error: ...
```

## Tech Stack

Rust + `ureq` (sync, minimal)  
`cron` crate for per-second scheduling

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cron Rust | [XavTo/cron-rust](https://github.com/XavTo/cron-rust) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET` | (secret) | Private API secret used for authentication. Sent as the X-Cron-Secret header with every request. Must match the expected value on your server. |
| `CRON_JOBS` | - | List of scheduled HTTP jobs. Format: METHOD|URL|CRON_EXPR|HEADERS|BODY; ex : GET|https://httpbingo.org/status/204|0 * * * * *||;POST|https://httpbin.org/post|*/30 * * * * *|Content-Type:application/json|{"ping":true}; |

**Category:** Automation · **Languages:** Rust

[View on Railway →](https://railway.com/deploy/cron-rust)
