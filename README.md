[![wakatime](https://wakatime.com/badge/github/alfi-dim/openmusic_express.svg)](https://wakatime.com/badge/github/alfi-dim/openmusic_express)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
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
- bcrypt
- jwt
- dotenv

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
  │   │   └── repositoryfile.js
  │   └── services/
  │       └── serviceFile.js
  ├── middleware/
  │   └── preresponsehandler.js

```

## Endpoints

The API provides the following endpoints:

- `/songs`: Perform CRUD operations for songs.*
  - GET
    
    └── `/`: Get all songs
    response (200):
    
    ```
    {
      "status": String,
      "data": {
        "songs": [
            {
            "id": String,
            "title": String,
            "year": Number,
            "performer": String,
            "genre": String,
            "duration": Number,
          },
          {
            "id": String,
            "title": String,
            "year": Number,
            "performer": String,
            "genre": String,
            "duration": Number,
          },
        ],
      },
    }
    ```
    
    └── `/:id`: Get song by id
    response (200):
    ```
    {
      "status": String,
      "data": {
        "song":
            {
            "id": String,
            "title": String,
            "year": Number,
            "performer": String,
            "genre": String,
            "duration": Number,
          },
      },
    }
    ```
    
  - POST
    
    └── `/`: Add new song
    ```
    title: String
    year: Number between 1900 and 3000
    performer: String
    genre: String
    duration: Number
    ```
    response (201):
    ```
    {
      "status": String,
      "data": {
        "songId": String
      }
    }
    ```
  - PUT
    
    └── `/:id`: Update song
    ```
    title: String
    year: Number between 1900 and 3000
    performer: String
    genre: String
    duration: Number
    ```
    response (200):
    ```
    {
      "status": String
    }
    ```
  - DELETE
    
    └── `/:id`: Delete song
    response (200):
    ```
    {
      "status": String
    }
    ```

- `/albums`: Perform CRUD operations for albums.*
  - GET
    
    └── `/`: Get all albums
    response (200):
    ```
    {
      "status": String,
      "data": {
        "albums": [
          {
            "id": String,
            "name": String,
            "year": Number,
            "cover": String
          },
        ],
      },
    }
    ```
    
    └── `/:id`: Get album by id
    response (200):
    ```
    {
      "status": String,
      "data": {
        "albums": {
            "id": String,
            "name": String,
            "year": Number,
            "cover": String
          },
      },
    }
    ```
    
  - POST
    
    └── `/`: Add new album
    ```
    name: String
    year: Number between 1900 and 3000
    cover: String (url)
    ```
    response (201):
    ```
    {
      "status": String,
      "data": {
        "albumId": String  
      }
    }
    ```
  - PUT
    
    └── `/:id`: Update album
    ```
    name: String
    year: Number between 1900 and 3000
    cover: String (url)
    ```
    response (200):
    ```
    {
      "status": String
    }
    ```
  - DELETE
    
    └── `/:id`: Delete album
    
    response (200):
    ```
    {
      "status": String
    }
    ```

- `/users`: Perform CRUD operations for users.
  - GET
    
    └── `/:id`: Get user by id
    response (200):
    ```
    {
      "status": String,
      "data": {
        "user": [
          {
            "id": String,
            "username": String,
            "fullname": String,
          },
        ],
      },
    }
    ```
  - POST
    
    └── `/`: Create new user
    ```
    username: String (unique)
    fullname: String
    password: String
    ```
    response (201):
    ```
    {
      "status": String,
      "data": {
        "userId": String
      }
    }
    ```
  - PUT (coming soon)...
  - DELETE (coming soon)...
  - GET `/check-username/:username`: Perform check username availibilty operation
    
    response (200):
    ```
    {
      "status": String,
      "data": {
        "available": Boolean    
      }
    }
    ```

- `/authentications`: Perform login and logout operation.*
  - POST
    
    └── Login
    ```
    username: String
    password: String
    ```
    response (201):
    ```
    {
      "status": String,
      "data": {
        "refreshToken": String
        "accessToken": String
      }a
    }
    ```
  - DELETE
    
    └── Logout
    ```
    refreshToken: String
    ```
    response (200):
    ```
    {
      "status": String
    }
    ```
  - PUT
      
    └── Refresh access token
    ```
    refreshToken: String
    ```
    response (200):
    ```
    {
      "status": String,
      "data": {
        "accessToken": String
      }
    }
    ```
- `/playlists`:  Perform CRUD operations for playlists.*
  - GET
    
    └── `/:id`: Get playlist by id
    
    response (200):
    ```
    {
      "status": String,
      "data": {
        "playlist": {
          "id": String,
          "name": String,
          "owner": String,
          "songs": [
            {
            "id": String,
            "title": String,
            "year": Number,
            "performer": String,
            "genre": String,
            "duration": Number,
          },
          {
            "id": String,
            "title": String,
            "year": Number,
            "performer": String,
            "genre": String,
            "duration": Number,
          },
        ],
        }
      }
    }
    ```
  - POST
    
    └── `/`: Create new playlist
    ```
    name: String
    ```
    response (201):
    ```
    {
      "status": String,
      "data": {
        "playlistId": String
      }
    }
    ```
  - PATCH^
    
    └── `/:id`: update playlist name
    ```
    name: String
    ```
    response (200):
    ```
    {
      "status": String,
    }
    ```

    └── `/:id/songs`: add songs to playlist
    ```
    songId: String
    ```
    response (200):
    ```
    {
      "status": String,
    }
    ```
  - DELETE^
    
    └── `/:id`: delete playlist
    response (200):
    ```
    {
      "status": String,
    }
    ```

    └── `/:id/songs`: delete song from playlist
    response (200):
    ```
    {
      "status": String,
    }
    ```
    
- `/collaborations`: (Coming soon)...

***: Authentication required (bearer token authentication)**

**^: Only the user who originally created the data.**
## Environment File
- `ACCESS_TOKEN_KEY`: run `require('crypto').createHash('sha256').update('text').digest('hex')` on node.js terminal
- `REFRESH_TOKEN_KEY`: run `require('crypto').createHash('sha256').update('text').digest('hex')` on node.js terminal
- `TOKEN_AGE`:  token expiration time in seconds

Feel free to explore and contribute to the project. If you encounter any issues or have suggestions, don't hesitate to create an issue on this repository.
