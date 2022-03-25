import React from 'react';
import '../../styles/index.css';
import data from '../../data/dataSpotify';

export const Conten = () =>  {

    return (
        <div className = "conten">
        <div>
            <img src={data.album.images[0].url} className="conten_image" />
        </div>

        <div>
            {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
            <h2>{data.name}</h2>
            <h3>{data.album.name}</h3>
            <p>{data.artists[0].name}</p>
            <button><a href={data.album.artists[0].external_urls.spotify}>Select</a></button>
        </div>
        </div>
    )
}