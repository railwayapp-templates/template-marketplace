# Deploy redlib on Railway

Private front-end for Reddit

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redlib-1)

## About

An alternative private front-end to Reddit, with its origins in Libreddit.

You **must** wait a few minutes before Redlib starts working, for it to acquire OAuth tokens.

See additional configuration options here: https://github.com/redlib-org/redlib/tree/main

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redlib | `quay.io/redlib/redlib` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDLIB_BANNER` | - | Allows the server to set a banner to be displayed. Currently this is displayed on the instance info page. |
| `REDLIB_FULL_URL` | - | Allows for proper URLs (for now, only needed by RSS) |
| `REDLIB_SFW_ONLY` | on | Enables SFW-only mode for the instance, i.e. all NSFW content is filtered. |
| `REDLIB_ENABLE_RSS` | off | Enables RSS feed generation. |
| `REDLIB_PUSHSHIFT_FRONTEND` | undelete.pullpush.io | Allows the server to set the Pushshift frontend to be used with "removed" links. |
| `REDLIB_ROBOTS_DISABLE_INDEXING` | on | Disables indexing of the instance by search engines. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/redlib-1)
