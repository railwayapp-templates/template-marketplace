# Deploy SvelteKit | Svelte 5 App on Current Versions on Railway

SvelteKit 2 and Svelte 5, server-rendered with an audited lockfile

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sveltekit-or-svelte-5-app-on-current-ver)

## About

SvelteKit 2 on Svelte 5, server-rendered by adapter-node.

The SvelteKit template on Railway builds from a repository last updated in November 2024. It pins Vite 5 and Tailwind 3, and it carries a full lint and format toolchain - ESLint, Prettier and three plugins - in a project whose job is to show you a working page. Around three deployments in ten do not come up, and on this platform a committed lockfile with a HIGH advisory is enough to stop a build outright.

This one tracks current versions, keeps the dependency list to what actually renders the page, and commits a lockfile that passes `npm audit --audit-level=high`.

Nothing is missing that you cannot add in a minute - `npx sv add tailwindcss`, `npx sv add eslint`. A starter should not be choosing your linter for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [ak40u/sveltekit-railway-starter](https://github.com/ak40u/sveltekit-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Svelte, JavaScript, TypeScript, HTML

[View on Railway →](https://railway.com/deploy/sveltekit-or-svelte-5-app-on-current-ver)
