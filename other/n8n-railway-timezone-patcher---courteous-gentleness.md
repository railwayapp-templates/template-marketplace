# Deploy n8n-railway-timezone-patcher on Railway

n8n Railway Timezone Patcher

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/courteous-gentleness)

## About

Easily fix timezone mismatches in your self-hosted n8n instance. This Railway-ready patcher updates all workflows to use your preferred timezone instead of the default `America/New_York`.

By default, n8n creates new workflows using the `America/New_York` timezone, which often causes confusion or scheduling issues in other regions. This patcher uses the n8n REST API to find and fix incorrect or missing timezone settings in all workflows. It runs in a lightweight Docker container, and can be automatically triggered on a CRON schedule (e.g. every 10 minutes). Best of all — it runs entirely within Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-railway-timezone-patcher | [maTheTrainee/n8n-railway-timezone-patcher](https://github.com/maTheTrainee/n8n-railway-timezone-patcher) (branch: edit) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TIMEZONE` | Europe/Stockholm	 | Your preferred IANA-compliant timezone (e.g. Europe/London, Asia/Tokyo). |
| `N8N_API_KEY` | (secret) | Personal API key from n8n. Required to access the workflow API. |
| `N8N_API_URL	` | https://your-n8n-instance.com	 | Full URL to your self-hosted n8n instance (including protocol). |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/courteous-gentleness)
