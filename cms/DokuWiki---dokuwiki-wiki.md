# Deploy DokuWiki on Railway

Wiki that keeps every page as a plain text file, no database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dokuwiki-wiki)

## About

DokuWiki is an open-source wiki engine that stores every page, revision and upload as a plain file on disk — no database to administer, back up or migrate. Created by Andreas Gohr in 2004 and still actively released, it is what small teams reach for when they want a runbook or knowledge base that stays readable in a text editor and easy to move elsewhere. Access control lists, versioned pages with diffs, full-text search, a media manager and over 1,800 plugins come with the engine.

Self-host DokuWiki on Railway and you get two services. **dokuwiki** runs the official `dokuwiki/dokuwiki` image with a volume at `/storage` holding pages, revisions, media, the search index, accounts and configuration. **mailpit** is a real SMTP server on the private network, so password resets, the *Notify user* box in the User Manager and page-change subscriptions deliver instead of failing silently — the upstream image ships no mail transport. The wiki is installed, the superuser exists and the installer is closed before the first request arrives, so no stranger can claim your instance.

![Diagram of the DokuWiki and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789524307/dokuwiki-architecture.webp)

DokuWiki's defining decision is the absence of a database. A page is a `.txt` file, an old revision a gzipped file beside it, an upload just a file, and accounts live in one `users.auth.php`. Backing the wiki up is copying a directory; auditing it is `git diff`. That suits teams who want docs they can still read in ten years, and nobody who needs real-time collaborative editing or a Notion-grade WYSIWYG editor.

Key features:

- Versioned pages with diffs, restore and an "old revisions" browser
- Namespaces, groups and per-namespace access control lists
- Full-text search, and a media manager with ImageMagick thumbnailing
- Pluggable auth: local file, LDAP/Active Directory or SQL via `authpdo`
- 1,800+ plugins and dozens of templates, installed from the admin panel
- E-mail subscriptions per page or namespace, with digest and list modes

Architecture on Railway is deliberately small. **dokuwiki** is PHP 8.4 under Apache with mod_php, on port 8080 and health-checked at `/healthz`; its volume is the entire data store. **mailpit** captures everything the wiki sends and exposes a web inbox, with its own volume so mail survives a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| dokuwiki | [gridalpha/dokuwiki-railway](https://github.com/gridalpha/dokuwiki-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Required SMTP credentials |
| `SMTP_PASSWORD` | mailpit | (secret) | SMTP password the wiki uses |
| `SMTP_USERNAME` | mailpit | (secret) | SMTP account the wiki uses |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP bind address, dual stack |
| `SMTP_PRIVATE_HOST` | mailpit | mailpit.railway.internal | Private hostname for the wiki |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow SMTP auth without TLS |
| `PORT` | dokuwiki | 8080 | Apache listening port |
| `DOKUWIKI_LANG` | dokuwiki | en | Interface language code |
| `DOKUWIKI_TITLE` | dokuwiki | DokuWiki | Wiki name in the header |
| `DOKUWIKI_LICENSE` | dokuwiki | cc-by-sa | Content license shown in the footer |
| `DOKUWIKI_MAIL_FROM` | dokuwiki | - | Sender on outgoing mail |
| `DOKUWIKI_SMTP_HOST` | dokuwiki | - | SMTP server hostname |
| `DOKUWIKI_SMTP_PORT` | dokuwiki | 1025 | SMTP server port |
| `DOKUWIKI_SMTP_USER` | dokuwiki | (secret) | SMTP account name |
| `DOKUWIKI_ACL_POLICY` | dokuwiki | closed | closed, public or open |
| `DOKUWIKI_ADMIN_NAME` | dokuwiki | Administrator | Superuser display name |
| `DOKUWIKI_ADMIN_USER` | dokuwiki | (secret) | Superuser login, first boot only |
| `DOKUWIKI_ADMIN_EMAIL` | dokuwiki | admin@example.com | Superuser notification address |
| `DOKUWIKI_SUBSCRIBERS` | dokuwiki | true | Enable page-change e-mail subscriptions |
| `DOKUWIKI_SMTP_PASSWORD` | dokuwiki | (secret) | SMTP account password |
| `DOKUWIKI_ADMIN_PASSWORD` | dokuwiki | (secret) | Superuser password, first boot only |
| `DOKUWIKI_ALLOW_REGISTER` | dokuwiki | false | Let visitors register themselves |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/storage`

**Category:** CMS · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dokuwiki-wiki)
