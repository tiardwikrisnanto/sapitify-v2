import React from 'react';
import '../../styles/index.css';


export const Conten = props => {
    const { tracks, onSelected, selects } = props;

    return (
        <div className='main-conten'>
            {tracks.map((song, index) => {
                if (selects.length !== 0) {
                    if (selects.includes(song.uri)) {
                        return (<div key={index} className="conten">
                            <div>
                                <img src={song.album.images[0].url} className="conten_image" />
                            </div>

                            <a href={song.album.artists[0].external_urls.spotify}>
                                <div>
                                    {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                                    <h2>{song.name}</h2>
                                    <h3>{song.album.name}</h3>
                                    <p>{song.artists[0].name}</p>
                                </div>
                            </a>

                            <div className='select'>Deselected</div>
                        </div>)
                    } else {
                        return (<div key={index} className="conten">
                            <div>
                                <img src={song.album.images[0].url} className="conten_image" />
                            </div>

                            <a href={song.album.artists[0].external_urls.spotify}>
                                <div>
                                    {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                                    <h2>{song.name}</h2>
                                    <h3>{song.album.name}</h3>
                                    <p>{song.artists[0].name}</p>
                                </div>
                            </a>

                            <div className='select' onClick={() => onSelected(song.uri)}>Selected</div>
                        </div>)
                    }
                } else {
                    return (<div key={index} className="conten">
                        <div>
                            <img src={song.album.images[0].url} className="conten_image" />
                        </div>

                        <a href={song.album.artists[0].external_urls.spotify}>
                            <div>
                                {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                                <h2>{song.name}</h2>
                                <h3>{song.album.name}</h3>
                                <p>{song.artists[0].name}</p>
                            </div>
                        </a>

                        <div className='select' onClick={() => onSelected(song.uri)}>Selected</div>
                    </div>)
                }

            })}
        </div>

    )
}