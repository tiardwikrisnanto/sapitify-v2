import React, { useState, useEffect } from "react";
import { Conten } from "../component/Conten";
import CreatePlaylist from "./Playlist";
import { getUserProfile } from "../lib/fetchApi";
import sapitifyy from "../image/sapitify.png"
import { Navigate } from "react-router-dom";

export default function Home() {

    const [state, setState] = useState({
        accessToken: '',
        isAuthorize: false,
        tracks: [],
    });

    const [user, setUser] = useState({});

    const [selects, setSelects] = useState([]);

    const [search, setSearch] = useState("")


    async function onSearch() {
        const token = state.accessToken;

        console.log(token);

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
    function onLogout() {
        console.log(localStorage.getItem('access_token'));
        localStorage.removeItem('access_token');

        
    }



    useEffect(() => {
        setState({
            accessToken: new URLSearchParams(window.location.hash).get('#access_token'),
            isAuthorize: true,
            tracks: [],
        });
        const accessTokenParams = state.accessToken;

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
            {localStorage.getItem('access_token') !== undefined ? (
                <>


                    <main className="container" id="home">
                        <img src={sapitifyy} className="App-logo" alt="sapitifyy"></img>
                        <div className="searchbar">
                            <input type="text" placeholder="search" onChange={(event) => setSearch(event.target.value)} />
                            <button type="button" onClick={() => onSearch()}>Search</button>
                            {/* <button type="button" onClick={() => onLogout()}>Logout</button> */}
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
            ) : (<Navigate to={'/login'} />)}


        </>
    )


}