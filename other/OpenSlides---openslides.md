# Deploy OpenSlides on Railway

Digital meeting, agenda, motion, election, and presentation platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openslides)

## About

OpenSlides is a web platform for organizing meetings, agendas, motions, elections, participants, and projected content. This template deploys stable 4.3.1 using the complete official service architecture, a generated superadmin account, private PostgreSQL and Redis, and durable database storage.

Sign in as `superadmin` with `SUPERADMIN_PASSWORD` from the `backend-manage` service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| projector | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: projector) | Worker |
| backendAction | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: backend) | Worker |
| proxy | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) | Web service |
| client | `ghcr.io/openslides/openslides/openslides-client:4.3.1@sha256:9f53e103c253c199cd9ba188f3cb4b432efcd57ce059adb0e8f2e5edbc567cc7` | Worker |
| icc | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: icc) | Worker |
| auth | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: auth) | Worker |
| vote | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: vote) | Worker |
| redis | `redis:8.4.0-alpine` | Database |
| backendPresenter | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: backend) | Worker |
| autoupdate | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: autoupdate) | Worker |
| search | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: search) | Worker |
| media | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: media) | Worker |
| backendManage | [monotykamary/railway-template-openslides](https://github.com/monotykamary/railway-template-openslides) (root: backend) | Worker |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ICC_HOST` | projector | - | Private ICC service. |
| `ICC_PORT` | projector | 9007 | ICC port. |
| `AUTH_HOST` | projector | - | Private authentication service. |
| `AUTH_PORT` | projector | 9004 | Authentication port. |
| `VOTE_HOST` | projector | - | Private vote service. |
| `VOTE_PORT` | projector | 9013 | Vote port. |
| `CACHE_HOST` | projector | - | Private Redis cache. |
| `CACHE_PORT` | projector | 6379 | Redis port. |
| `MEDIA_HOST` | projector | - | Private media service. |
| `MEDIA_PORT` | projector | 9006 | Media port. |
| `ACTION_HOST` | projector | - | Private action backend. |
| `ACTION_PORT` | projector | 9002 | Action backend port. |
| `CLIENT_HOST` | projector | - | Private web client. |
| `CLIENT_PORT` | projector | 9001 | Client port. |
| `SEARCH_HOST` | projector | - | Private search service. |
| `SEARCH_PORT` | projector | 9050 | Search port. |
| `DATABASE_HOST` | projector | - | Private PostgreSQL host. |
| `DATABASE_NAME` | projector | openslides | Database name. |
| `DATABASE_PORT` | projector | 5432 | PostgreSQL port. |
| `DATABASE_USER` | projector | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | projector | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | projector | - | Private presenter backend. |
| `PRESENTER_PORT` | projector | 9003 | Presenter port. |
| `PROJECTOR_HOST` | projector | - | Private projector service. |
| `PROJECTOR_PORT` | projector | 9051 | Projector port. |
| `RESTRICTER_URL` | projector | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | projector | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | projector | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | projector | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | projector | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | projector | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | projector | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | projector | - | Vote database host. |
| `VOTE_DATABASE_NAME` | projector | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | projector | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | projector | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | projector | - | Media database host. |
| `MEDIA_DATABASE_NAME` | projector | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | projector | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | projector | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | projector | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | projector | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | projector | false | Production mode. |
| `ICC_HOST` | backendAction | - | Private ICC service. |
| `ICC_PORT` | backendAction | 9007 | ICC port. |
| `AUTH_HOST` | backendAction | - | Private authentication service. |
| `AUTH_PORT` | backendAction | 9004 | Authentication port. |
| `VOTE_HOST` | backendAction | - | Private vote service. |
| `VOTE_PORT` | backendAction | 9013 | Vote port. |
| `CACHE_HOST` | backendAction | - | Private Redis cache. |
| `CACHE_PORT` | backendAction | 6379 | Redis port. |
| `MEDIA_HOST` | backendAction | - | Private media service. |
| `MEDIA_PORT` | backendAction | 9006 | Media port. |
| `ACTION_HOST` | backendAction | - | Private action backend. |
| `ACTION_PORT` | backendAction | 9002 | Action backend port. |
| `CLIENT_HOST` | backendAction | - | Private web client. |
| `CLIENT_PORT` | backendAction | 9001 | Client port. |
| `SEARCH_HOST` | backendAction | - | Private search service. |
| `SEARCH_PORT` | backendAction | 9050 | Search port. |
| `DATABASE_HOST` | backendAction | - | Private PostgreSQL host. |
| `DATABASE_NAME` | backendAction | openslides | Database name. |
| `DATABASE_PORT` | backendAction | 5432 | PostgreSQL port. |
| `DATABASE_USER` | backendAction | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | backendAction | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | backendAction | - | Private presenter backend. |
| `PRESENTER_PORT` | backendAction | 9003 | Presenter port. |
| `PROJECTOR_HOST` | backendAction | - | Private projector service. |
| `PROJECTOR_PORT` | backendAction | 9051 | Projector port. |
| `RESTRICTER_URL` | backendAction | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | backendAction | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | backendAction | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | backendAction | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | backendAction | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | backendAction | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | backendAction | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | backendAction | - | Vote database host. |
| `VOTE_DATABASE_NAME` | backendAction | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | backendAction | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | backendAction | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | backendAction | - | Media database host. |
| `MEDIA_DATABASE_NAME` | backendAction | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | backendAction | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | backendAction | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | backendAction | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | backendAction | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | backendAction | false | Production mode. |
| `OPENSLIDES_BACKEND_COMPONENT` | backendAction | action | Backend action role. |
| `PORT` | proxy | 8000 | Railway public and health port. |
| `ICC_HOST` | proxy | - | Private ICC service. |
| `ICC_PORT` | proxy | 9007 | ICC port. |
| `AUTH_HOST` | proxy | - | Private authentication service. |
| `AUTH_PORT` | proxy | 9004 | Authentication port. |
| `VOTE_HOST` | proxy | - | Private vote service. |
| `VOTE_PORT` | proxy | 9013 | Vote port. |
| `CACHE_HOST` | proxy | - | Private Redis cache. |
| `CACHE_PORT` | proxy | 6379 | Redis port. |
| `MEDIA_HOST` | proxy | - | Private media service. |
| `MEDIA_PORT` | proxy | 9006 | Media port. |
| `ACTION_HOST` | proxy | - | Private action backend. |
| `ACTION_PORT` | proxy | 9002 | Action backend port. |
| `CLIENT_HOST` | proxy | - | Private web client. |
| `CLIENT_PORT` | proxy | 9001 | Client port. |
| `SEARCH_HOST` | proxy | - | Private search service. |
| `SEARCH_PORT` | proxy | 9050 | Search port. |
| `DATABASE_HOST` | proxy | - | Private PostgreSQL host. |
| `DATABASE_NAME` | proxy | openslides | Database name. |
| `DATABASE_PORT` | proxy | 5432 | PostgreSQL port. |
| `DATABASE_USER` | proxy | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | proxy | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | proxy | - | Private presenter backend. |
| `PRESENTER_PORT` | proxy | 9003 | Presenter port. |
| `PROJECTOR_HOST` | proxy | - | Private projector service. |
| `PROJECTOR_PORT` | proxy | 9051 | Projector port. |
| `RESTRICTER_URL` | proxy | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | proxy | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | proxy | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | proxy | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | proxy | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | proxy | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | proxy | (secret) | Shared generated PostgreSQL password. |
| `TRAEFIK_LOG_LEVEL` | proxy | INFO | Proxy log level. |
| `VOTE_DATABASE_HOST` | proxy | - | Vote database host. |
| `VOTE_DATABASE_NAME` | proxy | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | proxy | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | proxy | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | proxy | - | Media database host. |
| `MEDIA_DATABASE_NAME` | proxy | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | proxy | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | proxy | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | proxy | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | proxy | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | proxy | false | Production mode. |
| `ICC_HOST` | client | - | Private ICC service. |
| `ICC_PORT` | client | 9007 | ICC port. |
| `AUTH_HOST` | client | - | Private authentication service. |
| `AUTH_PORT` | client | 9004 | Authentication port. |
| `VOTE_HOST` | client | - | Private vote service. |
| `VOTE_PORT` | client | 9013 | Vote port. |
| `CACHE_HOST` | client | - | Private Redis cache. |
| `CACHE_PORT` | client | 6379 | Redis port. |
| `MEDIA_HOST` | client | - | Private media service. |
| `MEDIA_PORT` | client | 9006 | Media port. |
| `ACTION_HOST` | client | - | Private action backend. |
| `ACTION_PORT` | client | 9002 | Action backend port. |
| `CLIENT_HOST` | client | - | Private web client. |
| `CLIENT_PORT` | client | 9001 | Client port. |
| `SEARCH_HOST` | client | - | Private search service. |
| `SEARCH_PORT` | client | 9050 | Search port. |
| `DATABASE_HOST` | client | - | Private PostgreSQL host. |
| `DATABASE_NAME` | client | openslides | Database name. |
| `DATABASE_PORT` | client | 5432 | PostgreSQL port. |
| `DATABASE_USER` | client | (secret) | Database user. |
| `PRESENTER_HOST` | client | - | Private presenter backend. |
| `PRESENTER_PORT` | client | 9003 | Presenter port. |
| `PROJECTOR_HOST` | client | - | Private projector service. |
| `PROJECTOR_PORT` | client | 9051 | Projector port. |
| `RESTRICTER_URL` | client | - | Internal autoupdate restriction endpoint. |
| `AUTOUPDATE_HOST` | client | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | client | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | client | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | client | 6379 | Message bus port. |
| `VOTE_DATABASE_HOST` | client | - | Vote database host. |
| `VOTE_DATABASE_NAME` | client | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | client | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | client | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | client | - | Media database host. |
| `MEDIA_DATABASE_NAME` | client | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | client | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | client | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | client | info | OpenSlides log level. |
| `OPENSLIDES_DEVELOPMENT` | client | false | Production mode. |
| `ICC_HOST` | icc | - | Private ICC service. |
| `ICC_PORT` | icc | 9007 | ICC port. |
| `AUTH_HOST` | icc | - | Private authentication service. |
| `AUTH_PORT` | icc | 9004 | Authentication port. |
| `VOTE_HOST` | icc | - | Private vote service. |
| `VOTE_PORT` | icc | 9013 | Vote port. |
| `CACHE_HOST` | icc | - | Private Redis cache. |
| `CACHE_PORT` | icc | 6379 | Redis port. |
| `MEDIA_HOST` | icc | - | Private media service. |
| `MEDIA_PORT` | icc | 9006 | Media port. |
| `ACTION_HOST` | icc | - | Private action backend. |
| `ACTION_PORT` | icc | 9002 | Action backend port. |
| `CLIENT_HOST` | icc | - | Private web client. |
| `CLIENT_PORT` | icc | 9001 | Client port. |
| `SEARCH_HOST` | icc | - | Private search service. |
| `SEARCH_PORT` | icc | 9050 | Search port. |
| `DATABASE_HOST` | icc | - | Private PostgreSQL host. |
| `DATABASE_NAME` | icc | openslides | Database name. |
| `DATABASE_PORT` | icc | 5432 | PostgreSQL port. |
| `DATABASE_USER` | icc | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | icc | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | icc | - | Private presenter backend. |
| `PRESENTER_PORT` | icc | 9003 | Presenter port. |
| `PROJECTOR_HOST` | icc | - | Private projector service. |
| `PROJECTOR_PORT` | icc | 9051 | Projector port. |
| `RESTRICTER_URL` | icc | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | icc | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | icc | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | icc | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | icc | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | icc | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | icc | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | icc | - | Vote database host. |
| `VOTE_DATABASE_NAME` | icc | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | icc | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | icc | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | icc | - | Media database host. |
| `MEDIA_DATABASE_NAME` | icc | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | icc | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | icc | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | icc | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | icc | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | icc | false | Production mode. |
| `ICC_HOST` | auth | - | Private ICC service. |
| `ICC_PORT` | auth | 9007 | ICC port. |
| `AUTH_HOST` | auth | - | Private authentication service. |
| `AUTH_PORT` | auth | 9004 | Authentication port. |
| `VOTE_HOST` | auth | - | Private vote service. |
| `VOTE_PORT` | auth | 9013 | Vote port. |
| `CACHE_HOST` | auth | - | Private Redis cache. |
| `CACHE_PORT` | auth | 6379 | Redis port. |
| `MEDIA_HOST` | auth | - | Private media service. |
| `MEDIA_PORT` | auth | 9006 | Media port. |
| `ACTION_HOST` | auth | - | Private action backend. |
| `ACTION_PORT` | auth | 9002 | Action backend port. |
| `CLIENT_HOST` | auth | - | Private web client. |
| `CLIENT_PORT` | auth | 9001 | Client port. |
| `SEARCH_HOST` | auth | - | Private search service. |
| `SEARCH_PORT` | auth | 9050 | Search port. |
| `DATABASE_HOST` | auth | - | Private PostgreSQL host. |
| `DATABASE_NAME` | auth | openslides | Database name. |
| `DATABASE_PORT` | auth | 5432 | PostgreSQL port. |
| `DATABASE_USER` | auth | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | auth | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | auth | - | Private presenter backend. |
| `PRESENTER_PORT` | auth | 9003 | Presenter port. |
| `PROJECTOR_HOST` | auth | - | Private projector service. |
| `PROJECTOR_PORT` | auth | 9051 | Projector port. |
| `RESTRICTER_URL` | auth | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | auth | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | auth | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | auth | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | auth | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | auth | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | auth | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | auth | - | Vote database host. |
| `VOTE_DATABASE_NAME` | auth | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | auth | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | auth | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | auth | - | Media database host. |
| `MEDIA_DATABASE_NAME` | auth | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | auth | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | auth | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | auth | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | auth | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | auth | false | Production mode. |
| `ICC_HOST` | vote | - | Private ICC service. |
| `ICC_PORT` | vote | 9007 | ICC port. |
| `AUTH_HOST` | vote | - | Private authentication service. |
| `AUTH_PORT` | vote | 9004 | Authentication port. |
| `VOTE_HOST` | vote | - | Private vote service. |
| `VOTE_PORT` | vote | 9013 | Vote port. |
| `CACHE_HOST` | vote | - | Private Redis cache. |
| `CACHE_PORT` | vote | 6379 | Redis port. |
| `MEDIA_HOST` | vote | - | Private media service. |
| `MEDIA_PORT` | vote | 9006 | Media port. |
| `ACTION_HOST` | vote | - | Private action backend. |
| `ACTION_PORT` | vote | 9002 | Action backend port. |
| `CLIENT_HOST` | vote | - | Private web client. |
| `CLIENT_PORT` | vote | 9001 | Client port. |
| `SEARCH_HOST` | vote | - | Private search service. |
| `SEARCH_PORT` | vote | 9050 | Search port. |
| `DATABASE_HOST` | vote | - | Private PostgreSQL host. |
| `DATABASE_NAME` | vote | openslides | Database name. |
| `DATABASE_PORT` | vote | 5432 | PostgreSQL port. |
| `DATABASE_USER` | vote | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | vote | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | vote | - | Private presenter backend. |
| `PRESENTER_PORT` | vote | 9003 | Presenter port. |
| `PROJECTOR_HOST` | vote | - | Private projector service. |
| `PROJECTOR_PORT` | vote | 9051 | Projector port. |
| `RESTRICTER_URL` | vote | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | vote | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | vote | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | vote | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | vote | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | vote | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | vote | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | vote | - | Vote database host. |
| `VOTE_DATABASE_NAME` | vote | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | vote | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | vote | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | vote | - | Media database host. |
| `MEDIA_DATABASE_NAME` | vote | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | vote | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | vote | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | vote | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | vote | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | vote | false | Production mode. |
| `ICC_HOST` | backendPresenter | - | Private ICC service. |
| `ICC_PORT` | backendPresenter | 9007 | ICC port. |
| `AUTH_HOST` | backendPresenter | - | Private authentication service. |
| `AUTH_PORT` | backendPresenter | 9004 | Authentication port. |
| `VOTE_HOST` | backendPresenter | - | Private vote service. |
| `VOTE_PORT` | backendPresenter | 9013 | Vote port. |
| `CACHE_HOST` | backendPresenter | - | Private Redis cache. |
| `CACHE_PORT` | backendPresenter | 6379 | Redis port. |
| `MEDIA_HOST` | backendPresenter | - | Private media service. |
| `MEDIA_PORT` | backendPresenter | 9006 | Media port. |
| `ACTION_HOST` | backendPresenter | - | Private action backend. |
| `ACTION_PORT` | backendPresenter | 9002 | Action backend port. |
| `CLIENT_HOST` | backendPresenter | - | Private web client. |
| `CLIENT_PORT` | backendPresenter | 9001 | Client port. |
| `SEARCH_HOST` | backendPresenter | - | Private search service. |
| `SEARCH_PORT` | backendPresenter | 9050 | Search port. |
| `DATABASE_HOST` | backendPresenter | - | Private PostgreSQL host. |
| `DATABASE_NAME` | backendPresenter | openslides | Database name. |
| `DATABASE_PORT` | backendPresenter | 5432 | PostgreSQL port. |
| `DATABASE_USER` | backendPresenter | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | backendPresenter | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | backendPresenter | - | Private presenter backend. |
| `PRESENTER_PORT` | backendPresenter | 9003 | Presenter port. |
| `PROJECTOR_HOST` | backendPresenter | - | Private projector service. |
| `PROJECTOR_PORT` | backendPresenter | 9051 | Projector port. |
| `RESTRICTER_URL` | backendPresenter | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | backendPresenter | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | backendPresenter | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | backendPresenter | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | backendPresenter | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | backendPresenter | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | backendPresenter | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | backendPresenter | - | Vote database host. |
| `VOTE_DATABASE_NAME` | backendPresenter | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | backendPresenter | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | backendPresenter | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | backendPresenter | - | Media database host. |
| `MEDIA_DATABASE_NAME` | backendPresenter | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | backendPresenter | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | backendPresenter | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | backendPresenter | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | backendPresenter | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | backendPresenter | false | Production mode. |
| `OPENSLIDES_BACKEND_COMPONENT` | backendPresenter | presenter | Backend presenter role. |
| `ICC_HOST` | autoupdate | - | Private ICC service. |
| `ICC_PORT` | autoupdate | 9007 | ICC port. |
| `AUTH_HOST` | autoupdate | - | Private authentication service. |
| `AUTH_PORT` | autoupdate | 9004 | Authentication port. |
| `VOTE_HOST` | autoupdate | - | Private vote service. |
| `VOTE_PORT` | autoupdate | 9013 | Vote port. |
| `CACHE_HOST` | autoupdate | - | Private Redis cache. |
| `CACHE_PORT` | autoupdate | 6379 | Redis port. |
| `MEDIA_HOST` | autoupdate | - | Private media service. |
| `MEDIA_PORT` | autoupdate | 9006 | Media port. |
| `ACTION_HOST` | autoupdate | - | Private action backend. |
| `ACTION_PORT` | autoupdate | 9002 | Action backend port. |
| `CLIENT_HOST` | autoupdate | - | Private web client. |
| `CLIENT_PORT` | autoupdate | 9001 | Client port. |
| `SEARCH_HOST` | autoupdate | - | Private search service. |
| `SEARCH_PORT` | autoupdate | 9050 | Search port. |
| `DATABASE_HOST` | autoupdate | - | Private PostgreSQL host. |
| `DATABASE_NAME` | autoupdate | openslides | Database name. |
| `DATABASE_PORT` | autoupdate | 5432 | PostgreSQL port. |
| `DATABASE_USER` | autoupdate | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | autoupdate | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | autoupdate | - | Private presenter backend. |
| `PRESENTER_PORT` | autoupdate | 9003 | Presenter port. |
| `PROJECTOR_HOST` | autoupdate | - | Private projector service. |
| `PROJECTOR_PORT` | autoupdate | 9051 | Projector port. |
| `RESTRICTER_URL` | autoupdate | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | autoupdate | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | autoupdate | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | autoupdate | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | autoupdate | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | autoupdate | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | autoupdate | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | autoupdate | - | Vote database host. |
| `VOTE_DATABASE_NAME` | autoupdate | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | autoupdate | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | autoupdate | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | autoupdate | - | Media database host. |
| `MEDIA_DATABASE_NAME` | autoupdate | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | autoupdate | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | autoupdate | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | autoupdate | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | autoupdate | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | autoupdate | false | Production mode. |
| `ICC_HOST` | search | - | Private ICC service. |
| `ICC_PORT` | search | 9007 | ICC port. |
| `AUTH_HOST` | search | - | Private authentication service. |
| `AUTH_PORT` | search | 9004 | Authentication port. |
| `VOTE_HOST` | search | - | Private vote service. |
| `VOTE_PORT` | search | 9013 | Vote port. |
| `CACHE_HOST` | search | - | Private Redis cache. |
| `CACHE_PORT` | search | 6379 | Redis port. |
| `MEDIA_HOST` | search | - | Private media service. |
| `MEDIA_PORT` | search | 9006 | Media port. |
| `ACTION_HOST` | search | - | Private action backend. |
| `ACTION_PORT` | search | 9002 | Action backend port. |
| `CLIENT_HOST` | search | - | Private web client. |
| `CLIENT_PORT` | search | 9001 | Client port. |
| `SEARCH_HOST` | search | - | Private search service. |
| `SEARCH_PORT` | search | 9050 | Search port. |
| `DATABASE_HOST` | search | - | Private PostgreSQL host. |
| `DATABASE_NAME` | search | openslides | Database name. |
| `DATABASE_PORT` | search | 5432 | PostgreSQL port. |
| `DATABASE_USER` | search | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | search | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | search | - | Private presenter backend. |
| `PRESENTER_PORT` | search | 9003 | Presenter port. |
| `PROJECTOR_HOST` | search | - | Private projector service. |
| `PROJECTOR_PORT` | search | 9051 | Projector port. |
| `RESTRICTER_URL` | search | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | search | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | search | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | search | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | search | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | search | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | search | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | search | - | Vote database host. |
| `VOTE_DATABASE_NAME` | search | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | search | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | search | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | search | - | Media database host. |
| `MEDIA_DATABASE_NAME` | search | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | search | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | search | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | search | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | search | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | search | false | Production mode. |
| `ICC_HOST` | media | - | Private ICC service. |
| `ICC_PORT` | media | 9007 | ICC port. |
| `AUTH_HOST` | media | - | Private authentication service. |
| `AUTH_PORT` | media | 9004 | Authentication port. |
| `VOTE_HOST` | media | - | Private vote service. |
| `VOTE_PORT` | media | 9013 | Vote port. |
| `CACHE_HOST` | media | - | Private Redis cache. |
| `CACHE_PORT` | media | 6379 | Redis port. |
| `MEDIA_HOST` | media | - | Private media service. |
| `MEDIA_PORT` | media | 9006 | Media port. |
| `ACTION_HOST` | media | - | Private action backend. |
| `ACTION_PORT` | media | 9002 | Action backend port. |
| `CLIENT_HOST` | media | - | Private web client. |
| `CLIENT_PORT` | media | 9001 | Client port. |
| `SEARCH_HOST` | media | - | Private search service. |
| `SEARCH_PORT` | media | 9050 | Search port. |
| `DATABASE_HOST` | media | - | Private PostgreSQL host. |
| `DATABASE_NAME` | media | openslides | Database name. |
| `DATABASE_PORT` | media | 5432 | PostgreSQL port. |
| `DATABASE_USER` | media | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | media | (secret) | Shared generated token-signing key. |
| `PRESENTER_HOST` | media | - | Private presenter backend. |
| `PRESENTER_PORT` | media | 9003 | Presenter port. |
| `PROJECTOR_HOST` | media | - | Private projector service. |
| `PROJECTOR_PORT` | media | 9051 | Projector port. |
| `RESTRICTER_URL` | media | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | media | - | Shared generated cookie-signing key. |
| `AUTOUPDATE_HOST` | media | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | media | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | media | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | media | 6379 | Message bus port. |
| `POSTGRES_PASSWORD` | media | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | media | - | Vote database host. |
| `VOTE_DATABASE_NAME` | media | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | media | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | media | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | media | - | Media database host. |
| `MEDIA_DATABASE_NAME` | media | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | media | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | media | (secret) | Media database user. |
| `OPENSLIDES_LOGLEVEL` | media | info | OpenSlides log level. |
| `INTERNAL_AUTH_PASSWORD` | media | (secret) | Shared internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | media | false | Production mode. |
| `ICC_HOST` | backendManage | - | Private ICC service. |
| `ICC_PORT` | backendManage | 9007 | ICC port. |
| `AUTH_HOST` | backendManage | - | Private authentication service. |
| `AUTH_PORT` | backendManage | 9004 | Authentication port. |
| `VOTE_HOST` | backendManage | - | Private vote service. |
| `VOTE_PORT` | backendManage | 9013 | Vote port. |
| `CACHE_HOST` | backendManage | - | Private Redis cache. |
| `CACHE_PORT` | backendManage | 6379 | Redis port. |
| `MEDIA_HOST` | backendManage | - | Private media service. |
| `MEDIA_PORT` | backendManage | 9006 | Media port. |
| `ACTION_HOST` | backendManage | - | Private action backend. |
| `ACTION_PORT` | backendManage | 9002 | Action backend port. |
| `CLIENT_HOST` | backendManage | - | Private web client. |
| `CLIENT_PORT` | backendManage | 9001 | Client port. |
| `SEARCH_HOST` | backendManage | - | Private search service. |
| `SEARCH_PORT` | backendManage | 9050 | Search port. |
| `DATABASE_HOST` | backendManage | - | Private PostgreSQL host. |
| `DATABASE_NAME` | backendManage | openslides | Database name. |
| `DATABASE_PORT` | backendManage | 5432 | PostgreSQL port. |
| `DATABASE_USER` | backendManage | (secret) | Database user. |
| `AUTH_TOKEN_KEY` | backendManage | (secret) | Generated shared token-signing key. |
| `PRESENTER_HOST` | backendManage | - | Private presenter backend. |
| `PRESENTER_PORT` | backendManage | 9003 | Presenter port. |
| `PROJECTOR_HOST` | backendManage | - | Private projector service. |
| `PROJECTOR_PORT` | backendManage | 9051 | Projector port. |
| `RESTRICTER_URL` | backendManage | - | Internal autoupdate restriction endpoint. |
| `AUTH_COOKIE_KEY` | backendManage | - | Generated shared cookie-signing key. |
| `AUTOUPDATE_HOST` | backendManage | - | Private autoupdate service. |
| `AUTOUPDATE_PORT` | backendManage | 9012 | Autoupdate port. |
| `MESSAGE_BUS_HOST` | backendManage | - | Private Redis message bus. |
| `MESSAGE_BUS_PORT` | backendManage | 6379 | Message bus port. |
| `MIG0100_TIMEZONE` | backendManage | UTC | Initial migration timezone. |
| `POSTGRES_PASSWORD` | backendManage | (secret) | Shared generated PostgreSQL password. |
| `VOTE_DATABASE_HOST` | backendManage | - | Vote database host. |
| `VOTE_DATABASE_NAME` | backendManage | openslides | Vote database name. |
| `VOTE_DATABASE_PORT` | backendManage | 5432 | Vote database port. |
| `VOTE_DATABASE_USER` | backendManage | (secret) | Vote database user. |
| `MEDIA_DATABASE_HOST` | backendManage | - | Media database host. |
| `MEDIA_DATABASE_NAME` | backendManage | openslides | Media database name. |
| `MEDIA_DATABASE_PORT` | backendManage | 5432 | Media database port. |
| `MEDIA_DATABASE_USER` | backendManage | (secret) | Media database user. |
| `MIG0100_I_READ_DOCS` | backendManage | 1 | Acknowledge OpenSlides 4.3 migration instructions. |
| `OPENSLIDES_LOGLEVEL` | backendManage | info | OpenSlides log level. |
| `SUPERADMIN_PASSWORD` | backendManage | (secret) | Generated superadmin password. |
| `INTERNAL_AUTH_PASSWORD` | backendManage | (secret) | Generated internal authentication password. |
| `OPENSLIDES_DEVELOPMENT` | backendManage | false | Production mode. |
| `OPENSLIDES_BACKEND_COMPONENT` | backendManage | action | Backend role. |
| `OPENSLIDES_BACKEND_CREATE_INITIAL_DATA` | backendManage | 1 | Create initial organization and superadmin idempotently. |
| `POSTGRES_DB` | postgres | openslides | OpenSlides database. |
| `POSTGRES_USER` | postgres | (secret) | OpenSlides database user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated PostgreSQL password. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `redis-server --save ""`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile, Python, JavaScript

[View on Railway →](https://railway.com/deploy/openslides)
