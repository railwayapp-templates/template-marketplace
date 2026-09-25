# Deploy HeyForm on Railway

HeyForm 3.0: conversational forms, surveys and quizzes, no-code.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/heyform-2)

## About

HeyForm is an open-source form builder for conversational forms, surveys, quizzes and polls. It shows one question at a time, supports logic jumps, hidden fields, file uploads, payments and themes, and sends submissions to webhooks and integrations. It is a self-hosted alternative to Typeform and Tally.

This template runs the official `heyform/community-edition:v3.0.3` image with Railway MongoDB and Redis. HeyForm normally asks every new account to verify its email, which fails without SMTP, so on first boot a script creates a verified owner account from `HEYFORM_ADMIN_EMAIL` and a generated password, and public sign-up stays off (`APP_DISABLE_REGISTRATION=true`). Forms and submissions live in MongoDB; uploaded files go to a Railway volume. Session and form encryption keys are generated. It fits the Hobby plan. Add SMTP variables if you want email notifications for new submissions or want to invite teammates by email.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| Redis | `redis:8.2` | Database |
| heyform | `heyform/community-edition:v3.0.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | heyform | 9157 |
| `NODE_ENV` | heyform | production |
| `TRUST_PROXY` | heyform | 1 |
| `HEYFORM_SEED` | heyform | // First boot only: create a verified owner account from env vars (public sign-up stays disabled).
import { createRequire } from 'module';
const require = createRequire('/app/packages/server/');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const port = process.env.APP_LISTEN_PORT || '9157';
for (let i = 0; i < 180; i++) {
  try {
    if ((await fetch('http://127.0.0.1:' + port + '/health')).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 1000));
}

const email = process.env.HEYFORM_ADMIN_EMAIL.toLowerCase();
const conn = await mongoose.createConnection(process.env.MONGO_URI).asPromise();
const users = conn.collection('usermodels');
if ((await users.countDocuments()) > 0) {
  console.log('seed: users already exist, nothing to do');
} else {
  const now = new Date();
  await users.insertOne({
    name: process.env.HEYFORM_ADMIN_NAME || 'Admin',
    email,
    password: await bcrypt.hash(process.env.HEYFORM_ADMIN_PASSWORD, 10),
    avatar: '',
    lang: 'en',
    isEmailVerified: true,
    isDeletionScheduled: false,
    deletionScheduledAt: 0,
    isBlocked: false,
    lastCheckedAt: 0,
    publishedFormAt: 0,
    createdAt: now,
    updatedAt: now,
  });
  console.log('seed: created verified account ' + email);
}
await conn.close(); |
| `REDIS_PASSWORD` | heyform | (secret) |
| `APP_LISTEN_PORT` | heyform | 9157 |
| `HEYFORM_ADMIN_EMAIL` | heyform | admin@example.com |
| `HEYFORM_ADMIN_PASSWORD` | heyform | (secret) |
| `APP_DISABLE_REGISTRATION` | heyform | true |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c 'printf "%s\n" "$HEYFORM_SEED" > /tmp/seed.mjs; node --enable-source-maps ./dist/src/main.js & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; node /tmp/seed.mjs & wait $pid'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/packages/server/static/upload`

**Category:** Other

[View on Railway →](https://railway.com/deploy/heyform-2)
