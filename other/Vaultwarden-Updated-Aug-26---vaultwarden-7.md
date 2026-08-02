# Deploy Vaultwarden [Updated Aug '26] on Railway

Vaultwarden [Aug '26] (Self-Hosted Bitwarden-Compatible Vault) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-7)

## About

Vaultwarden is the lightweight, Rust-based server that speaks the Bitwarden API. Every official Bitwarden client, browser extension, phone app, desktop app, connects to it exactly like it would to Bitwarden's own cloud, so you get a full password manager with zero client-side compromise and every byte of vault data on infrastructure you control.

Bitwarden Teams costs $4/user/month, Enterprise runs $6/user/month, both billed annually. A 15-person company pays $720 to $1,080 a year just for vault access, and that number climbs every time you hire. Vaultwarden self-hosted on Railway costs a flat infrastructure fee no matter how many people or organizations you add, so the math only gets better as your team grows.

The bigger reason people choose this over price alone is what's actually stored in a password vault. It's not just logins, it's every credential you've ever saved: banking, email, work systems, the master keys to your digital life. Handing that to a third party means trusting their breach history, their retention policies, and their incident response, forever. Self-hosting means your encrypted vault never leaves a server you control. For teams handling client credentials specifically, that's often a real compliance requirement, not a nice-to-have.

It's worth being direct about something too: Vaultwarden is not the official Bitwarden server. It's an independent, actively-maintained reimplementation written in Rust, popular specifically because the official server is heavier to self-host and Vaultwarden's smaller footprint runs comfortably on a fraction of the resources. The official Bitwarden server ships as a multi-container stack meant for larger deployments; Vaultwarden collapses that down to a single lightweight binary that a small team or individual can run cheaply, without giving up any client compatibility along the way.

This also isn't a fringe project. Vaultwarden has more GitHub stars than most self-hosted alternatives in this category, and it's been through years of community security review because so many people trust it with something as sensitive as a password vault. That track record matters more here than for, say, a scheduling tool, since the value proposition rests entirely on the server being trustworthy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden-railway | [shruti060701/vaultwarden-railway](https://github.com/shruti060701/vaultwarden-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | vaultwarden-railway | 8080 | Port Railway routes external traffic to. Must be an explicit Railway variable, not just a Dockerfile `ENV` default — this project has confirmed the hard way (Metabase, Postiz) that a Dockerfile-only default alone doesn't get picked up by Railway's edge routing. |
| `DOMAIN` | vaultwarden-railway | - | Public URL of the instance. Used to build correct links in outgoing emails, and required for WebAuthn/U2F two-factor methods to work at all. |
| `ADMIN_TOKEN` | vaultwarden-railway | (secret) | Password gating the `/admin` panel. Auto-generated per deploy — treat like any other credential. Vaultwarden also accepts an Argon2-hashed token, but a plaintext `secret()` value is simpler for a one-click template and works fine (only generates a cosmetic startup log warning recommending the hashed form). |
| `ROCKET_PORT` | vaultwarden-railway | 8080 | Vaultwarden's actual port-configuration variable — it runs on the Rocket web framework and does not read Railway's generic `PORT` itself. Set to the same value as `PORT` above. |
| `DATABASE_URL` | vaultwarden-railway | - | Connection string for Vaultwarden's own application database (users, encrypted vault entries, organizations). |
| `ROCKET_ADDRESS` | vaultwarden-railway | 0.0.0.0 | Binds the server to all network interfaces. Without this, Rocket may default to binding only `127.0.0.1` inside the container, which Railway's edge cannot reach. |
| `SIGNUPS_ALLOWED` | vaultwarden-railway | true | Whether new accounts can self-register. Ships open by default like most self-hosted tools in this project (Postiz, Typebot) — deployer should set to `false` immediately after creating their own account. Document this clearly in README/composer description since Vaultwarden does not warn about it on its own. |
| `ENABLE_WEBSOCKET` | vaultwarden-railway | true | Enables real-time sync across connected clients. Runs over the same port as the main app in current Vaultwarden versions — no separate port/service needed, unlike some older self-hosted setup guides. |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup |
| `DATABASE_URL` | Postgres | - | Standard connection string, referenced directly by `vaultwarden`'s `DATABASE_URL` above. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network. |

## Configuration

- **Healthcheck:** `/alive`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/vaultwarden-7)
