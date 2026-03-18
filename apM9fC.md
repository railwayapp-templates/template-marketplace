# Deploy GoToSocial on Railway

A fast, fun, and small ActivityPub server for the Fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/apM9fC)

## About

GoToSocial is an ActivityPub social network server, written in Golang. GoToSocial provides a lightweight, customizable, and safety-focused entryway into the Fediverse. With GoToSocial, you can keep in touch with your friends, post, read, and share images and articles. All without being tracked or advertised to!

## IMPORTANT DEPLOYMENT STEPS

1. After the first deployment succeeds, you will need to create your first user. This must be done from the command line. Open the GoToSocial container's settings, and add a start command that says `/gotosocial/gotosocial admin account create --username some_username --email someone@example.org --password 'some_very_good_password'`
2. Redeploy, and wait a little bit to be confident the command has completed
3. Delete the start command to revert it to default
4. Before seriously using the fediverse, [**configure a custom domain**](https://docs.railway.app/guides/public-networking#custom-domains) — it will be hard to switch off the railway provided one later

## Features

You can follow people and have followers, you make posts which people can favourite and reply to and share, and you scroll through posts from people you follow using a timeline.

You can write long posts or short posts, or just post images, it's up to you.

You can also, of course, block people or otherwise limit interactions that you don't want by posting just to your friends.

GoToSocial is not designed for 'must-follow' influencers with tens of thousands of followers, and it's not designed to be addictive.

Your timeline and your experience are shaped by who you follow and how you interact with people, not by metrics of engagement!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| GoToSocial | `superseriousbusiness/gotosocial:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | GoToSocial | 8080 | - |
| `GTS_DB_TYPE` | GoToSocial | postgres | - |
| `GTS_DB_USER` | GoToSocial | (secret) | - |
| `GTS_DB_PASSWORD` | GoToSocial | (secret) | - |
| `GTS_LETSENCRYPT_ENABLED` | GoToSocial | false | - |
| `GTS_STORAGE_LOCAL_BASE_PATH` | GoToSocial | /home/gotosocial/storage | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | GoToSocial | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/gotosocial/storage`

**Category:** Blogs

[View on Railway →](https://railway.com/template/apM9fC)
