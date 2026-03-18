# Deploy ArchiveTeam Warrior on Railway

Preserve web content via distributed archiving projects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archiveteam-warrior)

## About

The ArchiveTeam Warrior is a virtual archiving appliance that allows anyone to contribute to large-scale web preservation efforts. It runs distributed "warrior" projects to grab and save websites at risk of disappearing, uploading data to the Internet Archive's Wayback Machine.

Hosting the ArchiveTeam Warrior on Railway is straightforward and requires no maintenance. Using the official pre-built Docker image, you can deploy a fully functional instance in minutes. The Warrior automatically selects urgent projects (or lets you choose one), downloads items using a custom wget variant, and uploads completed archives. Railway handles scaling, networking, and restarts. Configure via environment variables for your nickname (required for leaderboard credit), project selection, and concurrency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| archiveteam-warrior-railway | [decoge/archiveteam-warrior-railway](https://github.com/decoge/archiveteam-warrior-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DOWNLOADER` | decoge | Your nickname/username – appears on the leaderboard for credit |
| `HTTP_PASSWORD` | (secret) | - |
| `HTTP_USERNAME` | (secret) | - |
| `CONCURRENT_ITEMS` | 6 | - |
| `SELECTED_PROJECT` | auto | - |
| `SHARED_RSYNC_THREADS` | 20 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/archiveteam-warrior)
