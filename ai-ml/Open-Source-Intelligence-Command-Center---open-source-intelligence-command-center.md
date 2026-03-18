# Deploy Open Source Intelligence Command Center on Railway

Plots conflicts, security events, threat indicators on an interactive map

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-source-intelligence-command-center)

## About

A real-time global situational awareness platform that plots security events, geopolitical developments, and threat indicators on an interactive map. Think of it as an OSINT (Open Source Intelligence) command center.

- A good solution that can scale with a lot of requests

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| globalthreatmap | [unicodeveloper/globalthreatmap](https://github.com/unicodeveloper/globalthreatmap) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VALYU_API_KEY` | (secret) | - |
| `VALYU_APP_URL` | https://platform.valyu.ai | Valyu API Key. Get one at: https://valyu.ai |
| `NEXT_PUBLIC_APP_MODE` | self-hosted | - |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | (secret) | Mapbox API Token Get one at: https://account.mapbox.com/access-tokens/ |

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/open-source-intelligence-command-center)
