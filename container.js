const Bottle = require('bottlejs');

const bottle = new Bottle();

const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

bottle.factory('nanoid', () => nanoid);
bottle.factory('bcrypt', () => bcrypt);
bottle.factory('jwt', () => jwt);

// services

const BcryptHashEngine = require('./Interfaces/services/BcryptHashEngine');
const JwtTokenManager = require('./Interfaces/services/JwtTokenManager');

bottle.service('BcryptHashEngine', BcryptHashEngine, 'bcrypt');
bottle.service('JwtTokenManager', JwtTokenManager, 'jwt');

// songs endpoint
const SongsController = require('./Interfaces/controllers/songs');
const SongsUseCase = require('./Applications/usecases/SongUseCase');
const SongsRepository = require('./Interfaces/repositories/songsRepository');
const SongModel = require('./Frameworks/mongoose/models/songs');

bottle.factory('SongModel', () => SongModel);
bottle.service('SongsRepository', SongsRepository, 'SongModel');
bottle.service('SongsUseCase', SongsUseCase, 'SongsRepository', 'nanoid');
bottle.service('SongsController', SongsController, 'SongsUseCase');

// albums endpoint
const AlbumsController = require('./Interfaces/controllers/albums');
const AlbumsUseCase = require('./Applications/usecases/AlbumUseCase');
const AlbumsRepository = require('./Interfaces/repositories/albumsRepository');
const AlbumModel = require('./Frameworks/mongoose/models/albums');

bottle.factory('AlbumModel', () => AlbumModel);
bottle.service('AlbumsRepository', AlbumsRepository, 'AlbumModel');
bottle.service('AlbumsUseCase', AlbumsUseCase, 'AlbumsRepository', 'nanoid');
bottle.service('AlbumsController', AlbumsController, 'AlbumsUseCase');

// playlist endpoint
const PlaylistsController = require('./Interfaces/controllers/playlists');
const PlaylistsUseCase = require('./Applications/usecases/PlaylistUseCase');
const PlaylistsRepository = require('./Interfaces/repositories/playlistsRepository');
const PlaylistModel = require('./Frameworks/mongoose/models/playlists');

bottle.factory('PlaylistModel', () => PlaylistModel);
bottle.service('PlaylistsRepository', PlaylistsRepository, 'PlaylistModel');
bottle.service('PlaylistsUseCase', PlaylistsUseCase, 'PlaylistsRepository', 'SongsRepository', 'nanoid');
bottle.service('PlaylistsController', PlaylistsController, 'PlaylistsUseCase');

// users endpoint

const UsersController = require('./Interfaces/controllers/users');
const UsersUseCase = require('./Applications/usecases/UserUseCase');
const UsersRepository = require('./Interfaces/repositories/usersRepository');
const UserModel = require('./Frameworks/mongoose/models/users');

bottle.factory('UserModel', () => UserModel);
bottle.service('UsersRepository', UsersRepository, 'UserModel');
bottle.service('UsersUseCase', UsersUseCase, 'UsersRepository', 'nanoid', 'BcryptHashEngine');
bottle.service('UsersController', UsersController, 'UsersUseCase');

// authentications endpoint

const AuthenticationsController = require('./Interfaces/controllers/authentications');
const AuthenticationsUseCase = require('./Applications/usecases/AuthenticationsUseCase');
const AuthenticationsRepository = require('./Interfaces/repositories/authenticationsRepository');
const AuthenticationModel = require('./Frameworks/mongoose/models/authentications');

bottle.factory('AuthenticationModel', () => AuthenticationModel);
bottle.service('AuthenticationsRepository', AuthenticationsRepository, 'AuthenticationModel');
bottle.service('AuthenticationsUseCase', AuthenticationsUseCase, 'AuthenticationsRepository', 'UsersRepository', 'BcryptHashEngine', 'JwtTokenManager');
bottle.service('AuthenticationsController', AuthenticationsController, 'AuthenticationsUseCase');

module.exports = bottle;
