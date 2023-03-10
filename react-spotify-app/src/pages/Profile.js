import { React, useState, useEffect } from 'react';

import { getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/profile.css'

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getCurrentUserProfile();
            setProfile(profile.data);
        };

        catchErrors(fetchData());
    }, []);

    console.log(profile);

    return (
        <>
            {profile && (
                <div className='profile'>
                    {profile.images.length && profile.images[0].url && (
                        <a target="_blank" href={profile.external_urls.spotify}>
                            <img className='profile-image' src={profile.images[0].url} alt="Avatar"/>
                        </a>
                    )}
                    <h1 className='profile-display-name'><a target="_blank" href={profile.external_urls.spotify}>{profile.display_name}</a></h1>
                </div>
            )}
        </>
    )
};

export default Profile;