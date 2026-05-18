# Deploy Unwrapped Spotify Music Stats on Railway

Unwrapped Spotify Music Stats, Estatísticas de músicas disponíveis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wide-bold)

## About

**Unwrapped** é um dashboard open source de estatísticas musicais — o “Spotify Wrapped” que nunca fecha. Conecte Spotify, Last.fm, faça upload do histórico estendido e visualize hábitos, tops e cards para compartilhar (pt-BR, en, es).

**Available languages:** pt, en, es.

![Unwrapped — landing page](https://raw.githubusercontent.com/jorgehenrrique/proj-frontend-music-stats/main/.github/images/landing-page.png)

Unwrapped roda como site estático em container Docker — sem backend de autenticação. O login Spotify acontece no navegador; os tokens ficam apenas no dispositivo do usuário.

Ao usar este template, a redirect URI do Spotify é configurada automaticamente (`https://${{RAILWAY_PUBLIC_DOMAIN}}/callback`). Você só precisa cadastrar a mesma URL no painel do Spotify após o deploy. As demais credenciais você informa ao clicar em **Deploy**.

**Ordem recomendada:** gerar as API keys → fazer deploy com as 3 variáveis → copiar a URL pública do Railway → adicionar a Redirect URI no Spotify.

![Unwrapped — dashboard](https://raw.githubusercontent.com/jorgehenrrique/proj-frontend-music-stats/main/.github/images/dashboard-overview.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Unwrapped Spotify Music Stats | [jorgehenrrique/proj-frontend-music-stats](https://github.com/jorgehenrrique/proj-frontend-music-stats) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VITE_LASTFM_API_KEY` | (secret) | Last.fm API account → API Key |
| `VITE_SPOTIFY_CLIENT_ID` | - | Spotify Developer → app → Client ID |
| `VITE_LASTFM_SHARED_SECRET` | (secret) | Last.fm API account → Shared secret |
| `VITE_SPOTIFY_REDIRECT_URI` | - | Redirect uri auto increment |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** TypeScript, CSS, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/wide-bold)
