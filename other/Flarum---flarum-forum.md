# Deploy Flarum on Railway

Forum software for running a community discussion board

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flarum-forum)

## About

Flarum is open-source forum software for communities that want a discussion board people enjoy using. It renders as a single-page app, so threads open instantly and it works on a phone without a separate mobile theme. Product teams run it as a support community, open-source projects use it for user Q&A, and hobby groups use it because a forum keeps knowledge searchable in a way chat never does. It is MIT-licensed PHP, and its extension system means most of what a bigger platform bundles can be added — or left out — a package at a time.

Deploy Flarum on Railway and the whole stack is wired together on the first click. The forum service runs nginx and PHP-FPM behind a public HTTPS domain, keeps avatars, uploads and installed extensions on a persistent volume, and runs Flarum's scheduler in the same container. A managed MySQL service stores discussions, posts and accounts, reached over the private network through a database-scoped account rather than the superuser. A Mailpit service catches everything the forum sends — sign-up confirmations, password resets, notifications — so registration works the moment the deployment is live.

![Diagram of the Flarum, MySQL and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787665032/flarum-architecture.png)

Flarum replaces the heavyweight forum software most communities inherited — phpBB, vBulletin, an abandoned Discourse instance — with something one person can look after. The server side is plain PHP against MySQL: no background job runner, no search cluster, no Rails upgrade cycle. The operational surface is a web server and a database.

Features that ship in the bundled extension set:

- Markdown and BBCode formatting, with mentions that notify people directly
- Tags for categorising discussions, including nested and restricted tags
- Likes, flags, sticky and locked threads, post approval and suspensions
- A permission matrix mapping groups to every action on the forum
- An extension manager that installs from Packagist without shell access

The deployment splits into three services: the forum, which holds the volume; MySQL, which holds every discussion, post, user and setting; and Mailpit, which terminates SMTP privately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| flarum | [gridalpha/flarum-railway](https://github.com/gridalpha/flarum-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `TZ` | mailpit | UTC | Container timezone |
| `PORT` | mailpit | 8025 | Port the web inbox listens on |
| `MP_UI_AUTH` | mailpit | - | Username and password for the web inbox |
| `MP_WEBROOT` | mailpit | / | Path the inbox is served from |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before the oldest are dropped |
| `TZ` | flarum | UTC | Container timezone |
| `PORT` | flarum | 8000 | Port nginx serves the forum on |
| `DB_HOST` | flarum | - | Private MySQL hostname |
| `DB_NAME` | flarum | flarum | Database created for the forum |
| `DB_PORT` | flarum | 3306 | MySQL port |
| `DB_USER` | flarum | (secret) | Scoped account created for the forum |
| `SMTP_HOST` | flarum | - | Mail host seeded into Flarum settings |
| `SMTP_PORT` | flarum | 1025 | Mail port seeded into Flarum settings |
| `LOG_IP_VAR` | flarum | real_client_ip | nginx variable holding the real client address |
| `DB_PASSWORD` | flarum | (secret) | Password for that scoped account |
| `MEMORY_LIMIT` | flarum | 512M | PHP memory limit per worker |
| `CRON_SCHEDULE` | flarum | * * * * * | How often the Flarum scheduler runs |
| `FLARUM_BASE_URL` | flarum | - | Public URL for every generated link |
| `MYSQL_ROOT_USER` | flarum | (secret) | Superuser used only to create the role |
| `UPLOAD_MAX_SIZE` | flarum | 32M | Maximum upload and attachment size |
| `FLARUM_ADMIN_EMAIL` | flarum | admin@example.com | Address for password resets |
| `FLARUM_FORUM_TITLE` | flarum | My Forum | Forum name set at install |
| `MYSQL_ROOT_PASSWORD` | flarum | (secret) | Superuser password for that step |
| `FLARUM_ADMIN_PASSWORD` | flarum | (secret) | Password for the first administrator |
| `FLARUM_ADMIN_USERNAME` | flarum | (secret) | First administrator account |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/flarum-forum)
