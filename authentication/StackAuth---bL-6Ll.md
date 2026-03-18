# Deploy StackAuth on Railway

auth0 and Clerk selfhostable alternative. robust, secured, and customizable

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bL-6Ll)

## About

## 📦 Deployment Notes
- To create first user &amp; access dashboard for the first time:
After deployment finished, go directly to database -&gt; ApiKeySet -&gt; then manually edit the publishableClientKey
and secretServerKey to be the same as in environment variable config.
- To gain admin access and config:
Create a user. Go directly to database -&gt; ProjectUser -&gt; manually update serverMetaData field to contain project "internal"  with following json:
 {
  "managedProjectIds": [
    "internal"
  ]
}
------------------------------------------

[![Stack Logo](/.github/assets/logo.png)](https://stack-auth.com)

<h3 align="center">
  <a href="https://docs.stack-auth.com">📘 Docs</a>
  | <a href="https://stack-auth.com/">☁️ Hosted Version</a>
  | <a href="https://demo.stack-auth.com/">✨ Demo</a>
  | <a href="https://discord.stack-auth.com">🎮 Discord</a>
</h3>

# Stack Auth: Open-source Clerk/Auth0 alternative

Stack Auth is a managed user authentication solution. It is developer-friendly and fully open-source (licensed under MIT and AGPL).

Stack Auth gets you started in just five minutes, after which you'll be ready to use all of its features as you grow your project. Our managed service is completely optional and you can export your user data and self-host, for free, at any time.

We support Next.js, React, and JavaScript frontends, along with any backend that can use our [REST API](https://docs.stack-auth.com/rest-api/overview). Check out our [setup guide](https://docs.stack-auth.com/getting-started/setup) to get started.

<div align="center">
<img width="400" src=".github/assets/create-project.gif" alt="Stack Auth Setup">
</div>

## Table of contents




- [How is this different from X?](#how-is-this-different-from-x)
- [✨ Features](#-features)
- [📦 Installation &amp; Setup](#-installation--setup)
- [🌱 Some community projects built with Stack Auth](#-some-community-projects-built-with-stack-auth)
  - [Templates](#templates)
  - [Examples](#examples)
- [🏗 Development &amp; Contribution](#-development--contribution)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Database migrations](#database-migrations)
  - [Chat with the codebase](#chat-with-the-codebase)
  - [Architecture overview](#architecture-overview)
- [❤ Contributors](#-contributors)



## How is this different from X?

Ask yourself about `X`:

- Is `X` open-source?
- Is `X` developer-friendly, well-documented, and lets you get started in minutes?
- Besides authentication, does `X` also do authorization and user management (see feature list below)?

If you answered "no" to any of these questions, then that's how Stack Auth is different from `X`.

## ✨ Features

To get notified first when we add new features, please subscribe to [our newsletter](https://stack-auth.beehiiv.com/subscribe).

| | |
|-|:-:|
| <h3>`` and ``</h3> Authentication components that support OAuth, password credentials, and magic links, with shared development keys to make setup faster. All components support dark/light modes. | <img width="250px" src=".github/assets/dark-light-mode.png" alt="Sign-in component"> |
| <h3>Idiomatic Next.js APIs</h3> We build on server components, React hooks, and route handlers. | ![Dark/light mode](.github/assets/components.png) |
| <h3>User dashboard</h3> Dashboard to filter, analyze, and edit users. Replaces the first internal tool you would have to build. | ![User dashboard](.github/assets/dashboard.png) |
| <h3>Account settings</h3> Lets users update their profile, verify their e-mail, or change their password. No setup required. | <img width="300px" src=".github/assets/account-settings.png" alt="Account settings component"> |
| <h3>Multi-tenancy &amp; teams</h3> Manage B2B customers with an organization structure that makes sense and scales to millions. | <img width="400px" src=".github/assets/team-switcher.png" alt="Selected team switcher component"> |
| <h3>Role-based access control</h3> Define an arbitrary permission graph and assign it to users. Organizations can create org-specific roles. | <img width="400px" src=".github/assets/permissions.png" alt="RBAC"> |
| <h3>OAuth Connections</h3>Beyond login, Stack Auth can also manage access tokens for third-party APIs, such as Outlook and Google Calendar. It handles refreshing tokens and controlling scope, making access tokens accessible via a single function call. | <img width="250px" src=".github/assets/connected-accounts.png" alt="OAuth tokens"> |
| <h3>Passkeys</h3> Support for passwordless authentication using passkeys, allowing users to sign in securely with biometrics or security keys across all their devices. | <img width="400px" src=".github/assets/passkeys.png" alt="OAuth tokens"> |
| <h3>Impersonation</h3> Impersonate users for debugging and support, logging into their account as if you were them. | <img width="350px" src=".github/assets/impersonate.png" alt="Webhooks"> |
| <h3>Webhooks</h3> Get notified when users use your product, built on Svix. | <img width="300px" src=".github/assets/stack-webhooks.png" alt="Webhooks"> |
| <h3>Automatic emails</h3> Send customizable emails on triggers such as sign-up, password reset, and email verification, editable with a WYSIWYG editor. | <img width="400px" src=".github/assets/email-editor.png" alt="Email templates"> |
| <h3>User session &amp; JWT handling</h3> Stack Auth manages refresh and access tokens, JWTs, and cookies, resulting in the best performance at no implementation cost. | <img width="400px" src=".github/assets/user-button.png" alt="User button"> |
| <h3>M2M authentication</h3> Use short-lived access tokens to authenticate your machines to other machines. | <img width="400px" alt="M2M authentication" src=".github/assets/m2m-auth.png"> |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | [stack-auth/stack-auth](https://github.com/stack-auth/stack-auth) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| stackauth/server | `stackauth/server` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `STACK_SECRET_SERVER_KEY` | dashboard | (secret) | - |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | dashboard | internal | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `STACK_SERVER_SECRET` | stackauth/server | (secret) | - |
| `STACK_RUN_MIGRATIONS` | stackauth/server | true | - |
| `STACK_RUN_SEED_SCRIPT` | stackauth/server | true | - |
| `STACK_SEED_INTERNAL_PROJECT_ALLOW_LOCALHOST` | stackauth/server | true | - |
| `STACK_SEED_INTERNAL_PROJECT_SIGN_UP_ENABLED` | stackauth/server | true | - |

## Configuration

- **Start command:** `pnpm run start:dashboard`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** TypeScript, JavaScript, HTML, CSS, Dockerfile, PLpgSQL, Shell, Python

[View on Railway →](https://railway.com/template/bL-6Ll)
