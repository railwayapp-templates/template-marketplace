# Deploy TrendRadar Zero Config News Monitor on Railway

Scheduled hot news and RSS monitor with keyword alerts and private reports

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trendradar-zero-config-news-monitor)

## About

TrendRadar is an open source trend and news monitor. On a schedule it collects trending lists and RSS feeds, keeps the items that match your keyword groups (or lets an LLM pick them), writes an HTML report and a SQLite history, and pushes the matches to Telegram, Slack, Discord, ntfy, Bark, email, Feishu, DingTalk or WeCom. Optional AI analysis turns each run into a short briefing.

This template runs the official `wantcat/trendradar:6.10.0` image the way the upstream Docker setup intends: one long running container whose built in scheduler (supercronic) runs a crawl every 30 minutes, plus one right at boot. Everything it needs to start is handled for you. The image ships without its config files, so on first boot the template copies the upstream English defaults, pinned to the matching release, onto a `/data` volume, where your SQLite history and reports also live. The report viewer has no login of its own, so the TrendRadar service stays private and a small Caddy gateway with a generated password is the only public entry point. No API keys are needed: a fresh deploy produces its first report about a minute after it goes live.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TrendRadar | `wantcat/trendradar:6.10.0` | Database |
| TrendRadar Gateway | `caddy:2.11-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | TrendRadar | UTC | Container timezone (IANA name such as America/New_York). Controls when CRON_SCHEDULE fires. |
| `PORT` | TrendRadar | 8080 | Port of the report server (python -m http.server, dual stack on ::) that serves /data/output. Railway healthchecks this port and the gateway proxies to it. Keep equal to the port in the gateway UPSTREAM. |
| `AI_MODEL` | TrendRadar | - | Optional. LiteLLM model id, provider/model, for example openai/gpt-4o-mini or deepseek/deepseek-v4-flash (the seeded config default). |
| `BARK_URL` | TrendRadar | - | Optional. Bark push URL, https://api.day.app/<device_key>. |
| `EMAIL_TO` | TrendRadar | - | Optional. Recipient address(es), comma separated. |
| `RUN_MODE` | TrendRadar | cron | cron keeps the container running: one crawl at boot (IMMEDIATE_RUN), then supercronic runs a crawl on CRON_SCHEDULE. Do not set to once on this service: it would exit after one crawl. |
| `TIMEZONE` | TrendRadar | - | TrendRadar timezone for report dates, file names and schedule periods. Follows TZ by default. |
| `AI_API_KEY` | TrendRadar | (secret) | Optional. Key for the LLM used by AI analysis, translation and AI filtering (LiteLLM client). |
| `EMAIL_FROM` | TrendRadar | - | Optional. Sender address. Outbound SMTP only works on Railway Pro and above. |
| `NTFY_TOKEN` | TrendRadar | (secret) | Optional. ntfy access token for protected topics. |
| `NTFY_TOPIC` | TrendRadar | - | Optional. ntfy topic to push to (server defaults to https://ntfy.sh). |
| `AI_API_BASE` | TrendRadar | - | Optional. Custom OpenAI compatible endpoint; prefix AI_MODEL with openai/ when you use it. |
| `CONFIG_YAML` | TrendRadar | - | Optional. Full contents of config.yaml (platforms, RSS feeds, report mode). When set it overwrites /data/config/config.yaml on every boot. |
| `CRON_SCHEDULE` | TrendRadar | */30 * * * * | Five field crontab for crawls, evaluated in the TZ timezone by supercronic inside the container. Digits, *, /, comma, dash and spaces only (the upstream entrypoint rejects anything else). |
| `IMMEDIATE_RUN` | TrendRadar | true | Run one crawl on every boot before the schedule starts, so a report exists right after deploy. |
| `EMAIL_PASSWORD` | TrendRadar | (secret) | Optional. SMTP password or app password for EMAIL_FROM. |
| `WEBSERVER_PORT` | TrendRadar | 8081 | Port for upstream manage.py viewer, which the upstream entrypoint always starts but which binds 0.0.0.0 only (unreachable over the IPv6 private network). Kept off PORT so it cannot clash with the report server. Leave as is. |
| `EMAIL_SMTP_PORT` | TrendRadar | - | Optional. SMTP port; auto detected when empty. |
| `FREQUENCY_WORDS` | TrendRadar | - | Optional. Full contents of frequency_words.txt (your keyword groups). When set it overwrites /data/config/frequency_words.txt on every boot. Leave empty to keep the seeded English defaults or your edits on the volume. |
| `NTFY_SERVER_URL` | TrendRadar | - | Optional. Self hosted ntfy server URL. Empty uses https://ntfy.sh. |
| `WEWORK_MSG_TYPE` | TrendRadar | - | Optional. markdown (group bot, default) or text (personal WeChat via a WeCom app). |
| `DOCKER_CONTAINER` | TrendRadar | true | Tells TrendRadar it runs in a container, so it logs the report path instead of trying to open a browser. |
| `TELEGRAM_CHAT_ID` | TrendRadar | - | Optional. Telegram chat id that receives pushes. |
| `EMAIL_SMTP_SERVER` | TrendRadar | - | Optional. SMTP host; auto detected from EMAIL_FROM when empty. |
| `PLATFORMS_API_URL` | TrendRadar | - | Optional. Your own newsnow instance, for example https://newsnow.example.com/api/s. Empty uses the public default newsnow.busiyi.world. |
| `SLACK_WEBHOOK_URL` | TrendRadar | - | Optional. Slack incoming webhook URL. |
| `FEISHU_WEBHOOK_URL` | TrendRadar | - | Optional. Feishu / Lark bot webhook URL. |
| `TELEGRAM_BOT_TOKEN` | TrendRadar | (secret) | Optional. Telegram bot token. Set together with TELEGRAM_CHAT_ID. |
| `WEWORK_WEBHOOK_URL` | TrendRadar | - | Optional. WeCom (WeChat Work) bot webhook URL. |
| `AI_ANALYSIS_ENABLED` | TrendRadar | false | AI briefing in reports and pushes. Off by default because it needs AI_API_KEY; set true after adding a key. |
| `GENERIC_WEBHOOK_URL` | TrendRadar | - | Optional. Generic webhook (Discord, Matrix, IFTTT and others). |
| `DINGTALK_WEBHOOK_URL` | TrendRadar | - | Optional. DingTalk bot webhook URL. |
| `AI_TRANSLATION_ENABLED` | TrendRadar | false | AI translation of RSS and standalone titles (target language English in the seeded config). Needs AI_API_KEY. |
| `GENERIC_WEBHOOK_TEMPLATE` | TrendRadar | - | Optional. JSON body template with {title} and {content} placeholders, for example {"content": "{content}"} for Discord. |
| `PORT` | TrendRadar Gateway | 8080 | Port the Caddy gateway listens on. Railway healthchecks /gateway-health here and the public domain targets it. |
| `UPSTREAM` | TrendRadar Gateway | - | Private address of the TrendRadar report server (IPv6 private network, port included). |
| `REPORT_PASSWORD` | TrendRadar Gateway | (secret) | Password for the report login prompt. Generated on deploy; change it here at any time and the gateway redeploys. |
| `REPORT_USERNAME` | TrendRadar Gateway | (secret) | Username for the report login prompt (no spaces). |

## Configuration

- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgVHJlbmRSYWRhciBzZXJ2aWNlIHN0YXJ0IHNjcmlwdCAoaW1hZ2Ugd2FudGNhdC90cmVuZHJhZGFyOjYuMTAuMCwgcnVucyBhcyByb290KS4KIyBzZXJpYWxpemVkLWNvbmZpZy5qc29uIGVtYmVkcyB0aGlzIGZpbGUgdmVyYmF0aW0gYXMgYmFzZTY0OgojICAgc2ggLWMgJ2VjaG8gPGJhc2U2ND4gfCBiYXNlNjQgLWQgPiAvdG1wL3N0YXJ0LnNoICYmIGV4ZWMgc2ggL3RtcC9zdGFydC5zaCcKIyBSZWdlbmVyYXRlIHRoZSBzdGFydENvbW1hbmQgd2hlbmV2ZXIgdGhpcyBmaWxlIGNoYW5nZXMuCnNldCAtZQo6ICIke1BPUlQ6P1BPUlQgaXMgcmVxdWlyZWR9Igpta2RpciAtcCAvZGF0YS9jb25maWcvYWlfZmlsdGVyIC9kYXRhL2NvbmZpZy9jdXN0b20vYWkgL2RhdGEvY29uZmlnL2N1c3RvbS9rZXl3b3JkIC9kYXRhL291dHB1dAoKIyAxLiBUaGUgaW1hZ2Ugc2hpcHMgbm8gY29uZmlnLCBhbmQgaXRzIGVudHJ5cG9pbnQgZXhpdHMgMSB3aXRob3V0IGNvbmZpZy55YW1sICsgZnJlcXVlbmN5X3dvcmRzLnR4dC4KIyAgICBTZWVkIHRoZSBFbmdsaXNoIGRlZmF1bHRzIG9uY2UsIHBpbm5lZCB0byBhbiB1cHN0cmVhbSBjb21taXQgd2hvc2UgY29uZmlnIHNjaGVtYSAoMi40LjApCiMgICAgbWF0Y2hlcyBpbWFnZSA2LjEwLjAuIEV4aXN0aW5nIGZpbGVzIGFyZSBuZXZlciBvdmVyd3JpdHRlbiwgc28gZWRpdHMgb24gdGhlIHZvbHVtZSBzdXJ2aXZlLgpweXRob24gLSA8PCdQWScKaW1wb3J0IHBhdGhsaWIsIHRpbWUsIHVybGxpYi5yZXF1ZXN0ClJFRiA9ICI3OTJiY2MzOTI4YjE2MTdiYmEwOWRmMzQ5ODlmZDU2NzVjMTU5Yjg2IgpCQVNFID0gImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zYW5zYW4wL1RyZW5kUmFkYXIvIiArIFJFRiArICIvY29uZmlnLyIKRklMRVMgPSB7CiAgICAiY29uZmlnLnlhbWwiOiAiY29uZmlnLmVuLnlhbWwiLAogICAgImZyZXF1ZW5jeV93b3Jkcy50eHQiOiAiZnJlcXVlbmN5X3dvcmRzLmVuLnR4dCIsCiAgICAidGltZWxpbmUueWFtbCI6ICJ0aW1lbGluZS5lbi55YW1sIiwKICAgICJhaV9pbnRlcmVzdHMudHh0IjogImFpX2ludGVyZXN0cy50eHQiLAogICAgImFpX2FuYWx5c2lzX3Byb21wdC50eHQiOiAiYWlfYW5hbHlzaXNfcHJvbXB0LnR4dCIsCiAgICAiYWlfdHJhbnNsYXRpb25fcHJvbXB0LnR4dCI6ICJhaV90cmFuc2xhdGlvbl9wcm9tcHQudHh0IiwKICAgICJhaV9maWx0ZXIvcHJvbXB0LnR4dCI6ICJhaV9maWx0ZXIvcHJvbXB0LnR4dCIsCiAgICAiYWlfZmlsdGVyL2V4dHJhY3RfcHJvbXB0LnR4dCI6ICJhaV9maWx0ZXIvZXh0cmFjdF9wcm9tcHQudHh0IiwKICAgICJhaV9maWx0ZXIvdXBkYXRlX3RhZ3NfcHJvbXB0LnR4dCI6ICJhaV9maWx0ZXIvdXBkYXRlX3RhZ3NfcHJvbXB0LnR4dCIsCn0Kcm9vdCA9IHBhdGhsaWIuUGF0aCgiL2RhdGEvY29uZmlnIikKZm9yIGRzdCwgc3JjIGluIEZJTEVTLml0ZW1zKCk6CiAgICB0YXJnZXQgPSByb290IC8gZHN0CiAgICBpZiB0YXJnZXQuZXhpc3RzKCk6CiAgICAgICAgY29udGludWUKICAgIGZvciBhdHRlbXB0IGluIHJhbmdlKDEsIDYpOgogICAgICAgIHRyeToKICAgICAgICAgICAgd2l0aCB1cmxsaWIucmVxdWVzdC51cmxvcGVuKEJBU0UgKyBzcmMsIHRpbWVvdXQ9MzApIGFzIHJlc3A6CiAgICAgICAgICAgICAgICBkYXRhID0gcmVzcC5yZWFkKCkKICAgICAgICAgICAgYnJlYWsKICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGV4YzoKICAgICAgICAgICAgcHJpbnQoZiJbcmFpbHdheV0gc2VlZGluZyB7ZHN0fTogYXR0ZW1wdCB7YXR0ZW1wdH0gZmFpbGVkOiB7ZXhjfSIsIGZsdXNoPVRydWUpCiAgICAgICAgICAgIHRpbWUuc2xlZXAoMykKICAgIGVsc2U6CiAgICAgICAgcmFpc2UgU3lzdGVtRXhpdChmIltyYWlsd2F5XSBjb3VsZCBub3QgZG93bmxvYWQge0JBU0V9e3NyY30iKQogICAgdG1wID0gdGFyZ2V0LndpdGhfbmFtZSh0YXJnZXQubmFtZSArICIudG1wIikKICAgIHRtcC53cml0ZV9ieXRlcyhkYXRhKQogICAgdG1wLnJlcGxhY2UodGFyZ2V0KQogICAgcHJpbnQoZiJbcmFpbHdheV0gc2VlZGVkIC9kYXRhL2NvbmZpZy97ZHN0fSBmcm9tIFRyZW5kUmFkYXJAe1JFRls6N119IGNvbmZpZy97c3JjfSIsIGZsdXNoPVRydWUpClBZCgojIDIuIE9wdGlvbmFsIG92ZXJyaWRlcyBmcm9tIFJhaWx3YXkgdmFyaWFibGVzLCBhcHBsaWVkIG9uIGV2ZXJ5IGJvb3QuCmlmIFsgLW4gIiR7RlJFUVVFTkNZX1dPUkRTOi19IiBdOyB0aGVuCiAgcHJpbnRmICclc1xuJyAiJEZSRVFVRU5DWV9XT1JEUyIgPiAvZGF0YS9jb25maWcvZnJlcXVlbmN5X3dvcmRzLnR4dAogIGVjaG8gIltyYWlsd2F5XSBmcmVxdWVuY3lfd29yZHMudHh0IHdyaXR0ZW4gZnJvbSBGUkVRVUVOQ1lfV09SRFMiCmZpCmlmIFsgLW4gIiR7Q09ORklHX1lBTUw6LX0iIF07IHRoZW4KICBwcmludGYgJyVzXG4nICIkQ09ORklHX1lBTUwiID4gL2RhdGEvY29uZmlnL2NvbmZpZy55YW1sCiAgZWNobyAiW3JhaWx3YXldIGNvbmZpZy55YW1sIHdyaXR0ZW4gZnJvbSBDT05GSUdfWUFNTCIKZmkKCiMgMy4gVGhlIGFwcCByZWFkcyAuL2NvbmZpZyBhbmQgd3JpdGVzIC4vb3V0cHV0IHJlbGF0aXZlIHRvIC9hcHA6IHBvaW50IGJvdGggYXQgdGhlIHZvbHVtZS4Kcm0gLXJmIC9hcHAvY29uZmlnIC9hcHAvb3V0cHV0CmxuIC1zIC9kYXRhL2NvbmZpZyAvYXBwL2NvbmZpZwpsbiAtcyAvZGF0YS9vdXRwdXQgL2FwcC9vdXRwdXQKCiMgNC4gUmVwb3J0IHNlcnZlciBvbiAkUE9SVC4gYHB5dGhvbiAtbSBodHRwLnNlcnZlciAtLWJpbmQgOjpgIGlzIGR1YWwgc3RhY2sgKElQVjZfVjZPTkxZPTApLCBzbwojICAgIFJhaWx3YXkncyBJUHY0IGhlYWx0aGNoZWNrIGFuZCB0aGUgZ2F0ZXdheSdzIElQdjYgcHJpdmF0ZSBuZXR3b3JrIGNhbGwgYm90aCBjb25uZWN0LgojICAgIFVwc3RyZWFtJ3Mgb3duIHZpZXdlciAobWFuYWdlLnB5IHN0YXJ0X3dlYnNlcnZlcikgYmluZHMgMC4wLjAuMCBvbmx5LCBzbyBpdCBydW5zIHVudXNlZCBvbiBXRUJTRVJWRVJfUE9SVC4KKCB3aGlsZSA6OyBkbwogICAgcHl0aG9uIC1tIGh0dHAuc2VydmVyICIkUE9SVCIgLS1iaW5kIDo6IC0tZGlyZWN0b3J5IC9kYXRhL291dHB1dCA+L2Rldi9udWxsIDI+JjEgfHwgdHJ1ZQogICAgZWNobyAiW3JhaWx3YXldIHJlcG9ydCBzZXJ2ZXIgZXhpdGVkLCByZXN0YXJ0aW5nIGluIDJzIiA+JjIKICAgIHNsZWVwIDIKICBkb25lICkgJgplY2hvICJbcmFpbHdheV0gcmVwb3J0IHNlcnZlciBsaXN0ZW5pbmcgb24gWzo6XTokUE9SVCwgc2VydmluZyAvZGF0YS9vdXRwdXQiCgojIDUuIFVwc3RyZWFtIGVudHJ5cG9pbnQ6IFJVTl9NT0RFPWNyb24gcnVucyBvbmUgY3Jhd2wgbm93IChJTU1FRElBVEVfUlVOPXRydWUpLAojICAgIHRoZW4gZXhlY3Mgc3VwZXJjcm9uaWMsIHdoaWNoIHJ1bnMgYHB5dGhvbiAtbSB0cmVuZHJhZGFyYCBvbiBDUk9OX1NDSEVEVUxFIGZvcmV2ZXIuCmNkIC9hcHAKZXhlYyAvZW50cnlwb2ludC5zaAo= | base64 -d > /tmp/start.sh && exec sh /tmp/start.sh'`
- **Healthcheck:** `/`
- **Volume:** `/data`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgVHJlbmRSYWRhciBHYXRld2F5IHN0YXJ0IHNjcmlwdCAoaW1hZ2UgY2FkZHk6Mi4xMS1hbHBpbmUpLgojIHNlcmlhbGl6ZWQtY29uZmlnLmpzb24gZW1iZWRzIHRoaXMgZmlsZSB2ZXJiYXRpbSBhcyBiYXNlNjQ6CiMgICBzaCAtYyAnZWNobyA8YmFzZTY0PiB8IGJhc2U2NCAtZCA+IC90bXAvc3RhcnQuc2ggJiYgZXhlYyBzaCAvdG1wL3N0YXJ0LnNoJwojIFJlZ2VuZXJhdGUgdGhlIHN0YXJ0Q29tbWFuZCB3aGVuZXZlciB0aGlzIGZpbGUgY2hhbmdlcy4Kc2V0IC1lCjogIiR7UE9SVDo/UE9SVCBpcyByZXF1aXJlZH0iCjogIiR7UkVQT1JUX1VTRVJOQU1FOj9SRVBPUlRfVVNFUk5BTUUgaXMgcmVxdWlyZWR9Igo6ICIke1JFUE9SVF9QQVNTV09SRDo/UkVQT1JUX1BBU1NXT1JEIGlzIHJlcXVpcmVkfSIKOiAiJHtVUFNUUkVBTTo/VVBTVFJFQU0gaXMgcmVxdWlyZWR9IgpIQVNIPSIkKGNhZGR5IGhhc2gtcGFzc3dvcmQgLS1wbGFpbnRleHQgIiRSRVBPUlRfUEFTU1dPUkQiKSIKcHJpbnRmICclc1xuJyBcCiAgJ3snIFwKICAnICBhdXRvX2h0dHBzIG9mZicgXAogICcgIGFkbWluIG9mZicgXAogICcgIHNlcnZlcnMgeycgXAogICcgICAgcHJvdG9jb2xzIGgxIGgyYycgXAogICcgIH0nIFwKICAnfScgXAogICI6JFBPUlQgeyIgXAogICcgIGhhbmRsZSAvZ2F0ZXdheS1oZWFsdGggeycgXAogICcgICAgcmVzcG9uZCAib2siIDIwMCcgXAogICcgIH0nIFwKICAnICBoYW5kbGUgeycgXAogICcgICAgYmFzaWNfYXV0aCB7JyBcCiAgIiAgICAgICRSRVBPUlRfVVNFUk5BTUUgJEhBU0giIFwKICAnICAgIH0nIFwKICAnICAgIGVuY29kZSBnemlwJyBcCiAgIiAgICByZXZlcnNlX3Byb3h5ICRVUFNUUkVBTSIgXAogICcgIH0nIFwKICAnfScgPiAvZXRjL2NhZGR5L0NhZGR5ZmlsZQpleGVjIGNhZGR5IHJ1biAtLWNvbmZpZyAvZXRjL2NhZGR5L0NhZGR5ZmlsZSAtLWFkYXB0ZXIgY2FkZHlmaWxlCg== | base64 -d > /tmp/start.sh && exec sh /tmp/start.sh'`
- **Healthcheck:** `/gateway-health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/trendradar-zero-config-news-monitor)
