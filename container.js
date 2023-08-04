const Bottle = require('bottlejs');

const bottle = new Bottle();

const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

bottle.factory('nanoid', () => nanoid);
bottle.factory('bcrypt', () => bcrypt);
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

// authentications

const BcryptHashEngine = require('./Interfaces/services/BcryptHashEngine');

bottle.service('BcryptHashEngine', BcryptHashEngine, 'bcrypt');
module.exports = bottle;
