# Deploy DATAENG/DBTRANSFORM on Railway

Deploy and Host DBTRANSFORM with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dataengdbtransform)

## About

1. Click **Deploy** (or use the template URL below).
2. Set **Variables:** `DATABASE_URL`, `TRANSFORM_SQL` (both required). Optionally `DEBUG=true`.
3. In **Settings**, set **Cron Schedule** (e.g. `0 * * * *` for every hour or whatever value).
4. Deploy. The service runs your SQL on the schedule and exits each time.

N/A

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DBTRANSFORM | [LucasCordova/DBTRANSFORM](https://github.com/LucasCordova/DBTRANSFORM) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | false | Debug logging |
| `DATABASE_URL` | - | Database URL  |
| `TRANSFORM_SQL` | - | Your transform code. Recommend to use wrap your code in a START TRANSACTION; and COMMIT; |

**Category:** Automation · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/dataengdbtransform)
