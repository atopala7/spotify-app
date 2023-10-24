import { React, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { getCurrentlyPlaying } from "../spotify";
import { catchErrors } from "../utils";

import "../styles/data.css";
import refresh from "../images/refresh.png";

const Data = (props) => {
  /**
   * STATE VARIABLES
   * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
   * Status is the response status, which if 204 indicates that no song is currently playing
   */
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [song, setSong] = useState(null);

  useEffect(() => {
    getSong(props.selectedSong);
  }, [props.selectedSong]);

  useEffect(() => {
    if (data) {
      const thisSong = {
        albumArt: data.item.album.images[1].url,
        songName: data.item.name,
        artists: data.item.artists,
        albumName: data.item.album.name
      };

      setSong(thisSong);

      props.rootSelectSong(thisSong);
    }
  }, [data]);

  // Awaits the song that's currently playing and sets state variables accordingly
  const getSong = (select) => {
    // Clear the previous state variables
    setData(null);
    setStatus(null);

    if (!select) {
      const fetchData = async () => {
        const currentlyPlaying = await getCurrentlyPlaying();
        setData(currentlyPlaying.data);
        setStatus(currentlyPlaying.status);

        console.log(data);

        if (!data) setSong(null);
      };
      catchErrors(fetchData());
    } else {
      console.log(select);

      const thisSong = {
        albumArt: select.albumArt,
        songName: select.songName,
        artists: select.artists,
        albumName: select.albumName
      };

      setSong(thisSong);
    }
  };

  return (
    <>
      {(song && (
        <>
          <div className="container-lg">
            <div className="row justify-content-center align-items-center">
              <div class="col-md-4 text-center d-flex justify-content-center justify-content-md-end align-items-center">
                <div
                  className="data-image-container"
                  onClick={() => {
                    getSong(null);
                  }}
                  onMouseOver={() => {
                    document
                      .querySelector(".data-image-container")
                      .style.setProperty("--refreshWidth", "150px");
                    document
                      .querySelector(".data-image-container")
                      .style.setProperty(
                        "--refreshOffset",
                        "calc(var(--containerWidth) * 0.5 - var(--refreshWidth) * 0.5"
                      );
                    document
                      .querySelector(".data-image-container")
                      .style.setProperty(
                        "--refreshOrigin",
                        "calc(var(--refreshWidth) * 0.5 + var(--refreshOffset)) calc(var(--refreshWidth) * 0.5  + var(--refreshOffset))"
                      );
                  }}
                >
                  <img className="data-image" src={song.albumArt} />
                  {/* <img className='data-refresh' src={refresh} /> */}
                </div>
              </div>
              <div className="data-info col-md-8 text-center text-md-start">
                <h1>{song.songName}</h1>
                <h2>{song.artists.map((artist) => artist.name).join(", ")}</h2>
                <h2>{song.albumName}</h2>
              </div>
            </div>
          </div>
          <div className="outlet-container card">
            <Outlet context={song} />
          </div>
        </>
      )) ||
        (status == 204 && (
          <>
            <p>No song is currently playing.</p>
            <Outlet />
          </>
        )) ||
        (status >= 400 && (
          <>
            <p>Error retrieving data from Spotify.</p>
            <Outlet />
          </>
        )) || (
          <>
            <p>Loading currently playing song...</p>
            <Outlet />
          </>
        )}
    </>
  );
};

export default Data;
