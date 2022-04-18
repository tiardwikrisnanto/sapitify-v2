import React, { useState } from "react";
import PropTypes from "prop-types";
import { createPlaylist, addTracksToPlaylist } from "../lib/fetchApi";
import "../styles/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePlaylist = ({ uriTracks, accessToken, user }) => {
  const [form, setForm] = useState({
    cplaylist: "",
    dplaylist: "",
    isValid: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseCreatePlaylist = await createPlaylist(
        accessToken,
        user.id,
        {
          name: form.cplaylist,
          description: form.dplaylist,
        }
      );

      await addTracksToPlaylist(
        accessToken,
        responseCreatePlaylist.id,
        uriTracks
      );

      // toast.success('Playlist created successfully');
      toast("Sudah tersimpan nih ngab!");
      setForm({ cplaylist: "", dplaylist: "", isValid: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cplaylist' && value.length < 10) {
        setForm({ ...form, [name]: value, isValid: false });
    } else {
        setForm({ ...form, [name]: value, isValid: true });
    }

    
  };

  return (
    <div className="playlist">
      <form onSubmit={onSubmit}>
        <label htmlFor="cplaylist">Create Playlist</label>
        <input
          type="text"
          id="cplaylist"
          name="cplaylist"
          placeholder="Bikin Playlistmu"
          onChange={handleChange}
          value={form.cplaylist}
        ></input>
        {form.isValid === false && (<p className="error">Karakter Kurang Dari 10</p>)}
        <label htmlFor="dplaylist">Deskripsi Playlist</label>
        <textarea
          name="dplaylist"
          placeholder="Tulis deskripsi playlistmu disini"
          onChange={handleChange}
          value={form.dplaylist}
        ></textarea>
        <button type="submit" disabled={form.isValid === false && true}>Submit</button>
        <ToastContainer type="success" />
      </form>
    </div>
  );
};

CreatePlaylist.propTypes = {
  uriTracks: PropTypes.array.isRequired,
  accessToken: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default CreatePlaylist;
