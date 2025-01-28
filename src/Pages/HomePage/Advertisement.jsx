import React, { useEffect, useState } from 'react';
import VerifiedPropertyCard from '../../Components/verifiedPropertyCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Advertisement = () => {
    const [advertisedProperties, setAdvertisedProperties] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/advertisedProperties`)
            .then(res => setAdvertisedProperties(res.data))
    }, []);

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-5xl font-extrabold">Advertised Properties</h1>
            </div>
            <div className='flex justify-around'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        advertisedProperties.map(property => <VerifiedPropertyCard key={property._id} property={property}></VerifiedPropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Advertisement;