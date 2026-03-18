# Deploy Rallly on Railway

An open-source scheduling and collaboration tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fEb1qz)

## About

## What is Rallly?

Rallly is a tool for creating scheduling polls. It's designed to help people find a common time to schedule a meeting or event.

> Rallly is pronounced like "rally" but with an extra _L_.
>
> I wanted to call the product "Rally" because that's what it's for - rallying people together to make things happen.
> But, of course, the domain name was already taken. So, I did what any sane person would do - I added an extra _L_.
>
> -- [Luke Vella](https://twitter.com/imlukevella), Creator of Rallly




See the latest self-hosting documentation:

https://support.rallly.co/self-hosting/introduction.


Rallly is 100% open-source and available under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://github.com/lukevella/rallly/blob/main/LICENSE)
which allows you to run your own instance of Rallly for free for both personal and commercial use.

## Official Docker Image

The best way to self-host Rallly is using the [official Docker image](https://hub.docker.com/r/lukevella/rallly).
This image contains a build that is specifically intended for self-hosting.
It is updated regularly but it is _not_ guaranteed to be up-to-date with the latest version of Rallly.
If you want to have access to the latest features and bug fixes, you should consider using the [official managed service](https://rallly.co).


Though it is technically possible to build and run Rallly from its
  [source-code](https://github.com/lukevella/rallly), it is not recommended and
  we do not provide support for this.


## Live Demo

If you want to try out Rallly before self-hosting it, you can try the official managed service at [app.rallly.co](https://app.rallly.co).
This version differs slightly from the self-hosted version in that it allows guest users to create polls without having to create an account
and is updated more frequently but it's still a good way to get a feel for the app.

## Pricing

Rallly is **completely free** to self-host but for users who wish to contribute to the project,
please check out the [pricing](/self-hosting/pricing) page.

## Get Started

Depending on how comfortable you are with technical things, you can either run Rallly on your own server or choose a managed hosting provider that will do it for you.


  
    Host your own instance of Rallly on your own server using Docker.
  
  
    Choose a provider that will install and run an instance of Rallly for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rallly | `lukevella/rallly` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_PWD` | rallly | - | The password (if auth is enabled on your SMTP server) |
| `SMTP_HOST` | rallly | - | The host address of your SMTP server |
| `SMTP_PORT` | rallly | - | The port of your SMTP server |
| `SMTP_SECURE` | rallly | - | Set to “true” if SSL is enabled for your SMTP connection |
| `NOREPLY_EMAIL` | rallly | - | This email is used as the sender for all transactional emails. If not set, SUPPORT_EMAIL will be used instead. |
| `SUPPORT_EMAIL` | rallly | - | This email will be shown as the contact email for support queries. |
| `ALLOWED_EMAILS` | rallly | - | Comma separated list of email addresses that are allowed to register and login. Wildcard characters are supported. Example: Setting it to *@example.com to allow anyone with a @example.com email address. |
| `SECRET_PASSWORD` | rallly | (secret) | A random 32-character secret key used to encrypt user sessions |
| `SMTP_TLS_ENABLED` | rallly | - | Enable TLS for your SMTP connection |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fEb1qz)
