# Deploy Rocket.Chat | Self-Hosted Slack Alternative (MongoDB Replica Set) on Railway

Rocket.Chat 8.8 team chat with a self-initiating MongoDB replica set

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocketchat-workspace)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/rocketchat-workspace?utm_medium=integration&utm_source=button&utm_campaign=rocketchat-workspace)

[Rocket.Chat](https://rocket.chat/) is the open-source team chat platform and self-hosted Slack alternative: public and private channels, direct messages, threads, file sharing, audio and video calls, an omnichannel inbox for customer conversations, and integrations through webhooks, bots and a REST API. This template runs Rocket.Chat 8.8.1 on the official image with MongoDB 8.0 as a replica set that sets itself up, and creates your admin account on first boot, so there is no setup wizard to race through.

The stack is two services: Rocket.Chat and MongoDB.

- **Upstream's own image, pinned.** Rocket.Chat runs from the official `rocketchat/rocket.chat:8.8.1` image, unmodified. MongoDB 8.0 is the version Rocket.Chat 8.8 is built and tested against.
- **A replica set that sets itself up.** Rocket.Chat needs MongoDB running as a replica set for its real-time change streams. Here MongoDB initiates a single-node replica set on first boot, creates the root user, and comes back as primary after every restart and redeploy. No `rs.initiate()` by hand, no keyfile to manage.
- **Admin ready, wizard skipped.** The first boot creates the admin account from the `ADMIN_*` variables with a generated password, and marks the setup wizard as done. Nobody else can claim the workspace.
- **Files stored in MongoDB.** Uploads go to GridFS in the same database, so one volume holds all your data.
- **Private database.** MongoDB has auth on, a generated password, and is only reachable on Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rocket.Chat | `rocketchat/rocket.chat:8.8.1` | Web service |
| MongoDB | [nomideusz/rocketchat-railway](https://github.com/nomideusz/rocketchat-railway) (root: /mongodb) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Rocket.Chat | 3000 | Port Rocket.Chat listens on - leave as is |
| `BIND_IP` | Rocket.Chat | :: | Listen on IPv6 and IPv4 - Railway private networking is IPv6 |
| `ROOT_URL` | Rocket.Chat | - | Public URL of the workspace - set it to your custom domain after adding one |
| `MONGO_URL` | Rocket.Chat | - | MongoDB replica set on the private network (directConnection: single-node set) |
| `REG_TOKEN` | Rocket.Chat | (secret) | Optional Rocket.Chat Cloud registration token (push notifications, marketplace apps) |
| `ADMIN_NAME` | Rocket.Chat | Administrator | Admin display name |
| `ADMIN_PASS` | Rocket.Chat | - | Admin password, set on first boot only - copy it from here to log in, then change it in Rocket.Chat |
| `ADMIN_EMAIL` | Rocket.Chat | - | Admin email (optional) - used for password resets once SMTP is configured |
| `DEPLOY_METHOD` | Rocket.Chat | docker | Reported in Rocket.Chat statistics |
| `ADMIN_USERNAME` | Rocket.Chat | (secret) | Admin username, created on first boot |
| `DEPLOY_PLATFORM` | Rocket.Chat | railway | Reported in Rocket.Chat statistics |
| `OVERWRITE_SETTING_Show_Setup_Wizard` | Rocket.Chat | completed | Skips the setup wizard so the admin above can log in straight away |
| `MONGO_REPLICA_SET` | MongoDB | rs0 | Replica set name (Rocket.Chat needs a replica set for change streams) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Auto-generated MongoDB root password - set on first boot, do not change it afterwards |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB root user, created on first boot |

## Configuration

- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/db`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/rocketchat-workspace)
