# Deploy My Invoice on Railway

Fakturace a účetní systém pro freelancery a malé firmy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/my-invoice)

## About

**Fakturace pro freelancery, OSVČ a malé firmy. Vaše data, váš server.**
**Český open-source fakturační systém, který běží u vás.** Vystavené i přijaté
faktury, AI extrakce z PDF, CRM dashboard s cash-flow předpovědí, výkazy DPH,
kontrolní a souhrnné hlášení, daň z příjmů v podobě EPO XML, QR platby, import
bankovních výpisů, REST API a exporty pro účetní software. Žádný SaaS, žádné
měsíční poplatky, žádné limity na počet dokladů.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PHP 8.5+](https://img.shields.io/badge/PHP-8.5+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![MariaDB 10.6+](https://img.shields.io/badge/MariaDB-10.6+-003545?logo=mariadb&logoColor=white)](https://mariadb.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Docker](https://img.shields.io/badge/Docker-multi--arch-2496ED?logo=docker&logoColor=white)](https://github.com/radekhulan/myinvoice/pkgs/container/myinvoice)
[![GHCR](https://img.shields.io/github/v/tag/radekhulan/myinvoice?label=GHCR&color=2496ED&logo=docker&logoColor=white)](https://github.com/radekhulan/myinvoice/pkgs/container/myinvoice)
🌐 [Github](https://github.com/tpkowastaken/myinvoice-railway)
🌐 [MyInvoice.cz](https://myinvoice.cz/) ·
📖 [Online manuál](https://myinvoice.cz/manual/) ·
🏢 [MyWebdesign.cz s.r.o.](https://mywebdesign.cz/)

> ⚠️ **Než začnete fakturovat, přečtěte si
> [Fakturujeme — daňový průvodce](manual/28_Fakturujeme.md).** Vysvětluje, jak
> aplikace pracuje s plátci a neplátci DPH, sazbami a reverse charge, kde má
> limitace (například automatické posouzení OSS nebo IOSS) a jak je řešit.
> **Správnost faktury je vždy na uživateli** — pro nestandardní situace
> konzultujte účetní.

![Přehled (dashboard)](https://github.com/tpkowastaken/myinvoice-railway/raw/master/manual/img/01_dashboard.webp)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.8` | Database |
| MyInvoice | [tpkowastaken/myinvoice-railway](https://github.com/tpkowastaken/myinvoice-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_URL` | MariaDB | - | Connection url |
| `MARIADB_USER` | MariaDB | (secret) | username |
| `MARIADB_DATABASE` | MariaDB | myinvoice | database name |
| `MARIADB_PASSWORD` | MariaDB | (secret) | password |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | root password |
| `MYSQL_URL` | MyInvoice | - | url pro databázi |
| `MYINVOICE_PEPPER` | MyInvoice | - | secret |
| `MYINVOICE_APP_ENV` | MyInvoice | production | my invoice prostředí |
| `MYINVOICE_APP_URL` | MyInvoice | - | doména, kde my invoice běží. Po změně je potřeba redeploy (znovu nasazení) serveru |
| `MYINVOICE_DATA_DIR` | MyInvoice | /data | lokace, kde je připojena jednotka úložiště |
| `MYINVOICE_SMTP_AUTH` | MyInvoice | - | true or false whether the SMTP you're listing requires auth |
| `MYINVOICE_SMTP_HOST` | MyInvoice | - | SMTP hostname without port "smtp.example.com" - You can use free smtp from resend.com |
| `MYINVOICE_SMTP_PASS` | MyInvoice | - | Password or api key for the smtp server |
| `MYINVOICE_SMTP_PORT` | MyInvoice | - | Port for the smtp server. 587 (STARTTLS) or 465 (SSL) |
| `MYINVOICE_SMTP_USER` | MyInvoice | (secret) | Username for the smtp login |
| `MYINVOICE_SECRET_KEY` | MyInvoice | (secret) | secret |
| `MYINVOICE_SMTP_FROM_NAME` | MyInvoice | My Invoice | The "FROM" name which will appear in the email. Default is My Invoice |
| `MYINVOICE_SMTP_ENCRYPTION` | MyInvoice | - | SMTP Encryption. tls (587) or ssl (465) |
| `MYINVOICE_SMTP_FROM_EMAIL` | MyInvoice | - | The "FROM" email from which the email will be sent. Ensure the smtp authorizes this email address |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** PHP, Vue, TypeScript, Twig, Shell, PowerShell, JavaScript, CSS, Python, Batchfile, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/my-invoice)
