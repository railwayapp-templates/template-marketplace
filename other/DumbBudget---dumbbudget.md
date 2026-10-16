# Deploy DumbBudget on Railway

A stupid, simple, secure personal budgeting app with PIN protection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumbbudget)

## About

![DumbBudget Banner](https://github.com/user-attachments/assets/7874b23a-159f-4c93-8e5d-521c18666547)

DumbBudget is a self-hosted personal budget app for tracking income, expenses, and account balances. It lets you categorize transactions, filter spending by date or type, and export financial records to CSV. With PIN-protected access and support for multiple currencies, DumbBudget is a simple way to manage your personal finances from your browser.

Deploy DumbBudget on Railway to access your personal budgeting app through a public web domain. The template configures the application port to `3000` and mounts a persistent volume at `/app/data` to retain your budget data across redeployments.

Set the required `DUMBBUDGET_PIN` variable to protect access to your instance. You can also customize the currency, site title, and instance name to suit your needs. Once deployment is complete, open your service's auto-generated Railway domain to access DumbBudget and start recording your income and expenses.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DumbBudget | `dumbwareio/dumbbudget:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port (Optional) |
| `BASE_URL` | - | URL to access the site (Optional) |
| `CURRENCY` | - | Supported Currency Code: https://github.com/DumbWareio/DumbBudget?tab=readme-ov-file#supported-currencies (Optional) |
| `SITE_TITLE` | DumbBudget | Name to show on site (Optional) |
| `INSTANCE_NAME` | - | Name of instance/account (Optional) |
| `DUMBBUDGET_PIN` | - | Set PIN to access the site (Required) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dumbbudget)
