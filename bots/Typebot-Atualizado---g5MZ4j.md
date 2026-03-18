# Deploy Typebot (Atualizado) on Railway

Typebot facilita a criação de chatbots avançados.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/g5MZ4j)

## About

Typebot é um construtor de chatbot de código aberto. Ele permite que você crie chatbots avançados visualmente, incorpore-os em qualquer lugar em seus aplicativos web/móveis e colete resultados em tempo real

Características

Typebot facilita a criação de chatbots avançados. Ele fornece os blocos de construção adaptáveis ​​a qualquer caso de uso de negócios.

Construtor de bate-papo com mais de 34 blocos de construção, como:

💬 Bolhas: Texto, Imagem/GIF, vídeo, áudio, incorporar.

🔤 Entradas: Texto, e-mail, número de telefone, botões, escolha de imagem, seletor de data, pagamento (Stripe), seletor de arquivos... entradas

🧠 Lógica: ramificação condicional, redirecionamentos de URL, scripts (Javascript), testes A/B

🔌 Integrações: solicitações Webhook / HTTP, OpenAI, Planilhas Google, Google Analytics, Meta Pixel, Zapier, Make.com, Chatwoot, Mais por vir...
Crie um tema para seu chatbot de acordo com a identidade de sua marca:

🎨 Personalize as fontes, plano de fundo, cores, arredondamento, sombras e muito mais

💪 Temas avançados com CSS personalizado.

💾 Modelos de temas reutilizáveis
Compartilhe seu typebot em qualquer lugar:

🔗 Domínio personalizado

👨‍💻 Incorpore facilmente como um contêiner, pop-up ou balão de bate-papo com a biblioteca JS nativa.

⚡ Biblioteca de incorporação extremamente rápida. Sem iframe, sem dependências externas, sem impacto no desempenho.

💻 Executável com solicitações HTTP
Colete seus resultados e obtenha insights:

📊 Análises aprofundadas com taxas de desistência, taxas de conclusão e muito mais

📥 Exportar resultados para CSV
Construído para desenvolvedores :

🔓 Sem bloqueio de fornecedor. Recursos criados com flexibilidade em mente.

💻 APIs fáceis de usar .

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| MinIO | `minio/minio:latest` | Database |
| Builder | `baptistearno/typebot-builder:latest` | Web service |
| Viewer | `baptistearno/typebot-viewer:latest` | Web service |
| MinIO Init. | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | MinIO | 9000 | MinIO port |
| `MINIO_BUCKET` | MinIO | typebot | MinIO default bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO secret key |
| `PORT` | Builder | 3000 | - |
| `S3_PORT` | Builder | 443 | S3 Host port number |
| `S3_BUCKET` | Builder | - | Name of the bucket where assets will be uploaded in |
| `SMTP_HOST` | Builder | - | SMTP host. Gmail is known to not work |
| `SMTP_PORT` | Builder | 465 | SMTP port |
| `ADMIN_EMAIL` | Builder | - | The email that will get an UNLIMITED plan on user creation. The associated user will be able to bypass database rules. |
| `S3_ENDPOINT` | Builder | - | S3 endpoint |
| `SMTP_SECURE` | Builder | true | If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| `NEXTAUTH_URL` | Builder | - | The builder base URL |
| `S3_ACCESS_KEY` | Builder | - | S3 access key |
| `S3_SECRET_KEY` | Builder | (secret) | S3 key |
| `SMTP_PASSWORD` | Builder | (secret) | SMTP password |
| `SMTP_USERNAME` | Builder | (secret) | SMTP username, can be the same as the admin email |
| `ENCRYPTION_SECRET` | Builder | (secret) | A key used to encrypt sensitive data |
| `SMTP_AUTH_DISABLED` | Builder | false | To disable the authentication by email |
| `NEXT_PUBLIC_SMTP_FROM` | Builder | - | SMTP from email address |
| `NEXT_PUBLIC_VIEWER_URL` | Builder | - | The viewer base URL |
| `PORT` | Viewer | 3000 | - |
| `S3_PORT` | Viewer | 443 | S3 Host port number |
| `S3_BUCKET` | Viewer | - | Name of the bucket where assets will be uploaded in |
| `SMTP_HOST` | Viewer | - | SMTP host. (i.e. smtp.host.com) |
| `SMTP_PORT` | Viewer | - | SMTP port |
| `ADMIN_EMAIL` | Viewer | - | The email that will get an UNLIMITED plan on user creation. The associated user will be able to bypass database rules. |
| `S3_ENDPOINT` | Viewer | - | S3 endpoint |
| `SMTP_SECURE` | Viewer | - | If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false |
| `NEXTAUTH_URL` | Viewer | - | The builder base URL |
| `S3_ACCESS_KEY` | Viewer | - | S3 access key |
| `S3_SECRET_KEY` | Viewer | (secret) | S3 Key |
| `SMTP_PASSWORD` | Viewer | (secret) | SMTP password |
| `SMTP_USERNAME` | Viewer | (secret) | SMTP username |
| `ENCRYPTION_SECRET` | Viewer | (secret) | A key used to encrypt sensitive data |
| `SMTP_AUTH_DISABLED` | Viewer | - | To disable the authentication by email |
| `NEXT_PUBLIC_SMTP_FROM` | Viewer | - | SMTP from email address |
| `NEXT_PUBLIC_VIEWER_URL` | Viewer | - | The viewer base URL |
| `MINIO_ROOT_USER` | MinIO Init. | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO Init. | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "minio server --address [::]:$PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`

**Category:** Bots

[View on Railway →](https://railway.com/template/g5MZ4j)
