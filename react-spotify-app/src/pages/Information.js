import { React, useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

import { getArtistInformation, getArtistsInformation } from '../wikipedia';
import { catchErrors } from '../utils';

import '../styles/information.css'

const Information = () => {
     /**
     * STATE VARIABLES
     * Info is the data retured by the Wikipedia API when given the (first, if multiple) artist's name
     */
    const [info, setInfo] = useState(null);

    // Song will be provided by the parent component Data
    // If no song is playing, this will remain undefined, as it should
    let song = useOutletContext();

    console.log("Information component song-------------------------------");
    console.log(song);
    console.log("Information component song-------------------------------");

    // The useEffect hook will run whenever the song variable changes
    // That is, when the Outlet context changes because of a change in the Data component, the hook will fire to get new Wiki data
    useEffect(() => {
        const fetchData = async () => {
          // console.log(song.item.artists);
          const artists = Object.keys(song.item.artists).map(i => song.item.artists[i].name);
          const artistInfo = await getArtistsInformation(artists);
          setInfo(artistInfo);
        };
      
        // If a song exists, fetch the corresponding data
        if (song) 
          catchErrors(fetchData());
      }, [song]);
    
    return (
        <>
            {info && (
                <div className='info'>
                {info.map((artist => (
                  <div className="infoItem" key={artist.title}>
                    <h1 className="infoItemTitle">{artist.title}</h1>
                    <div className="infoItemContents" dangerouslySetInnerHTML={{ __html: ((artist.contents.toString() && !artist.contents.toString().startsWith("<!--")) ? artist.contents : "No information available.") }}></div>
                    </div>
                )))}
                </div>
            ) || 
            song && (
                <p>Loading data for {Object.keys(song.item.artists).map(i => song.item.artists[i].name).join(", ")}...</p>
            ) ||            
            (
              <p>No song is playing.</p>
            )}
        </>
    )
};

export default Information;