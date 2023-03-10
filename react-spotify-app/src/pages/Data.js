import { React, useState, useEffect } from 'react';

import { getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

const Data = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getCurrentUserProfile();
            setProfile(data);
        };

        catchErrors(fetchData());
    }, []);

    return (
        <>
            {profile && (
                <div>
                <h1>{profile.display_name}</h1>
                {profile.images.length && profile.images[0].url && (
                    <img src={profile.images[0].url} alt="Avatar"/>
                )}
                </div>
            )}
        </>
    )
};

export default Data;