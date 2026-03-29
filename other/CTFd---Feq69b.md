# Deploy CTFd on Railway

An open-source platform to run capture-the-flag events.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Feq69b)

## About

CTFd is an open-source platform for running Capture The Flag (CTF) events. It provides a user-friendly web interface for administrators to create challenges and manage participants, and for players to submit flags and track their standings on a live scoreboard. It has been used to host some of the largest CTF events in the world.

This Railway template deploys the official CTFd Docker image as a single service, using SQLite for storage — no external database or cache required. CTFd is configured behind Railway's proxy and is reachable on a Railway-provided HTTPS domain immediately after deployment. The initial setup wizard runs on first launch to configure the event name, mode, and admin credentials. For larger or longer-running events, upgrading to an external MySQL and Redis backend is recommended.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ctfd | `ctfd/ctfd` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Default port |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/Feq69b)
