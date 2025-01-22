import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="https://i.ibb.co.com/hLZStgw/Real-Estate4.jpg"
                        className="max-w-2xl rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Real Estate <span className="text-green-500">Up</span></h1>
                        <p className="text-2xl py-6">
                            <span className='text-green-700'>Find Your Dream Home Today!</span>
                            <br />
                            Discover the perfect property for your lifestyle and budget...
                        </p>
                        <Link to={'/allProperties'}>
                            <button className="btn bg-green-500">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;