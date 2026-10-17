# Deploy Moli | Headless Browser for AI Agents (CDP, WebDriver, Playwright) on Railway

Rust headless browser for AI agents: CDP, WebDriver, Playwright, ~30 MB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moli)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/moli?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=moli)

[Moli](https://github.com/lexmount/moli) is an open-source headless browser built for AI agents, written in Rust by Lexmount. It isn't a Chromium wrapper. It's its own engine with V8, a real DOM, CSS, fetch, cookies and storage. It skips layout and painting until something actually needs pixels, such as a screenshot or a click at coordinates. One binary speaks CDP, WebDriver Classic and WebDriver BiDi, so Playwright, Puppeteer, Selenium, browser-use and Stagehand can drive it as if it were Chrome. On Railway it idles at about 15 MB of RAM.

It's one service and needs no database or volume. Moli runs `moli serve` on localhost inside the container. A small Caddy gate in front of it is the only thing on your Railway domain.

- **Token-protected from the first second.** Moli has no login of its own, and an open automation port is a free remote browser for anyone who finds it. The gate rejects every request without `MOLI_TOKEN`, which is generated at deploy. The token can arrive as a bearer header, a `?token=` query parameter, or a basic-auth password, so every kind of client can pass it.
- **No access to your private network.** Moli starts with `--block-private-networks`. Pages and scripts can't reach `*.railway.internal`, other private IP ranges, the cloud metadata address, or the browser's own control port. Tested on Railway.
- **Works with `connectOverCDP` out of the box.** Moli tells clients to connect to `ws://127.0.0.1:9222`. The gate rewrites `/json/version` so that Playwright and Puppeteer get your public `wss://` address instead.
- **Screenshots on.** `MOLI_ARGS` defaults to `--layout`, so screenshots, element boxes and coordinate clicks work. Layout still runs only when a request needs it.
- **Pinned release.** The image downloads Moli `v1.1.17`. To upgrade, change `MOLI_VERSION` in the Dockerfile of your fork.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moli | [nomideusz/moli-railway](https://github.com/nomideusz/moli-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of the token gate behind the Railway domain - leave as is. |
| `MOLI_ARGS` | --layout | Extra flags for moli serve. --layout enables screenshots and coordinate clicks; add --resource to also load images, fonts and media, or --http-proxy <url> to route traffic through a proxy. |
| `MOLI_TOKEN` | (secret) | Access token. Send it as Authorization: Bearer <token>, as ?token=<token> in the URL, or as the password for user moli (WebDriver). Without it every request gets 401. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/moli)
