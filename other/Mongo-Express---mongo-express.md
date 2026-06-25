# Deploy Mongo Express on Railway

[Jun'26] MongoDB admin dashboard with a simple web-based interface.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongo-express)

## About

Mongo Express is a lightweight web-based admin interface for MongoDB. It lets you browse databases, inspect collections, view documents, and perform basic database operations from a simple browser dashboard. This template only deploys Mongo Express and connects it to an existing MongoDB instance.

Hosting Mongo Express on Railway gives you a simple web dashboard for managing an existing MongoDB database. This template does not include MongoDB, so you need to provide your own MongoDB connection details before deployment.

Before clicking deploy, enter the Mongo Express login username and password, then provide the MongoDB host, port, username, and password. After deployment, Railway will generate a public URL for the Mongo Express dashboard. Open the URL, log in using the dashboard credentials you configured, and manage your connected MongoDB instance from the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo-express | `mongo-express` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |
| `MONGOPASSWORD` | (secret) |
| `ME_CONFIG_BASICAUTH_PASSWORD` | (secret) |
| `ME_CONFIG_BASICAUTH_USERNAME` | (secret) |
| `ME_CONFIG_OPTIONS_EDITORTHEME` | ambiance |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/mongo-express)
