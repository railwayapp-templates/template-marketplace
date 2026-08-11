# Deploy Cap | Open Source Loom Alternative on Railway

Self-hosted Loom alternative: screen recording with shareable links

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap-screen-recorder)

## About

Cap is an open-source screen recorder — record your screen and camera, get a shareable link in seconds, and let people comment on the timeline. It is the self-hosted alternative to Loom. This template deploys the full stack upstream ships: the web app, the ffmpeg media server that processes every recording, MySQL, and managed object storage for the video files.

Three services and a bucket, all from official upstream images:

- **Web** — the Cap application: dashboard, share pages, the API the desktop and mobile apps talk to, and the database migration that runs on boot. The only service with a domain.
- **MediaServer** — ffmpeg. Transcoding, thumbnails, the preview GIF, audio extraction. Private; nothing outside the project can reach it.
- **MySQL** — accounts, workspaces, recordings, comments, on a volume. Cap requires MySQL specifically.
- **Bucket** — Railway object storage for the recordings themselves, uploaded straight from the browser.

All 37 variables are filled in and described on the deploy screen. **There is nothing you have to supply** — open the URL, enter your email, and you are in.

Four things this template does that are worth knowing about:

**Recordings go to managed object storage, not a MinIO container.** The obvious way to self-host Cap is the one upstream's compose file uses: MinIO on a volume, holding every recording anyone ever made, with nobody backing it up. Here they go to a Railway bucket. Getting that right took one measurement worth repeating — Railway storage answers both S3 URL shapes, but only the `host/bucket/key` form sends CORS headers, and Cap's recorder uploads straight from the browser. With the other shape every upload is refused in the browser while `curl` cheerfully reports 200. Verified here by requesting a presigned URL through Cap's own API, uploading to it, and reading the preflight response back.

**Video processing actually finishes.** Cap's media server reports transcoding progress by calling back into the web app over the private network, and that callback carries a shared secret. Two things have to be true for it to land, and neither is the default: the web container has to listen on the project's IPv6 private network — its image hard-codes an IPv4-only bind that no environment variable can override — and both services need the same secret, because the webhook route answers 401 when either side is missing it. Measured from inside the deployment: the callback returns 200 with the right secret, 401 with a wrong one, and 401 with none.

**The images are pinned.** Cap publishes only `latest` and `beta` — there are no version tags to pin — so this template pins the **digest** of both images instead. That is the difference between a redeploy that gives you what you already had and one that quietly swaps the application under a running instance.

**MySQL is a supported version.** Upstream's compose file ships MySQL 8.0, which reached end of life in April 2026. This template runs 8.4 LTS, supported into 2032, with binary logging and the performance schema switched off — neither is useful on a single-instance deployment and together they cost several hundred megabytes of RAM and a steadily growing volume. All 40 of Cap's database migrations were run against 8.4 before this template was published.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | `ghcr.io/capsoftware/cap-web@sha256:a15efd82c37442d01fa95c4d94954baa1a84b20b8289b758d293fc51b1eb5d54` | Web service |
| MediaServer | `ghcr.io/capsoftware/cap-media-server@sha256:51fe32229aa016f5e333603d4901dc897eeb0038d2fbbc504369e3676863fc5a` | Worker |
| MySQL | `mysql:8.4.11` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Web | 3000 | Port the Next.js server listens on. Railway routes traffic and health checks here; changing it means changing the start command too. |
| `WEB_URL` | Web | - | Public URL of this instance. Used for links, share URLs and OAuth callbacks. Set it to your own domain if you add one. |
| `BIND_HOST` | Web | :: | Address the web server binds. `::` is dual-stack, which is what lets the media server reach this container over the project's IPv6 private network while the IPv4 health check still answers. Do not set 0.0.0.0. |
| `DB_WAIT_JS` | Web | const net = require("net");const s = net.connect(Number(process.env.DB_WAIT_PORT), process.env.DB_WAIT_HOST);s.on("connect", function () { s.end(); process.exit(0); });s.on("error", function () { process.exit(1); }); | One-line Node probe the start command runs in a loop until MySQL accepts connections. Cap migrates the database on boot and gives up after three tries, so this is what keeps a cold start from racing the database. |
| `DATABASE_URL` | Web | - | MySQL connection string, over the private network. Cap requires MySQL — it is not Postgres-compatible. |
| `DB_WAIT_HOST` | Web | - | Host the start command waits for before booting. Points at MySQL's private domain. |
| `DB_WAIT_PORT` | Web | 3306 | Port the start command waits for before booting. |
| `GROQ_API_KEY` | Web | (secret) | Groq key. Enables AI titles and summaries; Cap prefers this over OpenAI. |
| `NEXTAUTH_URL` | Web | - | Must match WEB_URL. NextAuth builds its callback URLs from this. |
| `S3_PATH_STYLE` | Web | true | Keep this on. Railway storage answers both URL shapes but only sends CORS headers on the path-style one, and the browser uploads recordings directly to the bucket — with virtual-hosted URLs every upload fails in the browser while curl still reports 200. |
| `CAP_AWS_BUCKET` | Web | - | Railway Storage bucket holding recordings, thumbnails and exports. |
| `CAP_AWS_REGION` | Web | - | Bucket region. |
| `OPENAI_API_KEY` | Web | (secret) | OpenAI key. Fallback for AI summaries. |
| `RESEND_API_KEY` | Web | (secret) | Resend API key. Without it, login codes are printed to this service's deploy log instead of emailed — usable, but it means anyone with log access can sign in as anyone. Cap sends email through Resend only; there is no generic SMTP option. |
| `NEXTAUTH_SECRET` | Web | (secret) | Signs session tokens. Changing it logs everyone out. |
| `ASSEMBLY_API_KEY` | Web | (secret) | AssemblyAI key. Enables automatic transcription and captions. |
| `GOOGLE_CLIENT_ID` | Web | - | Google OAuth client id, to offer Sign in with Google. The callback URL is WEB_URL + /api/auth/callback/google. |
| `MEDIA_SERVER_URL` | Web | - | Private address of the media server that runs ffmpeg. |
| `ANTHROPIC_API_KEY` | Web | (secret) | Anthropic key. Used for Cap's AI chat. |
| `CAP_AWS_ACCESS_KEY` | Web | - | Bucket access key. |
| `CAP_AWS_SECRET_KEY` | Web | (secret) | Bucket secret key. |
| `RESEND_FROM_DOMAIN` | Web | - | Domain verified in Resend that login and notification email is sent from. |
| `S3_PUBLIC_ENDPOINT` | Web | - | Endpoint used for the URLs the browser talks to. |
| `GOOGLE_CLIENT_SECRET` | Web | (secret) | Google OAuth client secret. |
| `S3_INTERNAL_ENDPOINT` | Web | - | Endpoint used for server-side calls. Same host here; the split exists for setups where internal traffic is cheaper. |
| `DATABASE_ENCRYPTION_KEY` | Web | - | 32 bytes of hex. Encrypts stored credentials, such as the S3 keys of a custom bucket a user connects. Losing it makes those unreadable — back it up before rotating. |
| `MEDIA_SERVER_WEBHOOK_URL` | Web | - | Where the media server posts transcoding progress back to. This is the private address of this service — it only works because BIND_HOST is dual-stack. |
| `CAP_VIDEOS_DEFAULT_PUBLIC` | Web | true | Whether a new recording is viewable by anyone holding its link. This is upstream's default; set it to false to make every recording private until it is shared. |
| `CAP_ALLOWED_SIGNUP_DOMAINS` | Web | - | Comma-separated email domains permitted to register, e.g. `yourcompany.com`. Empty means anyone who reaches the login page may create an account — though they still need the code, which only appears in this service's logs until SMTP is configured. |
| `MEDIA_SERVER_WEBHOOK_SECRET` | Web | (secret) | Shared secret authenticating the media server's callbacks. It must match the media server's copy exactly; if either side is missing it, every progress callback is rejected with 401 and processing silently never finishes. |
| `PORT` | MediaServer | 3456 | Port the media server listens on. Bun binds dual-stack by itself, so this one needs no start command of its own. |
| `MEDIA_SERVER_WEBHOOK_SECRET` | MediaServer | (secret) | Shared secret for calling back into the web service. Referenced from Web so the two always match — a mismatch means processing never reports finishing. |
| `PORT` | MySQL | 3306 | MySQL port, private to this project. No public TCP proxy is created. |
| `MYSQL_USER` | MySQL | (secret) | Application user created on first boot. |
| `MYSQL_DATABASE` | MySQL | cap | Database created on first boot. The web service's DATABASE_URL points at this name. |
| `MYSQL_PASSWORD` | MySQL | (secret) | Password for the application user. Letters and digits only, because it is embedded in a connection URL. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | MySQL root password. Not used by the application. |

## Configuration

- **Start command:** `sh -c 'for i in $(seq 1 90); do [ -n "$DB_WAIT_JS" ] && node -e "$DB_WAIT_JS" 2>/dev/null && break; echo "waiting for mysql ($i/90)"; sleep 2; done; exec env HOSTNAME="$BIND_HOST" node apps/web/server.js'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --skip-log-bin --performance-schema=OFF --max-connections=500 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cap-screen-recorder)
