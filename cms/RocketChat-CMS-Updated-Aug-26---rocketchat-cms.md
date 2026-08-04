# Deploy Rocket.Chat CMS [Updated Aug '26] on Railway

Rocket.Chat [Aug '26] (Real-Time Team Chat, Slack Alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat-cms)

## About

Rocket.Chat is the open-source team communication platform that replaces Slack and Microsoft Teams. Real-time messaging, threads, video calls, and omnichannel customer support, all running on infrastructure you control instead of a per-seat SaaS subscription.

Team chat platforms accumulate an enormous amount of sensitive material over time. Not just casual conversation, but decisions, credentials shared in a pinch, customer complaints, sometimes contract negotiations happening in a DM thread. Every bit of that lives somewhere, and with a SaaS platform, that somewhere is a vendor's infrastructure, not yours.

Slack's Pro plan runs $7.25 per user per month, before Enterprise Grid pricing for larger orgs. A 20-person team on Slack Pro clears $145 a month, every month, scaling directly with headcount. Rocket.Chat's core is open-source, no per-seat fee when you self-host it. The same 20-person team on self-hosted Rocket.Chat pays a flat Railway cost regardless of whether you're at 20 people or 200.

Here's the one technical detail worth understanding before deploying this template: it requires MongoDB configured as a replica set, not just a plain instance. Not a performance optimization, a hard requirement, confirmed directly in Rocket.Chat's own official `rocketchat-compose` reference repository. Real-time features (live message updates, typing indicators, presence) depend on MongoDB Change Streams, which only function on a replica set. Point Rocket.Chat at a plain non-replica-set MongoDB and it starts up fine, logs in fine, but real-time updates silently don't work, you'd have to refresh to see new messages. Railway has no native MongoDB plugin with replica-set support, so this template ships a custom MongoDB service that configures and initiates the replica set automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rocketchat-railway | [shruti060701/rocketchat-railway](https://github.com/shruti060701/rocketchat-railway) (root: /rocketchat) | Web service |
| independent-reverence | [shruti060701/rocketchat-railway](https://github.com/shruti060701/rocketchat-railway) (root: /mongodb) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ROOT_URL` | rocketchat-railway | - | Public URL this instance is reachable at. **Generate the domain BEFORE setting this**, or it resolves to `https://` with no host and crashes the app on boot. |
| `MONGO_URL` | rocketchat-railway | - | MongoDB connection string, must include the replica set name. Confirmed live resolves to `mongodb://independent-reverence.railway.internal:27017/rocketchat?replicaSet=rs0`. |
| `DEPLOY_METHOD` | rocketchat-railway | docker | Tells Rocket.Chat it's running via Docker, matches the official reference compose. |
| `MONGODB_ADVERTISED_HOSTNAME` | independent-reverence | - | Hostname the replica set member is registered under. Confirmed live resolves to `independent-reverence.railway.internal`. Must be reachable from the separate Rocket.Chat container, not `localhost`. |

## Configuration

- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/db`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rocketchat-cms)
