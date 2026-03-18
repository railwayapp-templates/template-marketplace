# Deploy CodiMD on Railway

CodiMD - The best platform to write and share markdown.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/YcOXBV)

## About

CodiMD is an open-source real-time collaborative markdown editor. It allows multiple users to edit markdown documents simultaneously and see each other's changes in real-time. Markdown is a lightweight markup language that is easy to read and write, and CodiMD provides a convenient platform for collaborative editing and document sharing.

CodiMD is designed to be user-friendly and intuitive, providing a simple and clean interface for creating and editing markdown documents. It supports various markdown features such as headings, lists, links, images, code blocks, and more. Users can also preview their markdown content in real-time, making it easier to see how the final document will look.

One of the key features of CodiMD is its real-time collaboration capabilities. Multiple users can access and edit the same document simultaneously, and their changes are synced in real-time. This makes it an excellent tool for team collaboration, allowing users to work together on documents, take notes, brainstorm ideas, and more.

CodiMD can be self-hosted, meaning you can install it on your own server or use a hosted version provided by an organization or service. It is built using web technologies such as JavaScript, Node.js, and WebSocket for real-time communication.

Overall, CodiMD is a versatile and powerful tool for collaborative markdown editing, making it easier for teams to work together on documents and share ideas in real-time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| railwayapp-codimd | [vergissberlin/railwayapp-codimd](https://github.com/vergissberlin/railwayapp-codimd) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | railwayapp-codimd | 3000 | Don't change this! |
| `CMD_DB_URL` | railwayapp-codimd | - | The URL to connect to the Postgres database. You don't need to change it! |
| `CMD_DOMAIN` | railwayapp-codimd | - | Your custom domain. You don't need to change this. |
| `CMD_USECDN` | railwayapp-codimd | false | Wether or not use a CDN. |
| `CMD_PROTOCOL_USESSL` | railwayapp-codimd | true | Use https in urls |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/YcOXBV)
