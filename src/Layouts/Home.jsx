import React from 'react';
import Banner from '../Pages/HomePage/Banner';
import Advertisement from '../Pages/HomePage/Advertisement';
import Reviews from '../Pages/HomePage/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;