# Deploy Obsidian LiveSync CouchDB | (Just Updated) Admin Password Survives Every Redeploy on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/obsidian-livesync-couchdb-v3521-or-admin)

## About

A CouchDB 3.5.2.1 sync server for the [Obsidian Self-hosted LiveSync](https://github.com/vrtmrz/obsidian-livesync)
plugin — real-time, end-to-end-encrypted sync of your vault across desktop and mobile, on
infrastructure you own, instead of a subscription.

It deploys **already provisioned**. The admin password is generated once by Railway and
stays the same for the life of the deployment, the CouchDB settings the plugin requires are
already applied, and the databases already exist. There is no setup script to run and
nothing to create by hand before the plugin will connect.

Self-hosting Obsidian sync is really two jobs: run CouchDB, and configure it exactly the way
LiveSync needs. The second job is where it goes wrong, and it is the part this template does
for you.

**The settings are upstream's, not hand-picked.** The plugin's own documentation
(`docs/setup_own_server.md`) makes provisioning a required step — install Deno, then run
`couchdb-init.sh` against your server. Everything that script applies, from
[`utils/couchdb/provision.ts`](https://github.com/vrtmrz/obsidian-livesync/blob/main/utils/couchdb/provision.ts),
is baked into this image: single-node mode, `require_valid_user` on `[chttpd]` and
`[chttpd_auth]`, the `WWW-Authenticate` challenge, CORS enabled with the
`app://obsidian.md` and `capacitor://localhost` origins and `credentials = true`, a 4 GB
`max_http_request_size` and a 50 MB `max_document_size`. You do not run the script — the
deploy comes up already in that state.

**The databases are created on first boot.** A single node needs `_users`, `_replicator` and
`_global_changes`, and LiveSync needs a vault database. All four exist when the deploy
finishes:

```
["_global_changes","_replicator","_users","obsidiannotes"]
```

Point the plugin at `obsidiannotes` and it connects. There is no step where you open Fauxton
and create a database before anything works.

**Your admin password survives redeploys.** This is the part worth reading carefully if you
are comparing templates. A CouchDB container keeps its `[admins]` section in
`/opt/couchdb/etc/local.d/`, which lives in the image — *not* in `/opt/couchdb/data`, which is
the mounted volume. So anything that generates a password at first boot and assumes the
volume remembers it is wrong, and the mistake only shows up on the second deploy. Railway
redeploys whenever you change a variable, update the image, or restart the service.

This template never generates a password in the container. `COUCHDB_PASSWORD` is a Railway
`${{secret(32)}}`: generated once when you deploy, stored as a project variable you can read
in the dashboard at any time, and applied identically on every boot afterwards. Verified by
redeploying against a populated volume — the same password still authenticates, the vault
data is still there, and nothing else does.

**Mobile works because Railway terminates TLS.** Obsidian on iOS and Android requires a valid
certificate, which normally means a reverse proxy, a tunnel, or Let's Encrypt by hand. Your
Railway domain is HTTPS already, and `capacitor://localhost` — the mobile app's CORS origin —
is in the allowed list.

**Cost.** One always-on service plus a volume; CouchDB is light, and Railway bills by usage.
Both CouchDB and the LiveSync plugin are free and open source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| couchdb | `ghcr.io/bon5co/obsidian-livesync-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `COUCHDB_SECRET` | (secret) |
| `COUCHDB_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/_up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/couchdb/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/obsidian-livesync-couchdb-v3521-or-admin)
