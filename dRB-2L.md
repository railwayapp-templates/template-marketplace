# Deploy Python Authentication API Beta on Railway

Python API handles user reg., login, authentication, and profile update.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dRB-2L)

## About

# 🐍 Python Flask User Register/Login API

This is a Python Flask application that provides various 
API routes for user registration, login, and profile update actions.

The application uses MongoDB for storing user data and Flask 
JWT-Extended for handling JWT-based authentication.

## Configuration

Application configuration variables are declared in a .env file. Here's a sample .env file:

```
FLASK_APP=app
FLASK_ENV=development
MONGO_URL=mongodb://localhost:27017
MONGO_DB=test
JWT_SECRET_KEY=secret123
```


Key configuration variables include:

* FLASK_APP: The application startup file
* FLASK_ENV: The current application environment. This should be production in a production environment.
* MONGO_URL: Connection string for MongoDB instance
* MONGO_DB: The database for the application within MongoDB
* JWT_SECRET_KEY: Secret key to sign JWTs

## Application Structure

* The main application is launched from app.py at the root directory.
* The auth_routes.py file contains the /login, /register, /logout, and /checkauth routes used for user authentication.
* The core/__init__.py file is the package initializer for the core package. This is where Flask and JWT are configured, and where routes are registered to the application.
* The User model in user.py represents a user in the system, which includes a pre-save hooks to hash passwords and update the timestamp.

## Setup and Usage

* Clone the repository

    `git clone https://github.com/CrACK000/easy-python-backend-app.git`


* Install the requirements

    `pip install -r requirements.txt`


* Run the application

    `flask run`


* Access the apis at http://localhost:5000 to register, login or perform other actions.



# ✉️ API Testing with Postman

This Python Flask API provides different endpoints for managing user registration, login, and profile updates. 
The API can be tested using different tools like Postman, cURL etc. In this documentation, we demonstrate 
how to test the API using the Postman tool.

Before testing, ensure that you are running your application locally. Refer to the main README.md for the instructions on how to run the application.

## Importing Postman Collection

A Postman collection called postman_collection.json is included in the root directory 
of this project's GitHub repository. This collection includes the requests needed to 
test the user registration, login, profile checking and profile updates.

To use this collection:

1. Clone or download this repository to your local machine.
2. Open Postman.
3. Click on the Import button on the top left corner.
4. Select the postman_collection.json file from your local directory.

The collection should be imported into Postman, and you can use it to test the different endpoints.


### Register

* Method : `POST`
* URL Path : `/register`
* Formdata : `username` `password` `email`

This endpoint is used to register a new user. The request should include username, password and email in the form data.

### Login

* Method : `POST`
* URL Path : `/login`
* Formdata : `username` `password`

This endpoint is used to login a user. The request should include username and password in the form data. 
On successful login, it returns a JWT access token, remember to replace it with  for the 
following requests.

### Check Auth

* Method : `GET`
* URL Path : `/checkAuth`
* Headers : `Authorization : Bearer `

This endpoint is used to verify the user's JWT access token is valid or not. Replace  with 
the token rendered after user login.

### Edit Profile

* Method : `PATCH`
* URL Path : `/updateProfile`
* Headers : `Authorization : Bearer `
* Formdata : `new_username`

This endpoint is used to updated the username of the user. Replace  with the token rendered 
after user login. new_username is the username you want to update to.

## Note

The JWT token obtained from the /login endpoint will be used in the Authorization header for 
the /checkAuth and /editProfile requests as Bearer . Note that this token will expire 
according to the expiration time set in your application (default is 15 minutes), so if your 
testing takes longer than that, you will need to login again to get a new token.

If the token expires or is otherwise incorrect, the server will respond with a 401 error. 
This means "unauthorized", so if you see this, you know you need to check your authorization header.


# 🐋 Dockerized Flask Application

This application is a simple Flask application that has been Dockerized for consistency across 
different environments.

## Building the Docker Image

To build the Docker image, navigate to the directory containing the Dockerfile and run:

```docker build -t my-app .```

Replace "my-app" with the name you want to assign to the Docker image.

## Running the Docker Image

To run the image, enter:

```docker run -p 5000:5000 my-app```

Replace "my-app" with the name of the Docker image you created. This will start a Docker container 
from the image and bind it to port 5000.

## Testing the Application

Once the Docker container is running, you can test the application by navigating to 
http://localhost:5000 in your web browser.

## Stopping the Docker Container

To stop a running Docker container, first determine the container ID by running:

```docker ps```

Then, stop the container by running:

```docker stop ```

Replace  with the actual container ID.


Remember to stop the Docker container when you're finished to free up system resources.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| easy-python-backend-app | [CrACK000/easy-python-backend-app](https://github.com/CrACK000/easy-python-backend-app) | Web service |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FLASK_APP` | easy-python-backend-app | app | - |
| `JWT_SECRET_KEY` | easy-python-backend-app | (secret) | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Authentication · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/dRB-2L)
