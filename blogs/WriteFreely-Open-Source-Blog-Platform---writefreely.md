# Deploy WriteFreely | Open Source Blog Platform on Railway

Self host WriteFreely — minimalist, federated blogging on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/writefreely)

## About

Deploy WriteFreely on Railway to launch a clean, minimalist blogging platform with built-in ActivityPub federation. Self-host WriteFreely and own your writing space — no ads, no tracking, no distractions. This template pre-configures a WriteFreely instance with SQLite storage and a persistent volume, ready for publishing in minutes.

WriteFreely is the open-source engine behind [Write.as](https://write.as), designed for writers who want a simple publishing experience. Run WriteFreely on Railway with automatic HTTPS, persistent data storage, and zero server management.

WriteFreely is an open-source publishing platform built in Go that strips away the complexity of traditional blogging tools. It focuses on the writing experience with a clean, Markdown-based editor and minimal UI chrome.

- **Distraction-free editor** — plain Markdown with no WYSIWYG clutter
- **ActivityPub federation** — blogs are discoverable and followable from Mastodon, Pleroma, and other fediverse platforms
- **Multi-blog support** — host multiple blogs under one instance with separate identities
- **Lightweight** — the Go binary and SQLite database run comfortably on minimal resources
- **Privacy-focused** — no tracking scripts, no analytics by default, no ads
- **Custom CSS** — style individual blogs with custom themes
- **Multi-language support** — right-to-left text and international character sets

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WriteFreely | `algernon/writefreely:0.16.0-1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Railway routing port signal |
| `WF_STARTUP_B64` | IyEvYmluL3NoCnNldCAtZQpjZCAvZGF0YQpXRj0vd3JpdGVmcmVlbHkvd3JpdGVmcmVlbHkKCmNhdCA+IC4vY29uZmlnLmluaSA8PENGRwpbc2VydmVyXQpoaWRkZW5faG9zdCAgICAgICAgICA9CnBvcnQgICAgICAgICAgICAgICAgID0gJHtXUklURUZSRUVMWV9CSU5EX1BPUlQ6LTgwODB9CmJpbmQgICAgICAgICAgICAgICAgID0gJHtXUklURUZSRUVMWV9CSU5EX0hPU1Q6LTAuMC4wLjB9CnRsc19jZXJ0X3BhdGggICAgICAgID0KdGxzX2tleV9wYXRoICAgICAgICAgPQp0ZW1wbGF0ZXNfcGFyZW50X2RpciA9IC93cml0ZWZyZWVseQpzdGF0aWNfcGFyZW50X2RpciAgICA9IC93cml0ZWZyZWVseQpwYWdlc19wYXJlbnRfZGlyICAgICA9IC93cml0ZWZyZWVseQprZXlzX3BhcmVudF9kaXIgICAgICA9CgpbZGF0YWJhc2VdCnR5cGUgICAgID0gc3FsaXRlMwpmaWxlbmFtZSA9IHdyaXRlZnJlZWx5LmRiCnVzZXJuYW1lID0KcGFzc3dvcmQgPQpkYXRhYmFzZSA9Cmhvc3QgICAgID0gbG9jYWxob3N0CnBvcnQgICAgID0gMzMwNgoKW2FwcF0Kc2l0ZV9uYW1lICAgICAgICAgPSAke1dSSVRFRlJFRUxZX1NJVEVfTkFNRTotV3JpdGUgRnJlZWx5fQpzaXRlX2Rlc2NyaXB0aW9uICA9Cmhvc3QgICAgICAgICAgICAgID0gJHtXUklURUZSRUVMWV9IT1NUOi1odHRwOi8vJHtXUklURUZSRUVMWV9CSU5EX0hPU1Q6LTAuMC4wLjB9OiR7V1JJVEVGUkVFTFlfQklORF9QT1JUOi04MDgwfX0KdGhlbWUgICAgICAgICAgICAgPSB3cml0ZQpkaXNhYmxlX2pzICAgICAgICA9IGZhbHNlCndlYmZvbnRzICAgICAgICAgID0gdHJ1ZQpsYW5kaW5nICAgICAgICAgICA9CnNpbmdsZV91c2VyICAgICAgID0gJHtXUklURUZSRUVMWV9TSU5HTEVfVVNFUjotZmFsc2V9Cm9wZW5fcmVnaXN0cmF0aW9uID0gJHtXUklURUZSRUVMWV9PUEVOX1JFR0lTVFJBVElPTjotZmFsc2V9Cm1pbl91c2VybmFtZV9sZW4gID0gJHtXUklURUZSRUVMWV9NSU5fVVNFUk5BTUVfTEVOOi0zfQptYXhfYmxvZ3MgICAgICAgICA9ICR7V1JJVEVGUkVFTFlfTUFYX0JMT0c6LTF9CmZlZGVyYXRpb24gICAgICAgID0gJHtXUklURUZSRUVMWV9GRURFUkFUSU9OOi10cnVlfQpwdWJsaWNfc3RhdHMgICAgICA9ICR7V1JJVEVGUkVFTFlfUFVCTElDX1NUQVRTOi1mYWxzZX0KcHJpdmF0ZSAgICAgICAgICAgPSAke1dSSVRFRlJFRUxZX1BSSVZBVEU6LWZhbHNlfQpsb2NhbF90aW1lbGluZSAgICA9ICR7V1JJVEVGUkVFTFlfTE9DQUxfVElNRUxJTkU6LXRydWV9CnVzZXJfaW52aXRlcyAgICAgID0gJHtXUklURUZSRUVMWV9VU0VSX0lOVklURVN9CkNGRwoKaWYgWyAhIC1zIC4vd3JpdGVmcmVlbHkuZGIgXTsgdGhlbgogICAgJFdGIC0taW5pdC1kYgpmaQoKaWYgWyAhIC1lIC4va2V5cy9lbWFpbC5hZXMyNTYgXTsgdGhlbgogICAgJFdGIC0tZ2VuLWtleXMKZmkKCiRXRiBkYiBtaWdyYXRlIHx8IHRydWUKCmVjaG8gIlNUQVJUVVA6IGNoZWNraW5nIGFkbWluIHVzZXIgY3JlYXRpb24iCmlmIFsgLW4gIiR7V1JJVEVGUkVFTFlfQURNSU5fVVNFUn0iIF0gJiYgWyAtbiAiJHtXUklURUZSRUVMWV9BRE1JTl9QQVNTV09SRH0iIF07IHRoZW4KICAgIGVjaG8gIlNUQVJUVVA6IGNyZWF0aW5nIGFkbWluIHVzZXIgJHtXUklURUZSRUVMWV9BRE1JTl9VU0VSfSIKICAgICRXRiAtLWNyZWF0ZS1hZG1pbiAiJHtXUklURUZSRUVMWV9BRE1JTl9VU0VSfToke1dSSVRFRlJFRUxZX0FETUlOX1BBU1NXT1JEfSIgfHwgZWNobyAiU1RBUlRVUDogYWRtaW4gY3JlYXRpb24gcmV0dXJuZWQgbm9uLXplcm8gKGxpa2VseSBhbHJlYWR5IGV4aXN0cykiCmZpCgpleGVjICRXRgo= | Base64-encoded startup script (decodes to startup.sh). |
| `WRITEFREELY_HOST` | - | Full public URL with protocol |
| `WRITEFREELY_PRIVATE` | false | Restrict instance to logged-in users |
| `WRITEFREELY_BIND_HOST` | 0.0.0.0 | Network bind host address |
| `WRITEFREELY_BIND_PORT` | 8080 | HTTP server listening port |
| `WRITEFREELY_SITE_NAME` | Write Freely | Site title in navigation |
| `WRITEFREELY_ADMIN_USER` | (secret) | Admin username (admin is reserved) |
| `WRITEFREELY_FEDERATION` | true | Enable ActivityPub federation |
| `WRITEFREELY_SINGLE_USER` | (secret) | Enable single-user blog mode |
| `WRITEFREELY_PUBLIC_STATS` | false | Display public instance statistics |
| `WRITEFREELY_ADMIN_PASSWORD` | (secret) | Admin password at first boot |
| `WRITEFREELY_LOCAL_TIMELINE` | true | Show local timeline of posts |
| `WRITEFREELY_OPEN_REGISTRATION` | false | Allow public user registration |

## Configuration

- **Start command:** `/bin/sh -c 'echo "$WF_STARTUP_B64" | base64 -d | /bin/sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/writefreely)
