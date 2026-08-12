# Deploy WriteFreely — Self-Hosted Federated Blog on Railway

Self-host WriteFreely — minimalist blogging on the fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/writefreely-fediverse-blog)

## About

WriteFreely is a clean, minimalist, open-source blogging platform — the engine behind Write.as — built for writers who want a distraction-free space to publish, with no ads, no tracking, and no algorithm. Its standout feature is native ActivityPub federation: your blog is part of the fediverse, so people on Mastodon and other platforms can follow it directly. This template deploys WriteFreely with SQLite on a persistent volume and federation enabled, so you own your writing space and publish in minutes.

---

WriteFreely is simple to run, and one behavior is worth understanding to configure it correctly — this template handles it.

**Federation is the differentiator — your blog joins the fediverse.** With `WRITEFREELY_FEDERATION=true` (on by default), your blog is discoverable across the fediverse: Mastodon users and others can follow `@blogname@your-domain` and get your posts in their feed. This is what sets WriteFreely apart from Ghost or WordPress — you're not just publishing a site, you're publishing into a decentralized social network, reaching readers where they already are.

**Environment variables configure the first boot only.** This is the key thing to know: WriteFreely's environment variables are used to build its `config.ini` on the *first* start. Once that file exists on the volume, the env vars are ignored — later changes to them have no effect. So set your admin user, site name, and federation options correctly at first deploy; to change them afterward, edit `config.ini` on the volume directly. Getting this right upfront avoids the "I changed the variable but nothing happened" confusion.

**SQLite on the volume — simple and durable.** WriteFreely uses SQLite by default, the recommended choice for personal and small-to-medium blogs: no separate database service, and backups are a single file on the `/data` volume. Posts, users, and config all live there and survive redeploys. (MySQL is supported via a custom `config.ini` if you later need it.)

**Set your admin account and site name.** `WRITEFREELY_ADMIN_USER` and `WRITEFREELY_ADMIN_PASSWORD` create your administrator (who is also the editor on single-user instances), and `WRITEFREELY_SITE_NAME` sets your blog's title. After deploy, visit `/login` and sign in with those credentials to start writing.

**Single-user or a community.** Run it as a personal single-user blog, or open it up: `WRITEFREELY_SINGLE_USER=false` with registration or invites lets you host a small community of writers on one instance, each with their own blog and fediverse handle.

Typical cost: **~$5/month** on Railway — WriteFreely is remarkably light. It's AGPL-licensed and free, with automatic HTTPS through Railway's edge.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WriteFreely | `algernon/writefreely:0.16.0-1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `WF_STARTUP_B64` | IyEvYmluL3NoCnNldCAtZQpjZCAvZGF0YQpXRj0vd3JpdGVmcmVlbHkvd3JpdGVmcmVlbHkKCmNhdCA+IC4vY29uZmlnLmluaSA8PENGRwpbc2VydmVyXQpoaWRkZW5faG9zdCAgICAgICAgICA9CnBvcnQgICAgICAgICAgICAgICAgID0gJHtXUklURUZSRUVMWV9CSU5EX1BPUlQ6LTgwODB9CmJpbmQgICAgICAgICAgICAgICAgID0gJHtXUklURUZSRUVMWV9CSU5EX0hPU1Q6LTAuMC4wLjB9CnRsc19jZXJ0X3BhdGggICAgICAgID0KdGxzX2tleV9wYXRoICAgICAgICAgPQp0ZW1wbGF0ZXNfcGFyZW50X2RpciA9IC93cml0ZWZyZWVseQpzdGF0aWNfcGFyZW50X2RpciAgICA9IC93cml0ZWZyZWVseQpwYWdlc19wYXJlbnRfZGlyICAgICA9IC93cml0ZWZyZWVseQprZXlzX3BhcmVudF9kaXIgICAgICA9CgpbZGF0YWJhc2VdCnR5cGUgICAgID0gc3FsaXRlMwpmaWxlbmFtZSA9IHdyaXRlZnJlZWx5LmRiCnVzZXJuYW1lID0KcGFzc3dvcmQgPQpkYXRhYmFzZSA9Cmhvc3QgICAgID0gbG9jYWxob3N0CnBvcnQgICAgID0gMzMwNgoKW2FwcF0Kc2l0ZV9uYW1lICAgICAgICAgPSAke1dSSVRFRlJFRUxZX1NJVEVfTkFNRTotV3JpdGUgRnJlZWx5fQpzaXRlX2Rlc2NyaXB0aW9uICA9Cmhvc3QgICAgICAgICAgICAgID0gJHtXUklURUZSRUVMWV9IT1NUOi1odHRwOi8vJHtXUklURUZSRUVMWV9CSU5EX0hPU1Q6LTAuMC4wLjB9OiR7V1JJVEVGUkVFTFlfQklORF9QT1JUOi04MDgwfX0KdGhlbWUgICAgICAgICAgICAgPSB3cml0ZQpkaXNhYmxlX2pzICAgICAgICA9IGZhbHNlCndlYmZvbnRzICAgICAgICAgID0gdHJ1ZQpsYW5kaW5nICAgICAgICAgICA9CnNpbmdsZV91c2VyICAgICAgID0gJHtXUklURUZSRUVMWV9TSU5HTEVfVVNFUjotZmFsc2V9Cm9wZW5fcmVnaXN0cmF0aW9uID0gJHtXUklURUZSRUVMWV9PUEVOX1JFR0lTVFJBVElPTjotZmFsc2V9Cm1pbl91c2VybmFtZV9sZW4gID0gJHtXUklURUZSRUVMWV9NSU5fVVNFUk5BTUVfTEVOOi0zfQptYXhfYmxvZ3MgICAgICAgICA9ICR7V1JJVEVGUkVFTFlfTUFYX0JMT0c6LTF9CmZlZGVyYXRpb24gICAgICAgID0gJHtXUklURUZSRUVMWV9GRURFUkFUSU9OOi10cnVlfQpwdWJsaWNfc3RhdHMgICAgICA9ICR7V1JJVEVGUkVFTFlfUFVCTElDX1NUQVRTOi1mYWxzZX0KcHJpdmF0ZSAgICAgICAgICAgPSAke1dSSVRFRlJFRUxZX1BSSVZBVEU6LWZhbHNlfQpsb2NhbF90aW1lbGluZSAgICA9ICR7V1JJVEVGUkVFTFlfTE9DQUxfVElNRUxJTkU6LXRydWV9CnVzZXJfaW52aXRlcyAgICAgID0gJHtXUklURUZSRUVMWV9VU0VSX0lOVklURVN9CkNGRwoKaWYgWyAhIC1zIC4vd3JpdGVmcmVlbHkuZGIgXTsgdGhlbgogICAgJFdGIC0taW5pdC1kYgpmaQoKaWYgWyAhIC1lIC4va2V5cy9lbWFpbC5hZXMyNTYgXTsgdGhlbgogICAgJFdGIC0tZ2VuLWtleXMKZmkKCiRXRiBkYiBtaWdyYXRlIHx8IHRydWUKCmVjaG8gIlNUQVJUVVA6IGNoZWNraW5nIGFkbWluIHVzZXIgY3JlYXRpb24iCmlmIFsgLW4gIiR7V1JJVEVGUkVFTFlfQURNSU5fVVNFUn0iIF0gJiYgWyAtbiAiJHtXUklURUZSRUVMWV9BRE1JTl9QQVNTV09SRH0iIF07IHRoZW4KICAgIGVjaG8gIlNUQVJUVVA6IGNyZWF0aW5nIGFkbWluIHVzZXIgJHtXUklURUZSRUVMWV9BRE1JTl9VU0VSfSIKICAgICRXRiAtLWNyZWF0ZS1hZG1pbiAiJHtXUklURUZSRUVMWV9BRE1JTl9VU0VSfToke1dSSVRFRlJFRUxZX0FETUlOX1BBU1NXT1JEfSIgfHwgZWNobyAiU1RBUlRVUDogYWRtaW4gY3JlYXRpb24gcmV0dXJuZWQgbm9uLXplcm8gKGxpa2VseSBhbHJlYWR5IGV4aXN0cykiCmZpCgpleGVjICRXRgo= | - |
| `WRITEFREELY_PRIVATE` | false | - |
| `WRITEFREELY_BIND_HOST` | 0.0.0.0 | - |
| `WRITEFREELY_BIND_PORT` | 8080 | - |
| `WRITEFREELY_SITE_NAME` | Write Freely | - |
| `WRITEFREELY_ADMIN_USER` | (secret) | Admin username (admin is reserved) |
| `WRITEFREELY_FEDERATION` | true | - |
| `WRITEFREELY_SINGLE_USER` | (secret) | - |
| `WRITEFREELY_PUBLIC_STATS` | false | - |
| `WRITEFREELY_ADMIN_PASSWORD` | (secret) | Admin password at first boot |
| `WRITEFREELY_LOCAL_TIMELINE` | true | - |
| `WRITEFREELY_OPEN_REGISTRATION` | false | - |

## Configuration

- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/writefreely-fediverse-blog)
