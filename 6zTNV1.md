# Deploy OpenChat on Railway

100% Open Source alternative to WhatsApp

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6zTNV1)

## About

OpenChat is more than just a messaging app – it's a fresh take on communication, built on the principles of openness and transparency. As an open-source platform, OpenChat allows users to enjoy a fully customizable chat experience, with the freedom to modify, contribute, and control the software. Whether you’re chatting with friends, collaborating with teammates, or discussing big ideas, OpenChat is designed to give you full ownership over your conversations.

At its core, OpenChat is about simplicity. With a clean, intuitive interface, it provides all the essential features you need for messaging without the clutter. From one-on-one conversations to group chats, it’s a platform that prioritizes ease of use while ensuring data privacy and security. You’ll never have to worry about proprietary systems controlling your chats; with OpenChat, everything is open for you to explore and tweak.

OpenChat also fosters a thriving community of developers, users, and contributors. Thanks to its open-source nature, anyone can help improve the app, suggest features, or create new integrations. Whether you're a coder or simply someone who believes in digital freedom, OpenChat is the place for you.

Experience a chat app that truly gives you control. OpenChat – open-source, open conversations, and open possibilities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| openchatv2 | [rpi10/OpenChatV2](https://github.com/rpi10/OpenChatV2) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NODE_ENV` | openchatv2 | production |
| `B2_BUCKET_ID` | openchatv2 | addf55f2214fea5d9440051e |
| `GROQ_API_KEY` | openchatv2 | (secret) |
| `B2_BUCKET_URL` | openchatv2 | https://f003.backblazeb2.com/file/ShareFilesOpenChat92 |
| `B2_BUCKET_NAME` | openchatv2 | ShareFilesOpenChat92 |
| `SESSION_SECRET` | openchatv2 | (secret) |
| `VAPID_PUBLIC_KEY` | openchatv2 | BIkfH6KvXvX-xJg6SWrwkKOKYgLk2ednIs5ByRMaHoIIZiH77-mNbwsUjQtS5ix-keaTq_6A8-JJUfINbyEegWk |
| `VAPID_PRIVATE_KEY` | openchatv2 | p6pCCxkVQzFE6Rkjf4P1xWZ1sDabEPQoCKrSVDH8E7o |
| `B2_APPLICATION_KEY` | openchatv2 | K0035aHUnyHE5mSodSr7yJqU+9GRTu4 |
| `B2_APPLICATION_KEY_ID` | openchatv2 | 003df521fad405e0000000001 |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, CSS, HTML

[View on Railway →](https://railway.com/template/6zTNV1)
