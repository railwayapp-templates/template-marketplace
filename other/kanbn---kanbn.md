# Deploy kan.bn on Railway

The open-source project management alternative to Trello.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kanbn)

## About

**kan.bn** is a modern, open-source Kanban board application that brings powerful project management to your team. With features like board visibility controls, workspace collaboration, Trello imports, labels &amp; filters, comments, and detailed activity logging - all while maintaining full control over your data.

### Post-Deployment Setup

Once both services are running:

1.  Click on the `kanbn` service and visit the `.railway.app` domain generated for it — you can also generate your own if you’d like!
2.  Click on the **Get started** button to create an account. The first account created will be the admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| kanbn/kan:latest | `ghcr.io/kanbn/kan:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `S3_REGION` | kanbn/kan:latest | - | S3 storage region |
| `SMTP_HOST` | kanbn/kan:latest | - | SMTP server hostname |
| `SMTP_PORT` | kanbn/kan:latest | - | SMTP server port |
| `SMTP_USER` | kanbn/kan:latest | (secret) | SMTP username/email |
| `EMAIL_FROM` | kanbn/kan:latest | - | Sender email address |
| `S3_ENDPOINT` | kanbn/kan:latest | - | S3 endpoint URL |
| `SMTP_SECURE` | kanbn/kan:latest | - | Use secure SMTP connection (defaults to true if not set) |
| `POSTGRES_URL` | kanbn/kan:latest | - | PostgreSQL connection URL |
| `VK_CLIENT_ID` | kanbn/kan:latest | - | VK OAuth client ID |
| `GITLAB_ISSUER` | kanbn/kan:latest | - | GitLab OAuth issuer |
| `SMTP_PASSWORD` | kanbn/kan:latest | (secret) | SMTP password/token |
| `KICK_CLIENT_ID` | kanbn/kan:latest | - | Kick OAuth client ID |
| `ZOOM_CLIENT_ID` | kanbn/kan:latest | - | Zoom OAuth client ID |
| `APPLE_CLIENT_ID` | kanbn/kan:latest | - | Apple OAuth client ID |
| `GITHUB_CLIENT_ID` | kanbn/kan:latest | - | GitHub OAuth client ID |
| `GITLAB_CLIENT_ID` | kanbn/kan:latest | - | GitLab OAuth client ID |
| `GOOGLE_CLIENT_ID` | kanbn/kan:latest | - | Google OAuth client ID |
| `REDDIT_CLIENT_ID` | kanbn/kan:latest | - | Reddit OAuth client ID |
| `ROBLOX_CLIENT_ID` | kanbn/kan:latest | - | Roblox OAuth client ID |
| `S3_ACCESS_KEY_ID` | kanbn/kan:latest | - | S3 access key |
| `TIKTOK_CLIENT_ID` | kanbn/kan:latest | - | TikTok OAuth client ID |
| `TWITCH_CLIENT_ID` | kanbn/kan:latest | - | Twitch OAuth client ID |
| `VK_CLIENT_SECRET` | kanbn/kan:latest | (secret) | VK OAuth client secret |
| `DISCORD_CLIENT_ID` | kanbn/kan:latest | - | Discord OAuth client ID |
| `DROPBOX_CLIENT_ID` | kanbn/kan:latest | - | Dropbox OAuth client ID |
| `SPOTIFY_CLIENT_ID` | kanbn/kan:latest | - | Spotify OAuth client ID |
| `TIKTOK_CLIENT_KEY` | kanbn/kan:latest | - | TikTok OAuth client key |
| `TWITTER_CLIENT_ID` | kanbn/kan:latest | - | Twitter OAuth client ID |
| `BETTER_AUTH_SECRET` | kanbn/kan:latest | (secret) | Auth encryption secret |
| `KICK_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Kick OAuth client secret |
| `LINKEDIN_CLIENT_ID` | kanbn/kan:latest | - | LinkedIn OAuth client ID |
| `TRELLO_APP_API_KEY` | kanbn/kan:latest | (secret) | Trello app API key |
| `ZOOM_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Zoom OAuth client secret |
| `APPLE_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Apple OAuth client secret |
| `MICROSOFT_CLIENT_ID` | kanbn/kan:latest | - | Microsoft OAuth client ID |
| `GITHUB_CLIENT_SECRET` | kanbn/kan:latest | (secret) | GitHub OAuth client secret |
| `GITLAB_CLIENT_SECRET` | kanbn/kan:latest | (secret) | GitLab OAuth client secret |
| `GOOGLE_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Google OAuth client secret |
| `NEXT_PUBLIC_BASE_URL` | kanbn/kan:latest | - | Base URL of your installation |
| `REDDIT_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Reddit OAuth client secret |
| `ROBLOX_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Roblox OAuth client secret |
| `S3_SECRET_ACCESS_KEY` | kanbn/kan:latest | (secret) | S3 secret key	 |
| `TIKTOK_CLIENT_SECRET` | kanbn/kan:latest | (secret) | TikTok OAuth client secret |
| `TWITCH_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Twitch OAuth client secret |
| `DISCORD_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Discord OAuth client secret |
| `DROPBOX_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Dropbox OAuth client secret |
| `SPOTIFY_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Spotify OAuth client secret |
| `TRELLO_APP_API_SECRET` | kanbn/kan:latest | (secret) | Trello app API secret |
| `TWITTER_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Twitter OAuth client secret |
| `LINKEDIN_CLIENT_SECRET` | kanbn/kan:latest | (secret) | LinkedIn OAuth client secret |
| `MICROSOFT_CLIENT_SECRET` | kanbn/kan:latest | (secret) | Microsoft OAuth client secret |
| `BETTER_AUTH_TRUSTED_ORIGINS` | kanbn/kan:latest | - | Allowed callback origins |
| `NEXT_PUBLIC_DISABLE_SIGN_UP` | kanbn/kan:latest | - | Disable sign up |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | kanbn/kan:latest | (secret) | Allow email & password login |
| `NEXT_PUBLIC_AVATAR_BUCKET_NAME` | kanbn/kan:latest | - | S3 bucket name for avatars |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/kanbn)
