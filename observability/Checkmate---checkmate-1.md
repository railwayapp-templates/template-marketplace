# Deploy Checkmate on Railway

Checkmate 3.12: uptime and infrastructure monitoring with status pages.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkmate-1)

## About

Checkmate is an open-source uptime and infrastructure monitoring tool. It checks websites, APIs, ports, Docker containers and game servers, measures response times, tracks incidents, and publishes status pages. With its optional Capture agent it also reports CPU, memory, disk and network usage from your servers.

This template runs the official `ghcr.io/bluewave-labs/checkmate:v3.12.0` image (API and web app in one) with a Railway MongoDB database. The first account in Checkmate becomes the superadmin, so the start command creates it on first boot from `CHECKMATE_ADMIN_EMAIL` and a generated password; after that, new users need an invite. Monitors, checks and incidents are stored in MongoDB, so they survive redeploys. JWT and encryption keys are generated. It fits the Hobby plan for a few dozen monitors. Ping monitors need raw sockets, which Railway may not allow, so prefer HTTP and port checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| checkmate | `ghcr.io/bluewave-labs/checkmate:v3.12.0` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | checkmate | 52345 |
| `NODE_ENV` | checkmate | production |
| `JWT_SECRET` | checkmate | (secret) |
| `CHECKMATE_SEED` | checkmate | // First boot only: create the superadmin from env vars so nobody else can claim the instance.
const api = 'http://127.0.0.1:' + (process.env.PORT || '52345') + '/api/v1/auth';
for (let i = 0; i < 180; i++) {
  try {
    const r = await fetch(api + '/users/superadmin');
    if (r.ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 1000));
}
const exists = await (await fetch(api + '/users/superadmin')).json();
if (exists.data) {
  console.log('seed: superadmin already exists, nothing to do');
} else {
  const body = {
    firstName: process.env.CHECKMATE_ADMIN_FIRST_NAME || 'Admin',
    lastName: process.env.CHECKMATE_ADMIN_LAST_NAME || 'User',
    email: process.env.CHECKMATE_ADMIN_EMAIL,
    password: process.env.CHECKMATE_ADMIN_PASSWORD,
  };
  const r = await fetch(api + '/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user: body }),
  });
  console.log('seed: register returned ' + r.status + (r.ok ? ', superadmin created' : ' ' + (await r.text()).slice(0, 200)));
} |
| `CHECKMATE_ADMIN_EMAIL` | checkmate | admin@example.com |
| `CHECKMATE_ADMIN_PASSWORD` | checkmate | (secret) |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CHECKMATE_SEED" > /tmp/seed.mjs; node dist/index.js & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; node /tmp/seed.mjs & wait $pid'`
- **Healthcheck:** `/api/v1/auth/users/superadmin`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/checkmate-1)
