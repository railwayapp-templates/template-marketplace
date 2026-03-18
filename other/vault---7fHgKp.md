# Deploy vault on Railway

Gestor de secretos, certificados, keys...

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7fHgKp)

## About

🔐 ¿Qué es Vault de HashiCorp?
Vault es una herramienta para gestionar secretos (como contraseñas, tokens, claves API, certificados, etc.) de forma segura y centralizada.

Permite:

Guardar y acceder a secretos de forma segura.

Controlar quién puede acceder a qué secretos (con políticas).

Rotar automáticamente claves o contraseñas.

Generar credenciales temporales bajo demanda (por ejemplo, para una base de datos).

Cifrar y descifrar datos sin almacenarlos.

🎯 ¿Para qué se usa?
Proteger datos sensibles.

Cumplir con requisitos de seguridad.

Evitar que contraseñas o claves estén "hardcodeadas" en código o repositorios.

🛠️ Ejemplos de uso
Un microservicio pide a Vault un token para conectarse a una API externa.

Un usuario obtiene temporalmente una clave para conectarse a una base de datos.

Vault cifra un archivo antes de almacenarlo en un bucket de S3.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vault-railway-template | [cosmind-rusu/vault-railway-template](https://github.com/cosmind-rusu/vault-railway-template) | Worker |

**Category:** Other

[View on Railway →](https://railway.com/template/7fHgKp)
