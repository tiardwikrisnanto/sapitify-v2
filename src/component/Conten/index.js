import React from 'react';
import '../../styles/index.css';
import data from '../../data/dataSpotify';

export const Conten = () => {

    return (
        <>
            {data.map((song) => {
                return (<div className="conten">
                    <div>
                        <img src={song.album.images[0].url} className="conten_image" />
                    </div>

                    <div>
                        {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                        <h2>{song.name}</h2>
                        <h3>{song.album.name}</h3>
                        <p>{song.artists[0].name}</p>
                        <button><a href={song.album.artists[0].external_urls.spotify}>Select</a></button>
                    </div>
                </div>)
            })}
        </>

    )
}