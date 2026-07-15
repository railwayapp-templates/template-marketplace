# Deploy Forgejo — Self-Hosted GitHub Alternative & Git Forge on Railway

Self-host Forgejo: lightweight GitHub alternative with CI. No per-seat fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/forgejo-git-forge)

## About

Forgejo is the community-governed, self-hosted Git forge — a lightweight GitHub and GitLab
alternative in Go, backed by the non-profit Codeberg e.V. Everything you actually use GitHub for
in one binary: repositories, issues, pull requests with review, wikis, a package and container
registry, LFS, SSH/HTTP Git, and Forgejo Actions — CI/CD compatible with GitHub Actions YAML.
It's the self-hosting community's default recommendation in 2026, idling at ~170MB RAM vs GitLab's 8GB.

GitHub Enterprise Cloud runs $21/user/month — a 50-person team pays ~$12,600/year. A self-hosted
Forgejo instance handles the same team for the cost of compute. Self-host on Railway for
~$5–15/month with your code, issues, and CI on infrastructure you own, under GPL-v3 with no
per-seat pricing and no risk of a surprise license change.

---

GitHub works until it doesn't — price hikes, Copilot training on your private code, telemetry, and
source that lives on infrastructure you don't control. Forgejo flips that: a forge you own, light
enough for a Raspberry Pi or a small Railway service. It forked from Gitea in 2022 over corporate
governance concerns and is now run by an elected council under a German non-profit.

Running it means the binary, a database, a volume for repos, and HTTPS with SSH for Git. Railway
wires the app and PostgreSQL over private networking with automatic HTTPS, and the volume keeps
your repositories safe across redeploys.

> **Note on federation:** Forgejo's ActivityPub federation is actively developed but still
> experimental as of 2026 — an opt-in roadmap feature, not a production default. Everything else
> (repos, PRs, CI, packages) is production-ready and used at scale on Codeberg.

Typical cost: **~$5–15/month** on Railway for Forgejo and PostgreSQL. GitHub Enterprise Cloud is
$21/user/month; GitLab SaaS Premium is $29/user/month. Self-hosted Forgejo has no per-seat fee —
flat compute regardless of team size, with full data ownership.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Forgejo | `mstreicherde/forgejo` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `USER_GID` | 1000 |
| `USER_UID` | 1000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/git`

**Category:** Other

[View on Railway →](https://railway.com/deploy/forgejo-git-forge)
