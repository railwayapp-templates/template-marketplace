# Deploy Twitch Song Requests on Railway

Queue song requests in Spotify with Twitch channel points.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/DoTt23)

## About

Creates a Postgres database (which is optional), and a Go HTTP server. The purpose of the HTTP server is to host traffic to a website, and to route requests to/from Twitch's and Spotify's APIs. This project requires developers to onboard for API access to Twitch and Spotify, and users of the service are required to be Affiliate or Partner on Twitch, and must have a Spotify Premium account. See https://github.com/SaxyPandaBear/TwitchSongRequests for more details.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TwitchSongRequests | [SaxyPandaBear/TwitchSongRequests](https://github.com/SaxyPandaBear/TwitchSongRequests) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/timescale-postgis-ssl:pg15-ts2.12` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | TwitchSongRequests | 443 | This must be 443 for HTTPS communication on Railway |
| `TWITCH_STATE` | TwitchSongRequests | - | Arbitrary key that your service uses for verifying OAuth user logins |
| `SKIP_POSTGRES` | TwitchSongRequests | - | If you delete this, you will need to create Postgres tables or the app breaks |
| `SPOTIFY_STATE` | TwitchSongRequests | - | Arbitrary key that your service uses for verifying OAuth user logins |
| `TWITCH_SECRET` | TwitchSongRequests | (secret) | Arbitrary secret that you use when signing API calls in Twitch |
| `TWITCH_CLIENT_ID` | TwitchSongRequests | - | Twitch application client ID |
| `SPOTIFY_CLIENT_ID` | TwitchSongRequests | - | Spotify application client ID |
| `TWITCH_CLIENT_SECRET` | TwitchSongRequests | (secret) | Twitch application secret key |
| `SPOTIFY_CLIENT_SECRET` | TwitchSongRequests | (secret) | Spotify application secret key |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Go, HTML, Dockerfile

[View on Railway →](https://railway.com/template/DoTt23)
