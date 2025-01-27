import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import VerifiedPropertyCard from '../../Components/verifiedPropertyCard';

const Advertisement = () => {
    const [advertisedProperties, setAdvertisedProperties] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/advertisedProperties`)
            .then(res => setAdvertisedProperties(res.data))
    }, []);

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-5xl font-extrabold">Advertised Properties</h1>
            </div>
            <div className='flex justify-between'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5'>
                    {
                        advertisedProperties.map(property => <VerifiedPropertyCard key={property._id} property={property}></VerifiedPropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Advertisement;