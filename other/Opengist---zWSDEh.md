# Deploy Opengist on Railway

Self-hosted pastebin powered by Git, open-source alternative to Github Gist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zWSDEh)

## About

Opengist is a self-hosted pastebin powered by Git, as an open-source alternative to Github Gist.

Docs: https://opengist.io/docs/  
Full variable reference: https://opengist.io/docs/configuration/cheat-sheet.html

For OAuth providers other than Gitea/Forgejo, see the full reference here: https://opengist.io/docs/configuration/oauth-providers.html

SSH Git operations are unlikely to work and show the correct port externally due to the Railway TCP proxy using a different port to the application's port with seemingly no workaround to that, so are disabled by default. [Contact me](https://erisa.uk/contact) if you know a workaround. You can re-enable them and use them within a private network if you wish.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opengist | `ghcr.io/thomiceli/opengist:1.10` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OG_INDEX` | - | Define the code indexer (either bleve, meilisearch, or empty for no index). |
| `OG_DB_URI` | opengist.db | URI of the database. |
| `OG_GITEA_URL` | - | The URL for Gitea/Forgejo OAuth. Leave blank if not using OAuth. |
| `OG_HTTP_PORT` | 6157 | The port on which the HTTP server should listen. |
| `OG_LOG_LEVEL` | warn | Set the log level to one of the following: debug, info, warn, error, fatal. |
| `OG_GITEA_NAME` | Gitea | Set Gitea/Forgejo instance name. |
| `OG_CUSTOM_NAME` | - | The name of your instance, to be displayed in the tab title |
| `OG_EXTERNAL_URL` | - | Public URL to access to Opengist. |
| `OG_GITEA_SECRET` | (secret) | The secret for Gitea/Forgejo OAuth. The URL for Gitea/Forgejo OAuth. Leave blank if not using OAuth. |
| `OG_OPENGIST_HOME` | /opengist | Path to the directory where Opengist stores its data. |
| `OG_SSH_GIT_ENABLED` | false | Likely won't work reliably externally due to Railway's TCP proxy using different ports. |
| `OG_GITEA_CLIENT_KEY` | - | The client key for Gitea/Forgejo OAuth. The URL for Gitea/Forgejo OAuth. Leave blank if not using OAuth. |
| `OG_HTTP_GIT_ENABLED` | true | Set to false to disable HTTP Git operations. |
| `OG_GIT_DEFAULT_BRANCH` | main | Default branch name used by Opengist when initializing Git repositories. |
| `OG_SQLITE_JOURNAL_MODE` | WAL | Set the journal mode for SQLite. More info here: https://www.sqlite.org/pragma.html#pragma_journal_mode |
| `OG_SSH_EXTERNAL_DOMAIN` | - | Public domain for the Git SSH connection, if it has to be different from the HTTP one. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opengist`

**Category:** Other

[View on Railway →](https://railway.com/deploy/zWSDEh)
