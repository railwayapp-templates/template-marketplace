# Deploy rare-heart on Railway

A Rust-based AI-powered automation API with secure webhook handling.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/CoH8le)

## About

Earn Vaults is a robust, high-performance API built with Rust and powered by the Actix Web framework. Designed for modern web applications, Earn Vaults provides an efficient solution for managing user data, processing transactions, and integrating artificial intelligence for automated diagnostics and fixes. With a modular architecture, the project splits core functionalities into several components—authentication, task management, AI integration, administrative controls, and database operations—ensuring that each part of the application is maintainable and scalable.

At its core, Earn Vaults uses SQLite (via rusqlite) to store and manage user data and transaction histories. The use of SQLite with bundled support means that the database is lightweight and easily deployable, making it a great choice for projects where low resource consumption is key. Furthermore, environment variables are loaded securely using dotenvy, which ensures that sensitive configuration details like the database URL, API keys, and tokens are not hard-coded but managed externally. This makes the project secure and flexible across different deployment environments.

The project also leverages asynchronous programming with Tokio, which keeps the API responsive even under heavy load by efficiently managing multiple concurrent operations. A key feature is its AI-powered module that integrates with external AI services. This module not only helps in diagnosing issues and suggesting auto-fixes but also provides an administrative interface for real-time interaction and troubleshooting. With built-in webhook handling, the application can easily integrate with other services, allowing for automated triggers and notifications.

For deployment, Earn Vaults is optimized to run on Railway. Its Dockerfile is crafted using a slim Rust image for building and a minimal Debian image for the final deployment, ensuring low memory usage and fast startup times. This architecture, combined with Railway’s robust infrastructure, provides an ideal platform for scaling your application with ease.

Earn Vaults is perfect for developers looking for a secure, scalable API solution that harnesses the power of Rust and AI, offering rapid deployment, automatic backups, and seamless integration with modern web services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| earn_vaults | [thealphakenya/earn_vaults](https://github.com/thealphakenya/earn_vaults) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `API_KEY` | (secret) | Environment Type (production/development) |
| `BACKUP_DIR` | ./backups | Server Port |
| `DATABASE_URL` | sqlite://earn_vault.db | Railway Authentication Token (Keep this secure) |

## Configuration

- **Start command:** `cargo run --release`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Rust, HTML, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/CoH8le)
