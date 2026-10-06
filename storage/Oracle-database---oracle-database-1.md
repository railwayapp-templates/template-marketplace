# Deploy Oracle database on Railway

Oracle 26ai instance with persistent storage, private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oracle-database-1)

## About

Oracle Database Free is the free edition of Oracle AI Database 26ai: a full-featured relational database with SQL, PL/SQL, JSON, spatial and vector/AI capabilities. It is free
 under Oracle's Free Use Terms and Conditions, capped at 12 GB of user data, 2 GB of database RAM and 2 CPU threads per instance.

   ## About Hosting Oracle Database Free

   Railway can't pull directly from Oracle's container registry, so this template wraps the official Oracle Database Free image (the ~0.9 GB `-lite` flavor) in a small Dockerfile.
 First boot expands Oracle's prebuilt data files into a Railway volume, so the database is ready in minutes instead of a long DBCA install. The database listens on port `1521`, is
 reachable over Railway's private network (or an optional TCP proxy), and uses `FREEPDB1` as the service name. A volume mounted at `/opt/oracle/oradata` keeps data across
 redeploys. Deploying requires a Hobby plan or higher with at least 2 GB RAM.

   ## Common Use Cases

   - Development, staging and CI databases for SQL, PL/SQL and Oracle-specific features.
   - Sandboxed SQL, JSON, spatial or vector/AI playgrounds, with one schema per sandbox in `FREEPDB1`.
   - Testing migrations, query plans and schema changes against a real Oracle instance before touching production.
   - Backing an application that runs on the same Railway private network.

   ## Dependencies for Oracle Database Free Hosting

   - **Railway Hobby plan or higher** with at least 2 GB RAM — the Free/Trial plan caps services at 1 vCPU / 0.5 GB, below Oracle's minimum.
   - **A Railway volume of at least 5 GB** mounted at `/opt/oracle/oradata` (Oracle Free caps user data at 12 GB).
   - Optional: **a TCP proxy on port 1521** if clients outside Railway need to connect.

   ### Implementation Details

   Connect with the generated `ORACLE_PWD` as `SYS`, `SYSTEM` or `PDBADMIN`:

   ```
   SID:            FREE
   PDB / service:  FREEPDB1
   Port:           1521
   Character set:  AL32UTF8

   sqlplus system/"$ORACLE_PWD"@//.railway.internal:1521/FREEPDB1
   jdbc:oracle:thin:@//.railway.internal:1521/FREEPDB1
   ```

   The optional `APP_USER` / `APP_USER_PASSWORD` variables provision an application schema in `FREEPDB1` at startup.

   ## Why Deploy Oracle Database Free on Railway?

   Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to
 vertically and horizontally scale it.

   By deploying Oracle Database Free on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI
 agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| oracle-database | [lassegit/oracle-database](https://github.com/lassegit/oracle-database) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_USER` | (secret) | Optional name of an application schema/user to create in FREEPDB1 at startup (for example app). Leave empty to skip; when set, APP_USER_PASSWORD is used for it. |
| `ORACLE_PWD` | - | Password for the Oracle SYS, SYSTEM and PDBADMIN users. Generated at deploy; applied on every start, so change it and restart the service to rotate it. |
| `ORACLE_IMAGE_TAG` | 23.26.3.0-lite | Container image tag to build. Use a -lite tag; latest and untagged names point at the ~3.7 GB full image. Move forward only and test on a copy of the volume first. |
| `APP_USER_PASSWORD` | (secret) | Password for APP_USER. Only used when APP_USER is set. Generated at deploy; change it and restart the service to rotate. |

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/oracle-database-1)
