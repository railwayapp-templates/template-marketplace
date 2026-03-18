# Deploy Cron Job on Railway

Run cron jobs on Railway using Node.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/I6jLyB)

## About

A simple template for deploying and running a cron job on Railway using JavaScript.

Simply select this template and add in your env variables like the corn timer, base URL, different endpoints & query params to hit at random every time.

For more details refer - https://github.com/rajdeep-ghosh/cronjob

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cronjob | [rajdeep-ghosh/cronjob](https://github.com/rajdeep-ghosh/cronjob) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `BASE_URL` | eg https://example.com. don't put / at the end of the url |
| `ENDPOINTS` | list of different endpoints used randomly. eg ['home', 'about'], this signifies /home or /about |
| `CRON_TIMER` | any valid cron expression. eg */15 * * * * |
| `QUERY_PARAMS` | list of different of query params. eg [{ 'key': 'pageno', 'range': 10 }], this signifies any random value of range (1-10) in the query like /?pageno=4 |

**Category:** Automation · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/I6jLyB)
