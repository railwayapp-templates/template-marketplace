# Deploy WordPress | (Just Updated) CMS No Stranger Can Claim, With A Login Throttle on Railway

Installed and locked before first request, with a real login throttle

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-or-just-updated-cms-no-strange)

## About

WordPress is the content management system behind a large share of the web: pages, posts,
themes, 59,000+ plugins, a REST API, and a media library. This template runs WordPress 6.9.1
on PHP 8.3 with MariaDB 11.8, both on their own volumes, and it hands you a site that is
already installed with an administrator account of its own — nothing to claim, nothing to
finish in a setup wizard that the whole internet can reach.

Hosting WordPress means running PHP against a MySQL-compatible database, keeping the
uploads directory and the plugin/theme tree on durable storage, and putting the login page
on the public internet. On a platform that redeploys containers, three details decide
whether the result is safe and whether it keeps working:

- **The install screen is the front door.** A freshly deployed WordPress serves
  `/wp-admin/install.php` to whoever arrives first, and that visitor becomes an
  administrator. The URL exists before you open it.
- **The client address is not what the container sees.** Railway terminates TLS at its edge
  and reaches the container from an address that changes between requests, so anything
  keyed on `REMOTE_ADDR` — comment records, security plugins, rate limits — is recording a
  proxy hop rather than a visitor.
- **Everything mutable lives in one directory.** `wp-content` holds uploads, plugins and
  themes, and `wp-config.php` holds the keys that sign every session cookie. Without a
  volume mounted at the web root, a redeploy takes them all.

This template settles all three before the first request is served: WordPress is installed
and the administrator seeded while Apache is still stopped, the real visitor address is
restored from the forwarding header for every plugin that reads it, failed logins are
throttled per client, and `/var/www/html` and `/var/lib/mysql` each sit on a volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.8.3` | Database |
| wordpress | `ghcr.io/bon5co/wordpress-railway:6.9.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `WORDPRESS_AUTH_KEY` | wordpress | (secret) |
| `WORDPRESS_DB_PASSWORD` | wordpress | (secret) |
| `WORDPRESS_ADMIN_PASSWORD` | wordpress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | wordpress | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-or-just-updated-cms-no-strange)
