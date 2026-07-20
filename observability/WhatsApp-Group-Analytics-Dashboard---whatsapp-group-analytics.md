# Deploy WhatsApp Group Analytics Dashboard on Railway

Self-hosted engagement analytics for WhatsApp groups you admin

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-group-analytics)

## About

WhatsApp Group Analytics is a self-hosted dashboard that turns the groups you administer into engagement data — message volume over time, active and dormant members, peak activity hours, and growth trends. It connects to your own Evolution API instance, stores everything in your own PostgreSQL database, and sends nothing to a third party.

Built for community managers who run WhatsApp groups the way others run Discord servers, and who want the same reporting.

---

WhatsApp gives group admins no reporting whatsoever. You can see a member list and scroll history — that's the entire toolset. Anyone running a paid community, a cohort-based course, or client groups on behalf of an agency ends up counting messages by hand or exporting chats into a spreadsheet.

The hosted alternatives ask you to hand your group data to someone else's servers. That is usually a non-starter for anyone with a compliance obligation, and it's a poor trade for data you can just keep.

This template runs the whole pipeline on infrastructure you control. Evolution API delivers group events by webhook, the collector aggregates them into PostgreSQL, and the dashboard reads from that. Raw message bodies are never persisted — only counters, timestamps, and member identifiers.

Typical cost: **~$5–10/month** on Railway's Hobby plan for all services, flat regardless of group size or message volume.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Whatsapp Group Monitor | [marinaglancy/whatsapp-group-monitor](https://github.com/marinaglancy/whatsapp-group-monitor) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | warn | - |
| `ADMIN_PASSWORD` | (secret) | Password for web access |
| `ADMIN_USERNAME` | (secret) | - |

## Configuration

- **Volume:** `/app/data`

**Category:** Observability · **Languages:** TypeScript, HTML, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-group-analytics)
