import React from 'react';
import { FaHouseUser } from 'react-icons/fa';
import { HiMiniBuildingOffice2, HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { MdApartment, MdVilla } from 'react-icons/md';
import { SiYoutubestudio } from 'react-icons/si';

const Featured = () => {
    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-5xl font-extrabold">Featured Property Types</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                <div className="stat bg-gray-100 rounded-lg">
                    <div className="stat-figure text-secondary">
                        <FaHouseUser className='text-3xl'></FaHouseUser>
                    </div>
                    <div className="stat-value text-green-500">House</div>
                    <div className="stat-title">102 Properties</div>
                </div>

                <div className="stat stat bg-gray-100 rounded-lg">
                    <div className="stat-figure text-secondary">
                        <MdVilla className='text-3xl'></MdVilla>
                    </div>
                    <div className="stat-value text-green-500">Villa</div>
                    <div className="stat-title">177 Properties</div>
                </div>

                <div className="stat stat bg-gray-100 rounded-lg">
                    <div className="stat-figure text-secondary">
                        <MdApartment className='text-3xl'></MdApartment>
                    </div>
                    <div className="stat-value text-green-500">Apartment</div>
                    <div className="stat-title">52 Properties</div>
                </div>

                <div className="stat stat bg-gray-100 rounded-lg">
                    <div className="stat-figure text-secondary">
                        <HiOutlineBuildingOffice2 className='text-3xl'></HiOutlineBuildingOffice2>
                    </div>
                    <div className="stat-value text-green-500">Office</div>
                    <div className="stat-title">82 Properties</div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
