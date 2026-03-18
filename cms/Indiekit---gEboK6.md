# Deploy Indiekit on Railway

A minimal Indiekit server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gEboK6)

## About

Meet [Indiekit](https://getindiekit.com/), the little Node.js server with all the pieces needed to share your content with the open, independent web.

- **Publish content to your website** using [apps and services](https://getindiekit.com/clients) that support the [Micropub API](https://micropub.spec.indieweb.org)
- **Save files to a content store** such as GitHub, GitLab or an FTP server
- **Integrate with static site generators** like Jekyll or Hugo
- **Share content** on social networks like Mastodon
- **Customise everything** from the interface theme to the format of commit messages

Indiekit is extensible via its [plugin API](https://getindiekit.com/plugins/api/) and localized for use in [a growing number of languages](https://getindiekit.com/configuration/localisation).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| indiekit | [getindiekit/example-config](https://github.com/getindiekit/example-config) | Web service |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET` | indiekit | (secret) | Server secret |
| `GITHUB_REPO` | indiekit | - | GitHub repository, for example indiekit |
| `GITHUB_USER` | indiekit | (secret) | GitHub username, for example janedoe |
| `GITHUB_TOKEN` | indiekit | (secret) | Personal access token |
| `MASTODON_SERVER` | indiekit | - | Mastodon server |
| `PUBLICATION_URL` | indiekit | - | Your website’s URL, for example https://my-website.example |
| `MASTODON_USERNAME` | indiekit | (secret) | Mastodon username (without the @) |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `npx indiekit serve --debug`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** CMS · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/gEboK6)
