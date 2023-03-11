import { React, useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

import { getArtistInformation } from '../wikipedia';
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
          // TODO: get data for multiple artists and collaborators
          const res = await getArtistInformation(song.item.artists[0].name);
          const json = await res.json();

          console.log("Information component json-------------------------------");
          console.log(json);
          console.log("Information component json-------------------------------");

          const pages = json.query.pages;

          // Create arrays of titles and extracts using each id in the pages object
          // There should only be one id in each pages object, so title and contents should both be single-element arrays
          const title = Object.keys(pages).map(id => pages[id].title);
          const contents = Object.keys(pages).map(id => pages[id].extract);
      
          const newInfo = {
            'title': title,
            'contents': contents,
          };
          
          setInfo(newInfo);
        };
      
        // If a song exists, fetch the corresponding data
        if (song) 
          catchErrors(fetchData());
      }, [song]);
    
    return (
        <>
            {info && (
                <div className='info'>
                    <h1>{info.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: info.contents }}></div>
                </div>
            ) || 
            song && (
                <p>Loading data for {song.item.artists[0].name}...</p>
            ) ||            
            (
              <p>No song is playing.</p>
            )}
        </>
    )
};

export default Information;