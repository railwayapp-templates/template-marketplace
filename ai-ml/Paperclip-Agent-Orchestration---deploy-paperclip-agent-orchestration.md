# Deploy Paperclip Agent Orchestration on Railway

Orchestrate teams of AI agents in one UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-paperclip-agent-orchestration)

## About

Paperclip is an MIT-licensed Node.js app that runs an AI agent company from one browser tab. You set an org chart, goals, issues, budgets, and approval gates. Agents built on Claude Code, Codex, Gemini CLI, OpenClaw, or HTTP adapters check out work and report back. You stay the board: agents propose, you approve.

This template runs Paperclip as one Railway service on port 3100. Railway provisions Postgres 18 and attaches it through DATABASE_URL.

The template generates three 64-character hex secrets: BETTER_AUTH_SECRET for auth sessions, PAPERCLIP_AGENT_JWT_SECRET for agent tokens, and PAPERCLIP_SECRETS_MASTER_KEY for encrypting company secrets in Postgres.

The start command runs upstream tini plus docker-entrypoint.sh. Railway replaces ENTRYPOINT when a start command is set, so the entrypoint still chowns the volume, drops to the node user, runs a one-time invite helper, then starts Paperclip. Run one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperclip | `ghcr.io/paperclipai/paperclip:2026.1012.0@sha256:1661b3dd3fdf7a9b59542d1ced464c3faf9dc8309798b4d15a9923ed32795307` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private connection string used by Paperclip. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy. |
| `HOST` | paperclip | 0.0.0.0 | Bind address; 0.0.0.0 so Railway can reach the server. |
| `PORT` | paperclip | 3100 | HTTP port for the API and UI (3100). |
| `SERVE_UI` | paperclip | true | Serve the React UI from the same server. |
| `DATABASE_URL` | paperclip | - | Postgres connection string from the Postgres service. |
| `GEMINI_API_KEY` | paperclip | (secret) | Optional Google key for Gemini CLI agents. |
| `OPENAI_API_KEY` | paperclip | (secret) | Optional OpenAI key for Codex and OpenAI agents. |
| `PAPERCLIP_BIND` | paperclip | lan | Bind mode; lan for access through Railway's proxy. |
| `PAPERCLIP_HOME` | paperclip | /paperclip | Data directory on the /paperclip volume. |
| `ANTHROPIC_API_KEY` | paperclip | (secret) | Optional Anthropic key for Claude Code agents. |
| `PAPERCLIP_API_URL` | paperclip | - | Public API base URL from the Railway domain. |
| `BETTER_AUTH_SECRET` | paperclip | (secret) | Signs auth sessions; generated per deploy, keep stable. |
| `PAPERCLIP_PUBLIC_URL` | paperclip | - | Public HTTPS URL from the Railway domain. |
| `PAPERCLIP_DEPLOYMENT_MODE` | paperclip | authenticated | authenticated: login required for every user. |
| `PAPERCLIP_AGENT_JWT_SECRET` | paperclip | (secret) | Signs agent tokens; generated per deploy, keep stable. |
| `PAPERCLIP_SECRETS_MASTER_KEY` | paperclip | (secret) | Encrypts company secrets; never change after deploy. |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | paperclip | public | public: hardened for internet exposure. |
| `PAPERCLIP_RAILWAY_BOOTSTRAP_JS` | paperclip | import{createHash as H,randomBytes as R}from"node:crypto";import{createRequire as Q}from"node:module";const L=m=>console.log("[railway-bootstrap] "+m),P=process.env.PORT||"3100",U=(process.env.PAPERCLIP_PUBLIC_URL||"http://localhost:"+P).replace(/\/+$/,""),D=process.env.DATABASE_URL,E=Math.max(1,Math.min(720,Number(process.env.PAPERCLIP_BOOTSTRAP_INVITE_HOURS)||72));async function W(){const t=Date.now();while(Date.now()-t<9e5){try{const r=await fetch("http://127.0.0.1:"+P+"/api/health",{signal:AbortSignal.timeout(5e3)});if(r.ok){const b=await r.json();if(b&&b.status==="ok"&&b.bootstrapStatus)return b}}catch{}await new Promise(r=>setTimeout(r,3e3))}return null}async function M(){if(!D)return L("DATABASE_URL not set; skipping first-admin invite");const h=await W();if(!h)return L("server not healthy in time; skipping first-admin invite");if(h.deploymentMode!=="authenticated")return;if(h.bootstrapStatus!=="bootstrap_pending")return L("instance already has an admin; no invite needed");const sql=Q("/app/packages/db/package.json")("postgres")(D,{max:1,onnotice:()=>{}});try{const[{c}]=await sql`SELECT count(*)::int AS c FROM instance_user_roles WHERE role='instance_admin'`;if(c>0)return;const n=new Date();await sql`UPDATE invites SET revoked_at=${n},updated_at=${n} WHERE invite_type='bootstrap_ceo' AND revoked_at IS NULL AND accepted_at IS NULL AND expires_at>${n}`;const k="pcp_bootstrap_"+R(24).toString("hex"),x=new Date(Date.now()+E*36e5);await sql`INSERT INTO invites(invite_type,token_hash,allowed_join_types,expires_at,invited_by_user_id)VALUES('bootstrap_ceo',${H("sha256").update(k).digest("hex")},'human',${x},'system')`;L("No Paperclip admin yet. Sign up, then open this one-time first-admin invite URL:");L(U+"/invite/"+k);L("Expires "+x.toISOString()+" (a fresh link is printed on every restart until claimed)")}finally{await sql.end({timeout:5}).catch(()=>{})}}M().catch(e=>L("could not create first-admin invite: "+(e&&e.message||e))); | Invite helper script run by the start command. |
| `PAPERCLIP_RAILWAY_BOOTSTRAP_INVITE` | paperclip | true | Print a first-admin invite URL in deploy logs. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "printenv PAPERCLIP_RAILWAY_BOOTSTRAP_JS > /tmp/railway-bootstrap.mjs || true; chmod 644 /tmp/railway-bootstrap.mjs; exec /usr/bin/tini -s -- docker-entrypoint.sh /bin/sh -c 'cd /app; if [ -s /tmp/railway-bootstrap.mjs ] && [ ${PAPERCLIP_RAILWAY_BOOTSTRAP_INVITE:-true} = true ]; then (node /tmp/railway-bootstrap.mjs &); fi; exec node --import ./server/node_modules/tsx/dist/loader.mjs server/dist/index.js'"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-paperclip-agent-orchestration)
