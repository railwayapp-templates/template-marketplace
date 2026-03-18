# Deploy Paisa [Updated Mar ’26] on Railway

Paisa [Mar ’26] (Track Expenses & Manage Budgets Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paisa)

## About

Paisa is an open-source personal finance management tool available on GitHub, designed to help individuals and small businesses track their income, expenses, budgets, and financial goals - all in one place. With Paisa, you gain full control over your financial data, ensuring privacy, transparency, and freedom from third-party dependency. It’s a modern alternative to traditional finance tracking tools, built with simplicity and security in mind.

Self-hosting Paisa allows you to manage your complete financial data locally or on your chosen cloud server. By hosting Paisa on Railway, you can store all transactions, categories, and user configurations under your control without relying on third-party financial apps that might sell or misuse your data. Paisa’s streamlined architecture ensures you get fast, privacy-first, and fully customizable money tracking with zero setup stress.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paisa | `ananthakumaran/paisa:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7500 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/Documents/paisa/`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/paisa)
