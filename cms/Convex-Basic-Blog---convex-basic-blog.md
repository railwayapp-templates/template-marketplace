# Deploy Convex Basic Blog on Railway

the admin ui and mcp server for the Convex Basic Blog Component

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-basic-blog)

## About

Convex Basic Blog is the open-source stack around the npm package basic-blog-convex-blog-cms: a Convex component for a small headless blog (posts, blocks, site settings, uploads), a bundled TipTap admin (blog-admin-serve), and optional MCP tooling so agents can list and edit articles. Your public site stays your own app; this stack covers backend data, CMS, and SEO helpers.

Connect Railway to GitHub and deploy from https://github.com/daocodotorg/basic-blog (or your fork). Convex itself remains on Convex Cloud; Railway runs the monorepo services (admin in packages/convex-blog-cms, optional MCP HTTP in packages/convex-blog-mcp). Set CONVEX_URL on each Railway service, generate domains, open /admin for the CMS and /mcp if you use MCP. Use BLOG_ADMIN_API_KEY and MCP_BEARER_TOKEN when you need to lock down access.

Hosting does not move your database off Convex. You create or use a Convex Cloud deployment, install basic-blog-convex-blog-cms, register the component in convex.config, and expose makeBlogAdminAPI (including generateUploadUrl) per docs/SETUP.md in the repo. Railway builds Docker images from the linked GitHub repository: Dockerfile.admin for the bundled TipTap admin SPA, Dockerfile.http for Streamable HTTP MCP. Set Root Directory per service (packages/convex-blog-cms and/or packages/convex-blog-mcp) so railway.toml picks the right Dockerfile. After variables and networking are set, editors use the public /admin URL; agents can call the MCP service URL if you deployed it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Admin UI | [daocodotorg/basic-blog](https://github.com/daocodotorg/basic-blog) (root: packages/convex-blog-cms) | Web service |
| Basic Blog MCP | [daocodotorg/basic-blog](https://github.com/daocodotorg/basic-blog) (root: packages/convex-blog-mcp) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BLOG_ADMIN_API_KEY` | Admin UI | (secret) |
| `NEXT_PUBLIC_BLOG_ADMIN_API_KEY` | Admin UI | (secret) |
| `BLOG_ADMIN_API_KEY` | Basic Blog MCP | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `pnpm --filter @basic-blog/convex-blog-mcp start`

**Category:** CMS · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/convex-basic-blog)
