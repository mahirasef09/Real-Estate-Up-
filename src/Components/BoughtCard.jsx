import React from 'react';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const BoughtCard = ({ property }) => {
    const { _id, propertyImage, title, location, agentName, offeredAmount, status } = property;

    return (
        <div>
            <div className="card bg-base-100 w-64 h-[550px] shadow-xl">
                <figure>
                    <img
                        src={propertyImage}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Title: {title}
                    </h2>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className="">
                        <span className='font-bold'>Agent Name:</span> {agentName}
                    </p>
                    <p className="">
                        <span className='font-bold'>Offered Amount:</span> ${offeredAmount}
                    </p>
                    <p className="">
                        <span className='font-bold'>Status:</span> {status}
                    </p>
                    {
                        status === 'accepted' && <div className="card-actions justify-end">
                            <Link to={`/dashboard/payment/${_id}`}>
                                <button className="btn btn-outline btn-warning">Pay</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default BoughtCard;