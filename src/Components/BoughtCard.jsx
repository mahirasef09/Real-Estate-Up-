import React from 'react';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useProperties from '../Hooks/useProperties';
import { FaDollarSign } from 'react-icons/fa';

const BoughtCard = ({property}) => {
    const { _id, propertyImage, title, location, agentName, offeredAmount, status } = property;
    

    return (
        <div>
            <div className="card bg-base-100 w-64 shadow-xl">
                <figure>
                    <img
                        src={propertyImage}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Title:<span>{title}</span> 
                    </h2>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className="">
                        <span className='font-bold'>Agent Name:</span> {agentName}
                    </p>
                    <p className="">
                        <span className='font-bold'>Offered Amount:</span> {offeredAmount}
                    </p>
                    <p className="">
                        <span className='font-bold'>Status:</span> {status}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BoughtCard;