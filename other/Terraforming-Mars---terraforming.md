# Deploy Terraforming Mars on Railway

An open-source online implementation of the board game Terraforming Mars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/terraforming)

## About

This is an open-source online implementation of the great board game Terraforming Mars. It is not affiliated with FryxGames, Asmodee Digital or Steam in any way.

Note: This project has no affiliation with "Rebalanced Mars", whose authors have refused to open-source their code. We believe this is both a violation of our GPL3 license, and also of the spirit of collaboration that this project tries to foster. Note that any new features you see on this repo made available on that server are without our permission.

The board game is great and this repository highly recommends purchasing it for personal use.

Terraforming is a full-stack web application that provides online multiplayer gameplay for Terraforming Mars. Hosting Terraforming requires running the Node.js application server, serving the web client, and maintaining a PostgreSQL database for game state, users, and historical data. Railway simplifies deployment by managing infrastructure, networking, environment variables, and database provisioning in a single platform. Whether you're hosting a private server for friends, a community instance, or a public deployment, Railway makes it easy to launch, scale, and maintain a reliable Terraforming server without managing your own virtual machines or container infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Terraforming-mars | [terraforming-mars/terraforming-mars](https://github.com/terraforming-mars/terraforming-mars) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Vue, Less, JavaScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/terraforming)
