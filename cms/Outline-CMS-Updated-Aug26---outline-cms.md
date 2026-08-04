# Deploy Outline CMS [Updated Aug'26] on Railway

Outline [Aug '26] (Team Wiki, Notion & Confluence Alternative) Self Hos

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-cms)

## About

Outline is the open-source team knowledge base that replaces Notion and Confluence for internal documentation. Real-time collaborative editing, markdown-native documents, nested collections, and full-text search, all on infrastructure you control instead of a per-seat SaaS subscription.

Notion's Business plan runs $18-20/user/month, and Confluence's Premium plan runs $10.44/user/month, both scaling directly with headcount. A 20-person team on Notion Business pays $360-400/month before any add-ons; the same team on Confluence Premium still clears $200/month. Self-hosted Outline on Railway costs a flat infrastructure fee regardless of how many people are on your team.

The bigger reason to self-host internal documentation specifically isn't only the pricing curve. A team wiki tends to accumulate exactly the content most companies are least comfortable handing to a third party, internal processes, architecture decisions, sometimes credentials or infrastructure details referenced in passing. Keeping that on infrastructure you control is a meaningfully different security posture than trusting a SaaS vendor's own access controls.

It's worth being direct about something easy to miss when setting up Outline for the first time: it has no built-in username/password login at all, confirmed directly in Outline's own configuration reference, at least one OAuth provider (Google, Slack, Microsoft, Discord, or generic OIDC) is required before anyone can sign in. The existing Railway reference template for Outline doesn't mention this in its own description, a deployer following just the headline environment variables (`DATABASE_URL`, `REDIS_URL`, `URL`, `SECRET_KEY`) would end up with a server that deploys and runs perfectly, with no way to actually log in. This template documents the OAuth requirement prominently, with Google as the simplest starting option.

This isn't a small or unproven project either. Outline has real production adoption among engineering teams specifically, its editor and collection-based organization are frequently cited as a step up from a flat Confluence page tree or an unstructured Notion workspace. That matters for documentation specifically, a wiki nobody can navigate quickly becomes a wiki nobody keeps updated.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| outline-railway | [shruti060701/outline-railway](https://github.com/shruti060701/outline-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `SECRET_KEY` | outline-railway | (secret) |
| `UTILS_SECRET` | outline-railway | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/outline-cms)
