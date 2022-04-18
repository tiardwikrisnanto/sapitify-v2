import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../helpers/helper";

const Login = () => {
  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`;
  };

  const token = getToken();

  return (
    <>
      {token !== undefined && token !== null  ? (
        <Navigate to={"/"} />
      ) : (
        <main className="center">
          <p>Login for next step...</p>
          <button>
            <a href={getSpotifyLinkAuthorize()}>authorize</a>
          </button>
        </main>
      )}
    </>
  );
};

export default Login;
