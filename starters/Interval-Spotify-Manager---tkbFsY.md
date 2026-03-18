# Deploy Interval Spotify Manager on Railway

Example Interval app for browsing your Spotify playlists.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tkbFsY)

## About

Example app built with [Interval](https://interval.com) for managing your Spotify playlists.

Includes a few features not found in the official Spotify app:
- Shows key and tempo for tracks in playlists
- Shows which playlist(s) tracks in your Liked Songs list are in

### Requirements

Running this app requires:
- A Spotify account and a registered Spotify app. [You can register a new app here.](https://developer.spotify.com/dashboard/login)
- A free [Interval](https://interval.com) account.

After creating your Spotify app, add the client ID and client secret to the project variables along with your Interval API key.

You'll also need to add the authorization URLs to the Spotify developer dashboard in order for the OAuth flow to work. [Interval actions have two modes](https://interval.com/docs/concepts/environments): Dev mode and Live mode. You'll need to add both URLs to the Spotify developer dashboard:

```
// dev mode
https://interval.com/dashboard/YOUR_ORG_SLUG/develop/actions/spotify/authorize
// live mode
https://interval.com/dashboard/YOUR_ORG_SLUG/actions/spotify/authorize
```

To add these URLs in the Spotify developer dashboard:

1. Click **Edit Settings**
2. Go to the **Redirect URIs** section
3. Paste each URL into the text input and click **Add**

If you get an `Invalid Redirect URI` error, double check that the action URL in your browser matches the URL you added to Spotify.

---

Need help with this app? Come chat with us in the Interval discord: http://interval.com/discord

Or open an issue on the GitHub repo: https://github.com/danphilibin/interval-spotify-app

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| interval-app | [danphilibin/interval-spotify-app](https://github.com/danphilibin/interval-spotify-app) | Worker |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `INTERVAL_KEY` | interval-app | - | Get your key with a free account at https://interval.com |
| `SPOTIFY_CLIENT_ID` | interval-app | - | Register an app at https://developer.spotify.com. See README for instructions. |
| `SPOTIFY_CLIENT_SECRET` | interval-app | (secret) | Register an app at https://developer.spotify.com. See README for instructions. |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/tkbFsY)
