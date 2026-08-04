# Deploy Rocket.Chat — Self-Hosted Team Chat & Slack Alternative on Railway

Self-host Rocket.Chat — team messaging, video calls & channels

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat-team-chat)

## About

Rocket.Chat is the open-source alternative to Slack and Microsoft Teams — a complete team communication platform with channels, threads, direct messaging, voice and video calls, screen sharing, file sharing, and a 200+ app marketplace. This template deploys it with MongoDB correctly configured as a replica set — the hard requirement that breaks most self-hosted attempts — so real-time messaging works from the first deploy.

---

Rocket.Chat is feature-rich, but one MongoDB requirement determines whether it works at all — and it's the thing most self-hosted deploys get wrong.

**MongoDB must run as a replica set — even for a single node.** This is non-negotiable: Rocket.Chat relies on MongoDB change streams for real-time message delivery, and change streams only work when MongoDB runs as a replica set. A plain MongoDB deploy starts, but Rocket.Chat's real-time updates silently fail — messages don't appear live, which defeats the purpose. This template runs MongoDB with `--replSet rs0`, initializes it automatically, and points `MONGO_URL` and `MONGO_OPLOG_URL` at it with `?replicaSet=rs0` — the exact step naive deploys skip.

**`ROOT_URL` must be your Railway public domain.** Rocket.Chat builds links, upload URLs, and OAuth redirects from `ROOT_URL`, so it must match your Railway domain exactly, or invites and integrations break. This template sets it from your domain.

**All data lives in MongoDB — so backups are simple.** Uploads default to GridFS storage inside MongoDB, meaning messages, users, settings, and files all live in the one database. The Rocket.Chat container itself is stateless, so redeploys and upgrades are clean, and backing up MongoDB backs up everything.

**Complete the setup wizard on first open.** After deploy, open your Rocket.Chat URL and the Setup Wizard runs — create your admin account, name your organization, and configure the workspace. Then you land on the home screen ready to create channels and invite your team.

**It's a heavier app — size it right.** Rocket.Chat is feature-complete, so it wants resources. Small teams run on modest settings, but for 500+ concurrent users, plan for 4+ vCPU and 8+ GB RAM, with extra memory for MongoDB's working set.

Typical cost: **~$10–20/month** on Railway for Rocket.Chat and MongoDB, more for large teams. Rocket.Chat Community is MIT-licensed and free; the cloud plans bill ~$7/user/month.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rocket.Chat | `rocket.chat:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Rocket.Chat | 3000 | - |
| `NODE_OPTIONS` | Rocket.Chat | --max-old-space-size=1024 | - |
| `DEPLOY_METHOD` | Rocket.Chat | docker | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/rocketchat-team-chat)
