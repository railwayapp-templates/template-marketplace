# Deploy Redlib on Railway

An alternative private front-end to Reddit, with its origins in Libreddit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redlib)

## About

Redlib is a private, lightweight, and open-source front-end for Reddit. It allows you to browse Reddit without ads, tracking, or JavaScript. Redlib acts as a proxy, ensuring your privacy by preventing Reddit from tracking your IP address while offering a fast and clean user interface.

Hosting Redlib on Railway is simple and efficient because the application is stateless and does not require a database. It runs as a single Dockerized service that proxies requests to Reddit's servers. You can easily customize the behavior of your instance—such as default themes, banners, or content filters—using environment variables. Its lightweight architecture ensures fast performance and minimal resource usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redlib | `quay.io/redlib/redlib:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDLIB_SFW_ONLY` | off |
| `REDLIB_DEFAULT_WIDE` | off |
| `REDLIB_DEFAULT_THEME` | system |
| `REDLIB_DEFAULT_LAYOUT` | card |
| `REDLIB_DEFAULT_USE_HLS` | off |
| `REDLIB_DEFAULT_BLUR_NSFW` | off |
| `REDLIB_DEFAULT_POST_SORT` | hot |
| `REDLIB_DEFAULT_SHOW_NSFW` | off |
| `REDLIB_DEFAULT_FRONT_PAGE` | default |
| `REDLIB_DEFAULT_HIDE_SCORE` | off |
| `REDLIB_PUSHSHIFT_FRONTEND` | undelete.pullpush.io |
| `REDLIB_DEFAULT_HIDE_AWARDS` | off |
| `REDLIB_DEFAULT_BLUR_SPOILER` | off |
| `REDLIB_DEFAULT_COMMENT_SORT` | confidence |
| `REDLIB_DEFAULT_FIXED_NAVBAR` | on |
| `REDLIB_DEFAULT_AUTOPLAY_VIDEOS` | off |
| `REDLIB_ROBOTS_DISABLE_INDEXING` | off |
| `REDLIB_DEFAULT_HIDE_HLS_NOTIFICATION` | off |
| `REDLIB_DEFAULT_HIDE_SIDEBAR_AND_SUMMARY` | off |
| `REDLIB_DEFAULT_DISABLE_VISIT_REDDIT_CONFIRMATION` | off |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/redlib)
