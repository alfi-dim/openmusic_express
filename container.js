const Bottle = require('bottlejs');

const bottle = new Bottle();

const { nanoid } = require('nanoid');
const SongsController = require('./Interfaces/controllers/songs');
const SongsUseCase = require('./Applications/usecases/SongUseCase');
const SongsRepository = require('./Interfaces/repositories/songsRepository');
const SongModel = require('./Frameworks/mongoose/models/songs');

bottle.factory('nanoid', () => nanoid);
bottle.factory('SongModel', () => SongModel);
bottle.service('SongsRepository', SongsRepository, 'SongModel');
bottle.service('SongsUseCase', SongsUseCase, 'SongsRepository', 'nanoid');
bottle.service('SongsController', SongsController, 'SongsUseCase');

module.exports = bottle;
