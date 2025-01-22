import React from 'react';
import Banner from '../Pages/HomePage/Banner';
import Advertisement from '../Pages/HomePage/Advertisement';
import Reviews from '../Pages/HomePage/Reviews';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Home</title>
            </Helmet>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;