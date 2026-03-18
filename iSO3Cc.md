# Deploy Shelf on Railway

Open Source Asset Management Infrastructure for everyone.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/iSO3Cc)

## About

<h4 align="center">
✨ Open Source Asset Management Infrastructure for everyone. ✨
</h4>
<p align="center">
Shelf 🏷️ Asset Management infrastructure for absolutely everyone (open source).<br> <br>
Shelf is a simple and visual asset management and location tracking system that allows people to track their physical assets with ease.
</p>

## Core Features and Benefits 💫

With Shelf, you can take a picture of any item you own and store it in your own database. From there, you can generate a printable code (QR) that you can tag onto the item, making it easy to identify and locate in the future. Shelf has a handy code printing area where you can add as many QR codes as you can on an A4 sticker paper sheet. You can also add detailed information about the item, including its purchase date, purchase price, warranty information, and more.

<p align="center">
    <a href="https://www.shelf.nu/?ref=github"><b>Website</b></a> •
    <a href="https://github.com/Shelf-nu/shelf.nu/tree/main/docs"><b>Documentation</b></a> •
    <a href="https://github.com/Shelf-nu/shelf.nu/blob/main/docs/get-started.md"><b>Get started</b></a> •
    <a href="https://twitter.com/ShelfQR/?ref=github"><b>Twitter</b></a>
</p>

<h4>Deployment</h4>

This app relays on Supabase integration. You need to setup Supabase project and connect your app to Supabase instance and database.

## Authentication

For authentication to work in your Project, you need so setup some settings related to One Time Passwords in Supabase.

In order for OTP to work you need to make your OTP emails. Go to your Supabase dashboard, select your project and navigate to `Authentication &gt; Email Templates`. Replace the `{{ .ConfirmationURL }}` with `{{ .Token }}`. This will make sure that Supabase sends your Users a one time password instead of a magic link. You need to do this both for "Confirm signup" and "Magic link".

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Shelf | `ghcr.io/shelf-nu/shelf.nu:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SMTP_PWD` | - | SMTP password |
| `SMTP_FROM` | - | SMTP email from |
| `SMTP_HOST` | - | SMTP Host |
| `SMTP_USER` | (secret) | SMTP user |
| `DIRECT_URL` | - | Your Supabase session database url for migrations :5432 |
| `SERVER_URL` | - | The app domain. |
| `FINGERPRINT` | $(openssl rand -hex 32) | - |
| `DATABASE_URL` | - | Your Supabase transaction database url :6543 |
| `SUPABASE_URL` | - | Your supabase instance url |
| `MAPTILER_TOKEN` | (secret) | Maptiler token |
| `SESSION_SECRET` | (secret) | - |
| `SUPABASE_ANON_PUBLIC` | - | Your supabase anon public url |
| `SUPABASE_SERVICE_ROLE` | - | Your supabase service role secret |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/iSO3Cc)
