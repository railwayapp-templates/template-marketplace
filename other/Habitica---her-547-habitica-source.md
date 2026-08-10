# Deploy Habitica on Railway

Deploy and Host Habitica with a persistent MongoDB backend.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/her-547-habitica-source)

## About

Habitica is an open-source habit-building and task-management application that turns daily goals into a role-playing game. This template provides a private Habitica service with a MongoDB replica set, durable database storage, managed HTTPS, and Railway private networking. It is designed for self-hosted productivity data and uses no customer, social, or production data during validation.

This template runs the pinned Habitica 5.48.8 server image as the only public service. The application listens on port `8080` inside Railway and is reachable through a generated HTTPS domain. A private MongoDB 8.0.11 service runs as a single-node `rs` replica set because Habitica uses MongoDB transactions; its `/data/db` path is mounted on one persistent Railway volume. Railway reference variables wire the app to MongoDB and its generated public domain, so clean deployments have no required manual variables. Email, payment, and external integration credentials are not preconfigured.

Back up the MongoDB volume before upgrades. Test major-version changes in a fresh project and preserve the matching image digest and data backup when rolling back.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mongo | `mongo:8.0.11@sha256:5941949d3887e40be5175787aade07dc052f2cddb8ce21b740c3948eba6a3ed0` | Database |
| Habitica | `awinterstein/habitica-server:5.48.8@sha256:1352a3e100b9f6c297086d58d23d5b520198aa186f5293e1d356ea531ec70bfd` | Web service |

## Configuration

- **Start command:** `sh -ec 'mongod --replSet rs --bind_ip_all --port 27017 & pid=$!; trap "kill $pid" TERM INT; until mongosh --port 27017 --quiet --eval '\''db.adminCommand({ ping: 1 }).ok'\'' >/dev/null 2>&1; do sleep 1; done; mongosh --port 27017 --quiet --eval "try { rs.status() } catch (err) { rs.initiate({ _id: '\''rs'\'', members: [{ _id: 0, host: '\''${RAILWAY_PRIVATE_DOMAIN}:27017'\'' }] }) }"; wait "$pid"'`
- **Volume:** `/data/db`
- **Start command:** `sh -c "perl -0pi -e 's/upgradeInsecureRequests: IS_PROD \\? \\[\\] : null,?/upgradeInsecureRequests: null/g' /var/lib/habitica/website/server/middlewares/index.js /var/lib/habitica/website/transpiled-babel/middlewares/index.js && printenv | grep -v 'no_proxy' >> /etc/environment && /etc/init.d/cron start && node /var/lib/habitica/website/transpiled-babel/index.js"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/her-547-habitica-source)
