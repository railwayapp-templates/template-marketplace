# Deploy Express API | TypeScript, Rate Limiting and Security Headers on Railway

Express 5 and TypeScript, proxy-aware rate limiting and security headers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/express-api-or-typescript-rate-limiting-)

## About

Express 5 on TypeScript, with the middleware an internet-facing API actually needs.

The ExpressJS template on Railway deploys a repository whose package.json is a 2018 express-generator skeleton: express ~4.16.1, pug 2.0.0-beta11, debug ~2.6.9, http-errors ~1.6.3. Express 4.16 shipped in 2017 and that pug is a beta from the same year. Around four deployments in ten do not come up, and the ones that do run a stack nobody has patched in seven years.

This starter is Express 5 on current Node, with a committed lockfile that passes `npm audit --audit-level=high` - which matters here, because Railway refuses to build when the lockfile carries a HIGH advisory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [ak40u/express-api-railway-starter](https://github.com/ak40u/express-api-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `RATE_LIMIT_PER_MINUTE` | 120 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/express-api-or-typescript-rate-limiting-)
