const express = require('express');
const logger = require('morgan');

const indexRouter = require('./Frameworks/express/routes/index');
const songsRouter = require('./Frameworks/express/routes/songs');
const albumsRouter = require('./Frameworks/express/routes/albums');
const playlistsRouter = require('./Frameworks/express/routes/playlists');
const usersRouter = require('./Frameworks/express/routes/users');
const authenticationsRouter = require('./Frameworks/express/routes/authentications');
const PreResponseHandler = require('./Middleware/PreResponseHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use(songsRouter);
app.use(albumsRouter);
app.use(playlistsRouter);
app.use(usersRouter);
app.use(authenticationsRouter);
app.use(PreResponseHandler);

module.exports = app;
