# Deploy EmDash on Railway

EmDash CMS with its admin behind a password and the database on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emdash)

## About

[EmDash](https://github.com/emdash-cms/emdash) is a full-stack TypeScript CMS built on Astro, pitched as a modern successor to WordPress: posts and pages with a visual editor, media, taxonomies, scheduled publishing, plugins, and passkey logins instead of passwords. This template runs EmDash 1.3.0 with its blog starter on Node.js 24, with the database and uploads on a volume.

EmDash's first-run setup wizard makes whoever opens the admin first the site's admin. On a public URL, that's a race with anyone scanning new domains. So the template puts Caddy in front of EmDash: the admin pages and the setup API ask for `ADMIN_GATE_USER` and the generated `ADMIN_GATE_PASSWORD` first, and EmDash's own passkey login comes after that. The public site, its media and the setup status stay open.

Two things in EmDash's own setup didn't fit Railway as-is. Its Dockerfile builds the whole monorepo with a 4 GB Node heap; this template builds just the blog starter at a pinned commit. And Astro bakes the path of its session store into the build, so the app is built in the same folder it runs from, or passkey sign-up fails. The SQLite database and uploaded media live on the volume at `/data`. `EMDASH_ENCRYPTION_KEY`, which encrypts plugin secrets, is generated at deploy in EmDash's canonical format.

Before publishing I tested it on Railway, in a real browser. The site loaded with the starter's sample posts, and the admin answered 401 without the gate login and opened with it. I ran EmDash's setup wizard (site title, account, then a passkey from Chrome's virtual authenticator, as you would with Touch ID or Windows Hello), and EmDash reported setup complete. With that session I created a post through EmDash's content API and published it, and it showed at `/posts/hello-from-railway` on the public site along with the new site title. After a restart, setup was still complete and the title and post were still there.

It used about 0.16 GB of RAM, under $2 a month on Railway's usage pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EmDash | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /emdash) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes to |
| `EMDASH_URL` | - | Your site |
| `ADMIN_GATE_USER` | (secret) | Login for the admin pages and the first-run setup |
| `EMDASH_SITE_URL` | - | Public URL; set it to your custom domain and redeploy if you add one |
| `EMDASH_ADMIN_URL` | - | The admin: sign in with ADMIN_GATE_USER / ADMIN_GATE_PASSWORD, then run EmDash's setup |
| `ADMIN_GATE_PASSWORD` | (secret) | Its password (generated). EmDash's own passkey login comes after it |
| `EMDASH_ENCRYPTION_KEY` | - | Encrypts plugin secrets (generated; losing it loses those secrets) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Tags:** emdash, cms, astro, blog, wordpress-alternative, typescript · **Languages:** Shell, Dockerfile, JavaScript, TypeScript

[View on Railway →](https://railway.com/deploy/emdash)
