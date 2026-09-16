# Deploy Isso on Railway

Commenting server that adds a comment box to any web page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/isso)

## About

Isso is a commenting server that gives a static site the discussion thread a site generator can't provide. Drop one `
<section id="isso-thread"></section>
```

Add that page's origin to `ISSO_HOST` first, or the browser blocks the request.

Running Isso elsewhere means the same image plus a configuration file. This starts it with Docker, mounting a config directory and a database directory:

```
mkdir -p config db
curl -o config/isso.cfg \
  https://raw.githubusercontent.com/isso-comments/isso/master/contrib/isso.sample.cfg

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| isso | [gridalpha/isso-railway](https://github.com/gridalpha/isso-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | isso | 8080 | HTTP port gunicorn binds |
| `ISSO_HOST` | isso | - | Sites allowed to embed comments |
| `ISSO_NOTIFY` | isso | smtp | Notification backend for new comments |
| `ISSO_DB_PATH` | isso | /db/comments.db | SQLite database on the volume |
| `ISSO_MAX_AGE` | isso | 15m | Window for editing your own comment |
| `ISSO_SMTP_TO` | isso | - | Recipient of moderation mail |
| `ISSO_WORKERS` | isso | 4 | gunicorn worker processes |
| `ISSO_GRAVATAR` | isso | false | Use Gravatar instead of identicons |
| `ISSO_RSS_BASE` | isso | - | Atom feed base URL, defaults to first host |
| `ISSO_SAMESITE` | isso | - | Override the session cookie SameSite value |
| `ISSO_HASH_SALT` | isso | - | Salt for stored commenter email hashes |
| `ISSO_RSS_LIMIT` | isso | 100 | Entries returned per thread feed |
| `ISSO_SMTP_FROM` | isso | - | Sender of notification mail |
| `ISSO_SMTP_HOST` | isso | - | SMTP server hostname |
| `ISSO_SMTP_PORT` | isso | 1025 | SMTP server port |
| `ISSO_ACCESS_LOG` | isso | true | Write gunicorn access logs to stdout |
| `ISSO_MODERATION` | isso | true | Hold new comments for approval |
| `ISSO_PURGE_AFTER` | isso | 30d | Drop unmoderated comments after this |
| `ISSO_ADMIN_ENABLED` | isso | true | Serve the administration page |
| `ISSO_GUARD_ENABLED` | isso | true | Enable the built-in spam guard |
| `ISSO_SMTP_PASSWORD` | isso | (secret) | SMTP password, blank for Mailpit |
| `ISSO_SMTP_SECURITY` | isso | none | SMTP transport security |
| `ISSO_SMTP_USERNAME` | isso | (secret) | SMTP username, blank for Mailpit |
| `ISSO_ADMIN_PASSWORD` | isso | (secret) | Password for the /admin/ page |
| `ISSO_LATEST_ENABLED` | isso | false | Expose the cross-thread /latest endpoint |
| `ISSO_GUARD_RATELIMIT` | isso | 2 | New comments per minute per client |
| `ISSO_MARKUP_RENDERER` | isso | mistune | Markdown rendering engine |
| `ISSO_PUBLIC_ENDPOINT` | isso | - | Public URL Isso is reached at |
| `ISSO_GUARD_DIRECT_REPLY` | isso | 3 | Direct replies allowed per thread |
| `ISSO_GUARD_REPLY_TO_SELF` | isso | false | Allow replying to your own comment |
| `ISSO_GUARD_REQUIRE_EMAIL` | isso | false | Require an email on every comment |
| `ISSO_REPLY_NOTIFICATIONS` | isso | true | Let commenters subscribe to replies |
| `ISSO_GUARD_REQUIRE_AUTHOR` | isso | false | Require a name on every comment |
| `ISSO_APPROVE_IF_EMAIL_PREVIOUSLY_APPROVED` | isso | false | Auto-approve known commenters |
| `PORT` | mailpit | 8025 | HTTP port the inbox is served on |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before the oldest are dropped |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listen address, dual-stack for peers |

## Configuration

- **Healthcheck:** `/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/db`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Blogs · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/isso)
