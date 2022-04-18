import axios from "axios";

const createPlaylist = async (
  accessToken: string,
  userId: any,
  { name, description }: any
) => {
  const data = JSON.stringify({
    name,
    description,
    public: false,
    collaborative: false,
  });

  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${process.env.REACT_APP_SPOTIFY_BASE_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );

  return response.data;
};

const addTracksToPlaylist = async (
  accessToken: string,
  playlistId: any,
  uris: any
) => {
  const data = JSON.stringify({
    uris,
  });

  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${process.env.REACT_APP_SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );

  return response.data;
};

const getUserProfile = async (accessToken: string) => {
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(
    `${process.env.REACT_APP_SPOTIFY_BASE_URL}/me`,
    requestOptions
  );

  return response.data;
};

const searchTracks = async (accessToken: string, keyword: string) => {
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SPOTIFY_BASE_URL}/search?type=track&q=${keyword}`,
      requestOptions
    )
      .then((data) => data.json())
      .then((response) => response.tracks.items)
      .catch((error) => console.log(error));

      return response;
  } catch (e) {
    console.log(e);
  }
};

export { createPlaylist, addTracksToPlaylist, getUserProfile, searchTracks };
