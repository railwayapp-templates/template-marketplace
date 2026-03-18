# Deploy Siyuan (Open-Source Notetaking & Knowledgebase Platform) on Railway

Siyuan [Mar ’26] (Privacy-first Notetaker & Knowledge Management) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/siyuan)

## About

Siyuan is a free, open-source notetaking and knowledge management platform available on [GitHub](https://github.com/siyuan-note/siyuan). It’s designed for people who want a personal knowledgebase, complete control of their notes, and flexible organization features. Unlike cloud-only note apps, Siyuan gives you the freedom to self host, keeping your notes fully private and under your control.

You can self host Siyuan using Docker, which makes it simple to run and manage across different environments. By hosting Siyuan on Railway, you don’t need to worry about complicated server management. Your notes and knowledgebase stay private, while Railway manages scaling, uptime, and security for you.

Siyuan supports local-first notetaking with full Markdown compatibility, block-level editing, and graph-based knowledge organization. With Railway, the deploy process is streamlined—just a few clicks and you can access Siyuan in your browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| b3log/siyuan:latest | `b3log/siyuan:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | america/los_angeles |
| `PORT` | 6806 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/siyuan/workspace`

**Category:** CMS

[View on Railway →](https://railway.com/template/siyuan)
