# Deploy MicroBin on Railway

A file-sharing and URL shortening web app written in Rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/qJ-PpH)

## About

## Overview

MicroBin is a super tiny, feature rich, configurable, self-contained and self-hosted paste bin web application. It is very easy to set up and use, and will only require a few megabytes of memory and disk storage. It takes only a couple minutes to set it up, why not give it a try now?

## What is an upload?

In MicroBin, an upload can be:

- A text that you want to paste from one machine to another, eg. some code,
- A file that you want to share, eg. a video that is too large for Discord, a zip with a code project in it or an image,
- A URL redirection.

## When is MicroBin useful?

You can use MicroBin:

- To send long texts to other people,
- To send large files to other people,
- To share secrets or sensitive documents securely,
- As a URL shortener/redirect service,
- To serve content on the web, eg. configuration files for testing, images, or any other file content using the Raw functionality,
- To move files between your desktop and a server you access from the console,
- As a "postbox" service where people can upload their files or texts, but they cannot see or remove what others sent you,
- Or even to take quick notes.

...and many other things, why not get creative?

## Features

- Entirely self-contained executable, MicroBin is a single file!
- Server-side and client-side encryption
- File uploads (eg. `server.com/file/pig-dog-cat`)
- Raw text serving (eg. `server.com/raw/pig-dog-cat`)
- QR code support
- URL shortening and redirection
- Animal names instead of random numbers for upload identifiers (64 animals)
- SQLite and JSON database support
- Private and public, editable and uneditable, automatically and never expiring uploads
- Automatic dark mode and custom styling support with very little CSS and only vanilla JS (see [`water.css`](https://github.com/kognise/water.css))
- And much more!

## Note
This template is NOT maintained by the team behind PicoShare.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| microbin | `danielszabo99/microbin` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Sets the port for the server will be listening on. |
| `MICROBIN_PORT` | 8080 | Sets the port for the server will be listening on. |
| `MICROBIN_DATA_DIR` | /data | Sets the name of the directory where MicroBin creates its database and stores attachments. |
| `MICROBIN_ADMIN_PASSWORD` | (secret) | Enables administrator interface at yourserver.com/admin/ # if set, disables it if unset. Will not have any affect unless admin username is also set. |
| `MICROBIN_ADMIN_USERNAME` | (secret) | Enables administrator interface at yourserver.com/admin/ if set, disables it if unset. |
| `MICROBIN_BASIC_AUTH_PASSWORD` | (secret) | Require password for HTTP Basic Authentication when visiting the service. |
| `MICROBIN_BASIC_AUTH_USERNAME` | (secret) | Require username for HTTP Basic Authentication when visiting the service. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/qJ-PpH)
