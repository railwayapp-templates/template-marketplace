# Deploy Invidious on Railway

Privacy-respecting front-end for YouTube. Self-hosted, no ads, no tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invidious)

## About

# Invidious on Railway

One-click deploy of [Invidious](https://github.com/iv-org/invidious) — a privacy-respecting, open-source front-end for YouTube — on [Railway](https://railway.com). Watch and search YouTube without ads, tracking, JavaScript, or a Google account.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invidious?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=invidious)

Live template: 

## What gets deployed

| Service | Image | Role |
|---|---|---|
| **Invidious** | `quay.io/invidious/invidious:latest` | Web front-end on a public HTTPS domain (port 3000) |
| **Companion** | `quay.io/invidious/invidious-companion:latest` | Internal-only stream extractor (port 8282) |
| **Postgres** | `postgres:16-alpine` | Stores accounts, subscriptions, watch history, playlists. 5 GB volume. |

All three services run on Railway's private IPv6 network. Only Invidious is publicly exposed. Shared secrets (`HMAC_KEY`, `INVIDIOUS_COMPANION_KEY`, `POSTGRES_PASSWORD`) are auto-generated per deploy via Railway's `${{secret(N)}}` template functions; cross-service references are resolved at deploy time.

## Videos won't play after deploy?

Most common issue and not a bug in the template. YouTube blocks Railway's datacenter IPs from validating proof-of-origin (PO) tokens. Symptom: homepage works, but watch pages show *"Companion is starting. Please wait until a valid potoken is found."*

Quickest fix: add a `YOUTUBE_SESSION_COOKIES` env var to the **Companion** service, using cookies exported from a logged-in burner Google account. Three rules from yt-dlp's [cookie export guide](https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies):

1. Log in to YouTube in a private/incognito window
2. **Log out before closing the window** — YouTube rotates cookies on session end and yours stop working otherwise
3. Use a dedicated burner Google account; this approach can get accounts banned

Format the cookies as a single header string (`SID=...; HSID=...; SSID=...; APISID=...; SAPISID=...; LOGIN_INFO=...`) and paste into `YOUTUBE_SESSION_COOKIES`. Redeploy Companion. Watch pages should work within a minute or two.

If you have a residential proxy, an alternative is `PROXY=http://user:pass@host:port` on Companion. Datacenter proxies will be blocked the same way Railway's IPs are.

Full background: [Invidious YouTube errors explained](https://docs.invidious.io/youtube-errors-explained/).

## Customizing

Edit `INVIDIOUS_CONFIG` on the Invidious service. It's a YAML document — see the [Invidious config reference](https://docs.invidious.io/configuration/). Don't edit the `db:`, `hmac_key:`, or `invidious_companion:` blocks — they're populated by `${{...}}` references that resolve at deploy.

To pin image versions instead of `:latest`, change the source image tag on each service (e.g. `quay.io/invidious/invidious:2026.04.01`) and redeploy.

## Troubleshooting

**API and watch pages return 500 with "Youtube API returned status code 400"** — YouTube changed its API and your deployed image is stale. Redeploy both the Invidious and Companion services so Railway pulls the latest `:latest` images; the upstream projects track YouTube changes and a fresh image is usually the whole fix. (Video *playback* often keeps working while metadata breaks — that's the tell.)

## Where to file issues

| Issue | Where |
|---|---|
| Template wiring — Railway-specific config, references, secrets, healthcheck | This repo |
| Invidious bugs — UI, search, accounts, settings | [iv-org/invidious](https://github.com/iv-org/invidious/issues) |
| Companion bugs — video playback, PO tokens | [iv-org/invidious-companion](https://github.com/iv-org/invidious-companion/issues) |
| Railway platform | [Railway support](https://railway.com/help) |

This template is just the deployment recipe. Application bugs go upstream.

## License

Template wiring in this repo: MIT. Invidious and invidious-companion have their own licenses — see upstream projects.

## Credits

- [Invidious](https://github.com/iv-org/invidious) and [invidious-companion](https://github.com/iv-org/invidious-companion) by iv-org
- [yt-dlp cookie export guide](https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies) — operational reference for safe cookie exports

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Companion | `quay.io/invidious/invidious-companion:2026.08.10-16cf10e` | Worker |
| Postgres | `postgres:16-alpine` | Database |
| Invidious | `quay.io/invidious/invidious:2026.08.15-d10f2a4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Companion | 8282 | Port Companion listens on (referenced from Invidious config) |
| `SERVER_SECRET_KEY` | Companion | (secret) | Shared secret with Invidious. Must reference Invidious's variable, NOT be independently generated. |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot. Static. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection string for clients that expect a single URL. Composed from references — auto-updates if the password is regenerated. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name. Static; matches the upstream Postgres image's default convention. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated Postgres password. Sealed at deploy time. Referenced by PGPASSWORD and DATABASE_URL — do not change after first deploy or existing connections will break. |
| `PORT` | Invidious | 3000 | Port Invidious listens on (also referenced from INVIDIOUS_CONFIG). |
| `HMAC_KEY` | Invidious | - | Auto-generated HMAC secret used to sign user session cookies. Do NOT change after first deploy — all signed-in sessions will be invalidated. |
| `INVIDIOUS_CONFIG` | Invidious | - | Full Invidious config in YAML. Database credentials, companion wiring, and domain are all references — leave them alone. |
| `INVIDIOUS_COMPANION_KEY` | Invidious | - | Auto-generated shared secret authenticating the Invidious↔Companion link. Companion.SERVER_SECRET_KEY references this value. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/feed/popular`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/invidious)
