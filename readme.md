# Dynamic Content Control API and User Interaction Service

Welcome to the Dynamic Content Control API and User Interaction Service! This
API provides seamless integration for managing dynamic content of services,
vacancies and products on your website and staying in touch with your users.
Whether you want to update website content in real-time, collect user feedback,
or receive resumes, this service has got you covered.

## Introduction

---

The Dynamic Content Control API allows you to manage and update dynamic content
on your website without the need for manual intervention. Additionally, the User
Interaction Service facilitates user engagement by enabling the collection of
feedback and resumes from your users.

## Features

---

- **Real-time Content Updates:** Update website content dynamically without
  requiring manual changes.
- **User Feedback Collection:** Gather feedback from users to improve your
  website and services.
- **Resume Submission:** Receive resumes from potential candidates directly
  through the API.

## Tech

---

Leveraging a Powerful Stack for Seamless Functionality and Enhanced User
Experience.

- [node.js](https://nodejs.org/) - Utilized for event-driven I/O operations on
  the backend, providing a robust and efficient runtime environment for the API
  server.
- [Express](https://expressjs.com/) - A fast and minimalist Node.js web
  application framework that simplifies the process of building robust APIs and
  web applications.
- [Mongoose](https://mongoosejs.com/) - An elegant object modeling library for
  MongoDB and Node.js, providing a schema-based solution to model application
  data. It ensures data consistency and simplifies interactions with MongoDB
  databases.
- [Cloudinary](https://cloudinary.com/) - Cloudinary is a top-tier cloud-based
  media management service, facilitating seamless storage, optimization, and
  delivery of images and videos, crucial for enhancing user experience within
  the API.
- [Nodemailer](https://www.npmjs.com/package/nodemailer) - A powerful Node.js
  module for sending emails, making it easy to incorporate email functionality
  into the API. It supports various email services and provides a flexible and
  reliable solution for sending notifications, confirmations, and other email
  communications.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

- Clone the repository:

```sh
gh repo clone yuliiamaiboroda/backend_agro
```

- Change into the project directory:

```sh
cd backend_agro
```

- Install dependencies:

```sh
npm install
```

- Start the development server:

```sh
npm run start:dev
```

-Use [http://localhost:3001](http://localhost:3001) to interact with REST API.

- For production environments.

```sh
npm start
```

## Configuration with Environment Variables

---

Secure and Modular Settings

To configure your application, create a .env file in the root directory and
populate it with the following environment variables:

### MongoDB

- **MONGO_CONNECTION_STRING:** Your MongoDB connection string.

### JWT (JSON Web Tokens)

- **JWT_SECRET:** Secret key for encoding and decoding JWT tokens.
- **JWT_SECRET_REFRESH:** Secret key for refreshing JWT tokens.
- **JWT_EXPIRATION:** Expiration time for regular JWT tokens (in seconds).
- **JWT_REFRESH_EXPIRATION:** Expiration time for JWT refresh tokens (in
  seconds).

### Cloudinary

- **CLOUDINARY_NAME:** Your Cloudinary cloud name.
- **CLOUDINARY_KEY:** Your Cloudinary API key
- **CLOUDINARY_SECRET:** Your Cloudinary API secret.

### Nodemailer

- **MAIL_SENDER_HOST:** SMTP server host for sending emails.
- **MAIL_SENDER_PORT:** Port number for the SMTP server.
- **MAIL_SENDER_EMAIL:** Your email address for sending emails.
- **MAIL_SENDER_PASSWORD:** Your email password for authentication.

Ensure these variables are properly set in your .env file to enable secure and
seamless functionality within your application.

## Documentation

Powered by [Swagger.io(OpenAPI)](https://swagger.io/specification/)

- **In development mode:**
  [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

- **in production mode:**
  [ahrokhimpromtsentr.cyclic.app/api/docs](ahrokhimpromtsentr.cyclic.app/api/docs)

## Other commands

**Start the server in production mode.**

```sh
npm start
```

**Start the server in development mode.**

```sh
npm run start:dev
```

**Run eslint code checks. This should be done before each PR, and all linting
errors must be fixed.**

```sh
npm run lint
```

**Similar to linting check, but automatically fixes simple errors.**

```sh
npm lint:fix
```

## License

---

MIT
