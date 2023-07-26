const Bottle = require('bottlejs');

const bottle = new Bottle();

const { nanoid } = require('nanoid');

// songs endpoint
const SongsController = require('./Interfaces/controllers/songs');
const SongsUseCase = require('./Applications/usecases/SongUseCase');
const SongsRepository = require('./Interfaces/repositories/songsRepository');
const SongModel = require('./Frameworks/mongoose/models/songs');

bottle.factory('nanoid', () => nanoid);
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

module.exports = bottle;
