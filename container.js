const Bottle = require('bottlejs');

const bottle = new Bottle();

const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

bottle.factory('nanoid', () => nanoid);
bottle.factory('bcrypt', () => bcrypt);
bottle.factory('jwt', () => jwt);

// services

const BcryptHashEngine = require('./Infrastructures/services/BcryptHashEngine');
const JwtTokenManager = require('./Infrastructures/services/JwtTokenManager');

bottle.service('BcryptHashEngine', BcryptHashEngine, 'bcrypt');
bottle.service('JwtTokenManager', JwtTokenManager, 'jwt');

// utils

const FormatModelUtils = require('./Utils/FormatModelUtils');

bottle.factory('FormatModelUtils', () => FormatModelUtils);
// songs endpoint
const SongsController = require('./Infrastructures/controllers/songs');
const SongsUseCase = require('./Applications/usecases/songs');
const SongsRepository = require('./Infrastructures/repositories/songsRepositoryMongoose');
const SongModel = require('./Frameworks/mongoose/models/songs');

bottle.factory('SongModel', () => SongModel);
bottle.service('SongsRepository', SongsRepository, 'SongModel', 'FormatModelUtils');
bottle.service('SongsUseCase', SongsUseCase, 'SongsRepository', 'nanoid');
bottle.service('SongsController', SongsController, 'SongsUseCase');

// albums endpoint
const AlbumsController = require('./Infrastructures/controllers/albums');
const AlbumsUseCase = require('./Applications/usecases/albums');
const AlbumsRepository = require('./Infrastructures/repositories/albumsRepositoryMongoose');
const AlbumModel = require('./Frameworks/mongoose/models/albums');

bottle.factory('AlbumModel', () => AlbumModel);
bottle.service('AlbumsRepository', AlbumsRepository, 'AlbumModel', 'FormatModelUtils');
bottle.service('AlbumsUseCase', AlbumsUseCase, 'AlbumsRepository', 'nanoid');
bottle.service('AlbumsController', AlbumsController, 'AlbumsUseCase');

// playlist endpoint
const PlaylistsController = require('./Infrastructures/controllers/playlists');
const PlaylistsUseCase = require('./Applications/usecases/playlists');
const PlaylistsRepository = require('./Infrastructures/repositories/playlistsRepositoryMongoose');
const PlaylistModel = require('./Frameworks/mongoose/models/playlists');

bottle.factory('PlaylistModel', () => PlaylistModel);
bottle.service('PlaylistsRepository', PlaylistsRepository, 'PlaylistModel', 'FormatModelUtils');
bottle.service('PlaylistsUseCase', PlaylistsUseCase, 'PlaylistsRepository', 'SongsRepository', 'nanoid', 'JwtTokenManager');
bottle.service('PlaylistsController', PlaylistsController, 'PlaylistsUseCase');

// users endpoint

const UsersController = require('./Infrastructures/controllers/users');
const UsersUseCase = require('./Applications/usecases/UserUseCase');
const UsersRepository = require('./Infrastructures/repositories/usersRepositoryMongoose');
const UserModel = require('./Frameworks/mongoose/models/users');

bottle.factory('UserModel', () => UserModel);
bottle.service('UsersRepository', UsersRepository, 'UserModel', 'FormatModelUtils');
bottle.service('UsersUseCase', UsersUseCase, 'UsersRepository', 'nanoid', 'BcryptHashEngine');
bottle.service('UsersController', UsersController, 'UsersUseCase');

// authentications endpoint

const AuthenticationsController = require('./Infrastructures/controllers/authentications');
const AuthenticationsUseCase = require('./Applications/usecases/authentications');
const AuthenticationsRepository = require('./Infrastructures/repositories/authenticationsRepositoryMongoose');
const AuthenticationModel = require('./Frameworks/mongoose/models/authentications');

bottle.factory('AuthenticationModel', () => AuthenticationModel);
bottle.service('AuthenticationsRepository', AuthenticationsRepository, 'AuthenticationModel');
bottle.service('AuthenticationsUseCase', AuthenticationsUseCase, 'AuthenticationsRepository', 'UsersRepository', 'BcryptHashEngine', 'JwtTokenManager');
bottle.service('AuthenticationsController', AuthenticationsController, 'AuthenticationsUseCase');

module.exports = bottle;
