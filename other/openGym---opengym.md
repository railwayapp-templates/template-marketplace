# Deploy openGym on Railway

Self-hosted gym tracker with passkeys: routines, workouts, muscle map.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opengym)

## About

openGym is a self-hosted gym and body-weight tracker: plan a routine per weekday from 1,300+ exercises, run guided
workouts with a rest timer and pre-filled weights, log supersets, warm-ups and cardio, see which muscles are trained,
recovering or detrained, and track body weight and PRs. It installs as an app on your phone, works offline and syncs
across devices behind passkey sign-in. This is a community-maintained template, not affiliated with the openGym
project.

openGym is a Node API that stores everything as JSON files, plus a React frontend served by nginx that proxies `/api`
so both share one origin — which passkeys require. Passkeys also need HTTPS and a hostname they are bound to. A fresh
openGym has open sign-up and no admin, so on a public URL the first visitor could claim it.

This template runs both parts in one service on Railway's HTTPS domain, keeps all data on a volume, seeds an admin
profile on first boot and runs invite-only with the guest door closed. Exercise images and animations are downloaded
on first start, as openGym's own setup does.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opengym | `ghcr.io/youssefsiam38/opengym-railway:1.0.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes traffic and health checks to (nginx). Keep it 8080. |
| `RP_ID` | - | Hostname passkeys are bound to. Must be the domain you open the app on; set it (and ORIGIN) when you add a custom domain, then redeploy. |
| `ORIGIN` | - | Full https URL the app is served from. Keep it in step with RP_ID. |
| `RP_NAME` | openGym | Name shown in the passkey prompt. |
| `AUDIT_IP` | - | Record visitor addresses in the activity log: off (default), net or full. |
| `OWNER_NAME` | Owner | Profile name of the admin created on first boot. Sign in with this name and OWNER_PASSWORD. |
| `ALLOW_GUEST` | 0 | 0 hides 'Continue without account'. Set 1 to offer browser-only guest mode. |
| `INVITE_ONLY` | 1 | 1 = new profiles need an invite code from the admin dashboard. Keep it on for a public URL. |
| `TRUST_PROXY` | 1 | Let the sign-in throttle read the visitor address nginx passes on. Keep 1. |
| `DEFAULT_LANG` | - | Default language for the sign-in screen and new profiles (en, de, es, fr, pt-BR, ...). |
| `SESSION_DAYS` | - | How long a sign-in lasts, in days (default 90). |
| `VAPID_SUBJECT` | - | Contact for push services, e.g. mailto:you@example.com (default: ORIGIN). |
| `COACH_DISABLED` | - | 1 forces the optional AI coach off instance-wide. |
| `EXERCISE_MEDIA` | download | download = fetch exercise images/animations (~140 MB, third-party content) on first start; off = skip. |
| `OWNER_PASSWORD` | (secret) | Password of the first-boot admin, generated. Only used on the very first start; change it later in Settings. |
| `PASSWORD_LOGIN` | (secret) | 1 = name + password sign-in next to passkeys. The seeded owner needs it until they add a passkey. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/opengym)
