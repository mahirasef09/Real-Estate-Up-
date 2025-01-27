import React from 'react';
import Banner from '../Pages/HomePage/Banner';
import Advertisement from '../Pages/HomePage/Advertisement';
import { Helmet } from 'react-helmet-async';
import FAQ from '../Pages/HomePage/FAQ';
import Featured from '../Pages/HomePage/Featured';
import LatestReviews from '../Pages/HomePage/LatestReviews';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <Advertisement></Advertisement>
            <LatestReviews></LatestReviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;