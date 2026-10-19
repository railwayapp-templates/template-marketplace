# Deploy Ubuntu SSH and AI CLI Starter on Railway

SSH development container with generated credentials and durable workspace.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-ssh-and-ai-cli-starter)

## About

SSH development container with generated credentials and durable workspace.

This deployment fork provisions ubuntu(ssh+claude). Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu(ssh+claude) | [parham7991/railway-ubuntu-ssh-claude](https://github.com/parham7991/railway-ubuntu-ssh-claude) (branch: main) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_LANG` | en | Runtime message language: en or fa. / زبان پیام‌ها: en یا fa. |
| `GITHUB_TOKEN` | (secret) | GitHub token (repo scope). When set, /root/src is auto-backed up to a private repo ara-tm-src-<id> and restored on every redeploy — your files survive container rebuilds. / توکن GitHub (scope: repo). وقتی ست شود، پوشه src به صورت خودکار در مخزنی خصوصی پشتیبان‌گیری و روی هر بازسازی بازیابی می‌شود. |
| `SSH_PASSWORD` | (secret) | Generated password for the optional operator account. |
| `SSH_USERNAME` | (secret) | - |
| `ROOT_PASSWORD` | (secret) | Generated root SSH password. |
| `AUTHORIZED_KEYS` | - | SSH public key(s) for root key-based auth (password login stays on). / کلید(های) عمومی SSH برای root. |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /workspace && chown 1000:1000 /workspace && python3 -c '"'"'import pathlib
p=pathlib.Path('"'"'"'"'"'"'"'"'/usr/local/bin/ssh-user-config.sh'"'"'"'"'"'"'"'"')
text=p.read_text()
text=text.replace('"'"'"'"'"'"'"'"'configure_claude_settings() {'"'"'"'"'"'"'"'"', '"'"'"'"'"'"'"'"'configure_claude_settings() {'"'"'"'"'"'"'"'"' + chr(10) + '"'"'"'"'"'"'"'"'    return 0'"'"'"'"'"'"'"'"' + chr(10))
p.write_text(text)
pathlib.Path('"'"'"'"'"'"'"'"'/root/.claude'"'"'"'"'"'"'"'"').mkdir(exist_ok=True)
pathlib.Path('"'"'"'"'"'"'"'"'/root/.claude/settings.json'"'"'"'"'"'"'"'"').write_text('"'"'"'"'"'"'"'"'{}'"'"'"'"'"'"'"'"')
'"'"' && exec /usr/local/bin/ssh-user-config.sh'`
- **TCP Proxies:** 22
- **Volume:** `/workspace`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-ssh-and-ai-cli-starter)
