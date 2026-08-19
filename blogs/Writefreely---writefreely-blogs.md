# Deploy Writefreely on Railway

Medium alternative. Markdown blog platform that federates over ActivityPub

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/writefreely-blogs)

## About

WriteFreely is an open-source, Markdown-first publishing platform for people who want to write rather than administer a website. There are no themes to pick and no plugin marketplace — you open a page, type, and publish. Each blog is also an ActivityPub actor, so readers on Mastodon can follow it like a person, and every post carries an RSS feed. Writers' collectives, teams keeping a changelog, and people leaving Medium or Substack all use it because it is a small, quiet tool that outlives the company behind it.

Self-host WriteFreely on Railway and this template wires up the whole instance: the **WriteFreely** application built from the pinned upstream release, a managed **MySQL** database holding every account, blog and post, and a **Mailpit** service catching outgoing mail, so email subscriptions and password resets work from the first minute. Public traffic arrives over the Railway domain, the app reaches MySQL and Mailpit privately, and a volume keeps settings and keys across redeploys. Nothing needs editing by hand — the container writes its own configuration, derives its keys, creates the schema and creates your administrator account on first boot.

![WriteFreely Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787076128/0f839ce3-b146-44be-9aea-b654947cb8f8.png)

WriteFreely is a single Go binary serving blogs, an editor and a federation endpoint on top of a SQL database. It solves a narrow problem well: a durable place to publish that you control, without the weight of a general-purpose CMS. Teams self-host it for an engineering journal or a community of authors on one instance; individuals self-host it to own their archive.

Key features:

- Distraction-free Markdown editor with a draft-first workflow
- ActivityPub federation, so each blog is followable from Mastodon
- Multi-user instances with invite links and an instance-wide Reader
- Email subscriptions, RSS feeds and full post export
- Custom CSS, themes, password-protected blogs, and unlisted or private posts

The deployment is three services. **WriteFreely** serves reading and writing and runs its email queue in-process. **MySQL** stores everything durable — users, blogs, posts, followers, subscriptions — since post bodies live in the database, not on disk. **Mailpit** captures outgoing mail in a web inbox, and becomes a real relay once `MP_SMTP_RELAY_HOST` points at a provider. A small volume holds the config file and derived keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| writefreely | [gridalpha/writefreely-railway](https://github.com/gridalpha/writefreely-railway) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_WEBROOT` | mailpit | / | Web inbox base path |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listen address |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `MP_SMTP_AUTH_ACCEPT_ANY` | mailpit | true | Accept any SMTP credentials |
| `MP_DISABLE_VERSION_CHECK` | mailpit | true | Skip upstream version check |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow auth without TLS |
| `PORT` | writefreely | 8080 | HTTP listening port |
| `MYSQL_ROOT_URL` | writefreely | - | Provisions the app's scoped database user |
| `WRITEFREELY_BIND` | writefreely | 0.0.0.0 | Listen address |
| `WRITEFREELY_HOST` | writefreely | - | Public URL and federation identity |
| `WRITEFREELY_THEME` | writefreely | write | Built-in typographic theme |
| `WRITEFREELY_DB_NAME` | writefreely | writefreely | Application database name |
| `WRITEFREELY_DB_USER` | writefreely | (secret) | Scoped database user created at boot |
| `WRITEFREELY_PRIVATE` | writefreely | false | True requires login to read |
| `WRITEFREELY_DATA_DIR` | writefreely | /data | Volume holding config and keys |
| `WRITEFREELY_MAX_BLOGS` | writefreely | 10 | Blogs per user; 1 hides blog nav |
| `WRITEFREELY_SITE_DESC` | writefreely | A federated publishing platform for writers. | Site description metadata |
| `WRITEFREELY_SITE_NAME` | writefreely | WriteFreely | Public site title |
| `WRITEFREELY_SMTP_HOST` | writefreely | - | SMTP server for outgoing mail |
| `WRITEFREELY_SMTP_PASS` | writefreely | - | SMTP password |
| `WRITEFREELY_SMTP_PORT` | writefreely | 1025 | SMTP port on Mailpit |
| `WRITEFREELY_SMTP_USER` | writefreely | (secret) | SMTP username |
| `WRITEFREELY_ADMIN_PASS` | writefreely | - | First administrator password; no colons |
| `WRITEFREELY_ADMIN_USER` | writefreely | (secret) | First administrator; reserved names rejected |
| `WRITEFREELY_FEDERATION` | writefreely | true | Enable ActivityPub federation |
| `WRITEFREELY_KEYS_SECRET` | writefreely | (secret) | Seeds all encryption keys |
| `WRITEFREELY_SINGLE_USER` | writefreely | (secret) | True serves one blog at root |
| `WRITEFREELY_PUBLIC_STATS` | writefreely | true | Publish instance statistics |
| `WRITEFREELY_USER_INVITES` | writefreely | admin | Who may create invite links |
| `WRITEFREELY_SMTP_STARTTLS` | writefreely | false | Mailpit's plain listener offers no STARTTLS |
| `WRITEFREELY_UPDATE_CHECKS` | writefreely | true | Check upstream for new releases |
| `WRITEFREELY_LOCAL_TIMELINE` | writefreely | true | Enable the instance Reader |
| `WRITEFREELY_OPEN_REGISTRATION` | writefreely | false | Allow public account creation |
| `WRITEFREELY_DEFAULT_VISIBILITY` | writefreely | public | Default visibility for new posts |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Blogs · **Languages:** Go, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/writefreely-blogs)
