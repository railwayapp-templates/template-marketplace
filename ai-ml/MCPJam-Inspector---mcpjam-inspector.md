# Deploy MCPJam Inspector on Railway

Self-host MCPJam Inspector: test and debug MCP servers in a browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcpjam-inspector)

## About

MCPJam Inspector is the open-source testing and evaluation platform for MCP
server developers. This template compiles it from the official source tree and
runs it as one Railway service — a Hono/Node API plus a compiled React client —
behind a public HTTPS URL. You get tools, resources, prompts, the OAuth
debugger, a widget emulator and the LLM playground, with no `node`, no `docker`
and no tunnel on your machine. Access is gated by the Inspector's own session
token, which Railway generates for you.

The Inspector normally runs locally (`npx @mcpjam/inspector`, or a desktop
app). Hosting it buys you a URL: test an MCP server from a phone or a second
machine, hand a colleague a live server configuration instead of a stale JSON
snippet, and keep a standing rig pointed at staging. The app is stateless, so
there is no database, no volume and no migration — one service, one public URL.

**Works hosted:** any public HTTPS MCP server (Streamable HTTP and SSE),
including OAuth-protected ones; tools, resources, prompts, elicitation,
logging, conformance checks; the LLM playground with your own key; the
ChatGPT-apps / MCP-apps widget emulator; the OAuth debugger.

**Does not work hosted:** STDIO servers (a container has no `npx` of yours),
`localhost` servers, reading your machine's `~/.mcp` or skills, and
tab-to-tab continuations designed for `127.0.0.1`. The terminal and browser
tools are disabled by this template — see Security.

**Getting in:** the Inspector is gated by a URL fragment, not a login. After the
deployment succeeds, open the service's deploy log and copy the printed link:

```text
✔ MCPJam Inspector is ready
  ➜ Open MCPJam
  https://YOUR-SERVICE.up.railway.app/#token=YOUR-TOKEN
```

Open that whole link in a browser; the `#token=` fragment signs the browser in
and is stripped from the address bar.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MCPJam Inspector | [BURNI80/mcpjam-inspector-railway](https://github.com/BURNI80/mcpjam-inspector-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 6274 |
| `MCPJAM_SESSION_TOKEN` | (secret) |
| `MCPJAM_LOCAL_BROWSER_ENABLED` | false |
| `MCPJAM_LOCAL_COMPUTER_ENABLED` | false |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, HTML, MDX, Go, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mcpjam-inspector)
