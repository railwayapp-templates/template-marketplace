# Deploy PocketBase – Open Source Firebase Alternative on Railway

[May'26] Self-hosted PocketBase: SQLite backend, auth & realtime API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-open-source-firebase-alternat)

## About

PocketBase is an open-source, self-hosted Firebase/Supabase alternative built as a single Go binary. Deploy a full backend with SQLite database, realtime subscriptions, file storage, and OAuth2 auth in under 60 seconds.

Hosting PocketBase on Railway means you get a persistent, always-on backend without managing servers. Railway handles the infrastructure — you just deploy and build. PocketBase runs as a single Go binary, consuming minimal resources, making it ideal for Railway's Hobby or Pro plans. Your data is stored in a SQLite database, and you can attach a persistent volume to ensure data survives redeploys. The built-in Admin UI at `/_/` lets you manage collections, users, and files directly from the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase) | Worker |

**Category:** Starters · **Languages:** Go, JavaScript, CSS, HTML, Makefile

[View on Railway →](https://railway.com/deploy/pocketbase-open-source-firebase-alternat)
