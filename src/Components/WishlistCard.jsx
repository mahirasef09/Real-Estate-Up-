import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const WishlistCard = ({ wishlist }) => {
    const { _id, propertyImage, agentImage, title, location, priceRange, agentName, status } = wishlist;
    return (
        <div>
            <div className="card bg-base-100 w-72 shadow-xl">
                <figure>
                    <img
                        src={propertyImage}
                        alt="Shoes" />
                </figure>
                <div className='flex gap-3 mt-3 ml-9'>
                    <div className="avatar">
                        <div className="w-8 rounded">
                            <img
                                src={agentImage}
                                alt="Tailwind-CSS-Avatar-component" />

                        </div>
                    </div>
                    <p className='flex items-center text-gray-400'>Agent: {agentName}</p>
                </div>
                <div className="card-body">
                    <h2 className="card-title font-bold">
                        {title}
                    </h2>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className='flex items-center'><FaDollarSign /><span className='text-gray-400'>{priceRange}</span></p>
                    <p className='flex items-center text-gray-400 uppercase'>Status: {status}</p>
                    <div className="card-actions justify-end">
                        
                            <button className="btn btn-outline btn-warning">Make an offer</button>
                            <button className="btn btn-outline btn-warning">Remove</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;