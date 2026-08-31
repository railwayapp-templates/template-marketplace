# Deploy Keycloak | (Just Updated) Auth0 Alternative With A Working Admin Login on Railway

Keycloak 26 SSO with an admin login that exists. Postgres, prebuilt, pinned

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-or-just-updated-auth0-alternati)

## About

Keycloak is the open-source identity and access management server behind
Red Hat SSO — an Auth0, Okta and Clerk alternative you run yourself. It gives
your applications OpenID Connect and SAML single sign-on, user registration and
login pages, multi-factor authentication, social and enterprise identity
brokering, LDAP and Active Directory federation, fine-grained authorization and
a full admin console and REST API.

This template deploys **Keycloak 26.7.2** with a PostgreSQL database, and — the
part that is easy to get wrong — an administrator account that actually exists
on the first boot.

Keycloak keeps every realm, client, user and credential in a relational
database, so a production deployment is the server plus PostgreSQL. It is a
Quarkus application: the stock container re-runs its build step on every start
unless the image was built ahead of time, and it needs to be told the public
hostname it is reached on, because every issuer URL, redirect URI and
back-channel URL it hands to your applications is derived from that value.

There is one further trap that is specific to Keycloak: **it has no HTTP setup
route.** The administrator account is created once, at the moment the master
realm is bootstrapped, from environment variables. If a deploy starts without
them, the server comes up completely healthy — it serves the OIDC discovery
document, it answers `/realms/master`, the platform reports a successful
deployment — and there is no page anywhere that lets you create the first
administrator. This template refuses to start without an administrator password
rather than handing you a running server you cannot administer, and it
generates one for you so there is nothing to fill in.

It also builds the Quarkus image ahead of time with the PostgreSQL driver,
health and metrics baked in, so the container starts optimized instead of
augmenting itself on every deploy, and it derives the public hostname and proxy
headers from the deployment itself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| keycloak | `ghcr.io/bon5co/keycloak-railway:26.7.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `KC_DB_PASSWORD` | keycloak | (secret) |
| `KC_DB_USERNAME` | keycloak | (secret) |
| `KEYCLOAK_ADMIN_PASSWORD` | keycloak | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/realms/master`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/keycloak-or-just-updated-auth0-alternati)
