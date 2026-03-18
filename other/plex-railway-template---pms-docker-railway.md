# Deploy plex-railway-template on Railway

Deploy and Host pms-docker-railway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pms-docker-railway)

## About

# Plex Media Server - Railway Template 🎬

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/pms-docker-railway)

Servidor Plex completo en Railway con **Gestor de Archivos Web** integrado. Despliega en minutos con almacenamiento persistente.

---

## ✨ Características Estelares

- 🎬 **Plex Media Server**: Streaming de películas, series y música.
- 📂 **File Browser Hardened**:
  - **Seguridad**: Credenciales vía Variables de Entorno o Secretos.
  - **UX**: Tema Oscuro nativo "Plex Integration".
  - **Robustez**: Protección contra corrupción de base de datos en reinicios rápidos.
- 💾 **Persistencia Total**: Volúmenes Railway para `/config`, `/data` y `/transcode`.
- 🚀 **Zero Config Proxy**: Acceso seguro mediante TCP Proxy de Railway.

---

## 🚀 Despliegue Rápido

### 1. Obtener Token de Plex

Ve a [plex.tv/claim](https://plex.tv/claim), inicia sesión y copia el código (ej: `claim-xxxx`).

### 2. Deploy en Railway

Haz clic en el botón de arriba, pega tu token en `PLEX_CLAIM` y dale a **Deploy**.

### 3. Configurar el Gestor de Archivos (VITAL)

Para subir tus películas, necesitas habilitar el acceso al puerto **9090** (o el que definas en `FB_PORT`):

1. En tu servicio de Railway, ve a la pestaña **Settings**.
2. Baja hasta **Public Networking**.
3. Haz clic en **+ TCP Proxy**.
4. Escribe el puerto: `9090` (Por defecto).
5. Railway te dará una dirección (ej: `shuttle.proxy.rlwy.net:12345`). **¡Esa es URL para subir archivos!**

---

## 📂 Cómo gestionar tus medios

1. **Acceso al Gestor**: Usa la dirección del TCP Proxy creada arriba.
2. **Login Seguro**: Usa las credenciales que definiste en las variables de entorno (ver abajo).
3. **Subida**: Arrastra tus archivos a la carpeta `/data`.
4. **Plex**: Entra en Plex (`...up.railway.app`), ve a Bibliotecas y añade la carpeta `/data`.

> [!IMPORTANT]
> **Gestión de Credenciales (Prioridad):**
>
> 1. `FB_ADMIN_PASSWORD_FILE` (Docker Secret - Más seguro)
> 2. `FB_ADMIN_PASSWORD` (Variable de entorno)
> 3. **Fallback**: Si no defines nada,## 🚀 Despliegue en Railway (Guía Rápida)

Este template está optimizado para Railway. Sigue estos pasos para desplegar tu servidor Plex + File Browser.

### 1. Variables de Entorno (Obligatorias)

Configura estas variables en tu proyecto de Railway:

| Variable | Valor Recomendado | Descripción |
| :--- | :--- | :--- |
| `PORT` | `32400` | Puerto público. **Pon 32400 para ver Plex**. |
| `FB_PORT` | `9090` | Puerto interno del File Browser (No cambiar). |
| `FB_ADMIN_USER` | `tu_usuario` | Usuario para iniciar sesión en el gestor de archivos. |
| `FB_ADMIN_PASSWORD` | `tu_clave_secreta` | **Mínimo 6 caracteres**. Clave del gestor de archivos. |
| `PLEX_CLAIM` | `claim-xxxx` | Token de [plex.tv/claim](https://www.plex.tv/claim) para asociar tu servidor. |


### 2. Networking (Puertos)

Railway solo expone un puerto público a la vez (el definido en `PORT`).
- **Para ver películas (Plex):** Configura `PORT=32400`.
- **Para subir archivos (File Browser):** Configura `PORT=9090`.

### 3. Almacenamiento y Bibliotecas (`/data`)

El sistema usa un **Volumen Único** montado en `/data`.
- Toda tu configuración de Plex vive oculta en `/data/.plex-config` (¡No la borres!).
- Tus archivos multimedia deben ir dentro de subcarpetas en `/data`.

**Cómo agregar bibliotecas en Plex:**
Cuando Plex te pida la carpeta de tus películas, debes escribir la ruta completa:
`/data/NombreDeTuCarpeta`

*Ejemplo:* Si en File Browser creaste una carpeta llamada `Movies`, en Plex la ruta es `/data/Movies`.
![Variables en Railway](https://github.com/Kennethguerra3/plex-railway-template/raw/master/doc/images/railway-vars.png)
![Ejemplo de Ruta](https://github.com/Kennethguerra3/plex-railway-template/raw/master/doc/images/filebrowser-demo.png)

---

## 🔧 Solución de Problemas

### "¿Por qué me redirige a Plex al intentar subir archivos?"

Asegúrate de estar usando la dirección del **TCP Proxy** y no el dominio principal. Prueba siempre desde una **ventana de incógnito** para evitar la cache del navegador.

### "No veo mis películas en Plex"

Asegúrate de que has subido los archivos a `/data` y que en la configuración de la Biblioteca de Plex has seleccionado exáctamente esa ruta.

---

## 📄 Licencia

Basado en el contenedor oficial [plexinc/pms-docker](https://github.com/plexinc/pms-docker).
Optimizado por **WarsTrom** con estándares de seguridad Enterprise.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plex-railway-template | [Kennethguerra3/plex-railway-template](https://github.com/Kennethguerra3/plex-railway-template) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 32400 | - |
| `FB_PORT` | 9090 | - |
| `PLEX_CLAIM` | - | https://plex.tv/claim |
| `FB_ADMIN_USER` | (secret) | Nombre user files |
| `FB_ADMIN_PASSWORD` | (secret) | Clave para files  |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9090
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Go Template, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/pms-docker-railway)
