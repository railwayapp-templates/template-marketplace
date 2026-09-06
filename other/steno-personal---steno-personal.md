# Deploy steno-personal on Railway

Your Telegram and WhatsApp conversations, connected to your AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steno-personal)

## About

**Your Telegram and WhatsApp conversations, connected to your AI agents.**

One click gives you a running instance: a service built from the project's
Dockerfile, a 5 GB volume at `/data`, and a public URL. Open that URL as soon as
the deploy is green — it lands on **Setup**. Pair a channel, save the access key
it hands you (shown once), and point your agent at `https://your-app.up.railway.app/mcp` with
that key as a bearer token.

Your conversations from both apps live in a single SQLite file on the volume
and stay current as new messages arrive. Agents reach them over **MCP** and can
only read: the code has no path that sends a message, marks a chat read, sets
your presence, or changes your profile. No bot, no second phone number, no
account with anyone but Railway.

- **Read-only by construction.** Every MCP tool declares itself read-only;
  there is no send path to switch off.
- **Yours.** One container, one volume, one file. Two things can leave the
  machine and both are documented: enrichment (off until you add an OpenRouter
  key) and anonymous usage events (off with `DO_NOT_TRACK=1`).
- **Agent-ready.** Seven tools to list, search and read chats, fetch an
  attachment, list your address book, and ask which accounts are connected.
  Works with Claude Code, Claude Desktop, Cursor, and anything that speaks MCP.

**What it costs.** Railway's Hobby plan is $5 a month and includes $5 of usage,
which one instance sitting quietly should stay inside. The free trial and Free
plan cap a volume at 0.5 GB and this template asks for 5 GB, so plan on Hobby.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| steno-personal | [0xmythril/steno-personal](https://github.com/0xmythril/steno-personal) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `DATA_DIR` | /data |
| `SECRET_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, CSS, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/steno-personal)
