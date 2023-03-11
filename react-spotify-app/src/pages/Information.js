import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import { getCurrentlyPlaying } from '../spotify';
import { getArtistInformation } from '../wikipedia';
import { catchErrors } from '../utils';

import '../styles/information.css'

const Information = () => {
    const [info, setInfo] = useState(null);
    let valid = false;

    let song = useOutletContext();

    console.log("Information component-----------------------------------")
    console.log(song);
    console.log("Information component-----------------------------------");

    useEffect(() => {
        const fetchData = async () => {
          const res = await getArtistInformation(song.item.artists[0].name);
          const json = await res.json();
          const pages = json.query.pages;
          const title = Object.keys(pages).map(id => pages[id].title);
          const contents = Object.keys(pages).map(id => pages[id].extract);
      
          const newInfo = {
            'title': title,
            'contents': contents,
          };
          
          setInfo(newInfo);
        };
      
        if (song) 
          catchErrors(fetchData());
          valid = true;
      }, [song]);
    
    return (
        <>
            {info && (
                <div className='info'>
                    <h1>{info.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: info.contents }}></p>
                </div>
            ) || 
            song && (
                <p>Loading data for {song.item.artists[0].name}...</p>
            ) ||            
            valid && (
              <p>Loading...</p>
            ) || (
              <p>No song is playing.</p>
            )}
        </>
    )
};

export default Information;