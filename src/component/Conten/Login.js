import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {

    const [state, setState] = useState({
        accessToken: '',
        isAuthorize: false,
        tracks: [],
    });

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

        setState({ accessToken, isAuthorize: accessToken !== undefined, tracks: [] });
        accessToken !== undefined && sessionStorage.setItem('access_token', accessToken);
        
    }

    useEffect(() => {
        authorize();
    }, []);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

        console.log(clientId)

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`
    };

    return (
        <>
            {
                sessionStorage.getItem('access_token') !== undefined ? (
                    <Navigate to={'/'} />
                ) : (
                    <main className="center">
                        <p>Login for next step...</p>
                        <button><a href={getSpotifyLinkAuthorize()}>authorize</a></button>
                    </main >
                )
            }
        </>

    )
}

export default Login;