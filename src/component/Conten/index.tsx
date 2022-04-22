import React from "react";

type ContenProps = {
  tracks: [];
  onSelected: (id: number) => void;
  onDeselected: (id: number) => void;
  selects: any[];
};



const Conten = ({ tracks, onSelected, onDeselected, selects }: ContenProps) => {
  return (
    <div className="main-conten">
      {tracks.map((song: any, index) => {
        if (selects.length !== 0) {
          if (selects.includes(song.uri)) {
            return (
              <div key={index} className="conten">
                <div>
                  <img
                    src={song.album.images[0].url}
                    className="conten_image"
                  />
                </div>

                <a href={song.album.artists[0].external_urls.spotify}>
                  <div>
                    {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                    <h2>{song.name}</h2>
                    <h3>{song.album.name}</h3>
                    <p>{song.artists[0].name}</p>
                  </div>
                </a>

                <div className="select" onClick={() => onDeselected(song.uri)}>
                  Deselected
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="conten">
                <div>
                  <img
                    src={song.album.images[0].url}
                    className="conten_image"
                  />
                </div>

                <a href={song.album.artists[0].external_urls.spotify}>
                  <div>
                    {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                    <h2>{song.name}</h2>
                    <h3>{song.album.name}</h3>
                    <p>{song.artists[0].name}</p>
                  </div>
                </a>

                <div className="select" onClick={() => onSelected(song.uri)}>
                  Selected
                </div>
              </div>
            );
          }
        } else {
          return (
            <div key={index} className="conten">
              <div>
                <img src={song.album.images[0].url} className="conten_image" />
              </div>

              <a href={song.album.artists[0].external_urls.spotify}>
                <div>
                  {/* Sudah sesuai ditaruh diluar main component sejak minggu lalu */}
                  <h2>{song.name}</h2>
                  <h3>{song.album.name}</h3>
                  <p>{song.artists[0].name}</p>
                  <p className="durasi">{Math.floor (parseInt(song.duration_ms)/60000) + ":" + Math.floor ((parseInt(song.duration_ms)%60000)/1000) + " Menit"}</p>
                </div>
              </a>

              <div className="select" onClick={() => onSelected(song.uri)}>
                Selected
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Conten;
