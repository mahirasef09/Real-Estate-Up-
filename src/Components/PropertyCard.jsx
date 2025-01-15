import React from 'react';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    const { _id, image, title, location, priceRange } = property;
    return (
        <div>
            <div className="card bg-base-100 w-64 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                    </h2>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className='text-gray-400'>${priceRange}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-warning">Update</button>
                        <button className="btn btn-outline btn-warning">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;