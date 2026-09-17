# Deploy Your Spotify on Railway

Records your Spotify listening history and charts it as statistics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/your-spotify)

## About

Self-host Your Spotify to keep a permanent, private record of everything you listen to on Spotify. Wrapped arrives once a year and then disappears; Your Spotify polls the Spotify Web API every few minutes, stores each play in your own database, and turns that history into dashboards you can query whenever you like — top tracks, artists and albums over any period, listening time by hour and weekday, per-artist pages, and affinity comparisons between people sharing an instance. It is Last.fm-style scrobbling without handing your history to anyone else.

Deploy Your Spotify on Railway and the four services are wired together for you. **gateway** is a Caddy reverse proxy and the only service with a public URL: it serves the dashboard at `/` and forwards `/api/*` to the backend, so the browser sees a single origin. **client** is the React dashboard, **server** is the Express API that polls Spotify and answers its queries, and **MongoDB** stores your listening history on a persistent volume. You supply one thing after deploying: the client ID and secret of a Spotify application on your own developer account.

![Caddy gateway fronting the Your Spotify client, server and MongoDB](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789557384/your-spotify-architecture.webp)

Your Spotify is an open-source listening tracker built on the Spotify Web API. The backend requests your recently-played tracks on a short interval, deduplicates them, resolves track, album and artist metadata, and writes it all to MongoDB. Because the data lives in your database rather than a vendor's account, statistics reach back as far as you have run the instance — and a privacy-export import extends them to the day you joined Spotify.

Key features:

- Top tracks, albums and artists over any date range, ranked by play count or listening time
- Listening patterns by hour of day, day of week and month, plus longest sessions
- Artist, album and song pages showing your own history
- Multi-user instances with affinity comparisons, and privacy-export imports

The deployment splits the application the way its authors ship it, with one addition: upstream runs the API and dashboard as two containers on two ports, and here they sit behind the **gateway** so both answer on one hostname. That single origin is a requirement, not a convenience — the API issues a strict same-site session cookie, which browsers refuse to send from a different hostname, so a split deployment would sign you in and then treat every request as anonymous.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| client | `yooooomi/your_spotify_client:1.20.0` | Worker |
| gateway | [gridalpha/your-spotify-railway](https://github.com/gridalpha/your-spotify-railway) | Web service |
| server | `yooooomi/your_spotify_server:1.20.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the server |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot |
| `PORT` | client | 3000 | Static file server port |
| `NODE_ENV` | client | production | Serve the production bundle |
| `API_ENDPOINT` | client | - | Public API URL with /api prefix |
| `PORT` | gateway | 8080 | Caddy listening port |
| `PORT` | server | 8080 | API listening port |
| `TIMEZONE` | server | Etc/UTC | Timezone for reported statistics |
| `LOG_LEVEL` | server | info | Log verbosity level |
| `API_ENDPOINT` | server | - | Public API URL with /api prefix |
| `MONGO_ENDPOINT` | server | - | Database connection string |
| `SPOTIFY_PUBLIC` | server | - | Spotify application client ID |
| `SPOTIFY_SECRET` | server | (secret) | Spotify application client secret |
| `CLIENT_ENDPOINT` | server | - | Public dashboard URL |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c '. /app/apps/client/scripts/run/variables.sh; exec serve -c /app/apps/client/scripts/run/serve.json -s -l tcp://[::]:3000 /app/apps/client/build/'`
- **Healthcheck:** `/`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/your-spotify)
