import { React, useState, useEffect } from 'react';

import { getCurrentlyPlaying } from '../spotify';
import { getArtistInformation } from '../wikipedia';
import { catchErrors } from '../utils';

import '../styles/information.css'

const Information = () => {
    const [song, setSong] = useState(null);
    const [info, setInfo] = useState(null);
    const [newInfo, setNewInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const currentlyPlaying = await getCurrentlyPlaying();    
          setSong(currentlyPlaying.data);
          const res = await getArtistInformation(currentlyPlaying.data.item.artists[0].name);
          const json = await res.json();
          const pages = json.query.pages;
          const title = Object.keys(pages).map(id => pages[id].title);
          const contents = Object.keys(pages).map(id => pages[id].extract);
      
          const newInfo = {
            'title': title,
            'contents': contents,
          };
          
          setNewInfo(newInfo);
        };
      
        catchErrors(fetchData());
      }, []);
      
      useEffect(() => {
        setInfo(newInfo);
      }, [newInfo]);

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
            (<p>Loading...</p>)}
        </>
    )
};

export default Information;