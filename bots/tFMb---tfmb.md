# Deploy tFMb on Railway

tigraoFM versão com lastfm conectado

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tfmb)

## About

**tFMb (TigrãoFM)** é um bot musical avançado para Telegram construído com **Python 3.10+** e **AsyncIO**. Ele atua como um cliente assíncrono puro da API do Last.fm, oferecendo status em tempo real, radares de grupo, dossiês de artistas e geração visual de "Stories" para redes sociais com cache inteligente via Redis.

Hospedar o tFMb envolve configurar um ambiente que suporte execução assíncrona contínua e processamento de imagem on-the-fly. O bot utiliza aiohttp para comunicações não bloqueantes com o Last.fm e a biblioteca python-telegram-bot v20+ para gerenciar eventos do Telegram. O deploy requer uma instância de **Redis** para persistência de vínculos de usuários e um sistema de arquivos (ou volume) para o cache de imagens geradas pelo comando /story. Como o bot lida com I/O intensivo e renderização de fontes (Pillow), o host precisa de uma stack estável onde variáveis de ambiente gerenciem segredos de API com segurança.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tigraoFM | [romastefale/tigraoFM](https://github.com/romastefale/tigraoFM) | Worker |
| tigredis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ADMIN_ID` | tigraoFM | - | id do admin |
| `REDIS_URL` | tigraoFM | - | url da redis |
| `BACKUP_PATH` | tigraoFM | - | caminho do backup |
| `TELEGRAM_TOKEN` | tigraoFM | (secret) | token do bot |
| `REDISHOST` | tigredis | - | redis host |
| `REDISPORT` | tigredis | - | redis port |
| `REDISUSER` | tigredis | - | redis user |
| `REDIS_URL` | tigredis | - | redis url |
| `REDISPASSWORD` | tigredis | (secret) | redis pass 1 |
| `REDIS_PASSWORD` | tigredis | (secret) | redis pass 2 |
| `REDIS_PUBLIC_URL` | tigredis | - | resdis pub url |

## Configuration

- **Start command:** `python bot.py`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Bots · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/tfmb)
