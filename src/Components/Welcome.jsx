import React from 'react';
import useAuth from '../Hooks/useAuth';

const Welcome = () => {
    const {user} = useAuth();
    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Welcome {user?.displayName}</h1>
            </div>
        </div>
    );
};

export default Welcome;