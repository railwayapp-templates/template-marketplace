# Deploy F1ReplayTiming on Railway

Visualisation of real-time track data and telemetry synced to F1 replays.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/f1replaytiming)

## About

**F1ReplayTiming** is a lightweight web application that synchronizes **Formula 1 replay timing and telemetry** with archived race sessions. It provides an interactive second-screen experience, allowing you to follow **driver positions, lap times, sector splits, tyre strategies, and race progression** alongside F1 replays.

[🎥 Video Preview](https://github.com/user-attachments/assets/5c62dcf8-3156-4079-96d1-bd24ce64ebda)

Deploying **F1ReplayTiming** on Railway is simple since the application runs as a **single standalone container** with **no external dependencies**. Railway handles deployment, networking, logging, automatic restarts, and scaling, so you can get an instance running in just a few clicks. Whether you're hosting it for yourself or sharing it with friends, Railway provides an easy way to keep your telemetry viewer online without managing your own infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| F1ReplayTiming | `ghcr.io/adn8naiagent/f1replaytiming:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/f1replaytiming)
