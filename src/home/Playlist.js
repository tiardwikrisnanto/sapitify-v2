import React, { useState } from "react";
import { createPlaylist, addTracksToPlaylist } from "../lib/fetchApi";
import "../styles/index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreatePlaylist = props => {
    const { uriTracks, accessToken, user } = props;
    const [form, setForm] = useState({
        cplaylist: '',
        dplaylist: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseCreatePlaylist = await createPlaylist(accessToken, user.id, {
                name: form.cplaylist,
                description: form.dplaylist,
            });

            await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

            // toast.success('Playlist created successfully');
            toast("Sudah tersimpan nih ngab!")
            setForm({ cplaylist: '', dplaylist: '' });
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });
    }

    return (
        <div className="playlist">
            <form onSubmit={onSubmit}>
                <label htmlFor="cplaylist">Create Playlist</label>
                <input type="text" id="cplaylist" name="cplaylist" placeholder="Bikin Playlistmu" onChange={handleChange}></input>
                <label htmlFor="dplaylist">Deskripsi Playlist</label>
                <textarea name="dplaylist" placeholder="Tulis deskripsi playlistmu disini"></textarea>
                <button type="submit">Submit</button>
                <ToastContainer type="success" />
            </form>
        </div>

    )
}

export default CreatePlaylist;
