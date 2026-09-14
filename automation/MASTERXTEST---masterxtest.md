# Deploy MASTERXTEST on Railway

UNDERSTAND YOUR DEVICE BTR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/masterxtest)

## About

high-vast is a single-file Node.js benchmark that runs a known, controlled CPU and RAM load and logs its own resource usage over time. Instead of guessing how fast a trial's credit balance drains, you get real numbers: point it at your Railway trial and see exactly how many $/hour a given load costs — then use that rate to plan what your actual project will need.

Deploying high-vast is a one-click affair — Railway auto-detects Node via `package.json` and runs `npm start`. No database or external services required. Once live, it runs continuously, holding a fixed amount of memory and CPU load and printing periodic JSON stats to the deploy logs. You can hit the `/stats` endpoint anytime for live numbers, and cross-reference against Railway's own Usage tab to calculate your actual $/hour burn rate. Defaults are tuned for the free trial tier (1 vCPU / 0.5GB RAM), but every load parameter is adjustable through environment variables — no redeploy needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deduce | [nenennenehssjbs-blip/deduce](https://github.com/nenennenehssjbs-blip/deduce) | Worker |

**Category:** Automation · **Languages:** JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/masterxtest)
