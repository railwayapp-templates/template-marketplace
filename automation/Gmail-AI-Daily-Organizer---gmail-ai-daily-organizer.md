# Deploy Gmail AI Daily Organizer on Railway

Multi-account Gmail rules, optional GLM AI triage and LINE summaries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gmail-ai-daily-organizer)

## About

Gmail AI Daily Organizer is an open-source scheduled inbox organizer for one or more Gmail accounts. It applies explicit Gmail search rules, safely archives selected categories, sends per-account summaries, and can optionally use GLM for conservative classification and LINE Messaging API for daily notifications.

Railway builds the included Dockerfile and runs the service once per cron invocation. The included railway.json schedules execution at 13:30 UTC, which is 21:30 in Taiwan, and disables automatic restarts after a successful run. Start with DRY_RUN=true, inspect the logs, and only enable Gmail writes after confirming the rules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gmail-railway-cron | [zoetw88/gmail-railway-cron](https://github.com/zoetw88/gmail-railway-cron) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DRY_RUN` | true |
| `LOOKBACK` | 1d |
| `GLM_MODEL` | glm-4.7-flashx |
| `AI_ENABLED` | false |
| `RULES_PATH` | rules.json |
| `GLM_BASE_URL` | https://api.z.ai/api/paas/v4 |
| `LINE_ENABLED` | false |
| `AI_APPLY_LABELS` | false |
| `AI_MAX_MESSAGES` | 20 |
| `AI_CONFIDENCE_THRESHOLD` | 0.90 |

**Category:** Automation · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/gmail-ai-daily-organizer)
