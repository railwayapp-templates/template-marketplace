# Deploy Homebox on Railway

A simple home inventory management software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unXB5b)

## About

Homebox is an inventory and organization system built for the home user. Written in Go with a focus on speed, simplicity, and ease of use (typically using less than 50MB of RAM at idle), Homebox is designed to track household items, locations, warranties, maintenance schedules, receipts, and manuals across any device.

* [Website](https://homebox.software/)
* [Documentation](https://homebox.software/en/quick-start/)
* [GitHub](https://github.com/sysadminsmedia/homebox)

This template deploys Homebox as a lightweight, self-contained container backed by an embedded SQLite database and file storage mounted on a persistent Railway Volume at `/data`.

### Deployment Tips & Configuration

- **Initial Registration:** By default, the template sets `HBOX_OPTIONS_ALLOW_REGISTRATION=true` so you can create your initial administrator account. Once you have registered, consider setting this variable to `false` to disable open registration.
- **Backups:** You can protect your data using [Railway's native Volume Backups](https://docs.railway.com/reference/volumes#backups) to snapshot `/data`, or use Homebox's built-in **Collection Export** feature to export and import a complete `.zip` archive of your inventory (including photos, attachments, tags, and entities) as well as CSV exports.
- **Advanced Configuration:** A complete list of supported environment variables can be found in the [Homebox documentation](https://homebox.software/en/quick-start/configure/). These can be added to the Homebox service to enable SMTP email, [OpenID Connect (OIDC) SSO](https://homebox.software/en/quick-start/configure/oidc/), or external PostgreSQL/Meilisearch services.

*Note: This is a community-made template and therefore not officially supported by the Homebox team. Please direct template-specific help requests to the [Railway thread for the template](https://station.railway.com/templates/homebox-31aab3c1).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Homebox | `ghcr.io/sysadminsmedia/homebox:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7745 | Homebox interface port |
| `HBOX_AUTH_API_KEY_PEPPER` | (secret) | Secure secret string for hashing static API keys |
| `HBOX_WEB_MAX_UPLOAD_SIZE` | 20 | Maximum file/image upload size in MB |
| `HBOX_OPTIONS_ALLOW_REGISTRATION` | true | Allow initial user registration (consider setting to false after setup) |

## Configuration

- **Healthcheck:** `/api/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/unXB5b)
