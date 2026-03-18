# Deploy Kali Linux on Railway

Kali Linux with the tools you love and a shell, all accessible over the web

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/E7oTLJ)

## About

# kali-railway

Want to try out Kali Linux or want to have a mini version of kali linux available at all times? Then feel free to give this project a try:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/E7oTLJ?referralCode=8sCkKx)


## Description
This project uses the official [kali linux rolling](https://hub.docker.com/r/kalilinux/kali-rolling/) image to deploy a container which can then be used to install most of the cli tools which comes with kali linux pre-installed. Behind the scenes, it uses [ttyd](https://github.com/tsl0922/ttyd) to provide a hassel free and a very accessible way to access the command line.

![image](https://github.com/Mys7erio/kali-railway/assets/25553029/8b338827-fa0c-4dbb-bf06-cba5b0f9d8a5)




## Enviroment Variables
  - **PORT:** The port on which the ttyd program will listen on.
  - **USERNAME:** The username which will be used to login to the web shell.
  - **PASSWORD:** The password which will be used to login to the web shell.

### Railway Default Enviroment Variables
When deploying to Railway, the USERNAME and PASSWORD enviroment variables will be set to a random string, thanks to railway's [template variables](https://docs.railway.app/guides/create#template-variable-functions)
  - PORT: Defaults to 8080
  - USERNAME: A random string of 16 characters containing only alpha-numeric characters (a-z, A-Z, 0-9)
  - PASSWORD: A random string of 32 characters
 
**NOTE:** It is strongly adviced to provide the USERNAME and PASSWORD enviroment variables before deploying the project.

To view or edit the USERNAME and PASSWORD enviroment variables, click on the deployed template -> Variables tab

![image](https://github.com/Mys7erio/kali-railway/assets/25553029/f35d30d4-9b7f-45f1-af68-7cceb3a58a35)


## Using locally

```
# Using docker to create an image and run a container locally
# To build the container image
docker build -t kali-railway 

# To run a demo installation on port 8080 with the username set to "admin" and password set to "password"
docker run --rm -e USERNAME=admin -e PASSWORD=password -e PORT=8080 -p 8080:8080 kali-railway
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kali-linux-docker | [Mys7erio/kali-railway](https://github.com/Mys7erio/kali-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The variable from which you can access the shell |
| `PASSWORD` | (secret) | Password for accessing the shell |
| `USERNAME` | (secret) | Username for accessing the shell |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/E7oTLJ)
