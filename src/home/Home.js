import React, { useState, useEffect } from "react";
import Conten from "../component/Conten";
import CreatePlaylist from "./Playlist";
import { getUserProfile, searchTracks } from "../lib/fetchApi";
import sapitifyy from "../image/sapitify.png";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthorize } from "../slice/loginSlice";
import { selectTracks, setTracks } from "../slice/trackSlice";
import { getToken } from "../helpers/helper";

export default function Home() {
  const logined = useSelector(selectAuthorize);
  const tracks = useSelector(selectTracks);
  const dispatch = useDispatch();

  let token = getToken();
  if (token === undefined || token === null) {
    token = new URLSearchParams(window.location.hash).get("#access_token");
    sessionStorage.setItem("token", JSON.stringify({ access_token: token }));
    dispatch(login(token));
  } else {
    dispatch(login(token));
  }

  const [user, setUser] = useState({});

  const [selects, setSelects] = useState([]);

  const [search, setSearch] = useState("");

  async function onSearch() {
    try {
      const response = await searchTracks(logined.accessToken, search)
      dispatch(setTracks(response));
    } catch (e) {
      console.log(e);
    }
  }

  function onSelected(id) {
    const temp = selects;
    temp.push(id);
    setSelects([...temp]);
  }

  function onDeselected(id) {
    const temp = selects;
    temp.pop(id);
    setSelects([...temp]);
  }

  useEffect(() => {
    const accessTokenParams = token;

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessTokenParams);

          setUser(response);
        } catch (e) {
          console.log(e);
        }
      };

      setUserProfile();
    }
  }, [search]);

  return (
    <>
      {token !== null && token !== undefined ? (
        <>
          <main className="container" id="home">
            <img src={sapitifyy} className="App-logo" alt="sapitifyy"></img>
            <div className="searchbar">
              <input
                type="text"
                placeholder="search"
                onChange={(event) => setSearch(event.target.value)}
              />
              <button type="button" onClick={() => onSearch()}>
                Search
              </button>
            </div>
            <CreatePlaylist
              uriTracks={selects}
              accessToken={logined.accessToken}
              user={user}
            />
            {tracks.length === 0 && selects.length === 0 ? (
              <p>Track Empty</p>
            ) : (
              <Conten
                tracks={tracks}
                onSelected={onSelected}
                onDeselected={onDeselected}
                selects={selects}
              />
            )}
          </main>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
