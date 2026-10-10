# Deploy Claude Code UI on Railway

CloudCLI: Claude Code, Codex and OpenCode in the browser, with a login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-code-ui)

## About

[CloudCLI](https://github.com/siteboon/claudecodeui), also known as Claude Code UI, is a web and mobile interface for coding agents. You chat with Claude Code, Codex or OpenCode in a project, browse and edit its files, review git changes, and pick up any earlier session, from a laptop or a phone. This template runs CloudCLI 1.37.4 on a server with the Claude Code, Codex and OpenCode CLIs installed and a login set at deploy.

CloudCLI is single-user, and on a fresh install the first person to open it creates the account. On a public URL that would be whoever finds it first. So on first start the template runs CloudCLI on localhost only, creates the account from `CLOUDCLI_USERNAME` and the generated `CLOUDCLI_PASSWORD`, stops it, and only then opens the public port. In my test CloudCLI reported the account as already set up before anyone had opened the page.

It runs as a normal user rather than root, since Claude Code won't run some modes as root. The whole home directory (`/home/node`) is a volume: CloudCLI's account database, the CLIs' logins, settings and sessions, and your projects under `~/projects` survive redeploys. The image is full Debian with Node.js 22, git and build tools, because the agents build and run code there.

To use a Claude or ChatGPT subscription, open CloudCLI's shell, run `claude` or `codex` and sign in once; the login is saved on the volume. API keys work too: set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` on the service, or the variable your OpenCode provider reads, such as `OPENROUTER_API_KEY`.

Before publishing I tested it on Railway. The account existed before the first visit, and signing in with the generated password worked. I created an API key in CloudCLI's settings and used its agent API to give OpenCode a task on gpt-5-mini through OpenRouter: create `hello.txt` containing "Railway 42". It finished in 12 seconds, and reading the file back through CloudCLI's file API returned exactly that text. After a restart, sign-in, the project and the file were all still there. I didn't run Claude Code or Codex end to end (I had no keys for them in the test); both are installed, at 2.1.295 and 0.162.0, with OpenCode 1.18.35.

Idle, it used 0.08 to 0.15 GB of RAM, around $1 a month on Railway's usage pricing. An agent at work uses more while it runs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudCLI | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /cloudcli) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Port Railway routes to |
| `JWT_SECRET` | (secret) | Signs login sessions (generated) |
| `CLOUDCLI_URL` | - | Open this and sign in with CLOUDCLI_USERNAME and CLOUDCLI_PASSWORD |
| `OPENAI_API_KEY` | (secret) | Optional: for Codex (or sign in with ChatGPT from CloudCLI) |
| `ANTHROPIC_API_KEY` | (secret) | Optional: for Claude Code (or sign in with your Claude account from CloudCLI) |
| `CLOUDCLI_PASSWORD` | (secret) | Its password (generated). Used once at first start; change it later in CloudCLI's settings |
| `CLOUDCLI_USERNAME` | (secret) | Account created on first start |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node`

**Category:** AI/ML · **Tags:** cloudcli, claude-code-ui, claude-code, codex, opencode, coding-agent · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/claude-code-ui)
