import { React, useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

import { getLyrics } from '../musixmatch';
import { catchErrors } from '../utils';

import '../styles/lyrics.css'

const Lyrics = () => {
     /**
     * STATE VARIABLES
     * Info is the data retured by the Musixmatch API when given the (first, if multiple) artist's name
     */
    const [lyrics, setLyrics] = useState(null);
    const [status, setStatus] = useState(null);

    // Song will be provided by the parent component Data
    // If no song is playing, this will remain undefined, as it should
    let song = useOutletContext();

    // console.log("Lyrics component song-------------------------------");
    // console.log(song);
    // console.log("Lyrics component song-------------------------------");

    // The useEffect hook will run whenever the song variable changes
    useEffect(() => {
        const fetchData = async () => {
          const songLyricsResponse = await getLyrics(song.songName, song.artists, song.albumName);
          const statusCode = songLyricsResponse.data.message.header.status_code;
          setStatus(statusCode);

          if (statusCode == 200) {
            const songLyrics = songLyricsResponse.data.message.body.lyrics;
            console.log(songLyrics);
            setLyrics(formatLyrics(songLyrics));
          }
        };
      
        // If a song exists, fetch the corresponding data
        if (song) 
          catchErrors(fetchData());
        else
          setLyrics(null);
      }, [song]);

    const formatLyrics = (lyricsData) => {
      console.log("Lyrics: " + lyricsData.lyrics_body);

      // The Musixmatch API has an annoying grammatical problem so we'll change that part of its returned data
      const lyricsBody = lyricsData.lyrics_body.replace("This Lyrics is", "These lyrics are");
      const lyricsCopyright = lyricsData.lyrics_copyright.replace("This Lyrics is", "These lyrics are");

      // The API documentation (https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get) says a tracking script must be placed on the page where the lyrics are displayed
      const scriptTrackingURL = lyricsData.script_tracking_url;

      // Return a simple object with lyrics and copyright information as well as the tracking URL
      return { body: lyricsBody, copyright: lyricsCopyright, trackingURL: scriptTrackingURL }
    };
    
    return (
        <>
            {lyrics && (
                <div className='lyrics'>
                  <div className='lyrics_body'>
                    {lyrics.body}
                    <script type="text/javascript" src={lyrics.trackingURL}></script>
                  </div>
                  <div className='lyrics_copyright'>
                    {lyrics.copyright}
                  </div>

                </div>
            ) || 
            status && (
              <p>Unable to get lyrics from Musixmatch (response status code {status})</p>
            ) ||
            song && (
                <p>Loading data for {song.songName}...</p>
            ) ||            
            (
              <p>No song is playing.</p>
            )}
        </>
    )
};

export default Lyrics;