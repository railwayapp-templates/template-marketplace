# Deploy Microsoft SQL Server 2022 on Railway

SQL Server 2022 with persistent storage. EULA and edition choice required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/microsoft-sql-server-2022)

## About

SQL Server 2022 CU26 with a digest-pinned official Linux image, a persistent `/var/opt/mssql` volume, a generated initial `sa` password, and TCP access on container port 1433. **You must personally accept the Microsoft EULA and explicitly choose an eligible edition/license before SQL Server can start.**

The template does not choose Developer on your behalf and a Railway subscription does not include a Microsoft SQL Server license. Required `ACCEPT_EULA` has no default; required `MSSQL_PID` is explicitly empty to override the image's inherited Developer fallback. Startup rejects missing consent, consent other than `Y`, and a missing edition choice before launching the engine.

### Required EULA and edition choices

1. Read the [Microsoft SQL Server EULA](https://go.microsoft.com/fwlink/?LinkId=746388). Set `ACCEPT_EULA=Y` yourself only if you accept it.
2. Set `MSSQL_PID` to the edition/product key you are entitled to use for this workload. Selecting an edition name does not establish ownership of a paid license.
3. If you select **Developer**, it is licensed for development and testing only, **never production**. Developer is a choice, not this template's forced/default edition.
4. Production requires an eligible Express deployment within its limits or a properly licensed paid edition/product key. SQL Server 2022 Express has a 10 GB per-database limit. Evaluation is time-limited, not a permanent production license.

Review Microsoft's edition and licensing documentation before deployment or changing an existing instance's edition. The startup guard checks inputs, not your legal entitlement or production suitability.

### Deploy and authenticate

1. Make the two required choices above, attach `/var/opt/mssql`, and allow memory above `MSSQL_MEMORY_LIMIT_MB=2048`; this engine setting is not the total container limit.
2. Deploy and wait for `SQL Server is ready for client connections`. No HTTP endpoint/healthcheck is provided; TCP acceptance or Railway `SUCCESS` is not SQL authentication proof.
3. Retrieve `MSSQL_SA_PASSWORD` privately from the service Variables tab. The initial login is `sa`; `MSSQL_USERNAME` does not create or rename a SQL login.
4. Connect with `sqlcmd`, SSMS, or a TDS driver. Same-environment clients should use the private hostname and port 1433. External clients use the TCP proxy's actual hostname and assigned external port, not necessarily 1433. Remove the public proxy if unnecessary.
5. Create a disposable database/table, insert and select a unique marker, restart, reconnect, and select it again. Confirm a wrong-password connection is rejected and data/log files reside under the volume.

**Real SQL queries, wrong-password rejection and restart-persistence checks remain requirements, not claimed passed tests.** Runtime verification requires explicit EULA acceptance and an edition choice; no consent is implied by this listing.

### Credentials, storage and TLS

The generated initial SA password uses a fixed complexity prefix plus a random alphanumeric suffix. Keep resolved credentials out of source control, logs and command-line history. `MSSQL_URL` and `MSSQL_URL_PUBLIC` are convenience URLs; ADO.NET, JDBC and other drivers may require separate host, port, login and password fields or their own connection-string syntax.

Changing `MSSQL_SA_PASSWORD` in Railway Variables is not reliable password rotation for an initialized volume. Rotate the stored SQL login through an authenticated `ALTER LOGIN` operation and update clients together. Applications should use dedicated least-privilege logins, not `sa`.

The mount holds system/user database data, log files and configuration. Keep one writer with no overlapping deployments. Startup retains trace flag `-T1800`; `RAILWAY_RUN_UID=0` is a volume-permission compatibility tradeoff, not security hardening. Shared memory is configured to 256 MiB. Volumes are not SQL backups or high availability: configure and verify backups/restores separately.

Enable connection encryption. Trusting a self-signed certificate does not verify server identity; do not treat `TrustServerCertificate=True` as production TLS validation. Sensitive deployments need trusted certificates, validation, monitoring, resource planning and appropriate licensing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MicrosoftSQL | `mcr.microsoft.com/mssql/server:2022-CU26-ubuntu-22.04@sha256:ba4c8329f48fb8f02e1416be6a930ebfd71268caee78aa985f3af4315e457c89` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MSSQL_PID` | - | Choose your licensed edition explicitly. Developer is development/test ONLY, never production. Production requires an eligible Express deployment or a properly licensed paid edition/product key; selecting a name does not grant a license. |
| `ACCEPT_EULA` | - | Required personal choice: read https://go.microsoft.com/fwlink/?LinkId=746388 and set Y only if you accept. No default acceptance. |
| `MSSQL_TCP_PORT` | 1433 | - |
| `MSSQL_USERNAME` | (secret) | - |
| `MSSQL_SA_PASSWORD` | (secret) | - |
| `MSSQL_MEMORY_LIMIT_MB` | 2048 | - |

## Configuration

- **Start command:** `/bin/bash -c 'test "${ACCEPT_EULA:?Set ACCEPT_EULA=Y only after accepting the Microsoft EULA}" = Y && : "${MSSQL_PID:?Choose a licensed edition explicitly; Developer is NONPRODUCTION}" && exec /opt/mssql/bin/sqlservr -T1800'`
- **TCP Proxies:** 1433
- **Volume:** `/var/opt/mssql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/microsoft-sql-server-2022)
