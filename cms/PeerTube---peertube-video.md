# Deploy PeerTube on Railway

Video hosting platform you run yourself, with channels and live streams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/peertube-video)

## About

PeerTube is a free, open-source video platform that lets you run your own YouTube-style site on a domain you control. Built by Framasoft under the AGPL-3.0 licence, it stores, transcodes and streams your videos, adds live broadcasting over RTMP, and speaks ActivityPub — so your channels can be followed from Mastodon and other PeerTube sites without anyone signing up on yours. Universities, broadcasters, conferences and creators self-host PeerTube when they want an audience with no advertising algorithm in between.

Deploy PeerTube on Railway and you get the production shape, not a single box: `peertube` serves the site, API, federation and RTMP ingest; `runner` does the CPU-heavy transcoding so uploads never slow the site; `Postgres` holds the catalogue and `Redis` the job queue; `media` signs reads from object storage, where the video files live; and `mailpit` captures outgoing mail. Self-hosting PeerTube this way usually means wiring five machines together — here it is one deploy.

![PeerTube web, media gateway and transcoding runner services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788826261/peertube-architecture.png)

- ActivityPub federation — other instances and Mastodon accounts follow your channels
- HLS adaptive streaming, with optional peer-to-peer assist between viewers of a video
- Live streaming over RTMP, with optional replay saved as a video
- Video Studio: trim, add an intro or outro, mute sections, in the browser
- Channels, playlists, subtitles, chapters, an embeddable player, a REST API
- Moderation: abuse reports, account and instance blocklists, vetted sign-ups

The Railway architecture splits those jobs across services. `peertube` serves the site and the ActivityPub endpoints. `runner` claims transcoding jobs over a WebSocket and returns the finished renditions, so a long encode never competes with page requests. `Postgres` stores the catalogue, accounts and federation state; `Redis` carries the job queue, cache and live sessions. Object storage holds the video files, and since Railway's buckets are not publicly readable, `media` signs each read and streams it to the player without exposing the bucket.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| media | [gridalpha/peertube-railway](https://github.com/gridalpha/peertube-railway) | Web service |
| runner | [gridalpha/peertube-railway](https://github.com/gridalpha/peertube-railway) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| peertube | [gridalpha/peertube-railway](https://github.com/gridalpha/peertube-railway) | TCP service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | media | 3000 | HTTP port Railway probes |
| `S3_BUCKET` | media | - | Bucket name |
| `S3_REGION` | media | - | Bucket region |
| `S3_ENDPOINT` | media | - | Bucket endpoint |
| `PUBLIC_PREFIXES` | media | web-videos/,streaming-playlists/,captions/ | Only these prefixes are served |
| `S3_ACCESS_KEY_ID` | media | - | Bucket access key |
| `S3_SECRET_ACCESS_KEY` | media | (secret) | Bucket secret key |
| `HOME` | runner | /runner | Registration and cache live on the volume |
| `PORT` | runner | 3000 | Liveness port Railway probes |
| `RUNNER_NAME` | runner | railway-runner | Name shown in the admin runner list |
| `PEERTUBE_URL` | runner | - | Instance the runner registers with |
| `PEERTUBE_ADMIN_PASSWORD` | runner | (secret) | Administrator password |
| `PEERTUBE_ADMIN_USERNAME` | runner | (secret) | Account used to read a registration token |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the entrypoint |
| `PORT` | peertube | 9000 | HTTP port Railway probes |
| `PEERTUBE_DB_SSL` | peertube | false | Private network, no TLS needed |
| `PEERTUBE_SECRET` | peertube | (secret) | Instance signing secret |
| `PEERTUBE_DB_NAME` | peertube | - | Postgres database |
| `PEERTUBE_DB_PORT` | peertube | - | Postgres port |
| `PEERTUBE_SMTP_TLS` | peertube | false | Plain SMTP on the private network |
| `PEERTUBE_SMTP_FROM` | peertube | - | From address on outgoing mail |
| `PEERTUBE_SMTP_PORT` | peertube | 1025 | Mailpit SMTP port |
| `PEERTUBE_REDIS_AUTH` | peertube | - | Redis password |
| `PEERTUBE_REDIS_PORT` | peertube | - | Redis port |
| `PEERTUBE_ADMIN_EMAIL` | peertube | admin@example.com | Administrator contact address |
| `PEERTUBE_DB_HOSTNAME` | peertube | - | Postgres private host |
| `PEERTUBE_DB_PASSWORD` | peertube | (secret) | Postgres password |
| `PEERTUBE_DB_USERNAME` | peertube | (secret) | Postgres user |
| `PEERTUBE_TRUST_PROXY` | peertube | [\"0.0.0.0/1\",\"128.0.0.0/1\",\"::/1\",\"8000::/1\"] | Trust Railway's edge for client IP |
| `PEERTUBE_LIVE_ENABLED` | peertube | true | RTMP live streaming |
| `PEERTUBE_INSTANCE_NAME` | peertube | PeerTube | Name shown to visitors and peers |
| `PEERTUBE_SMTP_HOSTNAME` | peertube | - | SMTP host |
| `PEERTUBE_SMTP_PASSWORD` | peertube | (secret) | SMTP password |
| `PEERTUBE_SMTP_USERNAME` | peertube | (secret) | SMTP username |
| `PEERTUBE_REDIS_HOSTNAME` | peertube | - | Redis private host |
| `PEERTUBE_SIGNUP_ENABLED` | peertube | false | Registration closed by default |
| `PEERTUBE_WEBSERVER_PORT` | peertube | 443 | Public port for generated URLs |
| `PEERTUBE_TRACKER_ENABLED` | peertube | true | P2P assist for this instance's videos |
| `PEERTUBE_TRACKER_PRIVATE` | peertube | true | Tracker serves only local videos |
| `PEERTUBE_WEBSERVER_HTTPS` | peertube | true | Generate https:// URLs |
| `PT_INITIAL_ROOT_PASSWORD` | peertube | (secret) | Password for the root administrator |
| `PEERTUBE_LIVE_ALLOW_REPLAY` | peertube | true | Save a live stream as a video |
| `PEERTUBE_IMPORT_VIDEOS_HTTP` | peertube | false | Third-party URL import off |
| `PEERTUBE_LIVE_RTMPS_ENABLED` | peertube | false | One TCP proxy, used for plain RTMP |
| `PEERTUBE_WEBSERVER_HOSTNAME` | peertube | - | Public host, baked into every URL |
| `PEERTUBE_STORYBOARDS_ENABLED` | peertube | true | Scrubbing previews in the player |
| `PEERTUBE_TRANSCODING_ENABLED` | peertube | true | Transcode uploads |
| `PEERTUBE_CONTACT_FORM_ENABLED` | peertube | false | Public contact form off |
| `PEERTUBE_VIDEO_STUDIO_ENABLED` | peertube | true | In-browser video editing |
| `PEERTUBE_IMPORT_VIDEOS_TORRENT` | peertube | false | Magnet and torrent import off |
| `PEERTUBE_OBJECT_STORAGE_REGION` | peertube | - | Bucket region |
| `PEERTUBE_SMTP_DISABLE_STARTTLS` | peertube | true | Listener advertises no STARTTLS |
| `PEERTUBE_OBJECT_STORAGE_ENABLED` | peertube | true | Store video files in the bucket |
| `PEERTUBE_OBJECT_STORAGE_ENDPOINT` | peertube | - | Bucket endpoint |
| `PEERTUBE_TRANSCODING_HLS_ENABLED` | peertube | true | Produce HLS renditions |
| `PEERTUBE_LIVE_TRANSCODING_ENABLED` | peertube | true | Transcode live streams |
| `PEERTUBE_LIVE_TRANSCODING_THREADS` | peertube | 2 | ffmpeg threads for live |
| `PEERTUBE_SIGNUP_REQUIRES_APPROVAL` | peertube | true | Review sign-ups if you open them |
| `PEERTUBE_OBJECT_STORAGE_CAPTIONS_PREFIX` | peertube | captions/ | Key prefix for captions |
| `PEERTUBE_TRANSCODING_WEB_VIDEOS_ENABLED` | peertube | false | Skip the duplicate MP4 copy |
| `PEERTUBE_OBJECT_STORAGE_FORCE_PATH_STYLE` | peertube | true | Path-style S3 addressing |
| `PEERTUBE_OBJECT_STORAGE_CAPTIONS_BASE_URL` | peertube | - | Public read URL for captions |
| `PEERTUBE_OBJECT_STORAGE_WEB_VIDEOS_PREFIX` | peertube | web-videos/ | Key prefix for web videos |
| `PEERTUBE_OBJECT_STORAGE_USER_EXPORTS_PREFIX` | peertube | user-exports/ | Key prefix for user exports |
| `PEERTUBE_OBJECT_STORAGE_WEB_VIDEOS_BASE_URL` | peertube | - | Public read URL for web videos |
| `PEERTUBE_TRANSCODING_REMOTE_RUNNERS_ENABLED` | peertube | true | Send VOD jobs to the runner |
| `PEERTUBE_OBJECT_STORAGE_CAPTIONS_BUCKET_NAME` | peertube | - | Bucket for captions |
| `PEERTUBE_VIDEO_STUDIO_REMOTE_RUNNERS_ENABLED` | peertube | true | Send studio jobs to the runner |
| `PEERTUBE_OBJECT_STORAGE_WEB_VIDEOS_BUCKET_NAME` | peertube | - | Bucket for web videos |
| `PEERTUBE_LIVE_TRANSCODING_REMOTE_RUNNERS_ENABLED` | peertube | false | Live is transcoded locally |
| `PEERTUBE_OBJECT_STORAGE_USER_EXPORTS_BUCKET_NAME` | peertube | - | Bucket for user exports |
| `PEERTUBE_OBJECT_STORAGE_CREDENTIALS_ACCESS_KEY_ID` | peertube | (secret) | Bucket access key |
| `PEERTUBE_OBJECT_STORAGE_STREAMING_PLAYLISTS_PREFIX` | peertube | streaming-playlists/ | Key prefix for HLS |
| `PEERTUBE_OBJECT_STORAGE_ORIGINAL_VIDEO_FILES_PREFIX` | peertube | original-video-files/ | Key prefix for original files |
| `PEERTUBE_OBJECT_STORAGE_PROXY_PROXIFY_PRIVATE_FILES` | peertube | true | Serve private videos through the app |
| `PEERTUBE_OBJECT_STORAGE_STREAMING_PLAYLISTS_BASE_URL` | peertube | - | Public read URL for HLS |
| `PEERTUBE_IMPORT_VIDEO_CHANNEL_SYNCHRONIZATION_ENABLED` | peertube | false | Channel mirroring off |
| `PEERTUBE_OBJECT_STORAGE_CREDENTIALS_SECRET_ACCESS_KEY` | peertube | (secret) | Bucket secret key |
| `PEERTUBE_OBJECT_STORAGE_STREAMING_PLAYLISTS_BUCKET_NAME` | peertube | - | Bucket for HLS |
| `PEERTUBE_OBJECT_STORAGE_ORIGINAL_VIDEO_FILES_BUCKET_NAME` | peertube | - | Bucket for original files |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Credentials the app sends with |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MAILPIT_PASSWORD` | mailpit | (secret) | Shared inbox and SMTP password |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Reachable over the IPv6 private network |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Auth over the plain private listener |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/runner`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/config`
- **TCP Proxies:** 1935
- **Healthcheck:** `/livez`

**Category:** CMS · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/peertube-video)
