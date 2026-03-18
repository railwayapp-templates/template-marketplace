# Deploy Homebox on Railway

Track, Organize, and Manage your Things.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/A6PKuM)

## About

<p align="center">
    <a href="https://hay-kot.github.io/homebox/">
        <img style="width: 250px;" src="https://hay-kot.github.io/homebox/assets/img/lilbox.svg" alt="homebox logo">
    </a>
</p>

<h3 align="center">Track, Organize, and Manage your Things.</h3>
Homebox is the inventory and organization system built for the Home User! With a focus on simplicity and ease of use, Homebox is the perfect solution for your home inventory, organization, and management needs. While developing this project, I've tried to keep the following principles in mind:

- Simple - Homebox is designed to be simple and easy to use. No complicated setup or configuration required. Use either a single docker container, or deploy yourself by compiling the binary for your platform of choice.
- Blazingly Fast - Homebox is written in Go, which makes it extremely fast and requires minimal resources to deploy. In general idle memory usage is less than 50MB for the whole container.
- Portable - Homebox is designed to be portable and run on anywhere. We use SQLite and an embedded Web UI to make it easy to deploy, use, and backup.

### Project Status
Homebox is currently in early active development and is currently in **beta** stage. This means that the project may still be unstable and clunky. Overall, we are striving to not introduce any breaking changes and have checks in place to ensure migrations and upgrades are smooth. However, we do not guarantee that there will be no breaking changes. We will try to keep the documentation up to date as we make changes.

## Features
- Create and Manage Items by providing a name and a description - That's it! Homebox requires only a few details to be provided to create an item, after that you can specify as much detail as you want, or hide away some of the things you won't ever need.
- Optional Details for Items include
  - Warranty Information
  - Sold To Information
  - Purchased From Information
  - Item Identifications (Serial, Model, etc)
  - Categorized Attachments (Images, Manuals, General)
  - Arbitrary/Custom Fields
- CSV Import/Export for quickly creating and managing items
- Custom Reporting
- Bill of Materials Export
- QR Code Label Generator
- Organize Items by creating Labels and Locations and assigning them to items.
- Multi-Tenant Support - All users are placed in a group and can only see items in their group. Invite family members to your group, or share an instance among friends!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Homebox | `ghcr.io/hay-kot/homebox:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Timezone |
| `PORT` | 7745 | - |
| `HBOX_MODE` | production | Application mode used for runtime behavior |
| `HBOX_LOG_LEVEL` | info | Log level, can be one of: trace, debug, info, warn, error, critical |
| `HBOX_LOG_FORMAT` | text | Log format to use, can be 'text', or 'json' |
| `HBOX_MAILER_FROM` | - | Email from address to use |
| `HBOX_MAILER_HOST` | - | Email host to use, if not set, no email provider will be used |
| `HBOX_MAILER_PORT` | 587 | Email port to use (cannot be empty, even if not using email) |
| `HBOX_MAILER_PASSWORD` | (secret) | Email account password to use |
| `HBOX_MAILER_USERNAME` | (secret) | Email account username to use |
| `HBOX_WEB_IDLE_TIMEOUT` | 30 | Idle timeout of HTTP server |
| `HBOX_WEB_READ_TIMEOUT` | 10 | Read timeout of HTTP server |
| `HBOX_WEB_WRITE_TIMEOUT` | 10 | Write timeout of HTTP server |
| `HBOX_WEB_MAX_UPLOAD_SIZE` | 10 | Maximum file upload size (in MB) |
| `HBOX_OPTIONS_ALLOW_REGISTRATION` | true | Allow users to register themselves |
| `HBOX_OPTIONS_AUTO_INCREMENT_ASSET_ID` | true | Set to 'true' to auto-increment asset_id field for new items |

## Configuration

- **Healthcheck:** `/api/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/A6PKuM)
