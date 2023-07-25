# OpenMusic Express API

OpenMusic is an API built using Express.js and MongoDB, originally inspired by the [Dicoding: Belajar Fundamental Aplikasi Back-End](https://www.dicoding.com/academies/271) course, which used Hapi.js and PostgreSQL. The API is now reimagined and improved with Express.js and MongoDB, using Mongoose as the ODM.

## Introduction

The main purpose of this project is to enhance understanding and learning of backend development using Express.js and MongoDB. The API allows you to manage songs, albums, playlists, and collaborations. In the future, it will serve as the backend for a website, so you are welcome to fork, clone, or contribute to this repository!

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- nanoid
- bottlejs

## Project Structure

The project follows the Clean Architecture principles, providing a clear separation between different layers of the application. The directory structure is organized as follows:

```
openmusic_express/
  ├── app.js
  ├── container.js
  ├── server.js
  ├── application/
  │   └── use_case/
  │       └── use_casefile.js
  ├── entities/
  │   └── entitiesfile.js
  ├── exception/
  │   └── customerror.js
  ├── frameworks/
  │   ├── express/
  │   │   └── routes/
  │   │       └── routefile.js
  │   └── mongoose/
  │       ├── connector/
  │       │   └── db.js
  │       └── models/
  │           └── modelfile.js
  ├── http_request/
  │   └── endpointdirectory/
  │       └── endpointrequest.js
  ├── interfaces/
  │   ├── controllers/
  │   │   └── controllerfile.js
  │   └── repositories/
  │       └── repositoryfile.js
  ├── middleware/
  │   └── preresponsehandler.js
  └── services/
      └── servicefile.js

```

## Endpoints

The API provides the following endpoints:

- `/songs`: Perform CRUD operations for songs.
- `/albums`: (Coming soon)...
- `/playlists`: (Coming soon)...
- `/collaborations`: (Coming soon)...

Feel free to explore and contribute to the project. If you encounter any issues or have suggestions, don't hesitate to create an issue on this repository.
