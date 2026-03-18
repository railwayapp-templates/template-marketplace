# Deploy FreeScout on Railway

Free Self-Hosted Zendesk & Help Scout Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cgZiHc)

## About

**FreeScout** is the super lightweight and powerful free open source help desk and shared inbox built with PHP (Laravel framework). Now you can enjoy free Zendesk & Help Scout without giving up privacy or locking yourself into a service you don't control. FreeScout has been developed from scratch and is not using any copyrighted Help Scout or Zendesk materials.

## Railway Instructions

If you are using a custom domain, update the `SITE_URL` to your custom domain's URL.

## Features

  * No limitations on the number of users, tickets, mailboxes, etc.
  * 100% Mobile-friendly.
  * Multilingual: English, Chinese, Croatian, Czech, Danish, Dutch, Finnish, French, German, Italian, Japanese, Kazakh, Korean, Norwegian, Persian, Polish, Portuguese, Russian, Spanish, Slovak, Swedish, Turkish.
  * Seamless email integration.
  * Supports modern Microsoft Exchange authentication.
  * Fully supports screen readers (for visually impaired).
  * Built with strong focus on [security](https://freescout.net/security).
  * Web installer & updater.
  * Starred conversations.
  * Forwarding conversations.
  * Merging conversations.
  * Moving conversations between mailboxes.
  * Phone conversations.
  * Sending new conversations to multiple recipients at once.
  * Collision detection – notice is shown when two agents open the same conversation.
  * Push notifications.
  * Following a conversation.
  * Auto reply.
  * Internal notes.
  * Automatic refreshing of the conversations list without the need to reload the page.
  * Pasting screenshots from the clipboard into the reply area.
  * Configuring notifications on a per user basis.
  * Open tracking.
  * Editing threads.
  * Search.
  * And more…

Need anything else? Suggest features [here](https://freescout.net/request-feature/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freescout-db | `tiredofit/mariadb` | Database |
| freescout-app | `tiredofit/freescout` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_NAME` | freescout-db | freescout |
| `DB_USER` | freescout-db | (secret) |
| `CONTAINER_NAME` | freescout-db | freescout-db |
| `PORT` | freescout-app | 80 |
| `DB_HOST` | freescout-app | freescout-db |
| `DB_NAME` | freescout-app | freescout |
| `DB_USER` | freescout-app | (secret) |
| `TIMEZONE` | freescout-app | America/Vancouver |
| `CONTAINER_NAME` | freescout-app | freescout-app |
| `DISPLAY_ERRORS` | freescout-app | FALSE |
| `ENABLE_SSL_PROXY` | freescout-app | FALSE |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cgZiHc)
