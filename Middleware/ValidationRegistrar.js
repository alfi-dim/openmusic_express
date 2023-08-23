const { container } = require('../container');

const validationInitiator = container.ValidationInitiator;

const validationRegistrar = {
  registerRule: () => {
    // register users payload rule
    validationInitiator.registerRule('users', [
      {
        fieldName: 'username',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'fullname',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'password',
        required: true,
        type: 'string',
      },
    ]);

    // register songs payload rule
    validationInitiator.registerRule('songs', [
      {
        fieldName: 'title',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'performer',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'year',
        required: true,
        type: 'number',
      },
      {
        fieldName: 'genre',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'duration',
        required: true,
        type: 'number',
      },
      {
        fieldName: 'albumId',
        required: false,
        type: 'string',
      },
    ]);

    // register playlists payload rule
    validationInitiator.registerRule('playlists', [
      {
        fieldName: 'name',
        required: true,
        type: 'string',
      },
    ]);

    // register albums payload rule
    validationInitiator.registerRule('albums', [
      {
        fieldName: 'name',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'year',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'cover',
        required: false,
        type: 'string',
      },
    ]);

    // register refresh token payload rule
    validationInitiator.registerRule('refreshToken', [
      {
        fieldName: 'refreshToken',
        required: true,
        type: 'string',
      },
    ]);

    // register login payload rule
    validationInitiator.registerRule('login', [
      {
        fieldName: 'username',
        required: true,
        type: 'string',
      },
      {
        fieldName: 'password',
        required: true,
        type: 'string',
      },
    ]);

    // register token payload rule
    validationInitiator.registerRule('token', [
      {
        fieldName: 'token',
        required: true,
        type: 'string',
      },
    ]);

    // register song id payload rule
    validationInitiator.registerRule('songId', [
      {
        fieldName: 'songId',
        required: true,
        type: 'string',
      },
    ]);

    // register username payload rule
    validationInitiator.registerRule('username', [
      {
        fieldName: 'username',
        required: true,
        type: 'string',
      },
    ]);
  },
};

module.exports = validationRegistrar;
