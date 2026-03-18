# Deploy Blinko Official  on Railway

An open-source, self-hosted personal AI note tool prioritizing privacy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/InjVjN)

## About

# Blinko - Open Source, Self-hosted
<div align="center">

[Live Demo](https://blinko-demo.vercel.app/) •
[Docs](https://blinko.mintlify.app/introduction) •
[Telegram Chinese](https://t.me/blinkoChinese) •
[Telegram English](https://t.me/blinkoEnglish)
</div>
&gt; username:blinko
&gt; password:blinko

Blinko is an innovative open-source project designed for individuals who want to quickly capture and organize their fleeting thoughts. Blinko allows users to seamlessly jot down ideas the moment they strike, ensuring that no spark of creativity is lost.

<img style="border-radius:20px" src="https://github.com/blinko-space/blinko/raw/main/public/home.png" alt="Blinko">

## 🚀Main Features
- 🤖**AI-Enhanced Note Retrieval** ：With Blinko's advanced AI-powered RAG (Retrieval-Augmented Generation), you can quickly search and access your notes using natural language queries, making it effortless to find exactly what you need.

- 🔒**Data Ownership** :Your privacy matters. All your notes and data are stored securely in your self-hosted environment, ensuring complete control over your information.

- 🚀**Efficient and Fast** :Capture ideas instantly and store them as plain text for easy access, with full Markdown support for quick formatting and seamless sharing.

- 💡**Lightweight Architecture with Heavy Lifting** :Built on Next.js, Blinko offers a sleek, lightweight architecture that delivers robust performance without sacrificing speed or efficiency.

- 🔓**Open for Collaboration** :As an open-source project, Blinko invites contributions from the community. All code is transparent and available on GitHub, fostering a spirit of collaboration and constant improvement.

## 📦Start with Docker Compose in seconds


## 👨🏼‍💻Contribution
Contributions are the heart of what makes the open-source community so dynamic, creative, and full of learning opportunities. Your involvement helps drive innovation and growth. We deeply value any contribution you make, and we're excited to have you as part of our community. Thank you for your support! 🙌

## Sponsorship
If you find Blinko valuable, consider supporting us! Your contribution will enable us to continue enhancing and maintaining the project for everyone. Thank you for helping us grow!

[https://ko-fi.com/blinkospace](https://ko-fi.com/blinkospace)

[https://afdian.com/a/blinkospace/plan](https://afdian.com/a/blinkospace/plan)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=blinko-space/blinko&amp;type=Date)](https://star-history.com/#blinko-space/blinko&amp;Date)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blinko-website | `blinkospace/blinko:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | blinko-website | 0.0.0.0 | - |
| `PORT` | blinko-website | 1111 | - |
| `HOSTNAME` | blinko-website | 0.0.0.0 | - |
| `NEXTAUTH_SECRET` | blinko-website | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.blinko `
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/InjVjN)
