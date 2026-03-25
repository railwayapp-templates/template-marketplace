# Deploy BeamMP | BeamNG.drive on Railway

A BeamMP server for BeamNG.drive multiplayer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beammp)

## About

BeamMP is a multiplayer mod for BeamNG.drive that lets players connect to servers and drive together in real-time with realistic vehicle physics, customizable settings, and community-driven gameplay for racing, stunts, and exploration.

Hosting a BeamMP server on Railway allows you to create your own multiplayer world where you control the settings, mods, maps, and player limits. Railway provides a cloud-based infrastructure to run your server 24/7 without needing a home computer. The deployment process automatically packages and runs your server in the cloud. Railway handles networking, backups, and monitoring while you focus on managing your community and players.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| BeamMP | [MarcBlattmann/BeamMP_Server](https://github.com/MarcBlattmann/BeamMP_Server) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BEAMMP_NAME` | My Railway BeamMP Server | Your server name in the browser |
| `BEAMMP_PORT` | 30814 | Connection port (should be 30814) |
| `BEAMMP_DEBUG` | false | Extra logging for troubleshooting |
| `BEAMMP_PRIVATE` | false | Is it public (anyone) or private (friends only)? |
| `BEAMMP_AUTH_KEY` | (secret) | Get your auth key at https://keymaster.beammp.com/ |
| `BEAMMP_MAX_CARS` | 100 | Total vehicles allowed on server |
| `BEAMMP_DESCRIPTION` | A BeamMP server hosted on Railway | Info about your server (public list) |
| `BEAMMP_MAX_PLAYERS` | 10 | Max people at once |

## Configuration

- **TCP Proxies:** 30814

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/beammp)
