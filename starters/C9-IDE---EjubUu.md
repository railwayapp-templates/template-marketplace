# Deploy C9 IDE on Railway

A cloud IDE built from C9 SDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/EjubUu)

## About

## Intro

![demo](https://raw.githubusercontent.com/lequanghuylc/c9sdk-pm2-nginx/main/demo.png)

This is a self-hosted IDE / Code editor, built from [C9 SDK](https://github.com/c9/core). With C9 IDE you can set up development environments in the cloud. It comes with [nvm](https://nvm.sh/), [pm2](https://pm2.keymetrics.io/) and [nginx](https://www.nginx.com/) that can help you publish your application pulically accessible to the world.

## Variable

- `C9SDK_PASSWORD`: password for basic auth. it would be publically accessible if this env is not defined
- `GIT_REPO`: automatic git repo deployment
- `GIT_BRANCH`: target branch, if not present, default branch will be used.
- `INITIAL_COMMAND`: (optional) custom command that can be used for installing custom dependencies or even start your git repo your own way
- `GIT_REPO`, `GIT_BRANCH`: (optional) a sample repo running nodejs & react & postgres is added for demo purpose, to show it can run real world application.
- `DOMAIN_NAME`: (optional) this env will be used with deployment script in the sample application. if empty, nginx will run the application at port 8081, and you need to use TCP Proxy to get it pulicly accessible (Container settings -> Network) 

## What is the best use case for this?

- Online - cross device development. it is an alternative to [code-server](https://github.com/coder/code-server). it is lighter than code-server which will be more resouce (cost) effective.
- Run any real world application without Docker (DinD is not yet supported in Railway)
- Gitlab Runner Shell executor for Gitlab CI/CD 

## Instructions to run real world application

- Run your application at some local port. for example: __python -m SimpleHTTPServer 9000__ to start a static web server at port 9000.
- Prepare your domain and add to __Service settings -> networking__. make sure the DNS record is setup.
- Add a nginx conf files to __/etc/nginx/sites-enabled__ to reserve proxy your application. make sure to use __server_name your_domain;__
- Run __nginx -t__ to test your .conf file
- Run __nginx -s reload__ to apply changes.
- Your application should be pulically accessible now.

### Auto Git Repo Deployment
- The start script checks the environment variable `GIT_REPO` (and `GIT_BRANCH`) and automatically clones and deploys the repository.
- `GIT_REPO` should be `https` url containing access token key
- The repo will be cloned to `/root/the-project`.
- The repo needs to have the following deployment structure, which is: 
    - `depoyments`: folder
    - - `deploy.sh`: suppose to install project deps and start the project
    - - `setup-cron.sh` suppose to setup cron for automatically checking new commit and pull and re-deploy
    - - `setup-nginx.sh` suppose to setup nginx reserve proxy with production domain name

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| C9 IDE | [lequanghuylc/c9sdk-pm2-nginx](https://github.com/lequanghuylc/c9sdk-pm2-nginx) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `GIT_REPO` | C9 IDE | https://github.com/lequanghuylc/nodejs-react-template.git | git url automatic deployment, you can replace it with your real repo |
| `GIT_BRANCH` | C9 IDE | main | - |
| `C9SDK_PASSWORD` | C9 IDE | (secret) | Password for basic auth, login is c9sdk |
| `DB_CONNECTION_STRING` | C9 IDE | - | Postgresql connection for the included sample application |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Shell, Dockerfile, JavaScript, TypeScript

[View on Railway →](https://railway.com/template/EjubUu)
