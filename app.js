const express = require('express');
const logger = require('morgan');

const indexRouter = require('./Frameworks/express/routes/index');
const songsRouter = require('./Frameworks/express/routes/songs');
const albumsRouter = require('./Frameworks/express/routes/albums');
const PreResponseHandler = require('./Middleware/PreResponseHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use(songsRouter);
app.use(albumsRouter);
app.use(PreResponseHandler);

module.exports = app;
