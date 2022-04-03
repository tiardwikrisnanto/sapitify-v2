import React, { useState, useEffect } from "react";
import { Conten } from "../component/Conten";
import CreatePlaylist from "./Playlist";
import { getUserProfile } from "../lib/fetchApi";
import sapitifyy from "../image/sapitify.png"

export default function Home() {

    const [state, setState] = useState({
        accessToken: '',
        isAuthorize: false,
        tracks: [],
    });

    const [user, setUser] = useState({});

    const [selects, setSelects] = useState([]);

    const [search, setSearch] = useState("")

    function getSpotifyLinkAuthorize() {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

        console.log(process.env.REACT_APP_SPOTIFY_SCOPE);

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`
    };

    function getHashParams() {
        const hashParams = {};
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        let e = r.exec(q);

        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    function authorize() {
        const params = getHashParams();
        const { access_token: accessToken } = params;

        setState({ accessToken, isAuthorize: accessToken !== undefined, tracks: [] })

    }

    async function onSearch() {
        const token = state.accessToken;

        var requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SPOTIFY_BASE_URL}/search?type=track&q=${search}`, requestOptions)
                .then((data) => data.json())
                .then((response) => {
                    const tracks = response.tracks.items;
                    setState({
                        accessToken: token,
                        isAuthorize: true,
                        tracks: tracks,
                    })
                })
                .catch((error) => console.log(error));


        } catch (e) {
            console.log(e);
        }
    }

    function onSelected(id) {
        const temp = selects;
        temp.push(id);
        setSelects([...temp]);
        console.log(selects)
    }

    useEffect(() => {
        authorize();
        const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

        if (accessTokenParams !== null) {


            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(accessTokenParams);

                    setUser(response);
                } catch (e) {
                    console.log(e);
                }
            }

            setUserProfile();
        }
    }, [search])


    return (

        <>
            {!state.isAuthorize && (
                <main className="center">
                    <p>Login for next step...</p>
                    <button><a href={getSpotifyLinkAuthorize()}>authorize</a></button>
                </main>
            )}

            {
                state.isAuthorize && (

                    <>


                        <main className="container" id="home">
                            <img src={sapitifyy} className="App-logo" alt="sapitifyy"></img>
                            <div className="searchbar">
                                <input type="text" placeholder="search" onChange={(event) => setSearch(event.target.value)} />
                                <button type="button" onClick={() => onSearch()}>Search</button>
                            </div>
                            <CreatePlaylist uriTracks={selects} accessToken={state.accessToken} user={user} />
                            {

                                state.tracks.length === 0 && selects.length === 0 ? (
                                    <p>Track Empty</p>
                                ) : (
                                    <Conten tracks={state.tracks} onSelected={onSelected} selects={selects} />
                                )
                            }
                        </main>
                    </>
                )
            }
        </>
    )


}