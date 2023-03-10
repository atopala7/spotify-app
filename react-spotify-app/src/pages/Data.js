import { React, useState, useEffect } from 'react';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

const Data = () => {
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentlyPlaying = await getCurrentlyPlaying();
            setSong(currentlyPlaying.data);
        };

        catchErrors(fetchData());
    }, []);

    return (
        <>
            {song && console.log(
                song.item.artists[0].name
            )}
        </>
    )
};

export default Data;