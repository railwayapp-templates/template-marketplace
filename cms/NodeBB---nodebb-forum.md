# Deploy NodeBB on Railway

Forum software for running your own community discussions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodebb-forum)

## About

NodeBB is an open-source forum platform written in Node.js. It gives a community threaded discussions, categories, tags, private messaging and notifications, and pushes all of it over websockets, so new posts and reply counts appear without anyone refreshing. Open-source projects, SaaS support communities and internal engineering teams use it for the long-form conversation that does not survive in a chat channel. It ships the moderation tooling most teams expect to buy: a per-category privilege matrix, a post queue holding new members' first contributions for approval, flagging, user groups and an IP blacklist. NodeBB 4 also speaks ActivityPub.

Self-host NodeBB on Railway and this template wires up the production shape: the NodeBB application built from a public GitHub repository, a MongoDB service holding every user, category and post, and a Redis service dedicated to sessions. Browser traffic reaches NodeBB over a generated `railway.app` domain, NodeBB talks to MongoDB across the private network, and sessions live in Redis so a redeploy never logs members out. A volume at `/data` keeps the configuration file, every uploaded avatar and attachment, and the record of any plugin installed from the admin panel. Deploy NodeBB, set an administrator password, and the forum is ready for its first topic.

![Diagram of the NodeBB, MongoDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787372288/nodebb-architecture.png)

A forum is a long-lived asset — the archive a community builds is worth more than any thread in it — which is the case for self-hosting rather than renting a platform that owns the data and the URLs. NodeBB is GPLv3 and keeps everything in a database you control. Running it properly means three parts, one Railway service each.

- **NodeBB** — the Node.js application, serving HTTP and websockets on port 4567 behind Railway's edge, built from a repository that layers a boot script over the official `ghcr.io/nodebb/nodebb` image.
- **MongoDB** — the primary data store: users, categories, topics, posts, privileges and settings. NodeBB supports MongoDB, PostgreSQL or Redis here, and MongoDB is what the NodeBB team runs itself.
- **Redis** — the session store. Keeping sessions off the primary database isolates login churn from post data and means a restart never signs anyone out.

Features worth knowing about:

- Real-time topics, notifications, presence and built-in chat over websockets
- Per-category privileges for read, post, reply, tag, moderate and delete
- Post queue, flag review, user groups, bans and IP blacklisting
- A plugin and theme marketplace installable from the admin panel, with SSO for GitHub, Google, Discord and SAML
- A documented Write API, webhooks, and ActivityPub federation

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| Redis | `redis:8.2` | Database |
| nodebb | [gridalpha/nodebb-railway](https://github.com/gridalpha/nodebb-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the server |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | nodebb | 4567 | HTTP port NodeBB listens on |
| `MONGO_URL` | nodebb | - | Primary database connection string |
| `REDISHOST` | nodebb | - | Session store host |
| `REDISPORT` | nodebb | - | Session store port |
| `NODEBB_SECRET` | nodebb | (secret) | Session signing key, must stay stable |
| `REDISPASSWORD` | nodebb | (secret) | Session store password |
| `NODEBB_ADMIN_EMAIL` | nodebb | - | First administrator email address |
| `NODEBB_ADMIN_PASSWORD` | nodebb | (secret) | First administrator password, change after login |
| `NODEBB_ADMIN_USERNAME` | nodebb | (secret) | First administrator username |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nodebb-forum)
