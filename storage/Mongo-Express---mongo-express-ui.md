# Deploy Mongo Express on Railway

Web admin interface for browsing and editing MongoDB data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongo-express-ui)

## About

Mongo Express is a web-based admin interface for MongoDB, written in Node.js and Express and open source since 2011. It puts the everyday chores — browsing collections, running a find query, fixing one wrong field, adding an index — in a browser tab instead of a shell. Teams reach for it when a MongoDB instance lives on a server nobody wants to SSH into, or when support needs to look up a record without holding database credentials.

Deploy Mongo Express on Railway and two services arrive wired together. **mongo-express** is the admin interface, built from the upstream repository and published on a Railway domain behind a sign-in page. **MongoDB** is a Railway-managed MongoDB 8.0 on its own volume, reachable only over the private network. The interface reads its connection string from the database service, so no credential is copied — and to self-host Mongo Express against a database you already run, you change that one variable.

![Diagram of the Mongo Express and MongoDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789389177/mongo-express-architecture.webp)

Mongo Express is a thin, stateless admin layer over the MongoDB driver. It holds no data of its own — every screen is read live from the server its connection string names, so it is safe to redeploy, repoint or delete.

- Browse every database and collection, with paging and sorting
- Create, edit and delete documents in a syntax-highlighting editor
- Key/value filters, MongoDB query documents and aggregation pipelines
- Create and drop indexes; view collection and index statistics
- Export a collection as JSON or CSV, import `mongoexport` output
- Manage GridFS buckets and their files
- Read-only and no-delete modes, enforced on the server

Two Railway services make that work. mongo-express runs the Node application, holds your browser session and owns the only public domain. MongoDB stores data on a volume at `/data/db` and is published only as `mongodb.railway.internal`, so the database itself is never exposed: the admin interface is the single front door, and it is behind a password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| mongo-express | [gridalpha/mongo-express-railway](https://github.com/gridalpha/mongo-express-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the entrypoint |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user, read by the entrypoint |
| `PORT` | mongo-express | 8081 | HTTP port the app listens on |
| `NODE_OPTIONS` | mongo-express | --dns-result-order=ipv6first | Prefer AAAA on private DNS |
| `ME_CONFIG_MONGODB_URL` | mongo-express | - | Database this UI administers |
| `ME_CONFIG_SITE_BASEURL` | mongo-express | / | Path the app is served from |
| `ME_CONFIG_AUTH_STRATEGY` | mongo-express | form | Sign-in page; basic or oidc also accepted |
| `ME_CONFIG_OPTIONS_READONLY` | mongo-express | false | Refuse every write, server-side |
| `ME_CONFIG_BASICAUTH_ENABLED` | mongo-express | true | Fallback auth if strategy is unset |
| `ME_CONFIG_HEALTH_CHECK_PATH` | mongo-express | /status | Anonymous health route |
| `ME_CONFIG_OPTIONS_NO_DELETE` | mongo-express | false | Allow edits, refuse deletions |
| `ME_CONFIG_OPTIONS_NO_EXPORT` | mongo-express | false | Hide the export buttons |
| `ME_CONFIG_SITE_COOKIESECRET` | mongo-express | (secret) | Signs cookies, keep stable |
| `ME_CONFIG_BASICAUTH_PASSWORD` | mongo-express | (secret) | Sign-in password |
| `ME_CONFIG_BASICAUTH_USERNAME` | mongo-express | (secret) | Sign-in username |
| `ME_CONFIG_DOCUMENTS_PER_PAGE` | mongo-express | 10 | Collection view page size |
| `ME_CONFIG_SITE_SESSIONSECRET` | mongo-express | (secret) | Signs sessions, keep stable |
| `ME_CONFIG_SITE_GRIDFS_ENABLED` | mongo-express | true | Show GridFS buckets and files |
| `ME_CONFIG_MONGODB_ENABLE_ADMIN` | mongo-express | true | List every database, not just one |
| `ME_CONFIG_MONGODB_WAIT_SECONDS` | mongo-express | 180 | Boot wait for MongoDB; 0 skips it |
| `ME_CONFIG_MONGODB_ALLOW_DISK_USE` | mongo-express | false | Lift aggregation memory limit |
| `ME_CONFIG_OPTIONS_CONFIRM_DELETE` | mongo-express | true | Confirmation modal before deleting |
| `ME_CONFIG_OPTIONS_NO_RAW_COMMAND` | mongo-express | false | Hide the raw command runner |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/mongo-express-ui)
