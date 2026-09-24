# Deploy Parse Server on Railway

Parse Server 8.6 backend with Parse Dashboard and MongoDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parse-server-1)

## About

Parse Server is an open-source backend framework that gives apps a ready-made API for data, users and authentication, files, push notifications, live queries and Cloud Code. SDKs for JavaScript, iOS, Android, Flutter, .NET and PHP talk to it directly, so mobile and web apps can ship without writing a custom backend.

This template deploys Parse Server 8.6.94 and Parse Dashboard 9.2.0 with a Railway MongoDB database. The application ID, master key, dashboard password and cookie secret are generated at deploy time. Clients cannot create new classes; create them with the master key or the dashboard. The dashboard runs in your browser and sends the master key from there, so the master key IP allow list is open (including IPv4-mapped IPv6 addresses), and the key must stay secret. The dashboard login is `admin`. Both run comfortably on the Hobby plan. Back up MongoDB regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| parse | `parseplatform/parse-server:8.6.94` | Web service |
| dashboard | `parseplatform/parse-dashboard:9.2.0` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | parse | 1337 |
| `PARSE_SERVER_URL` | parse | http://localhost:1337/parse |
| `PARSE_SERVER_HOST` | parse | :: |
| `PARSE_SERVER_MOUNT_PATH` | parse | /parse |
| `PARSE_SERVER_MASTER_KEY_IPS` | parse | 0.0.0.0/0,::0,::ffff:0:0/96 |
| `PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION` | parse | false |
| `PORT` | dashboard | 4040 |
| `PARSE_DASHBOARD_USER_ID` | dashboard | admin |
| `PARSE_DASHBOARD_APP_NAME` | dashboard | Parse on Railway |
| `PARSE_DASHBOARD_TRUST_PROXY` | dashboard | 1 |
| `PARSE_DASHBOARD_USER_PASSWORD` | dashboard | (secret) |
| `PARSE_DASHBOARD_COOKIE_SESSION_SECRET` | dashboard | (secret) |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Healthcheck:** `/parse/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/login`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/parse-server-1)
