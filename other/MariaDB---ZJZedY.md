# Deploy MariaDB on Railway

Template mariaDB and Adminer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZJZedY)

## About

#### **Steps to Install the Template**

1. **Sign in to Railway**
   - Go to [Railway](https://railway.app) and log in to your account.

2. **Create a New Project**
   - Click on **"New Project"** and select **"Start From Template"**.

3. **Search for the Template**
   - Find the template for MariaDB and Adminer. If you don't see it, you can create a custom setup with the necessary services.

4. **Configure Environment Variables**
   - Once the project is set up, navigate to the **"Environment Variables"** section.
   - Add the following variables to configure MariaDB:

     | Variable Name       | Description                     |
     |---------------------|---------------------------------|
     | `MYSQL_ROOT_PASSWORD` | The root password for MariaDB. |
     | `MYSQL_DATABASE`      | The default database name.     |
     | `MYSQL_USER`          | The database user.             |
     | `MYSQL_PASSWORD`      | The password for the database user. |

   - Replace the placeholders with your desired values:
     ```
     MYSQL_ROOT_PASSWORD=
     MYSQL_DATABASE=
     MYSQL_USER=
     MYSQL_PASSWORD=
     ```

5. **Deploy the Template**
   - After setting up the environment variables, click **"Deploy"** to start the project.
   - Railway will provision MariaDB and Adminer as part of your project.

6. **Access Adminer**
   - Once the deployment is complete, locate the Adminer service URL from your Railway dashboard.
   - Open the Adminer URL in your browser and use the credentials you set up in the environment variables to log in.

---

#### **Tips**
- Use a strong password for `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD` to enhance security.
- Regularly back up your MariaDB database to prevent data loss.
- Customize additional Railway configurations if needed (e.g., project domains or resources).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | [Aissaoui-Ahmed/mariadb](https://github.com/Aissaoui-Ahmed/mariadb) | Database |
| Adminer | [Aissaoui-Ahmed/mariadb](https://github.com/Aissaoui-Ahmed/mariadb) (root: /Adminer) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MYSQL_USER` | (secret) |
| `MYSQL_DATABASE` | ${MYSQL_DATABASE} |
| `MYSQL_PASSWORD` | (secret) |
| `MYSQL_ROOT_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ZJZedY)
