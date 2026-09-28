# Deploy Gorush on Railway

Gorush 1.22: push notification server for FCM and APNs, private network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gorush)

## About

Gorush is a push notification server written in Go. Your backend sends one HTTP request, and Gorush delivers the message to Android devices through Firebase Cloud Messaging and to Apple devices through APNs. It handles batching, retries and per-token errors, so applications do not need to embed each vendor SDK.

This template runs the official `appleboy/gorush:1.22.0` image as a private service. Gorush has no authentication of its own, so it gets no public domain; your backend calls it at `http://gorush.railway.internal:8088/api/push`. Before the first deploy, add a Firebase service account JSON to `GORUSH_ANDROID_CREDENTIAL`, an APNs key to `GORUSH_IOS_KEY_BASE64`, or both. The start command enables whichever platform has credentials. Without any, it stops with a clear message. Sync mode is on, so each push response lists failed tokens and their errors. Gorush keeps no state, so it needs no volume, and it fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gorush | `appleboy/gorush:1.22.0` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8088 |
| `GORUSH_CORE_PORT` | 8088 |
| `GORUSH_CORE_SYNC` | true |
| `GORUSH_LOG_FORMAT` | json |
| `GORUSH_IOS_KEY_TYPE` | p8 |
| `GORUSH_IOS_PRODUCTION` | false |
| `GORUSH_CORE_WORKER_NUM` | 4 |
| `GORUSH_ANDROID_CREDENTIAL` | (secret) |

## Configuration

- **Start command:** `sh -c 'if [ -n "$GORUSH_ANDROID_CREDENTIAL" ]; then export GORUSH_ANDROID_ENABLED=true; else export GORUSH_ANDROID_ENABLED=false; fi; if [ -n "$GORUSH_IOS_KEY_BASE64" ]; then export GORUSH_IOS_ENABLED=true; else export GORUSH_IOS_ENABLED=false; fi; if [ "$GORUSH_ANDROID_ENABLED$GORUSH_IOS_ENABLED" = falsefalse ]; then echo "Gorush needs GORUSH_ANDROID_CREDENTIAL (FCM service account JSON) or GORUSH_IOS_KEY_BASE64 (APNs key, base64)"; sleep 60; exit 1; fi; exec /bin/gorush'`
- **Healthcheck:** `/healthz`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gorush)
