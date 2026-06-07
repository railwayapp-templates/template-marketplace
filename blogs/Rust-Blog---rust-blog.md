# Deploy Rust Blog on Railway

Blog made with Rust | Frontend — Yew/WASM | Backend — Hyper/PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rust-blog)

## About

**Live demo:** https://en.tikitko.dev/

> **Note:** If you just want to try the blog, you can leave the required values blank — the stack will still deploy and run with defaults. Fill them in later when you're ready to use it for real. The default admin login is `admin` / `admin`; change it before going to production.

Rust Blog is a modular, full-stack blogging platform written in Rust. It serves a Hyper-based HTTP API with PostgreSQL storage and a built-in Yew/WebAssembly frontend (server-side rendered for SEO), paired with a dedicated image-processing service. It supports posts, comments, authors, tags, role-based administration, and Telegram/Yandex authentication.

This template deploys Rust Blog as a coordinated stack of three services: the `blog-server` API (which also serves the SSR WebAssembly UI), an `images-processor` service for uploading and processing images, and a PostgreSQL database. The server connects to Postgres, auto-applies migrations on startup, and can optionally broadcast events to Telegram bots and Discord webhooks. Hosting involves provisioning the database, wiring the image processor into the server, and configuring site metadata and optional integrations. Railway provisions the database and networks the services together, so you focus on configuration instead of managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| images-processor-service | [brewpipeline/images-processor-service](https://github.com/brewpipeline/images-processor-service) | Web service |
| blog-server | [brewpipeline/blog-server](https://github.com/brewpipeline/blog-server) | Web service |
| blog-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | images-processor-service | 8080 | - |
| `IMAGES_HMAC_SECRET` | images-processor-service | (secret) | - |
| `PORT` | blog-server | 8080 | - |
| `TITLE` | blog-server | TIKITKO blog | - |
| `FEATURES` | blog-server | telegram,chatgpt,lang_ru | - |
| `KEYWORDS` | blog-server | tikitko, блог, программирование, ПО, код, Swift, Rust, компьютерная графика, верстка, алкоголь, игры | - |
| `LOGO_URL` | blog-server | https://storage.tikitko.dev/logo.svg | - |
| `JWT_SECRET` | blog-server | (secret) | - |
| `RABBIT_URL` | blog-server | placeholder | - |
| `DESCRIPTION` | blog-server | Блог от «гиков» для «гиков», говорим на темы, начиная с программирования и компьютерной графики, заканчивая играми и алкогольными посиделками в одиночестве. | - |
| `FAVICON_URL` | blog-server | https://storage.tikitko.dev/favicon.ico | - |
| `ACCORDION_JSON` | blog-server | [{"title":"О блоге","body":"<strong>TIKITKO blog</strong> - блог от «гиков» для «гиков», говорим на темы, начиная с программирования и компьютерной графики, заканчивая играми и алкогольными посиделками в одиночестве. 🤫"},{"title":"Об авторах","body":"Главным автором являюсь я - <a href=\"https://about.tikitko.dev\">Никита</a>, но иногда тут будут появляться и умные люди, которых я смог уломать что-то написать! 🤑"},{"title":"Исходный код","body":"<a href=\"https://github.com/brewpipeline/blog-ui\">Исходный код</a> блога полностью открыт и может быть использован с учетом лицензии MIT. Будем рады вашему вкладу! ⛵"}] | - |
| `OPENAI_API_KEY` | blog-server | (secret) | - |
| `IMAGES_HMAC_SECRET` | blog-server | (secret) | - |
| `TELEGRAM_BOT_LOGIN` | blog-server | (secret) | - |
| `TELEGRAM_BOT_TOKEN` | blog-server | (secret) | - |
| `ICON512_ROUNDED_URL` | blog-server | https://storage.tikitko.dev/icon512_rounded.png | - |
| `ICON512_MASKABLE_URL` | blog-server | https://storage.tikitko.dev/icon512_maskable.png | - |
| `POSTGRES_DB` | blog-db | railway | Default database created when image is started. |
| `DATABASE_URL` | blog-db | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | blog-db | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | blog-db | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | blog-db | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/images`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs · **Languages:** Rust, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rust-blog)
