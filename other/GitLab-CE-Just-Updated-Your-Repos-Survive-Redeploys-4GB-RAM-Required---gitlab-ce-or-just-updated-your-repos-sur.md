# Deploy GitLab CE | (Just Updated) Your Repos Survive Redeploys, 4GB RAM Required on Railway

Needs 4GB RAM. Repos, database and uploads survive every redeploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab-ce-or-just-updated-your-repos-sur)

## About

GitLab Community Edition is a complete self-hosted DevOps platform — Git repository
hosting, merge requests, issue tracking, a container registry, CI/CD pipelines, a wiki
and a full REST and GraphQL API. This template runs it on the configuration it actually
needs on Railway, rather than the one that merely boots.

**This template requires 4 GB of RAM and therefore the Hobby plan.** That is stated
first because it is the single fact that decides whether your deploy works. Measured on
the official `gitlab/gitlab-ce` image: at a 2 GB cap the omnibus first-boot reconfigure
is OOM-killed after about 220 seconds having reached 1.94 GiB, so **every Free (0.5 GB)
and Trial (1 GB) deploy of any GitLab listing fails 100% of the time** and no
configuration rescues it. At 4 GB it boots cleanly and settles around 2.3–3.0 GiB.

GitLab CE is not a single process. The omnibus image runs Puma, Sidekiq, Gitaly, Redis,
PostgreSQL, gitlab-workhorse, gitlab-kas and nginx under a `runit` supervisor inside one
container, and configures all of them from a Chef converge on every boot. Three things
follow from that, and this template addresses each one.

**Your repositories, database and uploads all live under `/var/opt/gitlab`.** Git repos
are at `/var/opt/gitlab/git-data/repositories`, the PostgreSQL cluster at
`/var/opt/gitlab/postgresql`, attachments and avatars at
`/var/opt/gitlab/gitlab-rails/uploads`. Without a persistent volume on that exact path,
all of it is container-local — so **every redeploy destroys every repository**, silently
and with no error, and the instance comes back looking like a fresh install. This
template mounts a Railway volume at `/var/opt/gitlab`. Verified by creating a project,
destroying the container entirely, bringing it back on the same volume, and reading the
project and its on-disk `.git` directory back.

**Puma's default listener is `127.0.0.1:8080` — which is exactly the port Railway
injects.** Point nginx at Railway's port without moving Puma and the two collide: Puma
dies on `Address already in use - bind(2) for "127.0.0.1" port 8080 (Errno::EADDRINUSE)`
and is restarted forever by runit, while nginx stays up and answers every request with
`502`. The container reports itself running the whole time. This template puts nginx on
Railway's port and moves Puma to 8092.

**`/etc/gitlab` is not persisted, and does not need to be.** The file that matters there
is `gitlab-secrets.json`, which holds the key bases used to encrypt columns in the
database; lose it and your existing 2FA secrets, CI/CD variables and access tokens
become undecryptable even though the database survived. Rather than juggling a second
mount, this template seeds `db_key_base`, `secret_key_base` and `otp_key_base` from
Railway variables, which are stable across redeploys — so the secrets are regenerated
identically every boot. Verified: a personal access token created before a full
container replacement still authenticated afterwards.

Two more fixes worth naming. `external_url` is wired to your Railway domain as
**`https://`** with `nginx['listen_https'] = false`, so TLS terminates at Railway's edge
while clone URLs, invite links, webhook targets and OAuth callbacks are all generated
with the correct public scheme and host. And the `root` password is seeded from a
Railway-generated variable instead of being left to omnibus's
`/etc/gitlab/initial_root_password`, a file that is **deleted 24 hours after first boot**
and lives on ephemeral disk anyway — the usual way a deployer ends up locked out of
their own GitLab.

The image is pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitlab | `gitlab/gitlab-ce@sha256:c7c87778c3380e4f93843f7329e3f2dc4aed1b90f29d05e56d8834ce50dccc54` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GITLAB_ROOT_PASSWORD` | (secret) |
| `GITLAB_SECRET_KEY_BASE` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/gitlab`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitlab-ce-or-just-updated-your-repos-sur)
