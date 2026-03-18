# Deploy FreeAPI.app on Railway

Your own API Hub to learn & master API interaction

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/B2f7Hq)

## About

# FreeAPI.app

## Problem

We are trying to build a single source API hub that can be used to learn api handling in any programming language. Users can build their front end portfolio in web and mobile apps using this api hub.

# What is FreeAPI.app

The FreeAPI project is an innovative and community-driven initiative aimed at providing developers with free and accessible APIs for their projects.

The project focuses on delivering a wide range of APIs that cater to various domains and functionalities, enabling developers to seamlessly integrate these APIs into their applications.

Key highlights of the FreeAPI project include:

1. **Accessibility:** The FreeAPI project is committed to eliminating barriers by providing free access to its collection of APIs.
   Developers can leverage these APIs without any cost limitations, allowing them to experiment, learn, and build innovative applications.

2. **Diverse API Collection:** The project offers a diverse and comprehensive collection of APIs that span across different industries, domains, and functionalities.
   Whether you require social media integrations, payment gateways, machine learning algorithms, or IoT device connectivity, the FreeAPI project has you covered.

3. **Simplified Integration:** The FreeAPI project understands the challenges developers face when integrating APIs into their applications. To address this, the project provides clear documentation, code samples, and SDKs, simplifying the integration process and reducing development time and effort.

4. **Community-Driven Development:** The project fosters a vibrant and collaborative community of developers. Contributors are encouraged to share their knowledge, engage in discussions, and collaborate on API-related projects. This collective effort ensures the continuous improvement and reliability of the APIs offered by the FreeAPI project.

5. **Learning and Skill Development:** The FreeAPI project aims to empower developers by providing a platform for learning and skill development. Through access to various APIs and educational resources, developers can enhance their understanding of API integration, expand their knowledge, and showcase their expertise through building complete projects.

Overall, the FreeAPI project is a valuable resource for developers seeking accessible and diverse APIs.

By fostering a supportive community, the project empowers developers to learn, create, and innovate, ultimately contributing to the growth and advancement of the API integration landscape.

## Features:

Introducing our groundbreaking open source API hub project, a dynamic platform designed to revolutionize the way developers interact with APIs.

With an emphasis on openness, accessibility, and learning, our API hub empowers developers of all levels to explore, experiment, and grow their skills in API integration.

Highlights:

1. **Open Source:** Our API hub is built on the principles of open source, ensuring transparency, collaboration, and community-driven development. This means that the source code is freely available, allowing developers to customize, extend, and contribute to the project.

2. **Free to Use:** We firmly believe in removing barriers to entry, which is why our API hub is completely free to use. Whether you're a seasoned developer or just starting your coding journey, you can leverage our platform without any cost limitations.

3. **Local or Deployment**: Flexibility is at the core of our API hub. You have the option to use it locally, running on your own machine, or deploy it to a server, making it accessible to others. This versatility ensures that you can adapt the platform to your specific development environment.

4. **Learning Resource**: Our API hub is designed as a comprehensive learning resource, offering a wealth of educational materials, tutorials, and documentation. Whether you're a beginner or seeking to expand your API knowledge, our platform provides the resources you need to learn and improve.

5. **Custom Endpoints for Beginners**: For developers at the beginner level, our API hub offers custom endpoints that provide a hands-on experience in handling API responses. These beginner-friendly APIs allow you to practice and familiarize yourself with the basics of working with APIs.

6. **Advanced APIs for Portfolio Building**: In addition to beginner-level endpoints, our API hub also provides advanced APIs to challenge and stretch your skills. These APIs enable you to tackle more complex integration scenarios, helping you build a robust portfolio of projects to showcase your expertise.

By combining open source principles, accessibility, and a focus on learning, our API hub project paves the way for developers to thrive in the world of API integration. Join our vibrant community and embark on an exciting journey of discovery, growth, and innovation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freeapi-app | [hiteshchoudhary/apihub](https://github.com/hiteshchoudhary/apihub) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port to run the process |
| `NODE_ENV` | development | Default to development, changing this will avoid stack traces in the error response |
| `CORS_ORIGIN` | http://localhost:3000 | To add the frontend URL |
| `MONGODB_URI` | mongodb+srv://<username>:<password>@<domain>.mongodb.net/?retryWrites=true&w=majority | Provide url of mongodb database |
| `PAYPAL_SECRET` | (secret) | To grab from paypal dashboard |
| `RAZORPAY_KEY_ID` | __razorpay_key_id__ | To grab from Razorpay dashboard |
| `FREEAPI_HOST_URL` | http://localhost:8080 | Provide hosted URL of the docs |
| `GITHUB_CLIENT_ID` | __github_client_id__ | To grab from Github oauth settings |
| `GOOGLE_CLIENT_ID` | __google_client_id__ | To grab from google cloud console |
| `PAYPAL_CLIENT_ID` | __paypal_client_id__ | To grab from paypal dashboard |
| `MAILTRAP_SMTP_HOST` | __mailtrap_smtp_host__ | To grab from mailtrap admin dashboard |
| `MAILTRAP_SMTP_PASS` | __mailtrap_smtp_user_password__ | To grab from mailtrap admin dashboard |
| `MAILTRAP_SMTP_PORT` | __mailtrap_smtp_port__ | To grab from mailtrap admin dashboard |
| `MAILTRAP_SMTP_USER` | (secret) | To grab from mailtrap admin dashboard |
| `ACCESS_TOKEN_EXPIRY` | (secret) | 1 day. Formats: https://github.com/vercel/ms#examples |
| `ACCESS_TOKEN_SECRET` | (secret) | Advised to change the default value to your own secret value |
| `GITHUB_CALLBACK_URL` | http://localhost:8080/api/v1/users/github/callback | Add this exact url in your Authorization callback url in github OAuth app |
| `GOOGLE_CALLBACK_URL` | http://localhost:8080/api/v1/users/google/callback | Add this exact url in your Authorized redirect URIs in Google cloude console OAuth Client id form |
| `RAZORPAY_KEY_SECRET` | (secret) | To grab from Razorpay admin dashboard |
| `GITHUB_CLIENT_SECRET` | (secret) | To grab from Github oauth settings |
| `GOOGLE_CLIENT_SECRET` | (secret) | To grab from google cloud console |
| `REFRESH_TOKEN_EXPIRY` | (secret) | 10 days. Formats: https://github.com/vercel/ms#examples |
| `REFRESH_TOKEN_SECRET` | (secret) | Advised to change the default value to your own secret value |
| `EXPRESS_SESSION_SECRET` | (secret) | Advised to change the default value to your own secret value |
| `CLIENT_SSO_REDIRECT_URL` | http://localhost:3000/user/profile | Frontend url where backend should redirect when user is successfully logged in through the Google/Github SSO |
| `MONGO_MEMORY_SERVER_PORT` | 10000 | MongoDB port for e2e testing |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/template/B2f7Hq)
