# Deploy Radicale on Railway

Private CalDAV & CardDAV backend for your calendar and contacts apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/radicale)

## About

Radicale is a lightweight, open-source CalDAV and CardDAV server that lets you host your own calendars and contacts with full control over your data. It syncs seamlessly with standard clients like Apple Calendar, Thunderbird, and DAVx5 on Android, so your schedule and address book stay in sync across every device, without relying on Google Calendar or iCloud.

Hosting Radicale gives you a private alternative to Google Calendar, iCloud, or Google Contacts, without giving up the apps you already use. You keep full ownership and control of your data while still syncing calendars and contacts across all of your devices through the standard CalDAV and CardDAV protocols.

This template provides a ready-to-run Radicale server with authentication and persistent storage already wired up. Railway handles the infrastructure and deployment, so you can focus on connecting your devices instead of configuring a server, a reverse proxy, and storage by hand.

If you are looking for a broader all-in-one experience that includes files, documents, photos, passwords, and more alongside your calendar, check out My Own Suite, which builds on setups like this into a complete private cloud ecosystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Radicale | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/radicale) | Web service |
| radicale-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RADICALE_ADMIN_PASSWORD` | Radicale | (secret) | Admin password |
| `RADICALE_ADMIN_USERNAME` | Radicale | (secret) | Admin username |
| `PORT` | radicale-proxy | 3000 | - |
| `RADICALE_PORT` | radicale-proxy | 5232 | - |
| `CALENDAR_PROXY_TOKEN` | radicale-proxy | (secret) | - |
| `RADICALE_ADMIN_PASSWORD` | radicale-proxy | (secret) | - |
| `RADICALE_ADMIN_USERNAME` | radicale-proxy | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `./run.sh Ly8gaW5kZXgudHN4IChCdW4gdjEuMyBydW50aW1lKQppbXBvcnQgeyBIb25vIH0gZnJvbSAiaG9ub0A0IjsKaW1wb3J0IHsgY29ycyB9IGZyb20gImhvbm8vY29ycyI7Cgpjb25zdCBhcHAgPSBuZXcgSG9ubygpOwphcHAudXNlKCIvKiIsIGNvcnMoKSk7Cgpjb25zdCBUT0tFTiA9IHByb2Nlc3MuZW52LkNBTEVOREFSX1BST1hZX1RPS0VOID8/ICIiOwpjb25zdCBVU0VSID0gcHJvY2Vzcy5lbnYuUkFESUNBTEVfQURNSU5fVVNFUk5BTUUgPz8gIiI7CmNvbnN0IFBBU1MgPSBwcm9jZXNzLmVudi5SQURJQ0FMRV9BRE1JTl9QQVNTV09SRCA/PyAiIjsKY29uc3QgSE9TVCA9IHByb2Nlc3MuZW52LlJBRElDQUxFX1BSSVZBVEVfRE9NQUlOID8/ICJyYWRpY2FsZS5yYWlsd2F5LmludGVybmFsIjsKY29uc3QgUkFESUNBTEVfUE9SVCA9IHByb2Nlc3MuZW52LlJBRElDQUxFX1BPUlQgPz8gIjUyMzIiOwoKYXBwLmdldCgiLyIsIChjKSA9PiBjLnRleHQoImNhbGVuZGFyLXByb3h5IikpOwphcHAuZ2V0KCIvYXBpL2hlYWx0aCIsIChjKSA9PiBjLmpzb24oeyBzdGF0dXM6ICJvayIgfSkpOwoKYXBwLmdldCgiL2ludGVybmFsL3JhZGljYWxlLWljYWwvOnRva2VuIiwgYXN5bmMgKGMpID0+IHsKICBjb25zdCBpbmNvbWluZyA9IGMucmVxLnBhcmFtKCJ0b2tlbiIpOwogIGlmICghVE9LRU4gfHwgaW5jb21pbmcgIT09IFRPS0VOKSByZXR1cm4gYy50ZXh0KCJVbmF1dGhvcml6ZWQiLCA0MDEpOwogIGlmICghVVNFUiB8fCAhUEFTUykgcmV0dXJuIGMudGV4dCgiTWlzc2luZyBSYWRpY2FsZSBjcmVkZW50aWFscyIsIDUwMCk7CgogIGNvbnN0IHVwc3RyZWFtID0gYGh0dHA6Ly8ke0hPU1R9OiR7UkFESUNBTEVfUE9SVH0vJHtlbmNvZGVVUklDb21wb25lbnQoCiAgICBVU0VSCiAgKX0vZGVmYXVsdC1jYWxlbmRhci8/ZXhwb3J0YDsKICBjb25zdCBhdXRoID0gIkJhc2ljICIgKyBCdWZmZXIuZnJvbShgJHtVU0VSfToke1BBU1N9YCkudG9TdHJpbmcoImJhc2U2NCIpOwoKICB0cnkgewogICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXBzdHJlYW0sIHsKICAgICAgaGVhZGVyczogewogICAgICAgIEF1dGhvcml6YXRpb246IGF1dGgsCiAgICAgICAgQWNjZXB0OiAidGV4dC9jYWxlbmRhciwqLyo7cT0wLjgiLAogICAgICB9LAogICAgfSk7CgogICAgY29uc3QgY29udGVudFR5cGUgPQogICAgICByZXMuaGVhZGVycy5nZXQoImNvbnRlbnQtdHlwZSIpID8/ICJ0ZXh0L2NhbGVuZGFyOyBjaGFyc2V0PXV0Zi04IjsKICAgIHJldHVybiBuZXcgUmVzcG9uc2UocmVzLmJvZHksIHsKICAgICAgc3RhdHVzOiByZXMuc3RhdHVzLAogICAgICBoZWFkZXJzOiB7CiAgICAgICAgImNvbnRlbnQtdHlwZSI6IGNvbnRlbnRUeXBlLAogICAgICAgICJjYWNoZS1jb250cm9sIjogIm5vLXN0b3JlIiwKICAgICAgfSwKICAgIH0pOwogIH0gY2F0Y2ggKGVycikgewogICAgcmV0dXJuIGMudGV4dChgVXBzdHJlYW0gY29ubmVjdGlvbiBmYWlsZWQ6ICR7U3RyaW5nKGVycil9YCwgNTAyKTsKICB9Cn0pOwoKQnVuLnNlcnZlKHsKICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVCA/PyAzMDAwKSwKICBmZXRjaDogYXBwLmZldGNoLAp9KTsK`

**Category:** Other · **Languages:** JavaScript, TypeScript, CSS, Astro, MDX, Shell, PowerShell, Dockerfile, HTML, Standard ML

[View on Railway →](https://railway.com/deploy/radicale)
