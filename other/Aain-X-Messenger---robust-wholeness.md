# Deploy Aain X Messenger on Railway

X clone social media pour se change entre amis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/robust-wholeness)

## About

**robust-wholeness** is a high-performance full-stack application built on the **AdonisJS 6** framework. It is engineered to provide a seamless, type-safe environment for managing complex user interactions, real-time notification systems, and dynamic account profiles. By leveraging Vite for frontend assets and Lucid ORM for database management, it ensures a modern, scalable experience for both developers and end-users in the 2026 web landscape.

Hosting **robust-wholeness** involves deploying a Node.js environment capable of executing a compiled TypeScript backend. The deployment process requires a build step where AdonisJS compiles the source into a `build/` directory and Vite bundles the client-side CSS and JavaScript. To ensure stability, the hosting environment must support persistent relational databases and environment variable injection for sensitive keys. Railway simplifies this by providing a virtualized infrastructure that automatically detects the Node.js runtime, handles the build-to-start lifecycle, and manages the networking required to expose the server on port 3333.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| capstone-x-clone-adonis-alainmbi | [kadea-academy-learners/capstone-x-clone-adonis-alainmbi](https://github.com/kadea-academy-learners/capstone-x-clone-adonis-alainmbi) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `HOST` | 0.0.0.0 |
| `PORT` | 3333 |
| `APP_KEY` | M6MmYjVoJtiKN7W9B9f1znpnLZPB0iEk |
| `APP_URL` | http://${HOST}:${PORT} |
| `DB_HOST` | 127.0.0.1 |
| `DB_PORT` | 5432 |
| `DB_USER` | (secret) |
| `NODE_ENV` | development |
| `LOG_LEVEL` | info |
| `MAIL_HOST` | smtp.mailtrap.io |
| `MAIL_PORT` | 587 |
| `SMTP_HOST` | localhost |
| `SMTP_PORT` | 1025 |
| `DB_DATABASE` | x_clone_s73k |
| `DB_PASSWORD` | (secret) |
| `MAIL_MAILER` | smtp |
| `MAIL_SECURE` | false |
| `DATABASE_URL` | postgresql://postgres:1234@127.0.0.1:5432/x_clone_s73k |
| `DB_CONNECTION` | pg |
| `MAIL_PASSWORD` | (secret) |
| `MAIL_USERNAME` | (secret) |
| `MAIL_FROM_NAME` | X Support |
| `SESSION_DRIVER` | cookie |
| `MAIL_FROM_ADDRESS` | no-reply@x.com |

## Configuration

- **Start command:** `npm run start`

**Category:** Other · **Languages:** TypeScript, Edge, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/robust-wholeness)
