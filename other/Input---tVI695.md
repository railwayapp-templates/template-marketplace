# Deploy Input on Railway

No-Code Form Builder Tailored to Your Brand

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tVI695)

## About

<div class="container st">
  <div class="text-section">
    <h2>No-Code Form Builder Tailored to <span class="h">Your Brand</span></h2>
    <p>Effortlessly create simple and engaging forms with Input. Our customization options empower you to
      showcase your forms in your brand's colors, ensuring a cohesive and professional appearance.</p>
  </div>
  <div class="image-section">
	<svg width="404" height="392" fill="none" viewBox="0 0 404 392" class="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"><defs><pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="2" height="2" class="text-stone-200" fill="currentColor"></rect></pattern></defs><rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect></svg>
    <img src="https://s3.deck9.co/strapi/uploads-prod/large_productshot_transparent_48dfddf31d.png" alt="Form Image">
  </div>
</div>


<div class="st">
<h3>With <span class="h">Email</span> Support</h3>

<p style="max-width: 60ch">
Setting up an SMTP email service is mandatory for some features, as team invitations or email notifications. You can add the required SMTP variables when deploying the service.
</p>

<br>

<h3>Additional <span class="h">Resources</span></h3>

<p style="max-width: 60ch">
<strong>Website: </strong> <a class="link">https://getinput.co</a>
<br>
<strong>Github: </strong> <a class="link">https://github.com/deck9/input</a>
</p>
</div>

<style>
	a.link {
    text-decoration: none;
    color: #3498db;
    font-weight: 600;
    transition: color 0.3s ease, border-bottom 0.3s ease;
    position: relative;
}

a.link:hover {
    color: #2ecc71;
	cursor: pointer;
}

a.link::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #2ecc71;
    transition: width 0.3s;
    position: absolute;
    bottom: -2px;
    left: 0;
}

a.link:hover::after {
    width: 100%;
}

	.st {
    	font-family: Arial, sans-serif;
	}

  .container {
    display: flex;
    flex-direction: row;
    max-width: 800px;
    padding: 20px;

    margin: auto;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;

    color: #000;
  }

  .text-section {
    flex: 1;
    padding-right: 20px;
  }

  .text-section h2 {
    font-size: 30px;
    margin-bottom: 10px;
	max-width: 20ch;
  }

  .text-section p {
    font-size: 16px;
    color: #EBEBEB;
    max-width: 50ch;
  }
  
  .image-section {
  	width: 50vw;
    max-width: 350px;
    height: 350px;
    max-height: 350px;
  }

  .image-section img {
  		position: absolute;
    	margin-left: 25px;
        margin-top: 25px;
        width: calc(45vw - 50px);
        max-width: 350px;
        height: auto;
        border-radius: 5px;
		background-color: #4169E1;
  }
  
	.image-section svg {
    	position: absolute;
		width: 20vw;
        max-width: 200px;
        height: auto;
filter: invert(100%);

    }

	.h {
    	color: #4169E1
    }

@media screen and (max-width: 600px) {
  .container {
  flex-direction: column;
height: 250px;
  }

	.image-section img {
		display: none;
	}

	.image-section svg {
    	display: none;
    }
}
</style>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Input | `ghcr.io/deck9/input:main` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_PRIVATE_PORT` | MySQL | 3306 | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Input | 8080 | - |
| `DB_DATABASE` | Input | railway | - |
| `DB_PASSWORD` | Input | (secret) | - |
| `DB_USERNAME` | Input | (secret) | - |
| `MAIL_MAILER` | Input | smtp | - |
| `DB_CONNECTION` | Input | mysql | - |
| `MAIL_PASSWORD` | Input | (secret) | - |
| `MAIL_USERNAME` | Input | (secret) | - |
| `MAIL_ENCRYPTION` | Input | - | "tls" or "ssl" |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Input | true | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/tVI695)
