# Deploy Slack Activity Alerts on Railway

Send regular alerts about how many Slack messages you've sent per day/week

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/E2MZIp)

## About

Track messages sent by a user in a Slack workspace and send a notification to a webhook!
![image](https://hc-cdn.hel1.your-objectstorage.com/s/v3/67581c57793c4b03d732bc0150a1b3d62c0a7d63_image.png)
## How to set this up
To get the `SLACK_XOXD`, open DevTools, then go to the Application tab on Chrome (or the Storage tab on Firefox), and copy the value of the `d` cookie. **Ensure it's not URL encoded.**

To get the `SLACK_XOXC`, open the Slack website in your browser, then open DevTools. Go to the Console tab, and paste the following code in:

```js
(() => {
    const localConfig = JSON.parse(localStorage.getItem("localConfig_v2"))
    for (const teamId of Object.keys(localConfig.teams)) {
        const team = localConfig.teams[teamId]
        console.warn(`[XOXC Grabber] ${team.name}'s XOXC token is ${team.token}`)
    }
})()
```

Slack Activity Alerts is fully open source - check out the code [here.](https://github.com/SkyfallWasTaken/slack-activity-alerts/blob/main/index.ts)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| slack-activity-alerts | [SkyfallWasTaken/slack-activity-alerts](https://github.com/SkyfallWasTaken/slack-activity-alerts) | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CRON` | slack-activity-alerts | 59 23 * * * | Cron schedule for when to run the bot. Defaults to running at 11:59pm every day. |
| `TIMEZONE` | slack-activity-alerts | - | e.g. Europe/London |
| `REDIS_URL` | slack-activity-alerts | - | Redis URL for persistence. |
| `SLACK_XOXC` | slack-activity-alerts | - | Get this from DevTools |
| `SLACK_XOXD` | slack-activity-alerts | - | Get this from cookies |
| `MONITORING_URL` | slack-activity-alerts | - | URL to ping every minute for uptime monitoring |
| `SLACK_OWNER_ID` | slack-activity-alerts | - | What's your user ID? |
| `SLACK_WORKSPACE` | slack-activity-alerts | - | Your Slack workspace (e.g. "monzo" or "hackclub") |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Analytics · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/E2MZIp)
