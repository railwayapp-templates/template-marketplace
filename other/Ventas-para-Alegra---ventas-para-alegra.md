# Deploy Ventas para Alegra on Railway

Ventas móviles, clientes, inventario, pagos y caja conectados con Alegra.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ventas-para-alegra)

## About

Ventas para Alegra conecta un equipo comercial con Alegra desde una interfaz
móvil sencilla para vender, consultar clientes y controlar la caja sin entregar
acceso completo al panel contable.

La plantilla instala una aplicación independiente con almacenamiento persistente.
Cada cliente usa sus propias credenciales de Alegra, su propio volumen privado y
secretos generados automáticamente. Incluye respaldos diarios y 14 días de prueba.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/luchor23-code/ventas-para-alegra:stable` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CURRENCY` | COP | Código de moneda usado para mostrar valores, configurado en pesos colombianos. |
| `DATA_DIR` | /data | Ruta del volumen persistente donde la aplicación guarda su base de datos y respaldos. |
| `NODE_ENV` | production | Activa el modo de producción optimizado y seguro de Node.js. |
| `ALLOW_DEMO` | false | Mantiene deshabilitado el modo de demostración en instalaciones comerciales. |
| `APP_SECRET` | (secret) | Secreto aleatorio usado para proteger sesiones y datos internos. |
| `LICENSE_KEY` | - | Licencia comercial; opcional durante los 14 días de prueba. |
| `SUPPORT_URL` | - | Página de soporte o renovación; puede configurarse después. |
| `ALEGRA_EMAIL` | - | Correo de la cuenta de Alegra que usará esta instalación. |
| `ALEGRA_STAMP` | false | Define si Alegra debe aplicar la estampación electrónica al emitir facturas. |
| `ALEGRA_TOKEN` | (secret) | Token API de Alegra; trátalo como una clave privada. |
| `COMPANY_NAME` | - | Nombre del negocio que se mostrará dentro de la aplicación. |
| `COUNTRY_CODE` | 57 | Prefijo telefónico del país usado para enlaces y números de contacto. |
| `PRODUCT_NAME` | Ventas para Alegra | Nombre del producto mostrado en títulos y pantallas de la aplicación. |
| `VENDER_SIN_STOCK` | false | Permite o impide facturar productos cuando su inventario está agotado. |
| `LICENSE_TRIAL_DAYS` | 14 | Duración del período de prueba antes de solicitar una licencia comercial. |
| `ALEGRA_INVOICE_STATUS` | open | Estado inicial enviado a Alegra al crear una factura. |
| `ADMIN_INITIAL_PASSWORD` | (secret) | Contraseña inicial aleatoria del administrador; debe cambiarse después del primer ingreso. |
| `ALEGRA_PRICE_LIST_NAMES` | General,Público | Listas de precios de Alegra disponibles para los vendedores. |
| `ALEGRA_CASH_ACCOUNT_NAME` | Caja general | Nombre exacto de la cuenta de efectivo usada para registrar abonos. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ventas-para-alegra)
