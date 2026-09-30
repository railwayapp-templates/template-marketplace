# Deploy WaryPos on Railway

Todo tu negocio en un sistema, instalado en tu propio servidor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/warypos)

## About

WaryPOS es un sistema de punto de venta y gestión para negocios del Perú: restaurantes, bodegas, boticas, ferreterías y más. Vende, controla inventario y caja, y emite notas de venta gratis. Con el plan Pro emite boletas y facturas electrónicas ante SUNAT y se integra con WhatsApp Business.

Esta plantilla instala WaryPOS en tu propia cuenta de Railway con dos servicios: la aplicación (imagen Docker `kennethguerra/warypos`, con la API y la web en el mismo puerto) y una base de datos PostgreSQL privada solo para tu empresa. Las claves de seguridad se generan solas al desplegar y la base de datos se prepara automáticamente en el primer arranque. Cuando termine, abre la dirección pública que te asigna Railway: un asistente te pide tu RUC, el correo y la clave del administrador, y luego creas tus negocios. Puedes usar el dominio gratuito de Railway o conectar tu propio dominio. Tus datos quedan en tu cuenta y las actualizaciones llegan con una nueva versión de la imagen.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| WaryPos | `kennethguerra/warypos` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `RP_DB_DSN` | WaryPos | - | Conexión a la base de datos PostgreSQL de esta instalación. Se completa sola; no la cambies. |
| `RP_JWT_SECRET` | WaryPos | (secret) | Clave secreta para las sesiones de los usuarios. Se genera sola al desplegar; no la cambies. |
| `RP_KEK_BASE64` | WaryPos | - | Clave maestra que cifra los datos personales de tu empresa. Se      │ │ RP_KEK_BASE64           │ genera sola. Guárdala en un lugar seguro: si se pierde o se cambia,  esos datos no se podrán leer. |
| `WARYPOS_PORTAL_REGISTRO` | WaryPos | auto |  Registro de la instalación en el portal de WaryPOS para activar el plan Pro (boleta, factura y WhatsApp). Déjalo en "auto" |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/warypos)
