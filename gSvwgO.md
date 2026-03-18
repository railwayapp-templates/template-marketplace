# Deploy nxt on Railway

A Privacy-First Link Shortener 🌐🔒

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gSvwgO)

## About

# nxt - A Privacy-First Link Shortener 🌐🔒

Welcome to nxt, a simple, fast, and secure link shortener written in Go. This open-source project is designed with privacy in mind, ensuring that your data is always protected.

## Features:
- 🔒 Privacy-First: We only store necessary data for the functionality of our service. We do not share your data with third parties unless required by law.
- 🚫 No Accounts: nxt does not require accounts. It fully relies on a passcode to manage your links.
- 📖 Open Source: nxt is open-source and licensed under the MIT License. You're free to use, modify, and distribute the software under the terms of this license.

## Usage

The main interface of nxt is a web page where you can enter a URL to shorten. After submitting the URL, you will be provided with a shortened link and a passcode. The passcode is used to manage your links.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| nxt | [abcdan/nxt](https://github.com/abcdan/nxt) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `DOMAIN` | nxt | nxt.mom | The domain that will serve the links |
| `MONGO_URL` | nxt | - | The private URL for the MongoDB (do not update unless needed). |
| `SHORTCODE_LENGTH` | nxt | 6 | The length of the shortened url after the / |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML, Go, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/template/gSvwgO)
