class FormatModelUtils {
  static formatModelSong = ({
    _id,
    title,
    year,
    performer,
    genre,
    duration,
  }) => ({
    id: _id,
    title,
    year,
    performer,
    genre,
    duration,
  });

  static formatModelAlbum = ({
    _id,
    name,
    year,
    cover,
  }) => ({
    id: _id,
    name,
    year,
    cover,
  });

  static formatModelUser = ({
    _id,
    username,
    fullname,
  }) => ({
    id: _id,
    username,
    fullname,
  });

  static formatModelPlaylist = ({
    _id,
    name,
    owner,
    songs,
  }) => ({
    id: _id,
    name,
    owner,
    songs: songs || [],
  });
}

module.exports = FormatModelUtils;
