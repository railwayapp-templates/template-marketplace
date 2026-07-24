# Deploy Node.js HTTP Server — Zero Dependencies on Railway

Bare Node http module server — no Express, no npm install

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-http-zero-deps)

## About

A minimal HTTP server built on Node.js's built-in `http` module — no Express, no framework, no dependencies at all. Just the standard library, a `package.json` with an empty dependency list, and a server that starts instantly.

If you want a clean foundation without inheriting a framework's opinions or its dependency tree, this is it.

---

Node ships with a complete HTTP server in its standard library. Most starters wrap it in Express anyway, which brings in a dependency tree, a build step, and a routing abstraction you may not need. For a small API, a webhook receiver, or a health-check endpoint, `http.createServer` is genuinely enough.

Going dependency-free has practical consequences beyond ideology. There is no `npm install` at build time, so deploys are fast. There is no third-party code in your runtime, so there is no supply-chain surface and no dependency audit to keep clean. Cold starts are as quick as Node itself. And the whole server is short enough to read in one sitting, which matters when you're the person maintaining it.

Railway supplies the port through the `PORT` environment variable and terminates TLS in front of the service, so your server binds to `0.0.0.0` on that port and stays plain HTTP internally. Push to your repo and Railway rebuilds and redeploys automatically.

Typical cost: **~$5/month** on Railway's Hobby plan for a single always-on service — and because there are no dependencies to install or framework overhead to run, it uses very little of it.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NodeJS | [railwayapp-templates/http-nodejs](https://github.com/railwayapp-templates/http-nodejs) | Worker |

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/node-http-zero-deps)
