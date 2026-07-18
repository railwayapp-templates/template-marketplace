# Deploy clanker-laravel on Railway

Laravel 12 + Clanker Support — an AI-powered support agent on every page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clanker-laravel)

## About

A Laravel 12 starter with the [Clanker Support](https://clankersupport.com)
support agent built in — visitors get streaming answers from your knowledge
base, can escalate to a human, and every conversation lands in your team inbox.

This template deploys the official Laravel 12 skeleton served by `php artisan
serve`, with SQLite storage and migrations applied automatically on every
deploy. The `@clankerSupport` Blade directive from
[`clankersupport/clankersupport-php`](https://packagist.org/packages/clankersupport/clankersupport-php)
renders the support-agent widget on every page. Configuration is one variable:
your project's public widget key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clankersupport-templates | [theopenco/clankersupport-templates](https://github.com/theopenco/clankersupport-templates) (branch: main) (root: templates/laravel) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_KEY` | CLANKER_PROJECT_KEY | "Your project's public widget key (Dashboard → Project → Embed)" |

**Category:** Starters · **Languages:** PHP, TypeScript, CSS, Blade, HTML, Python, JavaScript

[View on Railway →](https://railway.com/deploy/clanker-laravel)
