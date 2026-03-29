# Deploy Outerbase Studio on Railway

A lightweight database GUI that runs entirely in your browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outerbase-studio)

## About

Outerbase Studio is an open-source, lightweight database GUI that runs entirely in your browser. It supports connecting to PostgreSQL, MySQL, SQLite, Turso, LibSQL, and more — with a query editor, data editor, schema editor, and ERD diagram view, all without installing any software.

Outerbase Studio is a stateless Next.js application — it stores no data of its own. All database connections are managed client-side in the browser's Connection Manager, and all queries run directly from your browser to your database. Hosting your own instance on Railway gives you a permanent, private URL to access the studio from any device. No volume, no external database, and no environment variables are required — Railway auto-detects the Next.js app and deploys it from the GitHub source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| outerbase-studio | [alphasecio/outerbase-studio](https://github.com/alphasecio/outerbase-studio) | Worker |

**Category:** Storage · **Languages:** TypeScript, JavaScript, CSS, MDX, Dockerfile

[View on Railway →](https://railway.com/deploy/outerbase-studio)
